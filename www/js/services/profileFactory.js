services.factory(AFL.PAGES.PROFILE.factory, ['$q', '$rootScope', '$utils', '$log', function($q, $rootScope, $utils, $log) {
    return {
        getUserTeamProfile: function(teamId) {
            $log.debug(AFL.PAGES.PROFILE.factory + ".getUserProfile : start");

            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getUserTeamProfile, {
                teamId: teamId
            }).then(function(response) {
                if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {
                    var teamProfile = response.data.profileDetails;
                    deferred.resolve(teamProfile);
                } else {
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
        getUserFantasyTeam: function(teamId) {
            $log.debug(AFL.PAGES.PROFILE.factory + ".getUserFantasyTeam : start");

            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getUserFantasyTeam, {
                teamId: teamId
            }).then(function(response) {
                if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {
                    var currentSquad = response.teamDetails;
                    deferred.resolve(currentSquad);
                } else {
                    $log.debug(response.message);
                    deferred.reject();
                }
            }, function() {
                $log.debug(AFL.PAGES.PROFILE.factory + ".getUserFantasyTeam : Error while contacting BACK_END");
                deferred.reject();
            });

            $log.debug(AFL.PAGES.PROFILE.factory + ".getUserFantasyTeam : end");
            return deferred.promise;
        },
        getRecentUserHistory: function(userId) {
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
