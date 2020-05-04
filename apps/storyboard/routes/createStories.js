import * as uuid from 'uuid';
import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.storyTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      storyId: uuid.v1(),
      header: data.header,
      details: data.details,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
