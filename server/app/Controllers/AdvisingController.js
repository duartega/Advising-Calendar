const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class AdvisingController {
    async addTimes(ctx) {
        console.log("THIS IS IN ADVISING CONTROLLER");
        return new Promise((resolve, reject) => {
        let query = "INSERT INTO AdvisingTimes (id, Day, StartTime, EndTime, TimeBlock, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?);";
	    console.log('About to run this query.', query);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.day, ctx.params.starttime, ctx.params.endtime, ctx.params.timeblock, ctx.params.startdate, ctx.params.enddate]
                }, (error) => {
                    if (error) {
                        return reject(error);
                    }
                }
                
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async addNote(ctx) {
        return new Promise((resolve, reject) => {
        let query = "INSERT INTO AdvisorNotes (advisorid, id, fname, lname, note) VALUES (?, ?, ?, ?, ?);";
	    console.log('About to run this query.', query);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.advisorid, ctx.params.id, ctx.params.fname, ctx.params.lname, ctx.params.note]
                }, (error) => {
                    if (error) {
                        return reject(error);
                    }
                }
                
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async getTimes(ctx) {
        return new Promise((resolve, reject) => {
        let query = "select * from AdvisingTimes where startDate >= date(SYSDATE()) and id = ?;";
	    console.log('About to run this query.', query);
        console.log('ctx.params.id is', ctx.params.id);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.id]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async deleteTimes(ctx) {
        return new Promise((resolve, reject) => {
        let query = "Delete from AdvisingTimes where uniId = ?";
	    console.log('About to run this query.', query);
        console.log('ctx.params.uniId is', ctx.params.uniId);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.uniId]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async getAppointmentHistory(ctx) {
        return new Promise((resolve, reject) => {
        let query = "call advisorAppointmentHistory(?)";
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params._instructor_id]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async UpdateTime(ctx) {
        return new Promise((resolve, reject) => {
        let query = "UPDATE AdvisingTimes set Student_ID_Registered = NULL where uniId = ?";
	    console.log('About to run this query.', query);
        console.log('ctx.params.uniId is', ctx.params.uniId);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.uniId]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async GetAppointments(ctx) {
        return new Promise((resolve, reject) => {
        let query = "call getRegisteredAppointments(?)";
	    console.log('About to run this query.', query);
        console.log('ctx.params.id is', ctx.params.id);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params._instructor_id]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async GetStudentName(ctx) {
        return new Promise((resolve, reject) => {
        let query = "select fname, lname from users where id = ?;"
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params._student_id]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async notifyStudent(ctx) {
        return new Promise((resolve, reject) => {
        let query = "UPDATE cs386_jsmith.users SET notify = 1 WHERE id = ?";
	    console.log('About to run this query.', query);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.studentId]
                }, (error) => {
                    if (error) {
                        return reject(error);
                    }
                }
                
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

    async getAllUsers(ctx) {
        return new Promise((resolve, reject) => {
        let query = "SELECT id, user, fname, lname FROM cs386_jsmith.users WHERE role = 0";
	    console.log('About to run this query.', query);
        dbConnection.query(
            {
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async GetMyAdvisees(ctx) {
        return new Promise((resolve, reject) => {
            console.log("TIS TEST", ctx.params)
        let query = "select user_id, fName, lName from students where instructor_id = ?;";
	    console.log('About to run this query.', query);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params._instructor_id]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }


    async GetStudentInfo(ctx) {
        return new Promise((resolve, reject) => {
        let query = "SELECT id, user, fname, lname FROM users WHERE role = 0 and fname = ?;";
	    console.log('About to run this query.', query);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.fname]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async getNotes(ctx) {
        return new Promise((resolve, reject) => {
        let query = "SELECT * FROM AdvisorNotes WHERE advisorId = ?;";
	    console.log('About to run this query.', query);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.advisorid]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }

    async deleteNotes(ctx) {
        return new Promise((resolve, reject) => {
        let query = "Delete from AdvisorNotes where uniId = ?";
	    console.log('About to run this query.', query);
        console.log('ctx.params.uniId is', ctx.params.uniId);
        dbConnection.query(
            {
                sql: query,
                values: [ctx.params.uniId]
            }, (error, tuples) => {
                if (error) {
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));

    }
}

module.exports = AdvisingController;
