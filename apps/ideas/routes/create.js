import * as uuid from 'uuid';
import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.ideaTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      ideaId: uuid.v1(),
      header: data.header,
      details: data.details,
      platform: data.platform,
      currentStatus: data.currentStatus,
      attachments: { SS: [...data.attachments] },
      collaborators: { SS: [...data.collaborators] },
      targetDate: data.targetDate,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
