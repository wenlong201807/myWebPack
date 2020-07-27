const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this)
  console.log('name', name)
  const json = JSON.stringify(source)
    .replace('zhu', 'dragon')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')


  // 同步处理错误的方式
  // throw new Error('Error1')
  // return `export default ${json}`


  // 同步传递错误的方式2
  // this.callback(new Error('Error2'),json)
  this.callback(null,json,2,3,4) // 传递多个值

}