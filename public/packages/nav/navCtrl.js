
var myApp = angular.module('eightApp');


 myApp.controller('navigationController',['$scope', '$stateParams', '$http', '$q', '$location', '$rootScope',
								'$timeout', function($scope, $stateParams, $http, $q, $location, $rootScope,
											 $timeout){

	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){ 
				var deferred = $q.defer();
				$http.get('/loggedin').success(function(user){ // Authenticated
							 if (user !== '0') $timeout(deferred.resolve, 0); // Not Authenticated

							 else { 
											 $rootScope.message = 'You need to log in.'; 
											 $timeout(function(){deferred.reject();}, 0); 
											 $location.url('/login'); 
							 } 
				});
};

	$scope.navigations=null;
	$scope.navigation = {};

	$scope.isLoggedOn = function(){
		// var loggedIn = checkLoggedIn();

		if(!checkLoggedin){
			$scope.navigation = [{name:'Logout',state:'logout'}];
		}else{
			$scope.navigation = [{name:'Login', state:'login'},{name:'Sign up', state:'register'}];
		}
	}
	

 }]);


