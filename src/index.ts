import * as path from 'path';
import * as events from '@aws-cdk/aws-events';
import * as target from '@aws-cdk/aws-events-targets';
import * as _lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface ISlackEventNotify {
  /**
   * slack Webhook Url for Lambda send message to slack.
   */
  readonly slackWebhookUrl: string;
  /**
   * slack Channel Name for Lambda send message to slack.
   */
  readonly slackChannelName: string;

}

export interface EventNotifyProps {
  /**
   * Line Notify Token for Lambda send notify permisson.
   */
  readonly lineNotifyToken?: string | undefined;

  /**
   * Notify target to Slack channel.
   */
  readonly slack?: ISlackEventNotify;
}

export class EventNotify extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: EventNotifyProps) {
    super(scope, id);

    if (!props?.lineNotifyToken && !props?.slack) {
      throw new Error('Please input lineNotifyToken or slack options');
    }

    const lambdaFun = new _lambda.Function(this, 'lambda_fun', {
      handler: 'linenotify.lambda_handler',
      code: _lambda.Code.fromAsset(path.join(__dirname, '../function') ),
      runtime: _lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.minutes(3),
      logRetention: logs.RetentionDays.THREE_DAYS,
      environment: {
        LINE_NOTIFY_TOKEN: props?.lineNotifyToken ? props?.lineNotifyToken : 'none',
        SLACK_WEBHOOK_URL: props?.slack?.slackWebhookUrl ? props?.slack?.slackWebhookUrl : 'none',
        SLACK_CHANNEL_NAME: props?.slack?.slackChannelName ? props?.slack?.slackChannelName : 'none',
      },
    });

    const eventNotifyTarget = new target.LambdaFunction(lambdaFun);
    new events.Rule(this, 'EventBusConsoleLoginEvent', {
      ruleName: 'EventBusConsoleLoginEvent',
      description: 'Console login in specific region',
      targets: [eventNotifyTarget],
      eventPattern: {
        detailType: ['AWS Console Sign In via CloudTrail'],
      },
    });
  }
}