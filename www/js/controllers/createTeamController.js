controllers.controller(AFL.PAGES.CREATE_TEAM.controller, ['$scope', '$rootScope', '$state', '$ionicSideMenuDelegate', '$utils', '$log', AFL.PAGES.CREATE_TEAM.factory, function($scope, $rootScope, $state, $ionicSideMenuDelegate, $utils, $log, CreateTeamFactory) {

    $scope.createTeamFormObject = {
        teamname: ''
    };


    $scope.createTeamFormSubmit = function(createTeamForm) {
        $log.debug('CreateTeamController.createTeamForm start');

        if (createTeamForm.$valid) {
            $utils.showSpinner();
            CreateTeamFactory.createFantasyTeam($scope.createTeamFormObject).then(function(response) {
                $utils.hideSpinner();
                if (response.teamCreated) {
                    $utils.showAlert("Success", "Team Created successfully.");
                    $rootScope.currentUser.teamId = response.teamId;

                    $utils.localStorage.setObject(AFL.CURRENT_USER, $rootScope.currentUser);
                    $state.go(AFL.PAGES.PROFILE.name, {
                        teamId : response.teamId
                    });
                } else {
                	$utils.showAlert("Sorry", "Team with the same name already exists.");
                }
            }, function() {
                $utils.showAlert("Error", "Some error occurred, please try again.");
                $utils.hideSpinner();
            });

        }

        $log.debug('CreateTeamController.createTeamForm end');
    }
}]);
