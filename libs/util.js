'use strict'
/**
 * Created by crazy on 17-5-30.
 */

var fs = require('fs')
var Promise = require('bluebird')

exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

exports.readFileAsync = function (fpath, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, content, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}
