1.字符串的遍历器接口
    ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。

    for (let codePoint of 'foo') {
      console.log(codePoint)
    }

2.includes(), startsWith(), endsWith()
    传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
    let s = 'Hello world!';

    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true
    这三个方法都支持第二个参数，表示开始搜索的位置。

    let s = 'Hello world!';

    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false
    使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

3.repeat()
    repeat方法返回一个新字符串，表示将原字符串重复n次。

    'x'.repeat(3) // "xxx"
    'hello'.repeat(2) // "hellohello"
    'na'.repeat(0) // ""
    参数如果是小数，会被取整。

    'na'.repeat(2.9) // "nana"

4.padStart()，padEnd()
    ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

    'x'.padStart(5, 'ab') // 'ababx'
    'x'.padStart(4, 'ab') // 'abax'

    'x'.padEnd(5, 'ab') // 'xabab'
    'x'.padEnd(4, 'ab') // 'xaba'

    // 用途
    padStart的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

    '1'.padStart(10, '0') // "0000000001"
    '12'.padStart(10, '0') // "0000000012"
    '123456'.padStart(10, '0') // "0000123456"
    另一个用途是提示字符串格式。

    '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"