// Reference to the Azure Storage SDK
const azure = require('azure-storage');
const axios = require('axios');

const tableService = azure.createTableService();
const tableName = "items";

module.exports = function (context, req) {

    tableService.createTableIfNotExists(tableName, (error, result) => {
        if (error) {
            context.error(error);
            context.res = {
                status: 500,
                body: error
            };
            context.done();
        }
        else {
            tableService.queryEntities(tableName, new azure.TableQuery(), null, (error, result, response) => {
                var items = response.body.value.filter(p =>
                    p.category.split(",").indexOf(req.query.category) >= 0
                );

                context.res = {
                    status: 200,
                    body: items
                };
                context.done();

            });
        }
    });
};