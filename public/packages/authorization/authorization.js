myApp = angular.module('eightApp');
myApp.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
});
myApp.factory("AuthService", function($http,Session) {
				var authService = {};
authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
							console.log('what is response on login through passport?');
							console.log(res);
        Session.create(res.data.sessionID, res.data.user._id,
                 				"loggedInUser");
        return res.data.user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});

myApp.controller('authorizationController', ['$scope', '$http','$rootScope', '$location', '$state', 'AuthService','AUTH_EVENTS', 'USER_ROLES', function($scope, $http, $rootScope, $location, $state, AuthService, AUTH_EVENTS, USER_ROLES){
				
	$scope.credentials = {
    email: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			 console.log('passed');
       $scope.setCurrentUser(user);
				$state.go('loggedin');
		}, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });	
		}

}]);

myApp.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
})
