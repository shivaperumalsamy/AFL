controllers.controller(AFL.PAGES.CREATE_TEAM.controller, ['$scope', '$state', '$ionicSideMenuDelegate', '$utils', '$log', AFL.PAGES.CREATE_TEAM.factory, function($scope, $state, $ionicSideMenuDelegate, $utils, $log, CreateTeamFactory) {

    $scope.createTeamFormObject = {
        teamname: ''
    };


    $scope.createTeamFormSubmit = function(createTeamForm) {
        $log.debug('CreateTeamController.createTeamForm start');

        if (createTeamForm.$valid) {
            $utils.showSpinner();
            CreateTeamFactory.createFantasyTeam($scope.createTeamFormObject).then(function(response) {
                if (response.teamCreated) {
                    $utils.showAlert("Success", "Team Created successfully.");
                    $state.go(AFL.PAGES.PROFILE.name, {
                        teamId : response.teamId
                    });
                } else {
                	$utils.showAlert("Sorry", "Team with the same name already exists.");
                }
                $utils.hideSpinner();
            }, function() {
                $utils.showAlert("Error", "Some error occurred, please try again.");
                $utils.hideSpinner();
            });

        }

        $log.debug('CreateTeamController.createTeamForm end');
    }
}]);
