# AngularJS

- 01.douban：
- 02.todoList：页面样式和布局是成品，只是用angular实现数据双向绑定、依赖注入、模块、控制、路由、指令、自定义指令、服务、过滤器、锚链接、本地存储。

## 01.douban

> 模块列表
```
1. coming：即将上映
2. theater：正在热映
3. main：主模块
4. search：搜索
5. services：服务
6. subject：
7. top250：
```

### 创建主模块
**单页面应用没有controller, controller都在路由表里面**
- 子模块测试
- 默认跳转到子模块
- jsonp服务拿过来
- 引用服务，添加服务
- 属性：``ng-src='{{}}'``
- 对象里面的数组不知道数量，但是每一项都要渲染出来。
    ```html
    <span ng-repeat="ever in item.genres">{{ever}}{{$last?'':'、'}}</span>
   ```

### 分页
> ``$routeParams``, ``$route``
- 1.需要传递2个参数实现分页。
    - start：返回的第一条对应的是数组的索引值
    - count：每页显示的数量
    ```javascript
    $scope.page = 1; //页码数
    $scope.countPage = 4; // 页容量
    $scope.startPage = ($scope.page - 1)*$scope.countPage; // 每页显示的第一条
    var pararms = {
        api: '00fa6c0654689a0202ef4412fd39ce06',
        start:$scope.startPage, //页码数
        count:$scope.countPage, //页容量
    };
    ```

- 2.不能动态分页，通过传递页码数来分页
    - ``.when( '/theater/:page', {...} )`` ，``：``表示这个参数是可以改变
    - ``$routeParams``：这个服务可以获取页面上可变的参数
        - ``2.1pit: ``现在获取不到的，因为路径变了，要在后面加参数才能看到，而且看到的是第一页，才能看到打印的$routeParams
        - console.log($routeParams); 获取的是一个对象。``{page: '3'}``
    - ``pit：``console.log($routeParams.page)获取的是字符串，但是下面是在进行运算，所以，要数据转换
        - ``$scope.page = parseInt($routeParams.page)``
        - 防止传来的数据有变化，做个兼容处理。
            - $scope.page = parseInt($routeParams.page || '1');

- 3.``.when( '/theater/:page', {...} )`` page后面什么都不写，跳不过来
    - '/theater/:page？' -> 这里多了 **？** 表示这个参数可以为空。现在page既能为空，也能改变.
        - 所以，现在不传页码数，也能看到页面。解决了``2.1pit``

- 4.总数、第几页、共几页
    - 总数：$scope.total = 0;
    - 第几页：$routeParams.page
    - 共几页：向上取整``Math.ceil()``，同时，不能在页面运算。
        - ``pit:  ``赋值为0，在获取总数后在运算。

- 5.现在打开页面默认第一页，还有上一页、下一页，及页码数的动态显示。
    - 实现点击改变$scope.page的值。并在页面显示
    ```html
      <li><a ng-click="upPage(page-1)"> 上一页</a></li>
      <li><a ng-click="downPage(page+1)">下一页</a></li>
    ```
    ```javascript
        $scope.upPage = function (nowPage){
            if(nowPage > 0){
                $scope.page = nowPage;
            }
        };
        $scope.downPage = function (nowPage){
            if(nowPage <= $scope.maxPage){
                $scope.page = nowPage;
            }
        };
    ```
    - 页面刷新是根据服务实现的。这里用``$route``来更新页码数，来刷新页面
        - ``$route.updataParams({page: ''})``调用这个方法来实现，
        ```javascript
            $scope.upPage = function (nowPage){
                if(nowPage > 0){
                    $scope.page = nowPage;
                    $route.updateParams({page: nowPage})
                }
            };
            //用一个函数实现上一页、下一页
            $scope.updataPage = function (nowPage){
                if(nowPage > 0 && nowPage <= $scope.maxPage){
                    $scope.page = nowPage;
                    $route.updateParams({page: nowPage})
                    console.log(nowPage);
                }
            };
        ```
        - ``pit: `` 刷新页面还是停留在当前页，不是在第一页

