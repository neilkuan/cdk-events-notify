import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import { EventNotify } from '../src/index';

test('slack notify', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'testing-stack');
  new EventNotify(stack, 'testing', {
    slack: {
      slackChannelName: 'mock',
      slackWebhookUrl: 'mock',
    },
  });

  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', assertions.Match.objectLike({
    Environment: {
      Variables: {
        SLACK_WEBHOOK_URL: 'mock',
        SLACK_CHANNEL_NAME: 'mock',
      },
    },
    Handler: 'notify.lambda_handler',
    Runtime: 'python3.13',
    Timeout: 180,
  }));
});
