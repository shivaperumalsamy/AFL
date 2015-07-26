controllers.controller('LoginController', ['$scope', '$state', '$log', function($scope, $state, $log) {
	$scope.loginFormObject = {
		username : '',
		password : ''
	};

	$scope.loginFormSubmit = function(loginForm) {
		$log.debug("LoginController.loginFormSubmit start");


		$state.go('profile');
		$log.debug("LoginController.loginFormSubmit end");
	}
}]);