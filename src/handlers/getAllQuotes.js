const { dynamoDb } = require('../connectors/dynamo'),
    sendCallback = require('../utils/sendCallback');

module.exports.quotes = (event, context, callback) => {
    const params = {
        TableName : process.env.QUOTES_TABLE
    }

    dynamoDb.scan(params, (err, data) => {
        if(err){
            console.error('Dynamo DB Get All Batch Error : ', err)
            sendCallback(callback, err.statusCode || 501, 'DynamoDB Table Batch Get Failure')
            return;
        }

        sendCallback(callback, 200, JSON.stringify(data.Items))
    })
}