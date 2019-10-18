var AWS = require('aws-sdk');

AWS.config.update({     
     region: "us-east-2",
     endpoint:"https://dynamodb.us-east-2.amazonaws.com"
    });
var dynamodb = new AWS.DynamoDB();

var runner = {

    read:function(params){

        // params = {
        //     Key: {
        //         "barcode": {
        //             S: "12345"
        //         }
        //     }, 
        //     TableName: "Items"
        // };

        return new Promise((resolve,reject)=>{
            dynamodb.getItem(params, function(err, data) {
            
                if(err){
                    console.log(err, err.stack); // an error occurred            
                    reject(err);
                }else{
                    console.log(data);           // successful response
                    resolve(data);
                } 
            });
        });
    },

    insert:function(params){

        console.log(params);

        // params = {
        //     Item: {
        //         "barcode":{
        //             "S":"456784"
        //         },
        //         "name":{
        //             "S":"newitem2"
        //         }
        //     }, 
        //     TableName: "Items"
        // };

        return new Promise((resolve,reject)=>{
            dynamodb.putItem(params, function(err, data) {
                if(err){
                    console.log("Error");
                    console.log(err); // an error occurred            
                    reject(err);
                }else{
                    console.log('success');
                    console.log(data);           // successful response
                    resolve(data);
                } 
            });
        });
       
    }
};

module.exports = runner;