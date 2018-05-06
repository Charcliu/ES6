1.Number.isFinite(), Number.isNaN()
    ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

    Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
    Number.isNaN()用来检查一个值是否为NaN。

2.Number.parseInt(), Number.parseFloat()
    ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

3.Number.isInteger()
    Number.isInteger()用来判断一个数值是否为整数。

4.安全整数和 Number.isSafeInteger()
    JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
    ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

5.Math.trunc()
    Math.trunc方法用于去除一个数的小数部分，返回整数部分。

6.Math.sign()
    Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。