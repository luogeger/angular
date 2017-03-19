//todoApp获取焦点的指令 -- Dom操作
;(function(angular){
	var app = angular.module('todoApp.dir', []);
	app.directive('todoFocus', function(){
		return {
			link: function(scope, ele, attr){
				ele.on('dblclick', function(){
					console.log(this);
					angular.element(this).find('input').eq(1)[0].focus();
				})
			}
		}
	})
})(angular);