- 6.上一页、下一页的禁止点击。
    ```html
    <li ng-class="{disabled: page == 1}"></li>
    <li ng-class="{disabled: page == maxPage}"></li>
    ```

### 详情页
### coming_soon
### top250
### 搜索
- ``$route``是在控制器里注入
    - ``$route.updateParams()``




## 02.todoList

### 页面初始化

```HTML
<ul class="todo-list">
    <li class="completed">
        <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label>Taste JavaScript</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    <li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>Buy a unicorn</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li>
</ul>
```
> li标签有一个``class="completed"``，文字变成灰色，有删除线, 而且input标签后面有``checked``属性，前面有打勾，表示任务完成。

- 创建模块和控制器，把假数据渲染到界面
```HTML
<li ng-repeat="todo in list" ng-class="{completed: todo.completed}">
    <div class="view">
        <input class="toggle" type="checkbox" checked>
        <!-- <input class="toggle" type="checkbox" ng-model="todo.completed"> 如果为true 就和有checked属性一样 -->
        <label  ng-bind="todo.text"></label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>
```
- ``completed: true ``表示完成，对应的input标签就应该有checked属性。
- 绑定信息：``ng-bind='todo.text'``,设置class:``ng-class='{completed: todo.completed}'``
- 创建服务：首先测试服务能否注入成功，在把假数据放到service。
    - 获取数据：调用get( )  -> 再返回数组。
    ```javascript
    var app = angular.module('todoApp.ser', []);  //todoApp.ser -> 服务模块名
    app.service('storageSer', function (){  //storageSer -> 服务名
        this.test = 'this is storageSer test';
    })
    //创建一个todoApp.ser模块，-> 往主模块的中括号里面注入 -> 而且要在主模块之前注入
    //服务名 -> 要注入到主模块的controller的形参里面
    ```

- 然后在换成localStorage
    - localStorage：只有获取，设置，和清空; 存的是对象，获取的是数组。
    ```javascript
    localStorage.getItem() //获取
    localStorage.setItem() //设置
         localStorage.setItem('key', 'value') // 键值对，都是String
    localStorage.clear()    //清除
    ```
    - 1.localStorage是window的。需要注入$window,
        - 设置全局变量：var Storage = $window.localStorage;
    ```javascript
    var list = Storage.getItem('list') || '[]';
    ```
    - 2.这时候获取到的还只是String，还要转换成JSON。
    ```javascript
    var list = JSON.parse(Storage.getItem('list'));
    ```
    - 3.``注意：``要解决数据为空，返回null的现象。
    ```javascript
        var list = JSON.parse(Storage.getItem('list') || '[]');
    ```

### 添加数据
- 先测试服务的add()能不能跑起来。
    - html页面绑定函数在form标签。
    - 测试把添加的数据console.log
        - ng-submit + ng-model一起使用。

- 添加的数据要追加到list里面，list 现在是变量还在内存中，所以添加之后要立刻保存。这样才能get到新的数据
    - 1.添加之前要定义一个保存的函数，在添加的函数里面执行。
    - 2.``注意：``数组的每一个是字符串的对象。所以，存进去要把对象转换成字符串
    ```javascript
        this.save = function(){
            Storage.setItem('todoList', JSON.stringify(todoList))
        };
        this.add = function(txt){
            todoList.push({text:txt, completed:false});
            this.save();
        };
    ```
    - 3.``bug：``添加重名的问题，'track by'
    ```
        ng-repeat="todo in Hlist | filter: todoComStatus track by $index"
    ```
> **Bug：** 添加数据不能为空。同样，修改数据的时候，把数据清空就删除这条数据。
```javascript
        if(todo.length > 0){
            list.push({text:todo, completed:false});
            this.save();
        }
```

### 删除数据
- ng-model='todo'是绑定在form标签下的input上面**和**button标签上的ng-click='delTodo(todo)' -> 这里的实参怎么联系在一起的。
- list.splice(index, 1); -> 这里直接返回的是破坏后的数组

