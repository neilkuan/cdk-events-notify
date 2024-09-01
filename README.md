[![NPM version](https://badge.fury.io/js/cdk-events-notify.svg)](https://badge.fury.io/js/cdk-events-notify)
[![PyPI version](https://badge.fury.io/py/cdk-events-notify.svg)](https://badge.fury.io/py/cdk-events-notify)
![Release](https://github.com/neilkuan/cdk-s3bucket/workflows/release/badge.svg)

![Downloads](https://img.shields.io/badge/-DOWNLOADS:-brightgreen?color=gray)
![npm](https://img.shields.io/npm/dt/cdk-events-notify?label=npm&color=orange)
![PyPI](https://img.shields.io/pypi/dm/cdk-events-notify?label=pypi&color=blue)

# cdk-events-notify
`cdk-events-notify` is an AWS CDK Construct Library that provides you know who login in your aws console.

## Why
It’s just a small feature at the moment,
Provides you to trigger Lambda Function push notifications to Line Notify or Slack when you discover Console Login event or swith role event through Cloudtrail.

> Welcome to contribute another event notify case you want.

## Overview 
![](./images/overview.png)

### Now support
- Line Notify
- Slack ([webhooks](https://api.slack.com/messaging/webhooks#posting_with_webhooks))

## You need enable one `Management events` in your account.
> more see https://aws.amazon.com/tw/cloudtrail/pricing/
![](./images/management-events.png)
# You need Line Notify access token
> more see [line notify docs](https://notify-bot.line.me/doc/en/) 

![](./images/access-token.png)

## Install
```bash
Use the npm dist tag to opt in CDKv1 or CDKv2:

// for CDKv2
npm install cdk-events-notify
or
npm install cdk-events-notify@latest 
```
## 💡💡💡 please click [here](https://github.com/neilkuan/cdk-events-notify/tree/cdkv1#readme), if you are using aws-cdk v1.x.x version.💡💡💡


## Usage 
```ts
import * as cdk from 'aws-cdk-lib';
import { EventNotify } from 'cdk-events-notify';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'integ-stack', { env });
new EventNotify(stack, 'LineEventNotify', { lineNotifyToken: process.env.LINE_NOTIFY_TOKEN });

```
### To deploy
```bash
cdk deploy
```
### To destroy
```bash
cdk destroy
```
### Finally
- line
  ![](./images/line-chat.jpg)
- slack
  ![](./images/slack.jpg)

## More about EventBridge and Lambda
- [EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/aws-events.html)
- [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
> Note: Event Bridge can not cross region , if you console sign in not the cdk-events-notify region will not get the evnet in cloudtrail see this [docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html#cloudtrail-integration_signin-regions)

## :clap:  Supporters
[![Stargazers repo roster for @neilkuan/cdk-events-notify](https://reporoster.com/stars/neilkuan/cdk-events-notify)](https://github.com/neilkuan/cdk-events-notify/stargazers)
[![Forkers repo roster for @neilkuan/cdk-events-notify](https://reporoster.com/forks/neilkuan/cdk-events-notify)](https://github.com/neilkuan/cdk-events-notify/network/members)
