/*
 * Simple Promise implementation
 * Author:  Edgar Marukyan
 * Company: Peyotto Technologies
 * TODO: Add Promise.all, Promise.each, Promise.coroutine
*/

// Self implementation of promise!
var Promise = function (callback) {
  var self = this
  this.__error
  this.__result

  this.resolve = function (result) {
    self.__result = result
    return this
  }

  this.reject = function (err) {
    console.log('  this.reject')
    self.__error = err
    return self
  }

  this.then = function (tCallback) {
    console.log('  this.then')
    if (self.__error) {
      return self
    }

    self.__result = tCallback(self.__result)
    return self
  }

  this.catch = function (cCallback) {
    console.log('  this.catch')
    if (self.__error) {
      cCallback(self.__error)
    }
    return self
  }

  this.__initialCall = function () {
    console.log('  this.__initialCall')
    callback(self.resolve, self.reject)
    return this
  }

  return this.__initialCall()
}

// Assume we have some callback function that sometimes returns error
function someCallBackFunction (options, cb) {
  if (parseInt(Math.random() * 10, 10) % 2 === 0) {
    var data = {status: 'ok'}
    cb(null, data)
  } else {
    cb('Something wired happened!')
  }
}

// Let's promisify this function
function callbackFunction2Promise () {
  return new Promise(function (resolve, reject) {
    someCallBackFunction({}, function (err, data) {
      if (err) {
        reject(new Error(err))
      } else {
        resolve(data)
      }
    })
  })
}

// Call it !
callbackFunction2Promise().then(data => {
  console.log(data)
}).then(data => {
  console.log(data) // undefined, cos nothing is returned from previous then
  return 1
}).then(data => {
  console.log(data) // 1
}).catch(err => {
  console.log(err.stack)
})
