controllers.controller(AFL.PAGES.PROFILE.controller, ['$scope', '$rootScope', '$utils', '$state', '$log', AFL.PAGES.PROFILE.factory, function($scope, $rootScope, $utils, $state, $log, ProfileFactory) {

	$scope.userProfile = {};
	$scope.$on('$ionicView.beforeEnter', function() {
		$log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : start");

		if($rootScope.currentUser && $rootScope.currentUser.isLoggedIn) {
			$scope.getUserProfile();
		}

		$log.debug(AFL.PAGES.PROFILE.controller + ".beforeEnter : end");
	});

	$scope.getUserProfile = function() {
		$utils.showSpinner();
		ProfileFactory.getUserProfile($rootScope.currentUser.userId).then(function(userProfile) {
			$scope.userProfile = userProfile;

			if(userProfile.teams.length > 0) {
				$scope.getRecentUserHistory();
			}
			$utils.hideSpinner();
		}, function() {
			$utils.hideSpinner();
			$utils.showAlert("Sorry!!!", "User Profile could not be retrieved, Please try again");
		});
	};

	$scope.getRecentUserHistory = function() {
		ProfileFactory.getRecentUserHistory().then(function(response) {

		}, function() {

		});
	};

	$scope.getStarted = function() {
		$log.debug(AFL.PAGES.PROFILE.controller + ".getStarted : start");
		$state.go(AFL.PAGES.CREATE_TEAM.name);
		$log.debug(AFL.PAGES.PROFILE.controller + ".getStarted : end");
	};

	$scope.loadSquadSelection = function() {
		$log.debug(AFL.PAGES.PROFILE.controller + ".loadSquadSelection : start");
		$state.go(AFL.PAGES.SQUAD_SELECTION.name);
		$log.debug(AFL.PAGES.PROFILE.controller + ".loadSquadSelection : end");
	};
}]);