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

        $scope.currentTeam = JSON.parse($stateParams.currentTeam);
        $scope.getAllAPLPlayers();

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : end");

        $scope.checkConditions($scope.currentTeam);

        global = $scope;
    });

    $scope.initializePage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".initializePage : start");
        $scope.filterObject = {};

        $scope.currentTeam = [];
        $scope.filteredRoster = [];
        $scope.fantasyTeams = [];
        $scope.playerTypes = [];

        $scope.fillerHeight = "0px";

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

            $scope.conditionNames.push(condition);
        }

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

        if ($scope.filteredRoster.length > ($scope.rosterPageNumber * 11)) {
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
                    $scope.filteredRoster.push(roster[i]);
                }
            }

            var fillerHeight = (11 - (roster.length % 11)) * 30;
            $scope.fillerHeight = fillerHeight + 'px';

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
        if (($scope.currentTeam.length > 11) && !($utils.getPlayerFromTeamById($scope.currentTeam, playerId))) {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : Player already present in the current squad");
            $utils.showAlert("Error", "Your current squad already has 11 players.")
        } else {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : Player is present in the current squad");
            var player = $utils.getPlayerFromTeamById($scope.filteredRoster, playerId);
            console.log(playerId);
            $scope.currentTeam.push(player);
            $utils.removePlayerFromTeamById($scope.filteredRoster, playerId);
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".addPlayerToSquad : end");
    };

    $scope.removePlayerFromSquad = function() {

    };

    $scope.saveFilter = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveFilter : start");
        $scope.hideFilterModal();
        console.log($scope.filterObject.teamId + " " + $scope.filterObject.playerTypeId);
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
                $scope.conditions[condition] = AFL.PLAYER_SELECTION_CONDITIONS[condition].checkCondition($scope.currentTeam);
            }
        }
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".checkConditions : end");
    };
}]);
