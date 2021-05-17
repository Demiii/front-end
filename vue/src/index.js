import {initMixin} from './init'
// vue的核心代码，只是vue的声明
function Vue(options) {
    this._init(options)
}

initMixin(Vue)

export default Vue; 