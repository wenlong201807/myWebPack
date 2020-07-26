// 1.解析ast语法树
// es5  => es6
// 分析依赖关系

const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const {transformFromAst} = require('babel-core')

module.exports = {
  getAST: (path) => {
    const source = fs.readFileSync(path,'utf-8')
    return babylon.parse(source, {
      sourceType:'module'
    })
  },
  getDependecies: (ast) => {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value)
      }
    })
    return dependencies
  },
  tranform: (ast) => {
    const { code }= transformFromAst(ast, null, {
      presets:['env'] // 2015,---2017 之类的语法就能解析了 // npm install --save-dev @babel/preset-env
    })
    return code
  }
}