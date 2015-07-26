controllers.controller('ProfileController', ['$scope', '$state', '$log', function($scope, $state, $log) {

	$scope.getStarted = function() {
		$log.debug('ProfileController.getStarted start');
		$state.go('create_team');
		$log.debug('ProfileController.getStarted end');
	}
}]);