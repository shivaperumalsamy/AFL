services.factory(AFL.PAGES.REGISTER.factory, ['$q', '$utils', '$log', function($q, $utils, $log) {
	return  {
		registerFormSubmit : function(user) {
			$log.debug(AFL.PAGES.REGISTER.factory + ".getFantasyLeaderBoard : start");
			var deferred = $q.defer();
			var requestData = {
				email : user.useremail,
				password : user.password
			};

			$utils.callBackend(AFL.BACK_END.RequestType.POST, AFL.BACK_END.MethodNames.createFantasyUser, requestData).then(function(response) {
					if(response.type === AFL.BACK_END.ResponseType.SUCCESS) {
						deferred.resolve(true);
					}
					else {
						deferred.reject();
					}
				},
				function() {
					$log.debug(AFL.PAGES.REGISTER.factory + ".getFantasyLeaderBoard : Error while contacting BACK_END");
					deferred.reject();
				});

			$log.debug(AFL.PAGES.REGISTER.factory + ".getFantasyLeaderBoard : end");
			return deferred.promise;
		}
	};
}]);