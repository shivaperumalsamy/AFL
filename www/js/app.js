// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module(AFL.appName, ['ionic', AFL.moduleNames.CONTROLLERS, AFL.moduleNames.SERVICES, AFL.moduleNames.DIRECTIVES, AFL.moduleNames.FILTERS, AFL.moduleNames.MESSAGES, AFL.moduleNames.UTILS])

.run(['$ionicPlatform', '$rootScope', '$ionicSideMenuDelegate', '$ionicHistory', '$ionicConfig', 'AFL_MESSAGES', '$utils', '$log', function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, $ionicHistory, $ionicConfig, AFL_MESSAGES, $utils, $log) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            
            $ionicConfig.views.swipeBackEnabled(false);

            $rootScope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };

            $rootScope.goBack = function() {
                $ionicHistory.goBack();
            };
            $rootScope.AFL_MESSAGES = AFL_MESSAGES;
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$logProvider', function($stateProvider, $urlRouterProvider, $logProvider) {

        $stateProvider
            .state(AFL.PAGES.LOGIN.name, {
                url: AFL.PAGES.LOGIN.url,
                templateUrl: AFL.PAGES.LOGIN.templateUrl,
                controller: AFL.PAGES.LOGIN.controller
            })
            .state(AFL.PAGES.CREATE_TEAM.name, {
                url: AFL.PAGES.CREATE_TEAM.url,
                templateUrl: AFL.PAGES.CREATE_TEAM.templateUrl,
                controller: AFL.PAGES.CREATE_TEAM.controller
            }).state(AFL.PAGES.LEADER_BOARD.name, {
                url: AFL.PAGES.LEADER_BOARD.url,
                templateUrl: AFL.PAGES.LEADER_BOARD.templateUrl,
                controller: AFL.PAGES.LEADER_BOARD.controller
            })
            .state(AFL.PAGES.PROFILE.name, {
                url: AFL.PAGES.PROFILE.url,
                templateUrl: AFL.PAGES.PROFILE.templateUrl,
                controller: AFL.PAGES.PROFILE.controller
            })
            .state(AFL.PAGES.SQUAD_SELECTION.name, {
                url: AFL.PAGES.SQUAD_SELECTION.url,
                templateUrl: AFL.PAGES.SQUAD_SELECTION.templateUrl,
                controller: AFL.PAGES.SQUAD_SELECTION.controller
            })
            .state(AFL.PAGES.REGISTER.name, {
                url: AFL.PAGES.REGISTER.url,
                templateUrl: AFL.PAGES.REGISTER.templateUrl,
                controller: AFL.PAGES.REGISTER.controller
            });


        $urlRouterProvider.otherwise('/login');

        $logProvider.debugEnabled(true);
    }]);
