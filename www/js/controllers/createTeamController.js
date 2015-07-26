controllers.controller('CreateTeamController', ['$scope', '$state', '$log', '$ionicSideMenuDelegate', function($scope, $state, $log, $ionicSideMenuDelegate) {

	$scope.createTeamFormSubmit = function(createTeamForm) {
		$log.debug('CreateTeamController.createTeamForm start');
		$state.go('squad_selection');
		// $ionicSideMenuDelegate.toggleLeft();
		$log.debug('CreateTeamController.createTeamForm end');
	}
}]);