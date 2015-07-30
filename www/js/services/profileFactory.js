services.factory(AFL.PAGES.PROFILE.factory, ['$q', '$rootScope', '$utils', '$log', function($q, $rootScope, $utils, $log) {
	return {
		getUserProfile : function(userId) {
			$log.debug(AFL.PAGES.PROFILE.factory + ".getUserProfile : start");

			var deferred = $q.defer();

			$utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getUserProfile, {
				userId : userId,
				teamId : 34978
			}).then(function(response) {
				if(response.type === AFL.BACK_END.ResponseType.SUCCESS) {
					var userProfile = {};
					userProfile.userId = userId;
					userProfile.teams = [];

					//userProfile.transfersLeft = response.data.profileDetails.transactionLeft;
					//userProfile.totalPoints = response.data.profileDetails.totalPoints;
					//userProfile.rank = 1;
					//userProfile.teamId = 34978;
					//userProfile.teamName = response.data.profileDetails.teamName;

					deferred.resolve(userProfile);
				}
				else {
					$log.debug(response.message);
					deferred.reject();
				}
			}, function() {
				$log.debug(AFL.PAGES.PROFILE.factory + ".getUserProfile : Error while contacting BACK_END");
				deferred.reject();
			});

			$log.debug(AFL.PAGES.PROFILE.factory + ".getUserProfile : end");
			return deferred.promise;
		},
		getRecentUserHistory : function(userId) {
			$log.debug(AFL.PAGES.PROFILE.factory + ".getRecentUserHistory : start");

			var deferred = $q.defer();

			//$utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getFantasyUserProfile, {
			//	userId : userId,
			//	teamId : 34978
			//}).then(function(response) {
			//	$log.debug(response.message);
			//	deferred.reject();
			//}, function() {
			//	$log.debug(AFL.PAGES.PROFILE.factory + ".getRecentUserHistory : Error while contacting BACK_END");
			//	deferred.reject();
			//});

			$log.debug(AFL.PAGES.PROFILE.factory + ".getRecentUserHistory : end");
			return deferred.promise;

		}
	};
}]);