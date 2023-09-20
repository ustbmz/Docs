# Swift基础语法



## Swift  命令

```shell
## 生成语法树
$ swiftc -dump-ast main.swift

## 生成最简洁的SIL代码 
$ swiftc -emit-sil main.swift

## 生成LLVM IR代码
$ swiftc -emit-ir main.swift -o main.il

## 生成汇编代码
$ swiftc -emit-assembly main.swift -o main.s
```

**对汇编代码进行分析，可以真正掌握汇编语言的本质**



## 数据类型

```swift
// let 常量 可以不赋值，只指定类型
let a : Int

a = 20

/*
 常量只能赋值一次，且要在使用它的时候之前进行赋值
 不要求在编译时确定,常量值也可以在运行中确定
 */
var num = 5

num += 10
num += 20

let sum = num

print(sum)

// 例如 在运行函数中 返回常量值
// 但是只能赋值一次！！
func getAge() -> Int {
    return 10
}
let age = getAge()
print(age)
```

### 常见数据类型

![image-20220115115259657](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115115259657.png)

### 字面量

![image-20220115115412155](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115115412155.png)

### 类型转换

![image-20220115001337295](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115001337295.png)

### 元祖 (Tuple)

![image-20220115001730439](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115001730439.png)





## 流程控制

### If-else For Switch

```swift
//: [Previous](@previous)

import Foundation
import Darwin

var greeting = "Hello, playground"

//: [Next](@next)
var age = 0
// swfit3.0 后已经取消了 ++ -- 运算符  使用 += -=
// age ++
age += 1

if age != 1 {
   print(age)
}else{
   print("else")
}
// 字符区间 但不能用于 for in
let a : Character = "a"
let z : Character = "z"

let range = a...z

print(range.contains("b"))

// 带间隔的区间值
for item in stride(from: 0, through: 100, by: 5){
    print(item)
}

// Switch
// case default 后面并没有大括号
// Switch 必须要处理所有情况
// case default 后面必须要有至少一条语句
// default 如果不想做任何事情，可以直接break
var num = 1
switch num{
case 1:
    print("switch num 1")
    // 可以不写break 并不会贯穿后面的操作 执行case后自动break
    // break
    // fallthrough 强制贯穿后面的操作 会执行case 2
    fallthrough
case 2:
    print("switch num 2")
    // 会执行default
    fallthrough
default:
    print("switch num default")
}

// 如果可以保证已处理所有情况，可以不加default
enum Answer { case right , wrong}
let answer = Answer.right

switch answer {
case Answer.right:
   print("right")
case Answer.wrong:
    print("wrong")
}
// 可以精简语法
switch answer {
case .right:
   print("right")
case .wrong:
    print("wrong")
}
```



### 区间匹配，元祖匹配

![image-20220115114507080](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115114507080.png)

### switch值绑定

![image-20220115141530860](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115141530860.png)

### switch Where

```swift
// switch值绑定
// switch where
let point = (1,-1)
switch point{
case let (x,y) where x == y:
    print("x==y")
case let (x,y) where x == -y:
    print("x==-y")
case let (x,y):
    print("\(x) \(y)")
}

// where for
// 使用where进行过滤 相当于countine
let numbers = [ 10,20,30,-10,-20,-30]
var sum = 0
for num in numbers where num > 0{
    sum += num
}
print(sum)
```


### 标签语句

![image-20220115154630099](https://gitee.com/cnmz/images/raw/master/mdpic/image-20220115154630099.png)

