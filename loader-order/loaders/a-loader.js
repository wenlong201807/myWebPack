
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  console.log('Loader a is excuted!')

  const url = loaderUtils.interpolateName(this, '[name].[ext]', source)  // 强大的转换能力，需细看
  console.log('myUrl:',url)
  this.emitFile(url, source) // 输出到指定的文件中
  return source
}