### 修改数据
- 双击修改，给lable绑定``ng-daclick=''``
    - li标签后面多一个class``editing``,值是true或false，通过临时变量来实现
        - **bug:** 临时变量还是不能实现，因为todo多了以后，双击一个todo,所有的todo都会变成编辑状态，要保证双击的当前lable标签的li标签添加``.editing``
        - 所以，建立临时的``空``对象，点击之后赋值给这个对象，``.editing``再根据它们是否相等``editing: temp == todo``而动态添加
    - li标签多了``class='ng-scope editing'``
    - div消失，input标签显示。
- 再给input标签绑定失去焦点事件，改变li标签后面``.editing``的显示隐藏。
> 然后在保存。**pit：** 修改数据的时候，把数据清空，仍然有空栏。保存时候的判断
> **pit：** 双击事件不能获取焦点

### 左下角item统计
- 统计的是没有完成的数据，为false的。
- 统计的需要监视的是动态值 -> 监视的是todoList
    - 监视的是新的值``发生动态后的值`` -> newVal，
    - 监视的是数组，后面要加true
    - 监视的是整个todoList的数据。
    ```javascript
      $scope.$watch('HList', function(newVal){
          console.log(newVal);
      }, true);
    ```


- **过滤器，$filter 是需要注入的。**
    - 过滤器是把符合条件的过滤掉，!!
    ```javascript
    $filter.('filter')(Hlist, {complete: false});
    ```

### 删除已完成的
- 只有页面有显示已完成的todo。右下角的``Clear Completed``才显示
    - ``ng-show=''``, -> 过滤之后true的数量大于
- **清除：** 把完成``true``的todo删除，不能够直接**赋值todoList**, 先过滤拿到未完成的todo，在清空数组，然后追加。
    ```javascript
    //angular提供了类似push方法
    angular.merge(list, unfinished);
    ```

### 全选切换
- 先改变列表里todo状态
- 再改变样式
    - 每个todo的完成状态和全选框的状态保持一致。
- 全选框的样式要被监视。















# base
> 什么是类库和框架
  - 类库:类库是一些函数的集合，它能帮助你写WEB应用。起主导作用的是你的代码，由你来决定何时使用类库。类库有：jQuery等
  - 框架:框架是一种特殊的、已经实现了的WEB应用，你只需要对它填充具体的业务逻辑。这里框架是起主导作用的，由它来根据具体的应用逻辑来调用你的代码。
  - 库和框架最大的区别是
    - 库中的方法是由开发者调用，框架是由框架本身来调用开发者写好的方法
  	- 使用框架的时候需要对框架有一定认识才能使用

## angular表达式

- 表达式的形式有很多种都是通过｛｛ ｝｝包裹起来，最后将运算结果返回出去
- 字符串 {{string}}
- 数字 {{number}}
- 布尔 {{boolean}}
- 三元表达式 {{?:}}
- 数组 {{arrary}}
- 对象 {{object}}

## 指令

- ng-app:
    - 一般只有一个模块
    - 如果多模块开发, 是把子模块名添加到主模块的**中括号** 里。
    ```html
        <div ng-app="mainApp">
            <div ng-controller="myCtrl">
                {{name}}
            </div>
            <div ng-controller="myCtrl2">
                {{name}}
            </div>
        </div>
    ```
    ```javascript
        var app=angular.module('mainApp',['myApp2']);
        app.controller('myCtrl',function ($scope) {
            $scope.name='myCtrl';
        });
        var app2=angular.module('myApp2',[]);
        app2.controller('myCtrl2',function ($scope) {
            $scope.name='myCtrl2';
        })
    ```
- ng-controller:
    - 可以有过个控制器，控制器内部的$scope对象的属性命名``不会``冲突
    ```javascript
      var app=angular.module('myApp',[]);
      app.controller('myController',function ($scope) {
          $scope.name='myController';
      })
      app.controller('myController2',function ($scope) {
          $scope.name='myController2';
      })
    ```
