//name: jevan smith

const Authorize = require('../app/Authorize.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    return ctx.body = 'What is up?';
});


/*
|--------------------------------------------------------------------------
| Students router
|--------------------------------------------------------------------------
|
| Description
|
*/

const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.post('/:user/:password', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

const AdvisingController = new (require('../app/Controllers/AdvisingController.js'))();
const AdvisingRouter = require('koa-router')({
    prefix: '/Advising'
});
AdvisingRouter.post('/AddTime/:id/:day/:starttime/:endtime/:timeblock', AdvisingController.addTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/GetTime/:id', AdvisingController.getTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.delete('/DeleteTime/:uniId', AdvisingController.deleteTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));

const StudentController = new (require('../app/Controllers/StudentController.js'))();
const StudentRouter = require('koa-router')({
    prefix: '/Student'
});
StudentRouter.get('/AdvisorLookup/:id', StudentController.advisorLookup, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getAdvisingTimes/:id/', StudentController.getAdvisorAdvisingSchedule, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getAdvisorID/:user_id', StudentController.getAdvisorID, (err) => console.log("routers.js: StudentRouter error:", err));
/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    AdvisingRouter.routes(),
    StudentRouter.routes(),
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
