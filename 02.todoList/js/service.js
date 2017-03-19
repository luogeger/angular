;(function(){
	//还是创建一个模块
	var app = angular.module('todoApp.ser', []);
	app.service('storageSer', function($window, $filter){
		//var todoList = [
		//	{text:'html', completed:true},
		//	{text:'css', completed:false},
		//	{text:'angular', completed:false},
		//	{text:'node.js', completed:false},
		//	{text:'jquery', completed:false}
		//];
			//alert('test.before');
		var storage = $window.localStorage;
			//alert('test');
		var todoList = JSON.parse(storage.getItem('todoList')||'[]');

		this.save = function(){
			//把数据放到LocalStorage里面, 后面的value是字符串包裹着的数组
			storage.setItem('todoList', JSON.stringify(todoList))
		};

		this.get = function(){
			return todoList;
		};

		this.add = function(txt){
			if(txt.length > 0){
				todoList.push({text:txt, completed:false});
				this.save();
			}

		};

		this.del = function(todo){
			var index = todoList.indexOf(todo);
			todoList.splice(index, 1);
			this.save();
		};

		this.edi = function(){
			this.save();
		};

		//全选状态修改
		this.changeAllStatus = function(toggleAll){
			todoList.forEach(function(item){
				item.completed = toggleAll;
			});
			this.save();
		};

		//清除已完成的todo
		this.clearComStatus = function(){
			//todoList = $filter('filter')(todoList, {completed:false});
			var tempList = $filter('filter')(todoList, {completed:false});
			todoList.splice(0, todoList.length);
			angular.merge(todoList, tempList);
			this.save();
		};

	})
})();
//1.数据搬家
//2.app获取数据换成调用方法
//3.把数据换成LocalStorage
//4.
//5.track by $index
