import * as uuid from 'uuid';
import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.eventTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      eventId: uuid.v1(),
      header: data.header,
      details: data.details,
      startDate: data.startDate,
      endDate: data.endDate,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
