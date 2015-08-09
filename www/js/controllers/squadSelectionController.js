controllers.controller(AFL.PAGES.SQUAD_SELECTION.controller, ['$scope', '$rootScope', '$stateParams', '$ionicModal', '$state', '$utils', '$log', AFL.PAGES.SQUAD_SELECTION.factory, function($scope, $rootScope, $stateParams, $ionicModal, $state, $utils, $log, SquadSelectionFactory) {

    $ionicModal.fromTemplateUrl('templates/modals/filter_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        id: 'filterModal'
    }).then(function(modal) {
        $scope.filterModal = modal;
    });

    $scope.showFilterModal = function() {
        $scope.filterModal.show();
    };
    $scope.hideFilterModal = function() {
        $scope.filterModal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modals/condition_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        id: 'conditionModal'
    }).then(function(modal) {
        $scope.conditionModal = modal;
    });

    $scope.showConditionModal = function() {
        $scope.conditionModal.show();
    };
    $scope.hideConditionModal = function() {
        $scope.conditionModal.hide();
    };

    $scope.$on('modal.shown', function(event, modal) {

        if (modal.id == "filterModal") {
            if ($scope.fantasyTeams.length == 0) {
                $utils.showSpinner();
            }
            if ($scope.playerTypes.length == 0) {
                $scope.getAllAPLTeams();
            }
        }
    });

    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : start");

        $utils.showSpinner();
        $scope.initializePage();

        $scope.currentTeam = $stateParams.currentTeam ? JSON.parse($stateParams.currentTeam) : [];
        $scope.teamProfile = $stateParams.teamProfile ? JSON.parse($stateParams.teamProfile) : {};

        $scope.original = {
            team: JSON.parse(JSON.stringify($scope.currentTeam)),
            profile: JSON.parse(JSON.stringify($scope.teamProfile))
        };

        $scope.getAllAPLPlayers();

        $scope.checkConditions($scope.currentTeam);
        global = $scope;

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : end");
    });

    $scope.initializePage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".initializePage : start");
        $scope.filterObject = {};

        $scope.currentTeam = [];
        $scope.roster = [];
        $scope.fantasyTeams = [];
        $scope.playerTypes = [];
        $scope.teamProfile = [];

        $scope.filterObject.teamId = AFL.NON_EXISTENT;
        $scope.filterObject.playerTypeId = AFL.NON_EXISTENT;
        $scope.filterObject.impactPlayer = {
            isChecked: false,
            text: "Impact Player"
        };

        $scope.rosterPageNumber = 1;
        $scope.conditions = {};
        $scope.conditionNames = [];

        for (var condition in AFL.PLAYER_SELECTION_CONDITIONS) {
            $scope.conditions[condition] = false;
        }

        $scope.conditionNames = Object.keys($scope.conditions);

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".initializePage : end");
    }

    $scope.showPreviousPage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showPreviousPage : start");
        $scope.rosterPageNumber--;
        var rosterContainer = document.querySelector('.roster_list');
        var scrollTop = ($scope.rosterPageNumber - 1) * 330;
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : scrollTop : " + scrollTop);
        rosterContainer.setAttribute("style", "transform : translateY(-" + scrollTop + "px)");
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showPreviousPage : end");
    };

    $scope.showNextPage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : start");

        if ($scope.roster.length > ($scope.rosterPageNumber * 11)) {
            var rosterContainer = document.querySelector('.roster_list');
            var scrollTop = $scope.rosterPageNumber * 330;
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : scrollTop : " + scrollTop);
            rosterContainer.setAttribute("style", "transform : translateY(-" + scrollTop + "px)");
            $scope.rosterPageNumber++;
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : end");
    };

    $scope.roster = [];

    $scope.getAllAPLPlayers = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".getAllAPLPlayers : start");
        SquadSelectionFactory.getAllAPLPlayers().then(function(roster) {
            for (var i = 0; i < roster.length; i++) {
                if (!$utils.isPlayerInTeamById($scope.currentTeam, roster[i].playerId)) {
                    $scope.roster.push(roster[i]);
                }
            }
            $utils.hideSpinner();
        }, function() {
            $utils.showAlert("Sorry!!!", "Data could not be fetched. Please try again.");
        });
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".getAllAPLPlayers : end");
    };

    $scope.getAllAPLTeams = function() {
        $utils.showSpinner();
        SquadSelectionFactory.getAllAPLTeams().then(function(fantasyTeams) {
            $scope.fantasyTeams = fantasyTeams;
            $utils.hideSpinner();
            $scope.getAllPlayerTypes();
        }, function() {
            $utils.showAlert("Sorry!!!", "Some network error occurred. Please Try again.");
            $utils.hideSpinner();
        });
    };

    $scope.getAllPlayerTypes = function() {
        $utils.showSpinner();
        SquadSelectionFactory.getAllPlayerTypes().then(function(playerTypes) {
            $scope.playerTypes = playerTypes;
            $utils.hideSpinner();
        }, function() {
            $utils.showAlert("Sorry!!!", "Some network error occurred. Please Try again.");
            $utils.hideSpinner();
        });
    };

    $scope.addPlayerToSquad = function(playerId) {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : start");

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : PlayerId : " + playerId);
        if ($scope.currentTeam.length >= AFL.MAX_TEAM_PLAYERS) {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : Your current squad already has 11 players.");
            $utils.showAlert("Error", "Your current squad already has 11 players.")
        } else {
            var player = $utils.getPlayerFromTeamById($scope.roster, playerId);
            $scope.currentTeam.push(player);

            $scope.teamProfile.moneyLeft = $scope.teamProfile.moneyLeft - player.playerPrice;

            if (!$utils.isPlayerInTeamById($scope.original.team, player.playerId)) {
                $scope.teamProfile.transfersLeft = $scope.teamProfile.transfersLeft - 1;
            }

            $utils.removePlayerFromTeamById($scope.roster, playerId);

            $scope.currentTeam.sort(function(a, b) {
                return a.playerName.localeCompare(b.playerName);
            });

            $scope.checkConditions();
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : end");
    };

    $scope.removePlayerFromSquad = function(playerId) {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".removePlayerFromSquad : start");

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".removePlayerFromSquad : PlayerId : " + playerId);

        var player = $utils.getPlayerFromTeamById($scope.currentTeam, playerId);
        player.isCaptain = AFL.NON_CAPTAIN;

        $scope.roster.push(player);

        $scope.teamProfile.moneyLeft = $scope.teamProfile.moneyLeft + player.playerPrice;

        if (!$utils.isPlayerInTeamById($scope.original.team, player.playerId)) {
            $scope.teamProfile.transfersLeft = $scope.teamProfile.transfersLeft + 1;
        }

        $utils.removePlayerFromTeamById($scope.currentTeam, playerId);


        $scope.roster.sort(function(a, b) {
            return a.playerName.localeCompare(b.playerName);
        });


        $scope.checkConditions();

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".removePlayerFromSquad : end");
    };

    $scope.saveFilter = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveFilter : start");
        $scope.hideFilterModal();
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveFilter : end");
    };

    $scope.saveSquad = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveSquad : start");


        if (!$scope.checkConditions()) {
            $scope.showConditionModal();
        } else {

            SquadSelectionFactory.insertPlayerSelection($scope.currentTeam, $scope.currentUser).then(function() {
                alert("success");

            }, function() {
                alert("failure");
            });
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveSquad : end");
    };

    $scope.checkConditions = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".checkConditions : start");


        for (var condition in AFL.PLAYER_SELECTION_CONDITIONS) {
            if (AFL.PLAYER_SELECTION_CONDITIONS.hasOwnProperty(condition) && AFL.PLAYER_SELECTION_CONDITIONS[condition].isToBeChecked) {
                $scope.conditions[condition] = AFL.PLAYER_SELECTION_CONDITIONS[condition].checkCondition($scope);
            }
        }

        for (var i = 0; i < $scope.conditionNames.length; i++) {
            if (!$scope.conditions[$scope.conditionNames[i]]) {
                return false;
            }
        }

        return true;
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".checkConditions : end");
    };

    $scope.makeCaptain = function(playerId) {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".makeCaptain : start");

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".makeCaptain : playerId: " + playerId);
        var newCaptain = $utils.getPlayerFromTeamById($scope.currentTeam, playerId);

        var oldCaptain;

        for (var i = 0; i < $scope.currentTeam.length; i++) {
            if ($scope.currentTeam[i].isCaptain == AFL.CAPTAIN) {
                oldCaptain = $scope.currentTeam[i];
                break;
            }
        }

        if (oldCaptain) {
            oldCaptain.isCaptain = AFL.NON_CAPTAIN;
        }

        newCaptain.isCaptain = AFL.CAPTAIN;

        $scope.conditions["HAS_CAPTAIN"] = AFL.PLAYER_SELECTION_CONDITIONS["HAS_CAPTAIN"].checkCondition($scope);
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".makeCaptain : end");
    }


    $scope.resetSquad = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".resetSquad : start");

        $utils.showSpinner();
        $scope.initializePage();

        $scope.currentTeam = JSON.parse(JSON.stringify($scope.original.team));
        $scope.teamProfile = JSON.parse(JSON.stringify($scope.original.profile));

        $scope.original = {
            team: JSON.parse(JSON.stringify($scope.currentTeam)),
            profile: JSON.parse(JSON.stringify($scope.teamProfile))
        };

        $scope.getAllAPLPlayers();

        $scope.checkConditions($scope.currentTeam);
        global = $scope;

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".resetSquad : end");
    }

    $scope.showConditionMessage = function(conditionName) {

        if(!$scope.conditions[conditionName]) {
            $utils.showAlert("Condition", $rootScope.AFL_MESSAGES.CONDITIONS[conditionName]);
        }
    }
}]);
