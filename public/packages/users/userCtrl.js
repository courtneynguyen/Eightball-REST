var myApp = angular.module('eightApp');

myApp.factory('Users', ['$resource', function($resource){
	return $resource('/api/users/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    } 
		});
}]);

// var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){ 
// 				var deferred = $q.defer();
// 				$http.get('/loggedin').success(function(user){ // Authenticated
// 							 if (user !== '0') $timeout(deferred.resolve, 0); // Not Authenticated
// 							 else { $rootScope.message = 'You need to log in.'; $timeout(function(){deferred.reject();}, 0); $location.url('/login'); } });
				
 myApp.controller('userController',['$scope', '$stateParams', '$http', 'Users', function($scope, $stateParams, $http, Users){
	$scope.users=null;
	$scope.user = {};
	$scope.origin = "";

	$scope.getUsers = function(){
		$scope.users = Users.query();
	};
	$scope.submitUser = function(val){
		var id = $stateParams.id;

		if(id){
		console.log('received value ', val);
		Users.update({id: val._id}, val);
		$scope.origin = val;
		}
		else{
				var newUser = new Users(val);

		$scope.user = newUser.$save();		
		}
	};
	$scope.deleteUser = function(user){

			user.$delete(function(){
			});

			$scope.$digest();
			//		Users.$remove({id:id}, val);
			// $http.delete('/api/users/' + id).success(function(err, status, headers){
			// 				console.log('REMOVED');
			// });

	};
	$scope.getUser = function(){
		console.log($stateParams);
		var id= $stateParams.id;
		if(id !== undefined && id !== null){
		$scope.user = Users.get({id:id}); 
		$scope.origin = Users.get({id:id});
		}
		else{
			$scope.user = {};
			$scope.user.password = "Make User";
		}	
	};

 }]);


