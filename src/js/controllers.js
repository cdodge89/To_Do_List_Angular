(function(){
	angular.module('todoDisplay',[]).
		controller('TodoController',['Item', function(Item){
			var vm = this
			Item.list().then(function(response){
				vm.list = response.data;
				console.log(vm.list);
			});
			vm.newTodo = {};
			vm.addTask = function(){
				Item.add(vm.newTodo.title, vm.newTodo.description).then(function(response){
					vm.newTodo.id = response.id;
					vm.list.push(vm.newTodo);
					vm.newTodo = {};
					console.log(vm.list);
				});
			};
			vm.remove = function(id){
				Item.remove(id).then(function(){
					for(var i = 0; i < vm.list.length; i++){
						if(vm.list[i].id === id){
							vm.list.splice(i,1);
						}
					}
				});
			}
			vm.editMode = null;
			vm.currentItem = {};
			vm.setEdit = function(todo){
				vm.editMode = todo.id;
				vm.currentItem = todo;
				console.log(vm.currentItem);
			};
			vm.isSet = function(id){
				return vm.editMode === id;
			};
			vm.resetEdit = function(){
				vm.editMode = null;
				console.log(vm.editMode);
				console.log('in')
			};
			vm.saveEdit = function(todo){

			};
		}]);
})();