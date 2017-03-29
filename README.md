# angularDemo

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

- 表达式的形式有很多种都是通过｛｛｝｝包裹起来，最后将运算结果返回出去
- 字符串 {{string}}
- 数字 {{number}}
- 布尔 {{boolean}}
- 三元表达式 {{?:}}
- 数组 {{arrary}}
- 对象 {{object}}

## 指令

- ng-app:
- ng-init:
- ng-model:
- ng-bind:
- ng-bind-html:
- ng-click:
- ng-repeat:
- ng-class:
- ng-if:
- ng-hide:
- ng-show:
- ng-switch:
- ng-src:
- ng-href:
- ng-focus:
- ng-blur:
- ng-dbclick:


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