// 1.解析ast语法树
// es5  => es6
// 分析依赖关系

const fs = require('fs')
const babylon = require('babylon')

module.exports = {
  getAST: (path) => {
    const source = fs.readFileSync(path,'utf-8')
  
    return babylon.parse(source, {
      sourceType:'module'
    })
  }
}