const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {
        let query = "SELECT * FROM users WHERE user = ? and password = ?";
	    console.log('About to run this query.', query);
        console.log('ctx.params.user is', ctx.params.user);
        console.log('ctx.params.password is', ctx.params.password);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.user, ctx.params.password]
                }, (error, tuples) => {
                    if (error) {
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
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

    async updateLock(ctx) {
        return new Promise((resolve, reject) => {
        let query = "update AdvisingTimes set isLocked = 1 where startDate < DATE_SUB(NOW(), INTERVAL -1 DAY) and NOW();";
            dbConnection.query(
                {
                    sql: query,
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

module.exports = LoginController;
