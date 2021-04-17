import * as path from 'path';
import * as events from '@aws-cdk/aws-events';
import * as target from '@aws-cdk/aws-events-targets';
import * as _lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface EventNotifyProps {
  /**
   * Line Notify Token for Lambda send notify permisson.
   */
  readonly lineNotifyToken?: string;
}

export class EventNotify extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: EventNotifyProps) {
    super(scope, id);

    const lineNotifyToken = props?.lineNotifyToken ?? (this.node.tryGetContext('LINE_NOTIFY_TOKEN') || process.env.LINE_NOTIFY_TOKEN);
    if (!lineNotifyToken) {
      throw new Error('missing LINE_NOTIFY_TOKEN in the context variable');
    }

    const lambdaFun = new _lambda.Function(this, 'lambda_fun', {
      handler: 'linenotify.lambda_handler',
      code: _lambda.Code.fromAsset(path.join(__dirname, '../function') ),
      runtime: _lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.minutes(3),
      logRetention: logs.RetentionDays.THREE_DAYS,
      environment: {
        LINE_NOTIFY_TOKEN: lineNotifyToken,
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