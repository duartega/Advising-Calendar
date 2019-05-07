const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class StudentController {
    async advisorLookup(ctx) {
        return new Promise((resolve, reject) => {
        let query = "SELECT uniID, users.id, fname, lname FROM userAdvisors INNER JOIN users ON userAdvisors.advisorId = users.id WHERE userAdvisors.id = ?;";

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

    async getAdvisorAdvisingSchedule(ctx) {
        return new Promise((resolve, reject) => {
            // Get the advising times based on the instructors i.d that is linked to the students profile
            // Check the sql file for the stored procedure below
            let query = "call getUnfilledAppointementSlots(?)";
           
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

    async getStudentAppointements(ctx) {
        return new Promise((resolve, reject) => {
            // Get the students scheduled appointments
            let query = "select * from AdvisingTimes where Student_ID_Registered = ?;";
           
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

    async AddAppointment(ctx) {
        return new Promise((resolve, reject) => {
            // Get the students scheduled appointments
            let query = "call updateAdvisingTimesWithStudentID(?, ?)";
           
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params._uniId, ctx.params._student_id]
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
            // Get the students scheduled appointments
            let query = "call appointmentHistory(?)";
           
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
    

    

    async DeleteAppointment(ctx) {
        return new Promise((resolve, reject) => {
            // Get the students scheduled appointments
            let query = "call deleteStudentIDFromAdvisingTimes(?, ?)";
           
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params._uniId, ctx.params._student_id]
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

    async getProfessorName(ctx) {
        return new Promise((resolve, reject) => {
            // Get the students scheduled appointments
            let query = "call getProfessorNameByStudentId(?)";
           
            dbConnection.query(
                {
                    sql: query,
                    values: ctx.params._student_id
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

    async getAdvisorID(ctx) {
        return new Promise((resolve, reject) => {
            // Get the advising times by joining the students profile to their instructors i.d.
            let query = "select instructor_id from students where user_id = ?;";

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.user_id]
                }, (error, tuples) => {
                    if (error) {
                        ctx.body = [];
                        ctx.status = 200;
                        return reject(error);
                    }
                    if (tuples.length === 1) {
                        console.log('from LoginController. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                        return resolve();
                    }
                    return reject("No such user.");
                }
                );
            }).catch(err => console.log("Database connection error.", err));
    }

    async getNotifications(ctx) {
        return new Promise((resolve, reject) => {
            // Get the advising times by joining the students profile to their instructors i.d.
            let query = "SELECT notify FROM users WHERE id = ?;";

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.user_id]
                }, (error, tuples) => {
                    if (error) {
                        ctx.body = [];
                        ctx.status = 200;
                        return reject(error);
                    }
                    if (tuples.length === 1) {
                        console.log('from LoginController. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                        return resolve();
                    }
                    return reject("No such user.");
                }
                );
            }).catch(err => console.log("Database connection error.", err));
    }

    async deleteNotifications(ctx) {
        return new Promise((resolve, reject) => {
        let query = "UPDATE cs386_jsmith.users SET notify = 0 WHERE id = ?";
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
}

module.exports = StudentController;

/*
show tables;
select * from users;
select * from Appointments; -- Assuming that id is the instructor id
select * from userAdvisors;
select * from AdvisingTimes; -- Assuming that id is the instructor id
---------------------------------

create table students (user_id int auto_increment primary key, instructor_id int, fName varchar(255), lName varchar(255), UNIQUE(fName, lName));

insert into students values (5, 1, "a", "a");

select a.Day, a.StartTime, a.EndTime, a.TimeBlock
from AdvisingTimes as a
join students as s
on a.id = s.instructor_id;

---------------------------------
select * from users;
insert into users values (5, "a", "a", 0, "Gabe", "Duarte");

-- I assume that role 0 is student and 1 is advisor
desc users;
*/