
const JSZip = require('jszip')
const path = require('path')
// const RawSource = require('webpack-sources').RawSource
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip()
module.exports = class ZipPlugin{
  constructor(options) {
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename)

      for (let filename in compilation.assets) {
       const source = compilation.assets[filename].source() // 生产的压缩内容     
        folder.file(filename,source)// 将生产的压缩内容添加到文件中
      }

      zip.generateAsync({
        type: "nodebuffer" // 二进制内容设置，返回的内容在后面
      }).then(content => {
        // console.log(compilation.options) // 经过webpack处理过的所有信息
        console.log('content:',content) // 二进制内容
        console.log('====',compilation.options.output.path)
        console.log('====',this.options.filename+'.zip')
        const ooutputPath = path.join(
          compilation.options.output.path,
          this.options.filename+'.zip'
        )

        // 使用相对路径
        const outputRelativePath = path.resolve(
          compilation.options.output.path,
          ooutputPath
        )
        console.log('---:',compilation.assets)

        // z
        compilation.assets[outputRelativePath] = new RawSource(content)
        callback()
      })
    })
  }
}