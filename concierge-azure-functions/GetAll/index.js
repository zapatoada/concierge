// Reference to the Azure Storage SDK
console.log('init');
const azure = require('azure-storage');

console.log('packages loaded');
// The TableService is used to send requests to the database
const tableService = azure.createTableService();
// 
const tableName1 = "categories";
const tableName2 = "items";
const tableName3 = "properties";
const tableName4 = "bookings";
console.log('table service created');

module.exports = function (context, req) {
    const property = req.query.p || "0";

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
                    tableService.createTableIfNotExists(tableName3, (error, result) => {
                        if (error) {
                            context.error(error);
                            context.res = {
                                status: 500,
                                body: error
                            };
                            context.done();
                        }
                        else {
                            tableService.createTableIfNotExists(tableName4, (error, result) => {
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
                                            tableService.queryEntities(tableName3, new azure.TableQuery().top(100), null, (error3, result3, response3) => {
                                                tableService.queryEntities(tableName4, new azure.TableQuery().top(100), null, (error4, result4, response4) => {
                                                    var items = response2.body.value;
                                                    var properties = response3.body.value.filter(p => p.RowKey === property);
                                                    var bookings = response4.body.value.filter(p => p.Property === property && new Date(p.Checkout) > new Date()).sort((a, b) => a.Checkin - b.Checkin);
                                                    console.info(items[0]);
                                                    context.res = {
                                                        status: 200,
                                                        body: {
                                                            categories: response1.body.value.map(p => ({
                                                                ...p,
                                                                items: items.filter(q => q.category.split(",").indexOf(p.RowKey) >= 0)
                                                            })),
                                                            property: properties && properties.length ? properties[0] : null,
                                                            booking: bookings && bookings.length ? bookings[0] : null
                                                        }
                                                    };
                                                    context.done();
                                                });
                                            });
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}