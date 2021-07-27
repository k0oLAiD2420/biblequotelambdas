const { dynamoDb } = require('../connectors/dynamo'),
    sendCallback = require('../utils/sendCallback');

module.exports.quote = (event, context, callback) => {
    const params = {
        TableName : process.env.QUOTES_TABLE
    }

    dynamoDb.scan(params, (err, data) => {
        if(err){
            console.error('Dynamo DB Get Latest Quote Error : ', err)
            sendCallback(callback, err.statusCode || 501, 'DynamoDB Table Get Single Daily Failure')
            return;
        }

        /*
        Sort the Arry by Created At date with most recent first then grab [0]
         */
        const mostRecentPosting = data.Items.sort((a, b) => b.createAt - a.createAt)[0]

        sendCallback(callback, 200, JSON.stringify(mostRecentPosting))
    })
}