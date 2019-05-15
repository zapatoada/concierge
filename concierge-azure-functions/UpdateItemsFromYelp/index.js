// Reference to the Azure Storage SDK
const azure = require('azure-storage');
const axios = require('axios');

const tableService = azure.createTableService();
const tableName = "items";
var items;

function updateFromYelp(i) {
    var item = items[i];
    console.info(`updating from yelp ${i} of ${items.length}: ${item.name}`);
    axios({
        url: `https://api.yelp.com/v3/businesses/search?term=${item.yelpName || item.name}&limit=1&latitude=37.5512547&longitude=-77.4754632&radius=8046`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 7LMArurC0H2B9OXlr5iqsSCP_5xQEXAnuRPBibqth_NVOiL2Z8wi4jBTNLj1lD7Kx0GeHYbJpojEg-v5zhlzMZ2eCxk9n9UmNq8_s8z3r1JfNoDGP1b8WQWVBw72W3Yx'
        }
    }).then(d => {
        
        if (d && d.data && d.data.businesses && d.data.businesses.length) {
            item.image_url = d.data.businesses[0].image_url;
            item.rating = d.data.businesses[0].rating;
            item.price = d.data.businesses[0].price;

            tableService.replaceEntity(tableName, item, function(error, result, response){
                if(i>0) updateFromYelp(i-1);
              });
        } else {
            if(i>0) updateFromYelp(i-1);
        }
    }).catch(p => { console.error(p); if(i>0) updateFromYelp(i-1); })
}

module.exports = function (context, myTimer) {
    /*tableService.createTableIfNotExists(tableName, (error, result) => {
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
                items = response.body.value;
                updateFromYelp(items.length-1);
            });
        }
    });*/
};