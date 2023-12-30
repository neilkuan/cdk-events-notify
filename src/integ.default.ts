import * as cdk from 'aws-cdk-lib';
import { EventNotify } from './';


const app = new cdk.App();

[
  'us-east-1',
  'ap-northeast-1',
].forEach(region => {
  const stack = new cdk.Stack(app, `integ-stack-${region}`, {
    env: {
      region: region,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
  });
  new EventNotify(stack, 'LineslackEventNotify', {
    lineNotifyToken: process.env.LINE_NOTIFY_TOKEN,
    slack: {
      slackChannelName: `${process.env.SLACK_CHANNEL_NAME}`,
      slackWebhookUrl: `${process.env.SLACK_WEBHOOK_URL}`,
    },
  });
});


