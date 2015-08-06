controllers.controller(AFL.PAGES.PROFILE.controller, ['$stateParams', '$scope', '$rootScope', '$utils', '$state', '$log', AFL.PAGES.PROFILE.factory, function($stateParams, $scope, $rootScope, $utils, $state, $log, ProfileFactory) {
    $scope.teamProfile = {};
    $scope.currentTeam = [];
    $scope.recentMatches = [];

    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : start");
        var teamId = $stateParams.teamId;

        if (teamId == AFL.NON_EXISTENT) {
        	$log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : User team does not exist");
            $scope.userTeamExists = false;
        } else {
        	$log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : User team exists with id: " + teamId);
            $scope.userTeamExists = true;

            if ($rootScope.currentUser && $rootScope.currentUser.isLoggedIn) {
                $scope.getUserTeamProfile(teamId);
                $scope.getUserFantasyTeam(teamId);
            }
        }
        $log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : end");
    });

    $scope.getUserTeamProfile = function(teamId) {
        $utils.showSpinner();
        ProfileFactory.getUserTeamProfile(teamId).then(function(teamProfile) {
            $scope.teamProfile = teamProfile;
            $utils.hideSpinner();
        }, function() {
            $utils.hideSpinner();
            $utils.showAlert("Sorry!!!", "User Profile could not be retrieved, Please try again");
        });
    };

    $scope.getUserFantasyTeam = function(teamId) {
        $utils.showSpinner();
        ProfileFactory.getUserFantasyTeam(teamId).then(function(currentTeam) {
            $scope.currentTeam = currentTeam;
            globa = $scope.currentTeam;
            $utils.hideSpinner();
        }, function() {
            $utils.hideSpinner();
            $utils.showAlert("Sorry!!!", "User Team could not be retrieved, Please try again");
        });
    }

    $scope.getRecentUserHistory = function() {
        ProfileFactory.getRecentUserHistory().then(function(response) {

        }, function() {

        });
    };

    $scope.getStarted = function() {
        $log.debug(AFL.PAGES.PROFILE.controller + ".getStarted : start");
        $state.go(AFL.PAGES.CREATE_TEAM.name);
        $log.debug(AFL.PAGES.PROFILE.controller + ".getStarted : end");
    };

    $scope.loadSquadSelection = function() {
        $log.debug(AFL.PAGES.PROFILE.controller + ".loadSquadSelection : start");
        $state.go(AFL.PAGES.SQUAD_SELECTION.name);
        $log.debug(AFL.PAGES.PROFILE.controller + ".loadSquadSelection : end");
    };

    $scope.editSquad = function() {
        $log.debug(AFL.PAGES.PROFILE.controller + ".editSquad : start");

        $state.go(AFL.PAGES.SQUAD_SELECTION.name, {
            currentTeam : JSON.stringify($scope.currentTeam),
            teamProfile : JSON.stringify($scope.teamProfile)
        });

        $log.debug(AFL.PAGES.PROFILE.controller + ".editSquad : end");
    };
}]);
