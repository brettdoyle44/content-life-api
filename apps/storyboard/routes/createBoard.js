import * as uuid from 'uuid';
import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.boardTable,
    Item: {
      storyId: data.storyId,
      boardId: uuid.v1(),
      image: data.image,
      script: data.script,
      actions: data.actions,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
