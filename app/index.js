const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const views = require('koa-views');

require('./utils/mongoose');
const UserModel = require('./models/user');

const {
  checkPassword
} = require('./utils/checkLogin');



const app = new Koa();

app.keys = ['some secret'];

app.use(static(__dirname + '/'));
app.use(bodyParser());
app.use(session({
  key: 'koa.sess',
  maxAge: 86400000,
  httpOnly: false,
  signed: false,
}, app));

app.use(views(__dirname + '/views', {
  map: {
    html: 'handlebars',
  }
}));

router.post('/login', async (ctx) => {
  const {
    body: {
      username,
      password,
    }
  } = ctx.request

  // 检验账号密码
  if (!(await checkPassword({
      username,
      password,
    }))) {
    ctx.body = {
      message: '账号或者密码不对'
    }
    return;
  }

  ctx.session.userinfo = {
    username,
    password
  };
  ctx.body = {
    message: "登录成功"
  }
})

router.post('/register', async (ctx, next) => {
  const {
    body: {
      username,
      password,
    }
  } = ctx.request

  await UserModel.create({
    username,
    password
  })
  ctx.body = {
    message: "注册成功",
  }
})

router.get('/comment', async (ctx) => {
  await ctx.render('comment', {
    hello: 'hello',
  })
});

router.get('/', async (ctx) => {
  await ctx.render('index', {
    hello: '<script>alert(1)</script>',
  })
});

app.use(async (ctx, next) => {
  if (ctx.url.indexOf('login') > -1 || ctx.url.indexOf('register') > -1) {
    await next()
  } else {
    if (!ctx.session.userinfo) {
      ctx.body = {
        message: "未登陆"
      }
    } else {
      await next()
    }
  }
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);