- ng-init:
- ng-model:
- ng-bind:
- ng-bind-html:
- ng-click:
- ng-repeat:
- ng-class:
    - 处理奇偶行变色的用法。
    ```html
      <li ng-class-even="{red:true}" ng-class-odd="{blue:true}"  ng-repeat="num in list">{{num}}</li>
      <li ng-class="{red:$index%2,blue:!($index%2)}"  ng-repeat="num in list">{{num}}</li>
      <li ng-class="{red:$even,blue:$odd}"  ng-repeat="num in list">{{num}}</li>
    ```
    ```javascript
      $scope.list=[1,2,3,4,5,6,7,8];
    ```
    - ng-class和js中的class差不多,ng-class的参数是一个对象，对象的key是类样式的名字,value是true或者是false用来控制样式的启用和不启用
- ng-if:
- ng-hide:
- ng-show:
- ng-switch:
    ```html
        <input type="text" ng-model="text" >
        <ul ng-switch="text">
            <li ng-switch-when="1">这是1</li>
            <li ng-switch-when="2">这是2</li>
            <li ng-switch-when="3">这是3</li>
            <li ng-switch-when="4">这是4</li>
            <li ng-switch-when="5">这是5</li>
            <li ng-switch-default="">默认</li>
        </ul>
    ```
    - 监视的数据是如果是对象，要添加``true``
    ```javascript
        $scope.$watch('obj',function (newVal,oldVal) {
            console.log('newVal:'+newVal.name);
            console.log('oldVal:'+oldVal.name);
        },true)
    ```
    - ``$watch``只能用来监视$scope中的数据,
    ```javascript
        var number=1;
        $scope.$watch('number',function (newV,oldV) {
          console.log('newVal:'+newV); //undefined
          console.log('oldVal:'+oldV); //undefined
        })
    ```
- ng-src:
- ng-href:
- ng-focus:
- ng-blur:
- ng-dbclick:

> 1.Angular的DOM处理
```html
<h1 id="myH1">这是jqLite处理的dom元素</h1>
```
```javascript
angular.element(document).find('h1').css('background-color','red');
// 当然也可以用jQuery的方式处理dom元素，但是要在angular之前引用jQuery
angular.element(document).find('#myH1').css('background-color','red');
```

> 2.代码压缩问题
- 1.代码压缩需要添加中括号将其包裹
    - 在中括号里面添加对应的服务，在后面的function服务的引用顺序不能改变
    ```javascript
        var app=angular.module('myApp',[]);
        app.controller('myCtrl',['$scope','$log',function ($scope,$log) {
            $scope.name='myCtrl';
            $log.info('123');
        }]);
    ```
- 2.这种js压缩的过后的代码是可以被运行的
```javascript
    var app=angular.module("myApp",[]);app.controller("myCtrl",["$scope",function(a){a.name="myCtrl"}]);
```

- 3.像下面这种代码压缩以后没有$scope是无法运行的
```javascript
    var app=angular.module("myApp",[]);app.controller("myCtrl",function(a){a.name="myCtrl"});
```

- 4.避免代码压缩问题 - ``$inject``
```javascript
    var app=angular.module('myApp',[]);
    function otherCtrl(a) {
        a.name='在外部引用ctrl'
    }
    //在代码外部添加$inject避免js代码压缩问题
    otherCtrl.$inject=['$scope'];
    app.controller('myCtrl',otherCtrl)
```

> 3.``$rootScope`` $scope是从$rootScope继承过来的
```html
<body ng-app="myApp">
    {{name}}
    <div ng-controller="myCtrl">
        {{name}}
    </div>
</body>
```
```javascript
    var app=angular.module('myApp',[]);
    app.run(function ($rootScope) {
        $rootScope.name='123';
    })
    app.controller('myCtrl',function ($scope,$rootScope) {
        $rootScope.name='在myCtrl中修改的$rootScope.name'; // 第一个name
		$scope.name='$scope.name'; // 第二个name
    })
```

