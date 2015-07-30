services.factory(AFL.PAGES.LOGIN.factory, ['$q', '$utils', '$log', function($q, $utils, $log) {
	return {
		login : function(user) {
			$log.debug('LoginFactory.login start');

			var deferred = $q.defer();

			$utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getFantasyLeaderBoard).then(function(response) {
				if(response.type === AFL.BACK_END.ResponseType.SUCCESS) {
					if(user.password === "asdf") {
						deferred.resolve(true);
					}
					else {
						deferred.resolve(false);
					}
				}
				else {
					$log.debug(response.message);
					deferred.resolve(false);
				}
			},
			function() {
				$log.debug("Error while contacting BACK_END");
				deferred.reject();
			});

			$log.debug('LoginFacotry.login end');
			return deferred.promise;	
		}
	};
}]);