数组的解构赋值

    ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

    let [a, b, c] = [1, 2, 3];
    这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

    1.// 嵌套解构
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3

    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"

    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3

    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]

    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined 如果解构不成功，变量的值就等于undefined。
    z // []

    2.// 不完全解构
    不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

    let [x, y] = [1, 2, 3];
    x // 1
    y // 2

    let [a, [b], d] = [1, [2, 3], 4];
    a // 1
    b // 2
    d // 4

    3.如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
    function* iter(){
        yield 1;
        yield 2;
    }
    let [a, b] = iter()
    a // 1
    b // 2 

    4.对于 Set 结构，也可以使用数组的解构赋值。

    let [x, y, z] = new Set(['a', 'b', 'c']);
    x // "a"

    5.默认值
    解构赋值允许指定默认值。

    let [foo = true] = [];
    foo // true

    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
    注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

    let [x = 1] = [undefined];
    x // 1

    let [x = 1] = [null];
    x // null

    6.如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

    function f() {                            let x
      console.log('aaa');                     if ([1][0] === undefined){
    }                         ========>           x = f(); 
                                              }else {  
                                                  x = [1][0];
    let [x = f()] = [1];                      }

    7.默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

    let [x = 1, y = x] = [];     // x=1; y=1
    let [x = 1, y = x] = [2];    // x=2; y=2
    let [x = 1, y = x] = [1, 2]; // x=1; y=2
    let [x = y, y = 1] = [];     // ReferenceError: y is not defined

对象的解构赋值
解构不仅可以用于数组，还可以用于对象。

    1.  let { foo, bar } = { foo: "aaa", bar: "bbb" };  <======>  let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
        左边是右边的简写
        对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
        而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

        let { foo: baz } = { foo: "aaa", bar: "bbb" };
        baz // "aaa"
        foo // error: foo is not defined
        上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

    2.  var {x = 3} = {};
        x // 3

        var {x, y = 5} = {x: 1};
        x // 1
        y // 5

        var {x: y = 3} = {};
        y // 3

        var {x: y = 3} = {x: 5};
        y // 5

        默认值生效的条件是，对象的属性值严格等于undefined。

        var {x = 3} = {x: undefined};
        x // 3

        var {x = 3} = {x: null};
        x // null

字符串的解构赋值
    字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

    const [a, b, c, d, e] = 'hello';

函数参数的解构赋值
    函数的参数也可以使用解构赋值。

    function add([x, y]){
      return x + y;
    }

    add([1, 2]); // 3

用途
变量的解构赋值用途很多。

    （1）交换变量的值

    let x = 1;
    let y = 2;

    [x, y] = [y, x];

    （2）从函数返回多个值

    函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

    // 返回一个数组

    function example() {
      return [1, 2, 3];
    }
    let [a, b, c] = example();

    // 返回一个对象

    function example() {
      return {
        foo: 1,
        bar: 2
      };
    }
    let { foo, bar } = example();

    （3）函数参数的定义

    解构赋值可以方便地将一组参数与变量名对应起来。

    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1});

    （4）提取 JSON 数据

    解构赋值对提取 JSON 对象中的数据，尤其有用。

    let jsonData = {
      id: 42,
      status: "OK",
      data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    （5）函数参数的默认值

    jQuery.ajax = function (url, {
      async = true,
      beforeSend = function () {},
      cache = true,
      complete = function () {},
      crossDomain = false,
      global = true,
      // ... more config
    } = {}) {
      // ... do stuff
    };

    （6）遍历 Map 结构

    任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }

    （7）输入模块的指定方法

    加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

    const { SourceMapConsumer, SourceNode } = require("source-map");