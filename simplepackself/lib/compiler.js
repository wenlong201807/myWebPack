const { getAST, getDependecies, tranform } = require('./parser')
const path = require('path')
const fs = require('fs')


module.exports = class Compiler {

  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }
  run () {
    const entryModule = this.buildModule(this.entry, true)
    // console.log(entryModule) // 对象，包含文件名，依赖的js，资源内容
    this.modules.push(entryModule)

    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency))
      })
    })

    // console.log(this.modules) // 此时需要引入文件的后缀名

    this.emitFiles() // 将构建的文件导出
  }

  buildModule (filename, isEntry) {
    let ast
    if (isEntry) {
      ast = getAST(filename)
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename) // 根目录
      ast = getAST(absolutePath)
    }

    return {
      filename,
      dependencies: getDependecies(ast),
      source: tranform(ast)
    }
  }

  // 1输出的内容要输出到哪里
  //2
  emitFiles () {
    const outputPath = path.join(this.output.path, this.output.filename)

    let modules = '';

    this.modules.map((_module) => {
      modules += `'${_module.filename}': function(require,module,exports){ ${_module.source}},`
    })
    // bundle 应该是一个自执行函数
    // key 是一个文件名，value是一个函数（文件内容）
    const bundle = `(function(modules){
      function require(filename){
        var fn = modules[filename];
        var module = { exprots:{}};

        fn(require,module,module.exports);

        return module.exports;
      }

      require('${this.entry}')
    })({${modules}})`

    console.log('bundle.js:', bundle)

    fs.writeFileSync(outputPath, bundle, 'utf-8') // 输出文件到指定的dist/main.js
  }
}