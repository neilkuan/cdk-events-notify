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
        Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3Bucket37136325',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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
        Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3Bucket37136325',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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
        Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3Bucket37136325',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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
                      Ref: 'AssetParameters8b968b75979b6cc7de5d87f7a80f5c8aaa3dca52da755a06f3020ed03beff408S3VersionKey3F6A4D72',
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