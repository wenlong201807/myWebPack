const { getAST, getDependecies, tranform } = require('./parser')
const path = require('path')
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
    /*
    {
  filename: 'D:\\gitCode\\webpack\\simplepackself\\src\\index.js',
  dependencies: [ './greeting' ],
  source: '"use strict";\n' +
    '\n' +
    'var _greeting = require("./greeting");\n' +
    '\n' +
    "document.write((0, _greeting.greeting)('Jane'));"
}
    */
    this.modules.push(entryModule)

    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency))
      })
    })

    console.log(this.modules) // 此时需要引入文件的后缀名
    /*
    [
  {
    filename: 'D:\\gitCode\\webpack\\simplepackself\\src\\index.js',
    dependencies: [ './greeting.js' ],
    source: '"use strict";\n' +
      '\n' +
      'var _greeting = require("./greeting.js");\n' +
      '\n' +
      "document.write((0, _greeting.greeting)('Jane'));"
  },
  {
    filename: './greeting.js',
    dependencies: [],
    source: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports.greeting = greeting;\n' +
      'function greeting(name) {\n' +
      "  console.log('greeting:', name);\n" +
      '}'
  }
]
    */
    
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

  emitFiles () {

  }
}