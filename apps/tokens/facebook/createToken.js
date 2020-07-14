import handler from '../../../libs/handler-lib';
import dynamoDb from '../../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tokenStore,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      facebookToken: data.facebookToken,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
