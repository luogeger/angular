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

- 1. 创建主模块
    **单页面应用没有controller, controller都在路由表里面**

## 02.todoList

- 页面初始化

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

> 创建服务，把数据写到localStroage
```javascript
    var app = angular.module('todoApp.ser', []);  //服务模块名
    app.service('storageSer', function ($window, $filter){  //服务名

    })
```

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