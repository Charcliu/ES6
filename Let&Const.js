let 命令

    1.let只在代码块内生效

    {
        var a =  "Test Var";
        let b =  "Test Let"
    }
        a; // Test Var
        b; // ReferenceError: b is not defined
        for循环的计数器，就很合适使用let命令。
    for (let i = 0; i < 10; i++) {
      // ...
    }

    2.不存在变量提升

    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;
    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;

    3.暂时性死区

    var tmp = 123;
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }

    4.不允许重复声明
    let不允许在相同作用域内，重复声明同一个变量。

    // 报错
    function func() {
      let a = 10;
      var a = 1;
    }

    // 报错
    function func() {
      let a = 10;
      let a = 1;
    }

为什么需要块级作用域？
    ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

    1.内层变量可能会覆盖外层变量。

    var tmp = new Date();

    function f() {
      console.log(tmp);
      if (false) {
        var tmp = 'hello world';
      }
    }

    f(); // undefined
    上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

    2.用来计数的循环变量泄露为全局变量。

    var s = 'hello';

    for (var i = 0; i < s.length; i++) {
      console.log(s[i]);
    }

    console.log(i); // 5

    块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

    // IIFE 写法
    (function () {
      var tmp = ...;
      ...
    }());

    // 块级作用域写法
    {
      let tmp = ...;
      ...
    }

const 命令

    1.const声明一个只读的常量。一旦声明，常量的值就不能改变。（一旦声明就必须初始化const变量）

    const PI = 3.1415;
    PI // 3.1415

    PI = 3;
    // TypeError: Assignment to constant variable.
    
    2.const的作用域与let命令相同：只在声明所在的块级作用域内有效。

    if (true) {
      const MAX = 5;
    }

    MAX // Uncaught ReferenceError: MAX is not defined

    3.const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

    if (true) {
      console.log(MAX); // ReferenceError
      const MAX = 5;
    }

    4.const声明的常量，也与let一样不可重复声明。

    var message = "Hello!";
    let age = 25;

    // 以下两行都会报错
    const message = "Goodbye!";
    const age = 30;

    5.const 的本质保证指向变量的地址不改变
    const foo = {};

    // 为 foo 添加一个属性，可以成功
    foo.prop = 123;
    foo.prop // 123

    // 将 foo 指向另一个对象，就会报错
    foo = {}; // TypeError: "foo" is read-only
    上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

    如果真的想将对象冻结，应该使用 Object.freeze() 方法。

    const foo = Object.freeze({});

    // 常规模式时，下面一行不起作用；
    // 严格模式时，该行会报错
    foo.prop = 123;

    除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

    var constantize = (obj) => {
      Object.freeze(obj);
      Object.keys(obj).forEach( (key, i) => {
        if ( typeof obj[key] === 'object' ) {
          constantize( obj[key] );
        }
      });
    };

顶层对象的属性
    
    1.为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
