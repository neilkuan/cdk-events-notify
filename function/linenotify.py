from logging import getLogger, INFO
from urllib.error import URLError, HTTPError
import json
import boto3
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


def lambda_handler(event, context):
    event_name = event['detail']['eventName']
    region = event['detail']['awsRegion']
    source_ip = event['detail']['sourceIPAddress']
    user_name = event['detail']['userIdentity']['arn']
    account_id = event['account']
    msg = "\n" + "Login Log" + "\n" + "Event :" + event_name + "\n" + "Account ID : " + account_id + "\n" + "Resion : " + region + "\n" + "User Name : " + user_name + "\n" + "Source IP : " + source_ip
    
    
    lineNotifyMessage(TOKEN, msg)