import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const boardListParams = {
    TableName: process.env.boardTable,
    KeyConditionExpression: 'storyId = :storyId',
    ExpressionAttributeValues: {
      ':storyId': event.pathParameters.id,
    },
  };
  try {
    const result = await dynamoDb.query(boardListParams);

    for (const [idx, board] of result.Items.entries()) {
      console.log(idx);
      await dynamoDb.delete({
        TableName: process.env.boardTable,
        Key: {
          storyId: event.pathParameters.storyId,
          boardId: board.boardId,
        },
      });
    }

    const storyParams = {
      TableName: process.env.storyTable,
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        storyId: event.pathParameters.storyId,
      },
    };

    await dynamoDb.delete(storyParams);

    return { status: true };
  } catch (e) {
    console.error(e);
  }
});
