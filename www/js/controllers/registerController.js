controllers.controller(AFL.PAGES.REGISTER.controller, ['$scope', '$rootScope', '$state', '$utils', '$log', AFL.PAGES.REGISTER.factory, function($scope, $rootScope, $state, $utils, $log, RegisterFactory) {

	$scope.registerFormObject = {
		useremail : '',
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
			$utils.showSpinner();
			RegisterFactory.registerFormSubmit($scope.registerFormObject).then(function(response) {
				$utils.hideSpinner();
				if(response) {
					$utils.showAlert("Success", "The account has been created successfully. You will now be taken to the login page.");
					$state.go(AFL.PAGES.LOGIN.name);
				}
				else {
					$utils.showAlert("Error", "Username already exists. Choose a different one.");
				}

			}, function() {
				$utils.showAlert("Error", "Some error occurred. Please try again.");
				$utils.hideSpinner();
			});
		}

		$log.debug('RegisterController.registerFormSubmit end');
	};

}]);