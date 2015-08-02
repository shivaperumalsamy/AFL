services.factory(AFL.PAGES.SQUAD_SELECTION.factory, ['$q', '$utils', '$log', function ($q, $utils, $log) {
    return {
        getAllAPLPlayers: function () {
            $log.debug(AFL.PAGES.SQUAD_SELECTION.factory + ".getAllAPLPlayers : start");

            var deferred = $q.defer();

            $utils.callBackend(AFL.BACK_END.RequestType.GET, AFL.BACK_END.MethodNames.getAllAPLPlayers).then(function (response) {
                    if (response.type === AFL.BACK_END.ResponseType.SUCCESS) {
                        var players = response.data.players;

                        players.forEach(function (element, index, array) {
                            element.playerType = AFL.PLAYER_TYPE_CLASSES[element.player];
                            //element.teamName = AFL.TEAM_CLASSES[element.teamId];
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
        }
    };
}]);


players = [{
    "playerId": 11,
    "playerName": "Mohit",
    "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
    "typeId": 3,
    "price": 8,
    "isImapact": 0,
    "totalPoints": 0
}, {
    "playerId": 10,
    "playerName": "veera",
    "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
    "typeId": 1,
    "price": 12,
    "isImapact": 0,
    "totalPoints": 100
}, {
    "playerId": 7,
    "playerName": "Dobby",
    "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
    "typeId": 2,
    "price": 6,
    "isImapact": 0,
    "totalPoints": 200
}, {
    "playerId": 6,
    "playerName": "Viki",
    "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
    "typeId": 3,
    "price": 6,
    "isImapact": 1,
    "totalPoints": 250
}, {
    "playerId": 5,
    "playerName": "Yash",
    "imageUrl": "https://scontent-sin1-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/11084263_1079930985355198_3510705785552286062_n.jpg?oh=b0295e748695ef726c1b87b70a04038f&oe=564FE326",
    "typeId": 3,
    "price": 6,
    "isImapact": 1,
    "totalPoints": 200
}, {
    "playerId": 4,
    "playerName": "Maddy",
    "imageUrl": "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/10570430_1020273511350648_9024380944543750691_n.jpg?oh=f00e1859b6f2ecd392db67eed1b63583&oe=5614EEE6&__gda__=1443907295_31d23bcde6c3c00eda617e76055f431b",
    "typeId": 1,
    "price": 2,
    "isImapact": 0,
    "totalPoints": 100
}, {
    "playerId": 3,
    "playerName": "DB",
    "imageUrl": "https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xat1/v/t1.0-9/11659331_10207256747842996_1917353026677247525_n.jpg?oh=34bdad031e171590b996550a7ac3a6fc&oe=561CDFD9&__gda__=1447413275_5ae95686047be0bbe3e97be68a4cd248",
    "typeId": 3,
    "price": 3,
    "isImapact": 0,
    "totalPoints": 100
}, {
    "playerId": 2,
    "playerName": "DK",
    "imageUrl": "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/10423296_972480539448832_194790171102481371_n.jpg?oh=9a64eb7a1c5753299c2fa993f0fc17fa&oe=564FB224&__gda__=1447492287_b9ea16f308d5bc925958877c62ae73b7",
    "typeId": 3,
    "price": 8,
    "isImapact": 1,
    "totalPoints": 300
},
    {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }
    , {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    },
    {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }, {
        "playerId": 1,
        "playerName": "Shiva",
        "imageUrl": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/11707490_10207195080338045_3255520577833974602_n.jpg?oh=c917aa270eff633244d75b60cd2e8b31&oe=56152AD1&__gda__=1447803096_ef82b29a05ded1e3d6d87124bd737448",
        "typeId": 3,
        "price": 5,
        "isImapact": 1,
        "totalPoints": 100
    }];