(function(){
	angular.module('todoDisplay',[]).
		controller('TodoController',['Item', function(Item){
			console.log("con");
			alert(Item.test());
		}]);
})();