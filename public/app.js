var eightApp = angular.module('eightApp', ['ui.router', 'ngResource']);

eightApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

eightApp.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  loggedInUser: 'loggedInUser',
  guest: 'guest'
})

eightApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, USER_ROLES) {
 
	$httpProvider.interceptors.push(function($q, $location){
		return function(promise){
			return promise.then(
							function(response){
											console.log('what is response');
											console.log(response);
											return response;
							},
							// error: check error status
							function(response){
								if(response.status === 401)
							$location.url('/login');
							return $q.reject(response);
							})
		}
	});
		
  $urlRouterProvider.otherwise("home");
  //
  // Now set up the states
  $stateProvider.
		 state('home', {
     url: '/',
			authenticate: false,
    	views:{
        'navigation':{
            templateUrl: 'views/nav_unauth.html'
        },
				'main':{
					templateUrl:'views/home.html' 
				}
			}
		 //,
		//	controller:'responseController'
		 })
	.
		state('loggedin', {
			url:'/home',
			 data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
			views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
				'main':{
					templateUrl:'views/home.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}
			}
		//,
		//	controller:'responseController'
		})
	.
		state('responses', {
				url:'/responses',

				data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
					views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
		'main':{
					templateUrl:'views/responses.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
		}
		})
		.
		state('history', {
				url:'/history',

			  data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
					views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
		'main':{
					templateUrl:'views/history.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
		}
		})
	.
		state('users', {
				url:'/users',
				data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},

					views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
				'main':{
					templateUrl:'views/users.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
		}
		})	
	.
		state('editUsers', {
						url:'/users/:id',
				 data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
					views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
				'main':{
					templateUrl:'views/user_form.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
		}
		})	
	.
		state('editResponse', {
						url:'/responses/:id/edit',
			data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
					views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
				'main':{
					templateUrl:'views/response_form.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
				}
		})	
	.
		state('createResponse', {
			url:'/responses/create',
			 data: {
      	authorizedRoles: [USER_ROLES.admin, USER_ROLES.loggedInUser]
    		},
		views:{
				'navigation':{
					templateUrl:'views/nav_unauth.html'
				},
				'main':{
					templateUrl:'views/response_form.html'
				},
				'sidebar':{
					templateUrl:'views/sidebar.html'
				}	
				},
				// resolve: {
				// 	loggedin: checkLoggedin
				// }
		
		})
	.
		state('register', {
			url:'/register',
			authenticate:false,
			views:{
				'navigation':{
					templateUrl: 'views/nav_unauth.html'
				},
				'main':{
					templateUrl: 'views/register.html'
				}
			}
		})
		.
state('login', {
			url:'/login',
			authenticate:false,
			views:{
				'navigation':{
					templateUrl: 'views/nav_unauth.html'
				},
				'main':{
					templateUrl: 'views/login.html'
				}
			}
     })
		.
state('logout', {
			url:'/',
			authenticate:true,
			views:{
				'navigation':{
					templateUrl: 'views/nav_unauth.html'
				},
				'main':{
					templateUrl: 'views/home.html'
				}
			}
     });
});

eightApp.run(function($rootScope,$state,AuthService){
 $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
});
