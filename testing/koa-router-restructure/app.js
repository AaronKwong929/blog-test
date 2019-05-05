const Koa = require('koa');
const app = new Koa();
const controller = require('./controller.js');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.log(`app started at port 3000`);