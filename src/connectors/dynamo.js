const FLAG = process.env.IS_OFFLINE,
    awsDyno = require('aws-sdk').DynamoDB

let dynamoDbOptions = {};

if(FLAG === 'true'){
    dynamoDbOptions = {
        region: 'us-west-2',
        endpoint:'http://0.0.0.0:8000'
    }
    console.info('Dynamo DB Setting up Local ', dynamoDbOptions)
}

const dynamoDb = new awsDyno.DocumentClient(dynamoDbOptions);
module.exports = {dynamoDb};


