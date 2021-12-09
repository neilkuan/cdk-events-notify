import '@aws-cdk/assert/jest';
import * as cdk from 'aws-cdk-lib';
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
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Code: {
      S3Bucket: {
        'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
      },
      S3Key: '87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435.zip',
    },
    Role: {
      'Fn::GetAtt': [
        'testinglambdafunServiceRole62CC8ACF',
        'Arn',
      ],
    },
    Environment: {
      Variables: {
        LINE_NOTIFY_TOKEN: 'mock',
        SLACK_WEBHOOK_URL: 'mock',
        SLACK_CHANNEL_NAME: 'mock',
      },
    },
    Handler: 'linenotify.lambda_handler',
    Runtime: 'python3.8',
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
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Code: {
      S3Bucket: {
        'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
      },
      S3Key: '87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435.zip',
    },
    Role: {
      'Fn::GetAtt': [
        'testinglambdafunServiceRole62CC8ACF',
        'Arn',
      ],
    },
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
  expect(stack).toHaveResourceLike('AWS::Lambda::Function', {
    Code: {
      S3Bucket: {
        'Fn::Sub': 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
      },
      S3Key: '87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435.zip',
    },
    Role: {
      'Fn::GetAtt': [
        'testinglambdafunServiceRole62CC8ACF',
        'Arn',
      ],
    },
    Environment: {
      Variables: {
        LINE_NOTIFY_TOKEN: 'mock',
        SLACK_WEBHOOK_URL: 'none',
        SLACK_CHANNEL_NAME: 'none',
      },
    },
  });
});