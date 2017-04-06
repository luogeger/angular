;(function (angular){
    var app = angular.module('mainDirective', []);
    app.directive('focusDirective', function (){
        return {
            link: function (scope, ele, attr){
                //console.log(scope);
                //console.log(ele);
                //console.log(attr);
                ele.on('dblclick', function (){
                    //console.info(this);//这里的this是dom元素
                    //console.info(angular.element(this)); // 这个是JQLite元素，只能获取标签
                    angular.element(this).find('input').eq(1)[0].focus();
                })
            }
        }
    })
})(angular);