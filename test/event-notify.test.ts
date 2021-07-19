import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
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
        Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3Bucket642DCB0A',
      },
      S3Key: {
        'Fn::Join': [
          '',
          [
            {
              'Fn::Select': [
                0,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
            {
              'Fn::Select': [
                1,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
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
        Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3Bucket642DCB0A',
      },
      S3Key: {
        'Fn::Join': [
          '',
          [
            {
              'Fn::Select': [
                0,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
            {
              'Fn::Select': [
                1,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
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
    Handler: 'linenotify.lambda_handler',
    Runtime: 'python3.8',
    Timeout: 180,
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
        Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3Bucket642DCB0A',
      },
      S3Key: {
        'Fn::Join': [
          '',
          [
            {
              'Fn::Select': [
                0,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
            {
              'Fn::Select': [
                1,
                {
                  'Fn::Split': [
                    '||',
                    {
                      Ref: 'AssetParameters87b9cfa46edf9eec80d013291c5bdae277c3f45d382ff3919f8b76335730f435S3VersionKey65CD780B',
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
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
    Handler: 'linenotify.lambda_handler',
    Runtime: 'python3.8',
    Timeout: 180,
  });
});