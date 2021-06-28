// const mongoose = require('mongoose');
// //连接数据库
// mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]')
// .then(()=> console.log('数据库链接成功'))
// .catch((err)=> console.log(err,'数据库链接失败'))
let mongoose = require('mongoose');

　　let Users = mongoose.model('users', new mongoose.Schema({  
      　　email: String,   
      　　pwd: String
    },{_id:true}));

　　module.exports =  Users;