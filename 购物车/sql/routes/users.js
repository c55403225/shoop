　let mongoose = require('mongoose');
　　let Users = require('../models/Users')
const router = require('koa-router');

// 　　router.post('/register', async function (ctx, next) {
  　　// let email = ctx.request.body['email'];
  　　// let pwd = ctx.request.body['pwd'];
  　　// ctx.body = 'email:'+email+",pwd:"+pwd;
  　　let conn = mongoose.connect('mongodb://localhost/local');
  conn.then((open)=> console.log(open,'数据库链接成功')).catcch(err =>console.log('数据库链接失败') )
  // 　　delete ctx.request.body['repwd'];
  // 　　let users = new Users(ctx.request.body);
  // 　　let rs = await users.save();
  // 　　console.log(rs);
  // 　　ctx.body = rs;
// 　　});