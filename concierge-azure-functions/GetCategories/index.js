// Reference to the Azure Storage SDK
console.log('init');
const azure = require('azure-storage');

console.log('packages loaded');
// The TableService is used to send requests to the database
const tableService = azure.createTableService();
// 
const tableName = "categories";
console.log('table service created');

module.exports = function (context, req) {
    
    tableService.createTableIfNotExists(tableName, (error,result) => {
        if(error) {
            context.error(error);
            context.res = {
                status: 500,
                body: error
            };
            context.done();
        }
        else {
            tableService.queryEntities(tableName, new azure.TableQuery().top(100), null, (error, result,response) => { 
                context.res = {
                    status: 200,
                    body: response.body.value
                };
                context.done();
            });
        }
    });    
};