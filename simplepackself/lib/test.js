const { getAST ,getDependecies,tranform} = require('./parser')
const path = require('path')

const ast = getAST(path.join(__dirname, '../src/index.js'))
// console.log(getDependecies(ast)) // [ './greeting' ] // 依赖的js文件有哪些
const dependencies = getDependecies(ast) // ast 转成源码

const source = tranform(ast)
console.log(source)