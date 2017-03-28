## 1.先测试API能不能再angular里拿到数据

> 因为豆瓣不支持跨域，同一个ip地址，后者是使用jsonp格式请求返回的数据，返回的是一个回调函数，里面装的是json数据。在通过手写跨域来解决这个问题

- https://api.douban.com/v2/book/1220562

```javascript
    {
      "rating": {
        "max": 10,
        "numRaters": 359,
        "average": "7.0",
        "min": 0
      }
    }
```
- https://api.douban.com/v2/book/1220562?callback=JSON_CALLBACK
```javascript
//
;JSON_CALLBACK({
  "rating": {
    "max": 10,
    "numRaters": 359,
    "average": "7.0",
    "min": 0
  }
})
```

```
1. coming：即将上映
2. theater：正在热映
3. main：主模块
4. search：搜索
5. services：服务
6. subject：
7. top250：
```

- otherwise: 默认跳转地址