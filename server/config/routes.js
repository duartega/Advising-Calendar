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
loginRouter.get('/:user/:password', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));
loginRouter.get('/updateLock', LoginController.updateLock, (err) => console.log("routers.js: loginRouter error:", err));

const AdvisingController = new (require('../app/Controllers/AdvisingController.js'))();
const AdvisingRouter = require('koa-router')({
    prefix: '/Advising'
});
AdvisingRouter.post('/AddTime/:id/:day/:starttime/:endtime/:timeblock/:startdate/:enddate', AdvisingController.addTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/GetTime/:id', AdvisingController.getTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.delete('/DeleteTime/:uniId', AdvisingController.deleteTimes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.delete('/UpdateTime/:uniId', AdvisingController.UpdateTime, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/RegisteredAppointments/:_instructor_id', AdvisingController.GetAppointments, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/getStudentName/:_student_id', AdvisingController.GetStudentName, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.post('/notifyStudent/:studentId', AdvisingController.notifyStudent, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/GetAllUsers', AdvisingController.getAllUsers, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/MyAdvisees/:_instructor_id', AdvisingController.GetMyAdvisees, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/GetStudentInfo/:fname', AdvisingController.GetStudentInfo, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.post('/addNote/:advisorid/:id/:fname/:lname/:note', AdvisingController.addNote, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/getNotes/:advisorid', AdvisingController.getNotes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.delete('/deleteNotes/:uniId', AdvisingController.deleteNotes, (err) => console.log("routers.js: AdvisingRouter error:", err));
AdvisingRouter.get('/getAppointmentHistory/:_instructor_id', AdvisingController.getAppointmentHistory, (err) => console.log("routers.js: AdvisingRouter error:", err));


const StudentController = new (require('../app/Controllers/StudentController.js'))();
const StudentRouter = require('koa-router')({
    prefix: '/Student'
});
StudentRouter.get('/AdvisorLookup/:id', StudentController.advisorLookup, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getAdvisingTimes/:id/', StudentController.getAdvisorAdvisingSchedule, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getAdvisorID/:user_id', StudentController.getAdvisorID, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getStudentAppointements/:id/', StudentController.getStudentAppointements, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.post('/AddAppointment/:_uniId/:_student_id', StudentController.AddAppointment, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.delete('/DeleteAppointment/:_uniId/:_student_id', StudentController.DeleteAppointment, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getProfessorName/:_student_id', StudentController.getProfessorName, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getAppointmentHistory/:_student_id', StudentController.getAppointmentHistory, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.get('/getNotifications/:user_id', StudentController.getNotifications, (err) => console.log("routers.js: StudentRouter error:", err));
StudentRouter.post('/deleteNotifications/:studentId', StudentController.deleteNotifications, (err) => console.log("routers.js: StudentRouter error:", err));

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
