// import path from "path";
// var path = require('../node_modules/path/path')
(function () {
  const modules = {
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/index.js':
      function (require, exports) {
        let action = require('./action.js').action;
        let name = require('./name.js').name;
        require('./style.css');
        let message = `${name} is ${action}`;
        console.log(message);
      },
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/action.js':
      function (require, exports) {
        exports.action = 'making webpack';
      },
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/name.js':
      function (require, exports) {
        let familyName = require('./family-name.js').familyName;
        exports.name = `${familyName} demi`;
      },
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/family-name.js':
      function (require, exports) {
        exports.familyName = 'huhu';
      },
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/style.css':
      function (require, exports) {
        const str = 'body {\n    background-color: red;\n}';
        exports = str;
      },
  };
  const exec = function (moduleId) {
    const fn = modules[moduleId];
    let exports = {};
    const require = function (filepath) {
      // const dir = path.dirname(moduleId);
      // const filepath_abs = path.join(dir, filepath);
      // return exec(filepath_abs);
      return exec(filepath);
    };
    fn(require, exports);
    return exports;
  };
  exec(
    '/Users/hudaiyan/myProject/front-end/javascript/webpack/demo/src/index.js'
  );
})();
