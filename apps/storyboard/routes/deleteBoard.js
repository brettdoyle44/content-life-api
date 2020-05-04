import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.boardTable,
    Key: {
      storyId: event.pathParameters.storyId,
      boardId: event.pathParameters.boardId,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
