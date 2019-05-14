// Reference to the Azure Storage SDK
console.log('init');
const azure = require('azure-storage');

console.log('packages loaded');
// The TableService is used to send requests to the database
const tableService = azure.createTableService();
// 
const tableName1 = "categories";
const tableName2 = "items";
console.log('table service created');

module.exports = function (context, req) {

    tableService.createTableIfNotExists(tableName1, (error, result) => {
        if (error) {
            context.error(error);
            context.res = {
                status: 500,
                body: error
            };
            context.done();
        }
        else {
            tableService.createTableIfNotExists(tableName2, (error, result) => {
                if (error) {
                    context.error(error);
                    context.res = {
                        status: 500,
                        body: error
                    };
                    context.done();
                }
                else {
                    tableService.queryEntities(tableName1, new azure.TableQuery().top(100), null, (error1, result1, response1) => {
                        tableService.queryEntities(tableName2, new azure.TableQuery().top(100), null, (error2, result2, response2) => {
                            var items = response2.body.value;
                            console.info(items[0]);
                            context.res = {
                                status: 200,
                                body: response1.body.value.map(p=> ({
                                    ...p,
                                    items: items.filter(q=>q.category.split(",").indexOf(p.RowKey) >= 0)
                                }))
                            };
                            context.done();
                        });
                    }); 
                }
            });
        }
    });
};