const mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongode://localhost/商品')
.then(()=> console.log('数据库链接成功'))
.catch((err)=> console.log(err,'数据库链接失败'))