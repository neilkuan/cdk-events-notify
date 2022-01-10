from logging import getLogger, INFO
from urllib.error import URLError, HTTPError
import json
#import boto3
import os
from base64 import b64decode
import logging
import json
import urllib.request
import urllib.parse

logger = getLogger()
logger.setLevel(INFO)

TOKEN = os.environ['LINE_NOTIFY_TOKEN']

# for use kms ECRYPTED token .
#DECRYPTED = boto3.client('kms').decrypt(
#  CiphertextBlob=b64decode(token),
#  EncryptionContext={
#    'LambdaFunctionName': os.environ['AWS_LAMBDA_FUNCTION_NAME']
#    })['Plaintext'].decode('utf-8')
# example console login event https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event.html#eb-console-event-type

def lineNotifyMessage(token, msg):
    prepayload = {'message': msg}
    payload = urllib.parse.urlencode(prepayload).encode('utf8')
    headers = {
      'Authorization': 'Bearer {token}'.format(token=token),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    req = urllib.request.Request("https://notify-api.line.me/api/notify",
     data=payload, headers=headers)
    response = 1
    try:
        with urllib.request.urlopen(req) as res:
            res.read()
            logger.info("Message posted.")
    except HTTPError as err:
        logger.error("Request failed: %d %s", err.code, err.reason)
    except URLError as err:
        logger.error("Server connection failed: %s", err.reason)
    else:
        response = 0
    return response

def slackNotifyMessage(channel, webhook, msg):
    prepayload = {
        'channel_id': channel,
        'text': msg}
    payload = json.dumps(prepayload).encode('utf8')
    headers = {
      'Content-Type': 'application/json'
    }
    req = urllib.request.Request(webhook,
     data=payload, headers=headers)
    response = 1
    try:
        with urllib.request.urlopen(req) as res:
            res.read()
            logger.info("Message posted.")
    except HTTPError as err:
        logger.error("Request failed: %d %s", err.code, err.reason)
    except URLError as err:
        logger.error("Server connection failed: %s", err.reason)
    else:
        response = 0
    return response

def lambda_handler(event, context):

    event_name = event.get('detail').get('eventName', 'eventName_notfound')
    region = event.get('detail').get('awsRegion', 'awsRegion_notfound')
    source_ip = event.get('detail').get('sourceIPAddress', 'sourceIPAddress_notfound')
    user_name = event.get('detail').get('userIdentity').get('userName', 'userName_notfound')
    account_id = event.get('account', 'account_notfound')
    response_elements = event.get('detail').get('responseElements', 'responseElements_notfound')

    msg = f'''
    Login Log
    Event Name : {event_name}
    Account ID : {account_id}
    Region : {region}
    User Name : {user_name}
    Source IP : {source_ip}
    Action :
        {list(response_elements.keys())[0]} {list(response_elements.values())[0]}
    '''
    
    if TOKEN != 'none':
        if event_name == 'CheckMfa':
            print("Just Check Mfa")
        if event_name == 'SwitchRole':
            swithch_role = event.get('detail').get('additionalEventData').get('SwitchTo', 'SwitchTo_not_found')
            msg = msg + "\n" + "Switch To : " + swithch_role
            if swithch_role == 'SwitchTo_not_found':
                print('SwitchTo_not_found')
            else:
                lineNotifyMessage(TOKEN, msg)
        if event_name == 'ExitRole':
            swithch_role = event.get('detail').get('additionalEventData').get('SwitchFrom', 'SwitchFrom_not_found')
            msg = msg + "\n" + "Switch From : " + swithch_role
            if swithch_role == 'SwitchFrom_not_found':
                print('SwitchFrom_not_found')
            else:
                lineNotifyMessage(TOKEN, msg)
        if event_name == 'ConsoleLogin':
            msg = msg
            lineNotifyMessage(TOKEN, msg)
    if os.environ.get('SLACK_CHANNEL_NAME') != 'none' and os.environ.get('SLACK_WEBHOOK_URL') != 'none':
        if event_name == 'CheckMfa':
            print("Just Check Mfa")
        if event_name == 'SwitchRole':
            swithch_role = event.get('detail').get('additionalEventData').get('SwitchTo', 'SwitchTo_not_found')
            msg = msg + "\n" + "Switch To : " + swithch_role
            if swithch_role == 'SwitchTo_not_found':
                print('SwitchTo_not_found')
            else:
                slackNotifyMessage(os.environ.get('SLACK_CHANNEL_NAME'), os.environ.get('SLACK_WEBHOOK_URL'), msg)
        if event_name == 'ExitRole':
            swithch_role = event.get('detail').get('additionalEventData').get('SwitchFrom', 'SwitchFrom_not_found')
            msg = msg + "\n" + "Switch From : " + swithch_role
            if swithch_role == 'SwitchFrom_not_found':
                print('SwitchFrom_not_found')
            else:
                slackNotifyMessage(os.environ.get('SLACK_CHANNEL_NAME'), os.environ.get('SLACK_WEBHOOK_URL'), msg)
        if event_name == 'ConsoleLogin':
            msg = msg
            slackNotifyMessage(os.environ.get('SLACK_CHANNEL_NAME'), os.environ.get('SLACK_WEBHOOK_URL'), msg)