let action = require('./action.js').action;
let name = require('./name.js').name;
require('./style.css')
let message = `${name} is ${action}`;
console.log(message)