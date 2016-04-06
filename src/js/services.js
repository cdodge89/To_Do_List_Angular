(function(){
	angular.module('todoDisplay')
		.factory('Item',['$http', item]);

		function item($http){
			service = {
				test: test,
				list: list,
				add: add,
				remove: remove,
				update: update
			};
			return service;

			function test(){
				return 'Hello World';
			}

			function list(){
				return $http.get('http://secret-escarpment-99471.herokuapp.com/item');
			}

			function add(title,description){
				return $http.post('http://secret-escarpment-99471.herokuapp.com/item', {title:title, description:description});
			}

			function remove(id){
				return $http.delete('http://secret-escarpment-99471.herokuapp.com/item/'+id);
			}
			function update(updatedObj){
				return $http.put('http://secret-escarpment-99471.herokuapp.com/item/'+updatedObj.id, updatedObj);
			}
		}
})();