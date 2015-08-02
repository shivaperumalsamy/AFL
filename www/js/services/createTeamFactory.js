services.factory(AFL.PAGES.CREATE_TEAM.factory, ['$rootScope', '$q', '$utils', '$log', function($rootScope, $q, $utils, $log) {
    return {
        createFantasyTeam: function(createTeamFormObject) {
            $log.debug(AFL.PAGES.CREATE_TEAM.factory + ".createUserFantasyTeam : start");

            var deferred = $q.defer();

            var requestData = {
                userId: $rootScope.currentUser.userId,
                teamName: createTeamFormObject.teamname
            };

            $utils.callBackend(AFL.BACK_END.RequestType.POST, AFL.BACK_END.MethodNames.createFantasyTeam, requestData).then(function(response) {
                if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {

                    deferred.resolve({
                        teamCreated: true,
                        teamId: response.data.teamDetails.teamId
                    });
                } else {
                    deferred.resolve({
                        teamCreated: true
                    });
                }
            }, function(error) {
                $log.debug(AFL.PAGES.CREATE_TEAM.factory + ".getFantasyLeaderBoard : Error while contacting BACK_END");
                deferred.reject();
            });

            $log.debug(AFL.PAGES.CREATE_TEAM.factory + ".createUserFantasyTeam : end");
            return deferred.promise;
        }
    };
}]);
