controllers.controller(AFL.PAGES.CREATE_TEAM.controller, ['$scope', '$state', '$log', '$ionicSideMenuDelegate', AFL.PAGES.CREATE_TEAM.factory, function($scope, $state, $log, $ionicSideMenuDelegate, CreateTeamFactory) {

	$scope.createTeamFormSubmit = function(createTeamForm) {
		$log.debug('CreateTeamController.createTeamForm start');
		$state.go('squad_selection');
		// $ionicSideMenuDelegate.toggleLeft();
		$log.debug('CreateTeamController.createTeamForm end');
	}
}]);