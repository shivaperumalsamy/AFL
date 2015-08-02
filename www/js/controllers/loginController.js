controllers.controller(AFL.PAGES.LOGIN.controller, ['$scope', '$state', '$rootScope', '$utils', '$ionicHistory', '$log', AFL.PAGES.LOGIN.factory, function($scope, $state, $rootScope, $utils, $ionicHistory, $log, LoginFactory) {
	$scope.loginFormObject = {
		username : '',
		password : ''
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$log.debug('LoginController.beforeEnter start');


		$rootScope.currentUser = $utils.localStorage.getObject(AFL.CURRENT_USER);

        if ($rootScope.currentUser === null) {
            $rootScope.currentUser = {
                isLoggedIn : false
            };
            $utils.localStorage.setObject(AFL.CURRENT_USER, $rootScope.currentUser);
        } 

		if ($rootScope.currentUser && $rootScope.currentUser.isLoggedIn) {
			$log.debug("LoginController.beforeEnter: User is already logged in");
			$ionicHistory.clearHistory();
			$state.go(AFL.PAGES.PROFILE.name);
		}
		
		$log.debug('LoginController.beforeEnter end');
	});

	$scope.loginFormSubmit = function(loginForm) {
		$log.debug("LoginController.loginFormSubmit start");

		if(loginForm.$valid) {
			$utils.showSpinner();
			LoginFactory.login($scope.loginFormObject).then(function(response) {
				if(response.loginSuccess) {
					$rootScope.currentUser.isLoggedIn = true;
					$rootScope.currentUser.userId = response.user.userId;
					$rootScope.currentUser.username = response.user.userName;
            
					$utils.localStorage.setObject(AFL.CURRENT_USER, $rootScope.currentUser);
					$utils.hideSpinner();
					
					$state.go(AFL.PAGES.PROFILE.name, {
						teamId : response.user.teamsOwned[0].teamId
					});
				}
				else {
					$utils.hideSpinner();
					$utils.showAlert("Sorry!!", "User Credentials do not match. Try again.");
				}
			}, function(error) {
				$utils.hideSpinner();
				$utils.showAlert("Sorry!!", "Some error occurred please try again.");
			});
		}
		
		$log.debug("LoginController.loginFormSubmit end");
	}
}]);