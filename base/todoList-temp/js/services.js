;(function (){
    var app = angular.module('todoApp.ser', []);
    app.service('storageSer', function ($window){
        //this.test = 'this is storageSer test';

        //var list = [
        //    {text:'asd', completed:true},
        //    {text:'css', completed:true},
        //    {text:'angular', completed:false},
        //    {text:'node.js', completed:false},
        //    {text:'jquery', completed:false}
        //];

        var Storage = $window.localStorage;
        var list = JSON.parse(Storage.getItem('todolist') || '[]');

        this.save = function (){
            Storage.setItem('todolist', JSON.stringify(list))
        };
        this.get = function (){
            return list;
        };
        this.add = function (todo){
            list.push({text: todo, completed:false});
            this.save();
        };
    })
})();