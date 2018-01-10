var App = angular.module("App",[]);

App.controller("AppCtrl",['$scope','$log','$http',function($scope,$log,$http){
	$log.info('AppCtrl loaded..');

	
	$scope.refresh = function(){
		//Receive data from node server 
		$http.get('/contactList').success(function(data){
			$log.info('$http got get request..'+data);		
			$scope.contacts = data;		
		});
	};
	$scope.refresh();

	$scope.clear = function(contact){
		$scope.contact = {};
	};

	$scope.save = function(contact){
		$http.post('/contactList',contact).success(function(data){
			$log.info('$http POST request..'+data);		
			$scope.refresh();
			$scope.clear();	
		});
	};

	$scope.remove = function(id){
		$log.info('$http delete request..'+id);
		$http.delete('/contactList/' + id).success(function(data){		
			$scope.refresh();	
		});
	};

	$scope.edit = function(id){
		$log.info('$http get request..'+id);
		$http.get('/contactList/' + id).success(function(data){		
			$scope.contact = data;
		});
	};

	$scope.update = function(contact){
		$log.info('$http delete request..');
		$http.put('/contactList/' + contact._id,contact).success(function(data){		
			$scope.refresh();	
			$scope.clear();	
		});
	};


	/*$scope.contacts = [{firstname:'Laxmidhar',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Suresh',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Mahesh',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'},
						{firstname:'Krishna',lastname:'Sahoo',age:'26',city:'Hyderabad',country:'India'}];*/
}]);

