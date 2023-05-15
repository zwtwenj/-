// "use strict"
function foo(obj) {
    with (obj) {
        a = 2;
    }
}
var o1 = {
    a: 3
};
var o2 = {
    b: 3
};

foo(o1);
console.log(o1.a); // 2

// foo( o2 );
// console.log( o2.a ); // undefined
// console.log( a ); // 2——不好，a 被泄漏到全局作用域上了！

// 这个例子中创建了 o1 和 o2 两个对象。
// 其中一个具有 a 属性，另外一个没有。
// foo(..) 函数接受一个 obj 参数，
// 该参数是一个对象引用，并对这个对象引用执行了 with(obj) {..}。 
// 在 with 块内部，我们写的代码看起来只是对变量 a 进行简单的词法引用
// 实际上就是一个 LHS 引用（查看第 1 章），并将 2 赋值给它。
// 当我们将 o1 传递进去，a＝2 赋值操作找到了 o1.a 并将 2 赋值给它
// 这在后面的 console. log(o1.a) 中可以体现。
// 而当 o2 传递进去，o2 并没有 a 属性，因此不会创建这个属性， o2.a 保持 undefined。

// 但是可以注意到一个奇怪的副作用，实际上 a = 2 赋值操作创建了一个全局的变量 a。
// 这是怎么回事？ with 可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域
// 因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。
// 尽管 with 块可以将一个对象处理为词法作用域，但是这个块内部正常的 var 声明并不会被限制在这个块的作用域中
// 而是被添加到 with 所处的函数作用域中。

// 可以这样理解，当我们传递 o1 给 with 时
// with 所声明的作用域是 o1，而这个作用域中含 有一个同 o1.a 属性相符的标识符。
// 但当我们将 o2 作为作用域时，其中并没有 a 标识符， 因此进行了正常的 LHS 标识符查找（查看第 1 章）。
// o2 的作用域、foo(..) 的作用域和全局作用域中都没有找到标识符 a，因此当 a＝2 执行 时，自动创建了一个全局变量（因为是非严格模式）。