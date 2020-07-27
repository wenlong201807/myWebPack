const Spritesmith = require('spritesmith');
// https://github.com/twolfson/spritesmith
const fs = require('fs')
const path = require('path')

const sprites = ['./loaders/images/one.png', './loaders/images/two.png']

Spritesmith.run({ src: sprites }, function handleResult (err, result) {

  console.log('result.image',result.image)
  console.log('result.coordinates',result.coordinates)
  console.log('result.properties', result.properties)
  // 输出到指定位置
  fs.writeFileSync(path.join(__dirname,'./dist/sprite.png'),result.image)
});


