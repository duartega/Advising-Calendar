const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class AdvisingController {
    async addTimes(ctx) {
        return new Promise((resolve, reject) => {
        let query = "INSERT INTO AdvisingTimes (id, Day, StartTime, EndTime, TimeBlock) VALUES (?, ?, ?, ?, ?);";
	    console.log('About to run this query.', query);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.day, ctx.params.starttime, ctx.params.endtime, ctx.params.timeblock]
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
        let query = "SELECT * FROM AdvisingTimes WHERE id = ?";
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
        let query = "DELETE FROM AdvisingTimes WHERE uniId = ?";
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
