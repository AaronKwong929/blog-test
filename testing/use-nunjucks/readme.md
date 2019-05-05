# env.render(arg1, arg2)

### base.html 作为一个标准模板，相对于直接在base.html中：

```html
<html>
    <body>
        {% block header %} <h3>{{Unnamed}}</h3> {% endblock %}
        {% block body %} <div>{{NoBody}}</div> {% endblock %}
        {% block footer %} <div>{{copyright}}</div> {% endblock %}
    </body>
</html>
```

```javascript
console.log(env.render('extend.html', {
    Unnamed: 'Hello Aar',
    NoBody: 'fuuuuuuuuuuck',
    copyright: 'no copyright'
}));
```

### 修改，新建一个新的extend.html中的第一行{% extends 'base.html' %} 可以以base为基础进行修改，其他页面的其他调用也可以以此修改。

## 回到正题， arg1接受一个html文件，arg2接受一个Object，

```html
{% extends 'base.html' %}

{% block header %}<h1>{{ header }}</h1> {% endblock %}

{% block body %}<p>{{body}}</p> {% endblock %}

{% block footer %}<p>{{copyright}}</p> {% endblock %}
```

## 参数由{{arg}}决定：

```javascript
console.log(env.render('extend.html', {
    header: 'Hello Aar',
    body: 'fuuuuuuuuuuck',
    copyright: 'no copyright'
}));
```

## 完成修改