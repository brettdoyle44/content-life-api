import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.boardTable,
    Key: {
      storyId: event.pathParameters.storyId,
      boardId: event.pathParameters.boardId,
    },
    UpdateExpression:
      'SET script = :script, actions = :actions, image = :image',
    ExpressionAttributeValues: {
      ':script': data.script || null,
      ':actions': data.actions || null,
      ':image': data.image || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
