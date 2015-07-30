controllers.controller(AFL.PAGES.PROFILE.controller, ['$scope', '$state', '$log', AFL.PAGES.PROFILE.factory, function($scope, $state, $log, ProfileFactory) {

	$scope.getStarted = function() {
		$log.debug('ProfileController.getStarted start');
		$state.go('create_team');
		$log.debug('ProfileController.getStarted end');
	}

	$scope.loadSquadSelection = function() {
		$log.debug('ProfileController.loadSquadSelection start');
		$state.go('squad_selection');
		$log.debug('ProfileController.loadSquadSelection end');
	}
}]);