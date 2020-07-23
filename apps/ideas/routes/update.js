import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.ideaTable,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      ideaId: event.pathParameters.id,
    },
    UpdateExpression:
      'SET header = :header, details = :details, targetDate = :targetDate, platform = :platform, attachments = :attachments, collaborators = :collaborators',
    ExpressionAttributeValues: {
      ':header': data.header || null,
      ':details': data.details || null,
      ':platform': data.platform || null,
      ':attachments': { SS: [...data.attachments] } || null,
      ':collaborators': { SS: [...data.collaborators] } || null,
      ':targetDate': data.targetDate || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
