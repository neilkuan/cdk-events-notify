import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import { EventNotify } from '../src/index';

test('line and slack', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'testing-stack');
  new EventNotify(stack, 'testing', {
    lineNotifyToken: 'mock',
    slack: {
      slackChannelName: 'mock',
      slackWebhookUrl: 'mock',
    },
  });

  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        LINE_NOTIFY_TOKEN: 'mock',
        SLACK_WEBHOOK_URL: 'mock',
        SLACK_CHANNEL_NAME: 'mock',
      },
    },
    Handler: 'linenotify.lambda_handler',
    Runtime: 'python3.12',
    Timeout: 180,
  });
});

test('slack only', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'testing-stack');
  new EventNotify(stack, 'testing', {
    slack: {
      slackChannelName: 'mock',
      slackWebhookUrl: 'mock',
    },
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        LINE_NOTIFY_TOKEN: 'none',
        SLACK_WEBHOOK_URL: 'mock',
        SLACK_CHANNEL_NAME: 'mock',
      },
    },
  });
});

test('line only', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'testing-stack');
  new EventNotify(stack, 'testing', {
    lineNotifyToken: 'mock',
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        LINE_NOTIFY_TOKEN: 'mock',
        SLACK_WEBHOOK_URL: 'none',
        SLACK_CHANNEL_NAME: 'none',
      },
    },
  });
});