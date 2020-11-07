[![NPM version](https://badge.fury.io/js/cdk-events-notify.svg)](https://badge.fury.io/js/cdk-events-notify)
[![PyPI version](https://badge.fury.io/py/cdk-events-notify.svg)](https://badge.fury.io/py/cdk-events-notify)
![Release](https://github.com/guan840912/cdk-s3bucket/workflows/Release/badge.svg)

![Downloads](https://img.shields.io/badge/-DOWNLOADS:-brightgreen?color=gray)
![npm](https://img.shields.io/npm/dt/cdk-events-notify?label=npm&color=orange)
![PyPI](https://img.shields.io/pypi/dm/cdk-events-notify?label=pypi&color=blue)

# cdk-events-notify
cdk-events-notify is an AWS CDK construct library that provides you know who login in your aws console. 
## Welcome to contribute another event notify case you want.
### Now support 
- Line Notify


# You need Line Notify access token
> more see [line notify docs](https://notify-bot.line.me/doc/en/) 

![](./images/access-token.png)

## Usage 
```ts
import * as cdk from '@aws-cdk/core';
import { EeventNotify } from 'cdk-events-notify';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'integ-stack', { env });
new EeventNotify(stack, 'LineEeventNotify', { lineNotifyToken: process.env.LINE_NOTIFY_TOKEN });

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
![](./images/line-chat.jpg)

### Overview 
![](./images/overview.png)

## More about EventBridge and Lambda
- [EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/aws-events.html)
- [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
> Note: Event Bridge can not cross region , if you console sign in not the cdk-events-notify region will not get the evnet in cloudtrail see this [docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html#cloudtrail-integration_signin-regions)

## :clap:  Supporters
[![Stargazers repo roster for @guan840912/cdk-events-notify](https://reporoster.com/stars/guan840912/cdk-events-notify)](https://github.com/guan840912/cdk-events-notify/stargazers)
[![Forkers repo roster for @guan840912/cdk-events-notify](https://reporoster.com/forks/guan840912/cdk-events-notify)](https://github.com/guan840912/cdk-events-notify/network/members)