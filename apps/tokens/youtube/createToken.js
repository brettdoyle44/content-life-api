import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.googleTokenStore,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      googleToken: data.googleToken,
      googleRefreshToken: data.googleRefreshToken,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
