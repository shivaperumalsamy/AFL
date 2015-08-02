services.factory(AFL.PAGES.LOGIN.factory, ['$q', '$utils', '$log', function($q, $utils, $log) {
    return {
        login: function(loginFormObject) {
            $log.debug(AFL.PAGES.LOGIN.factory + ".login : start");

            var deferred = $q.defer();

            var requestData = {
                email: loginFormObject.username,
                password: loginFormObject.password
            };

            $utils.callBackend(AFL.BACK_END.RequestType.POST, AFL.BACK_END.MethodNames.loginUser, requestData).then(function(response) {

                //response = mockLoginResponse;

                if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {
                    var user = response.data;
                    if (!user.teamsOwned[0].teamId) {
                        $log.debug(AFL.PAGES.LOGIN.factory + ".login : User does not have a team");
                        user.teamsOwned = [{
                            teamId: AFL.NON_EXISTENT,
                            teamName: ""
                        }];
                    }
                    deferred.resolve({
                        loginSuccess: true,
                        user: user
                    });
                } else {
                    $log.debug(response.message);
                    deferred.resolve({
                        loginSuccess: false
                    });
                }
            },
            function() {
                $log.debug(AFL.PAGES.LOGIN.factory + ".login : Error while contacting BACK_END");
                deferred.reject();
            });

            $log.debug(AFL.PAGES.LOGIN.factory + ".login : end");
            return deferred.promise;
        }
    };
}]);


mockLoginResponse = {
    "data": {
        "userId": 1250,
        "userName": "d.b",
        "teamsOwned": [{
            "teamId": null,
            "teamName": null
        }]
    },
    "type": "success",
    "message": "login success"
};
