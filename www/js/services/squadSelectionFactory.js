services.factory(AFL.PAGES.SQUAD_SELECTION.factory, ['$q', '$utils', '$log', function ($q, $utils, $log) {
    return {
        getAllAPLPlayers: function () {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.factory + ".getAllAPLPlayers : start");

            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getAllAPLPlayers).then(function (response) {
                    if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {
                        var players = response.data.players;

                        players.forEach(function (element, index, array) {
                            element.playerType = AFL.PLAYER_TYPE_CLASSES[element.playerTypeId];
                            element.teamName = AFL.TEAM_CLASSES[element.playerAplTeamId];
                            element.isCaptain = 0;
                        });
                        deferred.resolve(players);
                    } else {
                        $log.debug(response.message);
                        deferred.reject();
                    }
                    deferred.resolve(players);
                },
                function () {
                    $log.debug("Error while contacting BACK_END");
                    deferred.reject();
                });


            $log.debug(AFL.PAGES.SQUAD_SELECTION.factory + ".getAllAPLPlayers : end");
            return deferred.promise;
        },
        getCurrentSquad: function () {

        },
        getAllAPLTeams: function () {
            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getAllAPLTeams).then(function (response) {
                    deferred.resolve(response.data.teams);
                },
                function () {
                    $log.debug("Error while contacting BACK_END");
                    deferred.reject();
                });
            return deferred.promise;
        },
        getAllPlayerTypes: function () {
            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getAllPlayerTypes).then(function (response) {
                    deferred.resolve(response.data.playerTypes);
                },
                function () {
                    $log.debug("Error while contacting BACK_END");
                    deferred.reject();
                });
            return deferred.promise;
        },
        insertPlayerSelection : function(currentTeam, currentUser) {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.factory + ".insertPlayerSelection : start");

            var deferred = $q.defer();

            var players = [];

            for(var i = 0; i < currentTeam.length; i++) {
                var currentPlayer = {};
                currentPlayer.playerId = currentTeam[i].playerId;
                currentPlayer.isCaptain = currentTeam[i].isCaptain;

                players.push(currentPlayer);
            }
            var requestData = {
                teamId : currentUser.teamId,
                userId : currentUser.userId,
                players : JSON.stringify(players)
            };

            console.log('response');
            console.dir(requestData);
            deferred.resolve();
            $utils.callBackend(AFL.BACK_END.RequestType.POST, AFL.BACK_END.MethodNames.insertPlayerSelection, requestData).then(function(response) {
                console.dir(response);
                deferred.resolve();
            },
            function() {
                $log.debug("Error while contacting BACK_END");
                deferred.reject();
            });

            return deferred.promise;

            $log.debug(AFL.PAGES.SQUAD_SELECTION.factory + ".insertPlayerSelection : end");
        }
    };
}]);