(function(){
	angular.module('todoDisplay',[]).
		controller('TodoController',['Item', function(Item){
			var vm = this
			Item.list().then(function(response){
				vm.list = response.data;
				console.log(vm.list);
			});
			vm.newTodo = {
				$$hashkey:null,
				description:null,
				done: 0,
				id: null,
				title:null
			}
			if(vm.newTodo.description){
				Item.add(vm.newTodo.title, vm.newTodo.description).then(function(response){
					vm.newTodo.id = response.id;
					vm.list.push(vm.newTodo);
					console.log(vm.list);
				});
			}
		}]);
})();