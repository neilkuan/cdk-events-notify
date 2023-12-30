import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as target from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
/**
 * slack event notify interface.
 */
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

/**
 * event notify interface.
 */
export interface EventNotifyProps {
  /**
   * Line Notify Token for Lambda send notify permission.
   *
   * @default - none
   */
  readonly lineNotifyToken?: string | undefined;

  /**
   * Notify target to Slack channel.
   *
   * @default - none
   */
  readonly slack?: ISlackEventNotify;
}

/**
 * Event Notfiy Construct Class.
 */
export class EventNotify extends Construct {
  constructor(scope: Construct, id: string, props?: EventNotifyProps) {
    super(scope, id);

    if (!props?.lineNotifyToken && !props?.slack) {
      throw new Error('Please input lineNotifyToken or slack options');
    }

    const lambdaFun = new lambda.Function(this, 'lambda_fun', {
      handler: 'linenotify.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../function') ),
      runtime: lambda.Runtime.PYTHON_3_12,
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