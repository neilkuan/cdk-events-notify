import * as cdk from '@aws-cdk/core';
import { EeventNotify } from './';


export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'integ-stack', { env });

    new EeventNotify(stack, 'LineEeventNotify');

    this.stack = [stack];
  }
}

process.env.LINE_NOTIFY_TOKEN='mock';

new IntegTesting();