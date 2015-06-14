var app = require('../app');
var async = require('async')
var Post = app.models.posts;
var User = app.models.users;

exports.clearDb = function (done) {
  var callback = function (item, fn) { item.remove(fn) }

  async.parallel([
    function (cb) {
      User.find().exec(function (err, users) {
        async.forEach(users, callback, cb)
      })
    },
    function (cb) {
      Post.find().exec(function (err, apps) {
        async.forEach(apps, callback, cb)
      })
    }
  ], done)
}
