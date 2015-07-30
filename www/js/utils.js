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
                        $log.debug("$utils.callBackend start");
                        var deferred = $q.defer();

                        var params = requestData ? requestData : {};

                        if (requestType === "GET") {
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

                            $http.post(AFL.BACK_END.rootUrl + methodName, params).success(function(response) {
                                deferred.resolve(response);
                            }).error(function(error) {
                                $log.error(error);
                                deferred.reject();
                            });
                        }

                        $log.debug("$utils.callBackend end");
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
                    }
                };
            }
        ]
    };
}]);
