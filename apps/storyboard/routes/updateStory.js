import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.storyTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      storyId: event.pathParameters.id,
    },
    UpdateExpression: 'SET header = :header, details = :details',
    ExpressionAttributeValues: {
      ':header': data.header || null,
      ':details': data.details || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
