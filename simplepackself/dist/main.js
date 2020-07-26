(function(modules){
      function require(filename){
        var fn = modules[filename];
        var modules = { exprots:{}};

        fn(require,module,module.exports);

        return module.exports;
      }

      require('D:\gitCode\webpack\simplepackself\src\index.js')
    })({'./greeting.js': function(require,module,exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello' + name;
}}})