> 4.``$interval`` 和 ``setinterval( )``
```javascript
    app.controller('myCtrl',function ($scope,$interval) {
        $scope.time=new Date();
        $scope.time2=new Date();

        setInterval(function () {
            $scope.time=new Date();
            console.log($scope.time);

        },1000);

        $interval(function () {
            $scope.time2=new Date();
        },1000)
    })
```
- 在angular中如果使用的方法无法将数据更新到页面上
    - $scope.$apply();告诉angular重新更新$scope中的数据
- $interval和window.setInterval用法一样
    - $interval内部含有$scope.$apply()，会将$scope更新。

> 5.服务：``$injector``、``service``、``factory``
- ``$injector``
    - 内部使用依赖注入的方式添加服务
    ```javascript
        var app=angular.module('myApp',[]);
        app.controller('myCtrl',function ($scope,$injector) {
            //内部添加服务
            $injector.invoke(function ($log) {
                $log.info('123');
            })
        })
    ```
- ``service``
    - app.service('这里是服务的名称，不用加$', function (){} );
- ``factory``
    - 返回的是一个对象
    ```javascript
        var app=angular.module('myApp',[]);
        app.service('myService',function () {
            this.name='asd';
            this.GetName=function () {
                return '这是一个方法';
            }
        });

        app.factory('myFactory',function () {
            return {
                name:'myFactory',
                GetName:function () {
                    return '这是从Factory创建出来的一个方法'
                }
            }
        });
        app.controller('myCtrl',function ($scope,myService,myFactory) {
            console.log(myService.name);
            console.log(myService.GetName());
            console.log(myFactory.name);
            console.log(myFactory.GetName());
        })
    ```

> 6.自定义指令：可以当``标签``使用，也可以当``属性``使用, 返回的是一个**对象**
```html
    <!--以属性的方式实现-->
    <h1 hello=""> </h1>
    <!--标签的方式实现-->
    <luo></luo>
    <xiao></xiao>
```
```javascript
    app.directive('luo',function () {
        return {
            template:'<h2>hello  directive</h2>'
        }
    });
    //模仿angular实现ng-
    app.directive('xiao',function () {
        return {
            template:'<h2>MyHello</h2>'
        }
    });
```
- 还可以返回一个URL
```javascript
    app.directive('myHello',function () {
        return {
            templateUrl:'template/myhellotemplate.html'
        }
    });
```

> 7.自定义指令：呈现的形式，不仅有标签、属性还有**class** ,E标签、A属性、C类样式
```html
    <luo></luo>
    <div luo> </div>
    <div class="luo"> </div>
```
```javascript
    app.directive('myHello',function () {
        return {
            template:'<h1>myHello</h1>',
            restrict:'EAC' //restrict用来限制自定义呈现形式
        }
    })
```

> 8.去除自定义指令标签外面的壳
- ``replace: true``: 代码块里面就不会出现``<luo></luo>``的标签，只会有``<h1>MyHello</h1>``
```html
<luo></luo>
```
```javascript
app.directive('luo',function () {
    return {
        template:'<h1>MyHello</h1>',
        replace:true
    }
});
```

> 9.外部传进来的值修改模板中的内容
- 在模版内部添加ng-transclude是告诉外部的值传递进来以后修改其标签中间的内容
```html
<my-hello>这是我在外部传进来的值</my-hello>
```

```javascript
    app.directive('myHello',function () {
        return {
            template:'<div>' +
            '<h1 ng-transclude></h1><h2 ng-transclude> </h2>' +
            '</div>',
            transclude:true
        }
    });
```

> 10.自定义指令操作DOM
- 在angular中所有的dom处理建议在自定义指令中完成
- ``pit：``自定义指令名字驼峰命名，标签中的属性名字``-``
```html
    <div my-link="" class="red">  </div>
```
```javascript
    app.directive('myLink',function () {
        return {
            link:function (scope,ele,attr) {
                console.log(scope);
                console.log(ele); //ele就是咱们的jqLite元素
                console.log(attr);
                ele.on('click',function () {
                    console.log('这是jqLite的做出来的log');
                })
            }
        }
    })
```

