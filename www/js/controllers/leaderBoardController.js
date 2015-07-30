controllers.controller(AFL.PAGES.LEADER_BOARD.controller, ['$scope', '$rootScope', '$utils', '$log', AFL.PAGES.LEADER_BOARD.factory, function($scope, $rootScope, $utils, $log, LeaderBoardFactory) {

	$scope.leaderBoard = [];

	$scope.$on('$ionicView.beforeEnter', function() {
		$log.debug("LeaderBoardController.beforeEnter start");

		$utils.showSpinner();
		LeaderBoardFactory.getFantasyLeaderBoard().then(function(leaderBoard) {
			$scope.leaderBoard = leaderBoard;
			$utils.hideSpinner();
		}, function(error) {
			$utils.hideSpinner();
			$utils.showAlert("Sorry!!!", "Leader Board Could not be retrieved, Please try again");
		});


		$log.debug("LeaderBoardController.beforeEnter end");
	});


}]);