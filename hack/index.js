const Koa = require('koa');
const static = require('koa-static');
const chalk = require('chalk');

const log = contents => {
  console.log(chalk.red(contents));
};

const app = new Koa();

app.use(static(__dirname + '/'));

app.use(async (ctx, next) => {
  log('cookie', ctx.request.query);
  await next();
});

app.listen(4000);