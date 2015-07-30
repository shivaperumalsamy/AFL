controllers.controller(AFL.PAGES.SIDE_MENU.controller, ['$scope', '$rootScope', '$state', '$ionicHistory', '$utils', '$log', AFL.PAGES.SIDE_MENU.factory, function($scope, $rootScope, $state, $ionicHistory, $utils, $log, SideMenuFactory) {

	$scope.logout = function() {
		$log.debug(AFL.PAGES.SIDE_MENU.controller + ".logout : start");
		$rootScope.currentUser = {
			isLoggedIn : false
		};

		$utils.localStorage.setObject(AFL.CURRENT_USER, $rootScope.currentUser);
		$ionicHistory.clearHistory();

		$state.go(AFL.PAGES.LOGIN.name);
		$log.debug(AFL.PAGES.SIDE_MENU.controller + ".logout : User logged out successfully");

		$log.debug(AFL.PAGES.SIDE_MENU.controller + ".logout : end");
	};
}]);