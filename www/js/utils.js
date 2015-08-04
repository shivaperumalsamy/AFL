utils.provider('$utils', [function() {
    return {
        $get: ['$q', '$http', '$ionicPopup', 
            '$ionicLoading', '$log',
            function($q, $http, $ionicPopup, $ionicLoading, $log) {
                return {
                	localStorage: {
                        setItem: function (key, value) {
                            window.localStorage.setItem(key, value);
                        },
                        getItem: function (key) {
                            return window.localStorage.getItem(key);
                        },
                        setObject: function (key, value) {
                            window.localStorage.setItem(key, JSON.stringify(value));
                        },
                        getObject: function (key) {
                            return JSON.parse(window.localStorage.getItem(key));
                        }
                    },
                    callBackend: function(requestType, methodName, requestData) {
                        $log.debug("$utils.callBackend : start");
                        var deferred = $q.defer();

                        var params = requestData ? requestData : {};

                        if (requestType === "GET") {
                            $log.debug("$utils.callBackend GET with data : " + params);
                            $http.get(AFL.BACK_END.rootURL + methodName, {
                                params : params
                            }).success(function(response) {
                                $log.debug(response);
                                deferred.resolve(response);
                            }).error(function(error) {
                                $log.error(error);
                                deferred.reject();
                            });
                        } else if (requestType === "POST") {
                            $log.debug("$utils.callBackend POST with data : " + params);
                            $http.post(AFL.BACK_END.rootURL + methodName, params).success(function(response) {
                                deferred.resolve(response);
                            }).error(function(error) {
                                $log.error(error);
                                deferred.reject();
                            });
                        }

                        $log.debug("$utils.callBackend : end");
                        return deferred.promise;
                    },
                    showAlert: function(title, template) {
                        $ionicPopup.alert({
                            title: title,
                            template: template
                        });
                    },
                    showSpinner: function() {
                        $ionicLoading.show({
                            template: '<ion-spinner icon="ripple"/>'
                        });
                    },
                    hideSpinner: function() {
                    	$ionicLoading.hide();
                    },
                    isPlayerInFilteredTeam : function(player, teamId) {
                        return (teamId == AFL.NON_EXISTENT) ? true : (player.playerAplTeamId == teamId);
                    },
                    isPlayerOfFilteredType : function(player, playerTypeId) {
                        return (playerTypeId == AFL.NON_EXISTENT) ? true : (player.playerTypeId == playerTypeId);
                    },
                    isImpactPlayer : function(player, impactPlayer) {
                        return !impactPlayer ? true : (player.isImpact ? true : false);
                    },
                    isPlayerInCurrentTeam : function(currentTeam, player) {
                        return this.getPlayerFromTeamById(currentTeam, player.playerId) ? true : false;
                    },
                    getPlayerFromTeamById : function(team, playerId) {
                        var player = undefined;
                        for(var i = 0; i < team.length; i++) {
                            if(team[i].playerId == playerId) {
                                player = team[i];
                            }
                        }
                        return player;
                    },
                    removePlayerFromTeamById : function(team, playerId) {
                        for(var i = 0; i < team.length; i++) {
                            if(team[i].playerId == playerId) {
                                    team.splice(i, 1);
                                    console.log("splicing");
                            }
                        }
                    }
                };
            }
        ]
    };
}]);
