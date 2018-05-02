let 命令

    let只在代码块内生效
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