> 11.常用过滤器 +　过滤器创建
```html
    {{money}}
    {{1000|currency}}
```
```javascript
    app.controller('myCtrl',function ($scope,$filter) {
       $scope.money=$filter('currency')(1000);
    })
```

> 12.锚链接：单页面应用程序原理
```html
    <ul>
        <li><a href="#/my">我的音乐</a></li>
        <li><a href="#/friend">朋友</a></li>
    </ul>
    <div id="view">
        <!--页面上需要修改的内容-->
    </div>
```

```javascript
    window.addEventListener('hashchange',function () {
        console.log(location.hash);
        var view=document.getElementById('view');
        //switch(location.hash.substring(2)){
        switch(location.hash){
            case'#/my':
                view.innerHTML='我的音乐';
                break;
            case'#/friend':
                view.innerHTML='朋友';
                break;
            //default
        }
    })
```

> 13.路由
- 引入angular.js 和 angular-route.js
- ``ngRoute``是在模板的中括号里注入。
```html
    <ul>
        <li><a href="#/my">我的音乐</a></li>
        <li><a href="#/friend">朋友</a></li>
        <li><a href="#/mycontroller">mycontroller</a></li>
        <li><a href="#/mytemplate">mytemplate</a></li>
    </ul>
```
```javascript
var app=angular.module('myApp',['ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
                .when('/my',{
                    template:'<h1>我的音乐</h1>'
                })
                .when('/friend',{
                    template:'<h2>{{name}}</h2>',
                    controller:function ($scope) { //匿名的controller
                        $scope.name='朋友'
                    }
                })
                .when('/mycontroller',{
                    template:'<h3>{{name}}</h3>',
                    controller:'myCtrl'
                })
                .when('/mytemplate',{ //推荐写法
                    templateUrl:'mytemplate.html',
                    controller:'myCtrl2'
                })
                .otherwise({
                    redirectTo:'/my'   //默认跳转现有路径
                });
    });
    app.controller('myCtrl',function ($scope) {
        $scope.name='mycontroller';
    });
    app.controller('myCtrl2',function ($scope) {
        $scope.name='这是从html模板中获取的数据';
    });
```

> 14.angular发送get请求
- 豆瓣api从服务器打开是跨域
- 百度api从本地文件打开是跨域
- 百度api从服务器打开正常
```html
    <pre>
        {{jsonData|json}}
    </pre>
```
```javascript
    app.controller('myCtrl',function ($http,$scope) {  //发送get数据请求
        $http({
            method: 'GET',//发送get请求
            //url: 'http://apis.baidu.com/apistore/weatherservice/recentweathers?cityname=上海&cityid=101020100',
            url: 'https://api.douban.com/v2/movie/coming_soon?callback=JSONP',
            //headers:{
            //'apikey':'8e6189783419dc1acd9993dc26927edd'//你的key
            //'apikey':'08bfec92df73d84c56eb4bfe33fbfe37'//你的key
            //}
        })
        .then(
        function successCallback (data) {  //成功的回调函数
            console.log('successCallback');
            console.log(data);
            $scope.jsonData=data;

        },
        function errorCallback(data) {  //失败的回调函数
            console.log('errorCallback');
            console.log(data);
        })
    })
```

> 15.手写跨域


## 全局API

- angualr.isArray()  判断对象是否是数组
- angualr.isData()  判断对象是否为日期对象
- angular.isDefined()  判断对象是否定义过
- angular.isElement()	判断对象是否为一个DOM元素。
- angular.isFunction()	判断对象是否为一个函数。
- angular.isNumber()	判断对象是否为数字。
- angular.isObject()	判断对象是否为object类型。
- angular.isString()	判断对象是否为字符串。
- angular.isUndefined()	判断对象是否没有定义过（与angular.isDefined()相反）。
- angular.equals()	判断两个对象是否相等。
- angular.lowercase()	将字符串转换为小写形式。
- angular.uppercase()	将字符串转换为大写形式。
- angular.copy()	深拷贝一个对象或数组。
- angular.forEach()	遍历对象或数组中的每一个元素并执行一个函数