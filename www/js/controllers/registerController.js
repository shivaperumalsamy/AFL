controllers.controller(AFL.PAGES.REGISTER.controller, ['$scope', '$rootScope', '$log', AFL.PAGES.REGISTER.factory, function($scope, $rootScope, $log, RegisterFactory) {

	$scope.registerFormObject = {
		username : '',
		password : '',
		confirmPassword : ''
	}
	$scope.$on('$ionicView.beforeEnter', function() {
		$log.debug('RegisterController.beforeEnter start');

		$log.debug('RegisterController.beforeEnter end');
	});

	$scope.registerFormSubmit = function(registerForm) {
		$log.debug('RegisterController.registerFormSubmit start');


		if(registerForm.$valid && ($scope.registerFormObject.password === $scope.registerFormObject.confirmPassword)) {
			RegisterFactory.registerFormSubmit($scope.registerFormObject);
		}

		$log.debug('RegisterController.registerFormSubmit end');
	};

}]);