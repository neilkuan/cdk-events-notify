from logging import getLogger, INFO
from urllib.error import URLError, HTTPError
import json
import os
import urllib.request

logger = getLogger()
logger.setLevel(INFO)


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
    ## Check user_identity and type
    user_identity = event.get('detail').get('userIdentity')
    user_identity_type = event.get('detail').get('userIdentity').get('type')
    user_name = 'None'
    if user_identity_type == 'IAMUser':
        user_name = user_identity.get('userName', 'userName_notfound')
    elif user_identity_type == 'AssumedRole':
        user_name = user_identity.get('principalId', 'userName_notfound')
    elif user_identity_type == 'Root':
        user_name = user_identity.get('arn', 'root_name_notfound')
    else:
        user_name = f"{user_identity.get('userName')} {user_identity.get('principalId')} {user_identity.get('arn')}"
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

    channel = os.environ.get('SLACK_CHANNEL_NAME')
    webhook = os.environ.get('SLACK_WEBHOOK_URL')

    if event_name == 'CheckMfa':
        print("Just Check Mfa")
        return
    if event_name == 'SwitchRole':
        switch_role = event.get('detail').get('additionalEventData').get('SwitchTo', 'SwitchTo_not_found')
        msg = msg + "\n" + "Switch To : " + switch_role
        if switch_role != 'SwitchTo_not_found':
            slackNotifyMessage(channel, webhook, msg)
    elif event_name == 'ExitRole':
        switch_role = event.get('detail').get('additionalEventData').get('SwitchFrom', 'SwitchFrom_not_found')
        msg = msg + "\n" + "Switch From : " + switch_role
        if switch_role != 'SwitchFrom_not_found':
            slackNotifyMessage(channel, webhook, msg)
    elif event_name == 'ConsoleLogin':
        slackNotifyMessage(channel, webhook, msg)
