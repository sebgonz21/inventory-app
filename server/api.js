const express = require('express');
const app = express();
const dynamo = require('./dynamo.js');
const router = express.Router();

router.post('/addItem',(req,res)=>{

    var item = req.body;

    if(item.barcode){

        var param = {
            Item:{
                "barcode":{
                    S:item.barcode
                },
                "name":{
                    S:item.name
                },
                "quantity":{
                    N:item.quantity
                }
            },
            TableName:"Items"
        }

        dynamo.insert(param)
        .then(data =>{            
            res.send('success');
        })
        .catch(err =>{            
            res.send(err);
        });
    }
});


router.get("/getItem/:barcode",(req,res)=>{
    var barcode = req.params.barcode;
    
    var param = {
        Key: {
            "barcode": {
                S: barcode
            }
        }, 
        TableName: "Items"
    };
    
    dynamo.read(param)
    .then(data =>{        
        res.send(data.Item);    
    }).catch(err =>{
        res.send(err);
    }); 
});

module.exports = router;