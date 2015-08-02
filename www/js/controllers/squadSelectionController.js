controllers.controller(AFL.PAGES.SQUAD_SELECTION.controller, ['$scope', '$rootScope', '$stateParams', '$ionicModal', '$state', '$utils', '$log', AFL.PAGES.SQUAD_SELECTION.factory, function($scope, $rootScope, $stateParams, $ionicModal, $state, $utils, $log, SquadSelectionFactory) {

    $scope.filterObject = {};

    $scope.currentTeam = [];
    $scope.roster = [];
    $scope.filteredRoster = [];
    $scope.fantasyTeams = [];
    $scope.playerTypes = [];

    $scope.conditions = {
    };

    $ionicModal.fromTemplateUrl('../templates/modals/filter_modal.html', {
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
        $utils.showSpinner();

        $scope.getAllAPLTeams();
    });

    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : start");
        console.dir($stateParams);
        var currentTeam = $stateParams.currentTeam;
        console.log("CURRENT TEAM");
        console.dir(currentTeam);
        $scope.rosterPageNumber = 1;
        
        // if(action === AFL.CREATE) {
        //    $scope.squadSelectionObject.teamName = $stateParams.teamName
        // }
        
        $scope.getAllAPLPlayers();

        $scope.filterObject.teamId = -1;
        $scope.filterObject.playerType = -1;
        $scope.filterObject.impactPlayer = {
            isChecked : false,
            text : "Impact Player"
        };

        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".beforeEnter : end");
    })

    $scope.showPreviousPage = function() {
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".showPreviousPage : start");
        if($scope.rosterPageNumber != 1) {
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

        if($scope.filteredRoster.length > ($scope.rosterPageNumber * 11)) {
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
        SquadSelectionFactory.getAllAPLPlayers().then(function(players) {
            $scope.roster = players;
            $scope.filteredRoster = players;

            var filler = angular.element(document.querySelector('.roster_wrapper .filler'));
            var fillerHeight = (11 - (players.length % 11)) * 30;
            filler.css('height', fillerHeight + 'px')
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

    $scope.addPlayerToSquad = function() {
        alert('player added to squad');
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
		$state.go('profile');
        $log.debug(AFL.PAGES.SQUAD_SELECTION.controller + ".saveSquad : end");
	}
}]);
