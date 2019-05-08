
const Koa = require('koa');
const app = new Koa();
const kcors = require('kcors');

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(kcors({ credentials: true}));
const http = require('http');
const API_PORT = 8158

require('./config/routes.js')(app);

const httpsServer = http.createServer(app.callback());
httpsServer.listen(API_PORT, () => console.log(`Listening on HTTPS port ${API_PORT}`));
