const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27027/loginshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(error => {
  console.log('数据库error', error)
});;
const conn = mongoose.connection;

conn.on('error', () => console.log('数据库连接失败'));
conn.once('open', () => console.log('数据库连接成功'));