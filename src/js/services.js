(function(){
	angular.module('todoDisplay')
		.factory('Item', item);

		function item(){
			service = {
				test: test
			}
			return service

			function test(){
				return 'Hello World';
			}
		}
})();