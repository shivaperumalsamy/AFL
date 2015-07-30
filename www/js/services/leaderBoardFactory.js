services.factory(AFL.PAGES.LEADER_BOARD.factory, ['$q', '$utils', '$log', function($q, $utils, $log) {
	return {
		getFantasyLeaderBoard : function() {
			$log.debug("LeaderBoardFactory.getFantasyLeaderBoard start")
			var deferred = $q.defer(); 
			$utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getFantasyLeaderBoard).then(function(response) {
				if(response.type === AFL.BACK_END.ResponseType.SUCCESS) {
					//var leaderBoard = response.data.leaderboard.sort(function(a, b) {
					//	return a.points < b.points;
					//});
					deferred.resolve(response.data.leaderboard);
				}
				else {
					$log.debug(response.message);
					deferred.reject();
				}
			},
			function() {
				$log.debug("Error while contacting BACK_END");
				deferred.reject();
			});

			$log.debug("LeaderBoardFactory.getFantasyLeaderBoard end");
			return deferred.promise;
		}
	}
}]);