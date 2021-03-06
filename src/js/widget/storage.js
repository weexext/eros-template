var storage = weex.requireModule('bmStorage'),
    modal = weex.requireModule('bmModal')

import _isFunction from 'lodash/isFunction'
import _isNumber from 'lodash/isNumber'

var Storage = Object.create(null)

Storage.install = (Vue, options) => {
    Vue.prototype.$storage = {
        set(key, value, callback) {
            return new Promise((resolve, reject) => {
                _isNumber(value) && value.toString()
                storage.setData(key.toString(), value, ({status, data, errorMsg}) => {
                    _isFunction(callback) && callback.call(this, status == 0)
                    status == 0 ? resolve(true) : reject(false)
                })
            })
        },
        setSync(key, value) {
            _isNumber(value) && value.toString()
            return storage.setDataSync(key.toString(), value)
        },
        get(key, callback) {
            return new Promise((resolve, reject) => {
                storage.getData(key.toString(), ({status, data, errorMsg}) => {
                    _isFunction(callback) && callback.call(this, status == 0)
                    status == 0 ?  resolve(true) : reject(false)
                })
            })
        },
        getSync(key) {
            let {status, data, errorMsg} = storage.getDataSync(key.toString())
            return status == 0 ?  JSON.parse(data) : false
        },
        delete(key, callback) {
            return new Promise((resolve, reject) => {
                storage.deleteData(key.toString(), ({status, data, errorMsg}) => {
                    _isFunction(callback) && callback.call(this, status == 0)
                    status == 0 ?  resolve(true) : reject(false)
                })
            })
        },
        deleteSync(key) {
            let {status, data, errorMsg} = storage.deleteDataSync(key.toString())
            return status == 0
        },
        removeAll(callback) {
            return new Promise((resolve, reject) => {
                storage.removeData(({status, data, errorMsg}) => {
                    _isFunction(callback) && callback.call(this, status == 0)
                    status == 0 ?  resolve(true) : reject(false)
                })
            })
        },
        removeAllSync() {
            let {status, data, errorMsg} = storage.removeDataSync()
            return status == 0
        }
    }
}

Vue.use(Storage)