controllers.controller(AFL.PAGES.SQUAD_SELECTION.controller, ['$scope', '$rootScope', '$stateParams', '$ionicModal', '$state', '$utils', '$log', AFL.PAGES.SQUAD_SELECTION.factory, function($scope, $rootScope, $stateParams, $ionicModal, $state, $utils, $log, SquadSelectionFactory) {

    $ionicModal.fromTemplateUrl('templates/modals/filter_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showFilterModal = function() {
        $scope.modal.show();
    };
    $scope.hideFilterModal = function() {
        $scope.modal.hide();
    };

    $scope.$on('modal.shown', function(event, modal) {
        if ($scope.fantasyTeams.length == 0) {
            $utils.showSpinner();
        }
        if ($scope.playerTypes.length == 0) {
            $scope.getAllAPLTeams();
        }
    });

    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : start");

        $scope.initializePage();

        $scope.currentTeam = $stateParams.currentTeam ? JSON.parse($stateParams.currentTeam) : [];
        $scope.teamProfile = $stateParams.teamProfile ? JSON.parse($stateParams.teamProfile) : {};

        $scope.getAllAPLPlayers();

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : end");

        $scope.checkConditions($scope.currentTeam);

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
        if ($scope.rosterPageNumber != 1) {
            var rosterContainer = document.querySelector('.roster_wrapper .table_content');
            var scrollTop = rosterContainer.scrollTop - rosterContainer.offsetHeight;
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : scrollTop : " + scrollTop);
            rosterContainer.scrollTop = scrollTop;
            $scope.rosterPageNumber--;
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showPreviousPage : end");
    };

    $scope.showNextPage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : start");

        if ($scope.roster.length > ($scope.rosterPageNumber * 11)) {
            var rosterContainer = document.querySelector('.roster_wrapper .table_content');
            var scrollTop = rosterContainer.scrollTop + rosterContainer.offsetHeight;
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : scrollTop : " + scrollTop);
            rosterContainer.scrollTop = scrollTop;
            $scope.rosterPageNumber++;
        }

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showNextPage : end");
    };

    $scope.roster = [];

    $scope.getAllAPLPlayers = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".getAllAPLPlayers : start");
        SquadSelectionFactory.getAllAPLPlayers().then(function(roster) {
            for (var i = 0; i < roster.length; i++) {
                if (!$utils.isPlayerInCurrentTeam($scope.currentTeam, roster[i])) {
                    $scope.roster.push(roster[i]);
                }
            }

            console.dir($scope.currentTeam);
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
            $scope.teamProfile.transfersLeft = $scope.teamProfile.transfersLeft - 1;

            $utils.removePlayerFromTeamById($scope.roster, playerId);

            $scope.checkConditions();
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : end");
    };

    $scope.removePlayerFromSquad = function() {

    };

    $scope.saveFilter = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveFilter : start");
        $scope.hideFilterModal();
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveFilter : end");
    };

    $scope.saveSquad = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveSquad : start");
        // $state.go('profile');

        SquadSelectionFactory.insertPlayerSelection($scope.currentTeam, $scope.currentUser).then(function() {
            alert("success");

        }, function() {
            alert("failure");
        });



        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveSquad : end");
    };

    $scope.checkConditions = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".checkConditions : start");

        for (var condition in AFL.PLAYER_SELECTION_CONDITIONS) {
            if (AFL.PLAYER_SELECTION_CONDITIONS.hasOwnProperty(condition) && AFL.PLAYER_SELECTION_CONDITIONS[condition].isToBeChecked) {
                $scope.conditions[condition] = AFL.PLAYER_SELECTION_CONDITIONS[condition].checkCondition($scope);
            }
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".checkConditions : end");
    };
}]);
