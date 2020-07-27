const Spritesmith = require('spritesmith');
// https://github.com/twolfson/spritesmith
const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  const callback = this.async() // 合成图片是异步过程
  const imgs = source.match(/url\(\S*\)?__sprite/g)

  console.log('imgs:',imgs)
  const matchedImgs = []

  for (let i = 0; i < imgs.length; i++){
    const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]
    console.log('每一张图片的地址信息：',img)
    matchedImgs.push(path.join(__dirname,img))
  }

  Spritesmith.run({
    src:matchedImgs
  }, (err, result) => {
      fs.writeFileSync(path.join(process.cwd(),'dist/sprite.png'),result.image)
      source = source.replace(/url\(\S*\)?__sprite/g, match => {
        return `url("dist/sprite.png")`
      })

      callback(null,source)
  })
}