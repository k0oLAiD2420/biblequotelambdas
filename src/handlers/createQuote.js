const uuid = require('uuid'),
    { dynamoDb } = require('../connectors/dynamo'),
    sendCallback = require('../utils/sendCallback')

module.exports.create = (event, context, callback) => {
    const timeStamp = new Date().getTime(),
        data = JSON.parse(event.body);

    if(data === null){
        console.error('Validation Failed');
        sendCallback(callback, 400, 'Validation Failed')
        return;
    }

    console.log('DATA : ", ', data)
    const params = {
        TableName: process.env.QUOTES_TABLE,
        Item: {
            quoteId: uuid.v1(),
            quote: data.quote,
            book: data.book,
            chapter: data.chapter,
            verse: data.verse,
            createAt: timeStamp
        }
    }

    dynamoDb.put(params, (err) => {
      if(err){
          console.error('Dynamo DB Put Error : ', err)
          sendCallback(callback, err.statusCode || 501, 'DynamoDB Table Put Failure')
          return;
      }

      sendCallback(callback, 200, JSON.stringify(params.Item))
    })
}