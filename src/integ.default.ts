import * as cdk from 'aws-cdk-lib';
import { EventNotify } from './';


const app = new cdk.App();

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const stack = new cdk.Stack(app, 'integ-stack', { env });

new EventNotify(stack, 'LineslackEventNotify', {
  lineNotifyToken: process.env.LINE_NOTIFY_TOKEN,
  slack: {
    slackChannelName: `${process.env.SLACK_CHANNEL_NAME}`,
    slackWebhookUrl: `${process.env.SLACK_WEBHOOK_URL}`,
  },
});