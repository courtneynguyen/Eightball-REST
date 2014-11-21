var myApp = angular.module('eightApp');
				
myApp.factory('Responses', ['$resource', function($resource){
		return{
			random: $resource('/api/responses/random', {
				get: {method: 'GET', isArray:false}					
			}),
			allResponses: $resource('/api/responses', {
				query: {method: 'GET', isArray:true}				
			}),
			single: $resource('/api/responses/:id', {
				get: {method: 'GET', isArray:false}				
			 }),
			 updateResponse: $resource('/api/responses/:id', {
				id: '@id'},
				{
					update: {method: 'PUT'}
			 }),
			 createResponse: $resource('/api/responses', {
					create: {method:'POST'}
			 }),
			 deleteResponse: $resource('api/responses/:id', {
						id: '@_id'					 
				}, {
					del: { method: 'DELETE'}				
				})
			// response_create: $resource('/api/responses/:id', {
			// 				create: {method: 'POST', isArray:false}
			// })
		//})
}		
}]);

myApp.factory('ResponseList', function(){

				var raList = [];
				var responseCount = [];
			return{
				getHistory : function(){
						return raList;
				},
				addHistory : function(ra){
						raList.push(val);
				},
				addResponseCount : function(val){
								var found = false;
						for(var x = 0; x< responseCount.length; x++){
							if(responseCount[x].question === val){
								responseCount[x].count++;
								found = true;
							}
						}
						if(!found){
							responseCount.push({question: val, count: 1});
						}
				},
				getResponseCount : function(response){
					for(var x=0; x< responseCount.length; x++){
						if(responseCount[x].question === response)return responseCount[x].count;
					}
					return 0;
				}


}				
				
})
				
 myApp.controller('responseController',['$scope', '$stateParams', '$http', '$q', 'Responses', 'ResponseList', function($scope, $stateParams, $http,$q, Responses, ResponseList){
 	$scope.name = 'Courtney';
	$scope.magicEight = '';
	$scope.responses=null;

	$scope.rollDice = function(val){
		console.log('val',val);
		if(val !== undefined)
	  $scope.magicEight = Responses.random.get();
 		$scope.questErr = "Please enter something!";
	};
	$scope.getResponses = function(){
		Responses.allResponses.query(function(responses){
						var respList = responses;
						console.log(respList);
		for(var x = 0; x < respList.length; x++){
			var resp = ResponseList.getResponseCount(respList[x].question);
			respList[x].count = resp;
		}
		$scope.responses = respList;

		});
	};
	$scope.submitResponse = function(val){
		var id = $stateParams.id;

		if(id){
		console.log('received value ', val.question);
		Responses.updateResponse.update({id:id}, val);
		$scope.origin = val;
		// response_service.$save({_id: id, question: val.question}, function(err, response){
		// 	if(err)console.log(err);
		// 	else console.log(response);			
		// });
		}
		else{
			console.log('saving');
		$http.post('/api/responses/', val).success(function(err, status, headers){
console.log(headers);
		}).
	error(function(err, status, headers){
		console.log(err);
	});	
		}
	};
	$scope.deleteResponse = function(response){

			// response.$delete(function(){
			// 	console.log('REMOVED RESPONSE');				
			// });
			//
		Responses.deleteResponse.del({id: response._id}, response);
		// Responses.remove({id:response._id}, response);
		// 	 $http.delete('/api/responses/' + response._id).success(function(err, status, headers){
		// 	 				console.log('REMOVED');
		// 	 });

	};
	$scope.getResponse = function(){
		console.log($stateParams);
		var id= $stateParams.id;
		if(id !== undefined && id !== null){
		$scope.question = Responses.single.get({id:id}); 
		$scope.origin = Responses.single.get({id:id});
		}
		else{
			$scope.question = {};
			$scope.question.question = "Make Response";
		}	
	};

	$scope.getHistory = function(){
		$scope.history = ResponseList.getHistory();
	}

	$scope.addHistory = function(ra){
			ResponseList.addHistory(ra);
	}

	$scope.getCountFor = function(val){
		$scope.responseCount = ResponseList.getResponseCount(val);
	};

 }]);


