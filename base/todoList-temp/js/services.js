;(function (){
    var app = angular.module('todoApp.ser', []);
    app.service('storageSer', function ($window, $filter){
        var Storage = $window.localStorage;
        var list = JSON.parse(Storage.getItem('todolist') || '[]');

        this.ediSave = function (todo){
            if(todo.text.length > 0){
                Storage.setItem('todolist', JSON.stringify(list));
            }
            if(todo.text.length == 0){
                var index = list.indexOf(todo);
                list.splice(index, 1);// 这里直接返回的是破坏后的数组
                Storage.setItem('todolist', JSON.stringify(list));
            }

        };
        this.get = function (){
            return list;
        };
        this.addSave = function (){
            Storage.setItem('todolist', JSON.stringify(list));
        };
        this.add = function (todo){
            if(todo.length > 0){
            	list.push({text:todo, completed:false});
                this.addSave();
            }
            //list.push({text: todo, completed:false});
        };
        this.del = function (todo){
            var index = list.indexOf(todo);
            list.splice(index, 1);// 这里直接返回的是破坏后的数组
            this.addSave();
        };
        this.clearCompleted = function (){
            var unfinished = $filter('filter')(list, {completed: false});
            list.splice(0, list.length);
            angular.merge(list, unfinished);
        };

    })
})();