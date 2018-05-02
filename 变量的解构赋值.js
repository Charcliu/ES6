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
    