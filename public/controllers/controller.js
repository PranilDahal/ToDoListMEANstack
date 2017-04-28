var ToDoList=angular.module('ToDoList',[]);

ToDoList.controller('AppCtrl',['$scope','$http',function($scope,$http){

	var refresh=function(){
		$http.get('/todolist')
		.then(function(success){
			$scope.todolist=success.data;
			$scope.curr={};
		},function(error){
			console.log("Error getting the list from server.-controller");
		});
	}

	refresh();

	$scope.remove=function(id){
		$http.delete('/todolist/'+id)
		.then(function(success){
			refresh();
		},function(error){
			console.log("Error deleting data.-controller");
		});
	}

	$scope.addActivity=function(){
		$scope.curr.status="Incomplete";
		$http.post('/todolist',$scope.curr)
		.then(function(success){
			refresh();
		},function(error){
			console.log("Error adding the activity to server.-controller");
		})
	}

	$scope.edit=function(id){
		$http.get('/todolist/'+id)
		.then(function(success){
			$scope.curr=success.data;
		},function(error){
			console.log("Error getting the activity to edit.-controller");
		})
	}

	$scope.update=function(id){
		$http.put('/todolist/'+$scope.curr._id,$scope.curr)
		.then(function(success){
			refresh();
		},function(error){
			console.log("Error updating data in server.-controller");
		});
	}

	$scope.MarkIncomplete=function(id){
		$http.put('/todolist/markincomplete/'+id)
		.then(function(success){
			refresh();
		},function(error){
			console.log("Error marking the activity incomplete.-controller");
		});
	}

	$scope.MarkComplete=function(id){
		$http.put('/todolist/markcomplete/'+id).
		then(function(success){
			refresh();
		},function(error){
			console.log("Error marking the activity complete.-controller");
		});
	}



}]);