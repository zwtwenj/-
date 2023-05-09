// JavaScript 中的“所有”函数都有一些有用的特性（这和它们的 [[ 原型 ]] 有关，可以用来解决这个问题。
// 具体点说，可以使用函数的 call(..) 和 apply(..) 方法。
// 严格来说，JavaScript 的宿主环境有时会提供一些非常特殊的函数，它们并没有这两个方法。
// 但是这样的函数非常罕见，JavaScript 提供的绝大多数函数以及你自己创建的所有函数都可以使用 call(..) 和 apply(..) 方法。

// 这两个方法是如何工作的呢？
// 它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。
// 因为你可以直接指定 this 的绑定对象，因此我 们称之为显式绑定。

function foo() { 
    console.log( this.a ); 
}
var obj = { 
    a:2 
};
foo.call( obj ); // 2

// 通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。
// 如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式
//（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”。

// 从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现 在其他的参数上，但是现在我们不用考虑这些。
// 可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。