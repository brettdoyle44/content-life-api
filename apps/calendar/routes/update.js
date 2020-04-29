import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      eventId: event.pathParameters.id,
    },
    UpdateExpression:
      'SET header = :header, details = :details, startDate = :startDate, endDate = :endDate',
    ExpressionAttributeValues: {
      ':header': data.header || null,
      ':details': data.details || null,
      ':startDate': data.startDate || null,
      ':endDate': data.endDate || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
