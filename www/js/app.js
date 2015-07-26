// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module(AFL.appName, ['ionic', AFL.moduleNames.CONTROLLERS, AFL.moduleNames.SERVICES, AFL.moduleNames.DIRECTIVES, AFL.moduleNames.FILTERS])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url : '/login',
    templateUrl : 'templates/pages/login.html',
    controller : 'LoginController'
  })
  .state('create_team', {
    url : '/create_team', 
    templateUrl : 'templates/pages/create_team.html',
    controller : 'CreateTeamController'
  })
  .state('leader_board', {
    url : '/leader_board', 
    templateUrl : 'templates/pages/leader_board.html',
    controller : 'LeaderBoardController'
  })
  .state('profile', {
    url : '/profile', 
    templateUrl : 'templates/pages/profile.html',
    controller : 'ProfileController'
  })
  .state('squad_selection', {
    url : '/squad_selection', 
    templateUrl : 'templates/pages/squad_selection.html',
    controller : 'SquadSelectionController'
  });

  $urlRouterProvider.otherwise('/login')
}]);