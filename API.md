# API Reference

**Classes**

Name|Description
----|-----------
[EventNotify](#cdk-events-notify-eventnotify)|Event Notfiy Construct Class.


**Structs**

Name|Description
----|-----------
[EventNotifyProps](#cdk-events-notify-eventnotifyprops)|event notify interface.


**Interfaces**

Name|Description
----|-----------
[ISlackEventNotify](#cdk-events-notify-islackeventnotify)|slack event notify interface.



## class EventNotify 🔹 <a id="cdk-events-notify-eventnotify"></a>

Event Notfiy Construct Class.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new EventNotify(scope: Construct, id: string, props?: EventNotifyProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EventNotifyProps](#cdk-events-notify-eventnotifyprops)</code>)  *No description*
  * **lineNotifyToken** (<code>string</code>)  Line Notify Token for Lambda send notify permission. __*Default*__: none
  * **slack** (<code>[ISlackEventNotify](#cdk-events-notify-islackeventnotify)</code>)  Notify target to Slack channel. __*Default*__: none




## struct EventNotifyProps 🔹 <a id="cdk-events-notify-eventnotifyprops"></a>


event notify interface.



Name | Type | Description 
-----|------|-------------
**lineNotifyToken**?🔹 | <code>string</code> | Line Notify Token for Lambda send notify permission.<br/>__*Default*__: none
**slack**?🔹 | <code>[ISlackEventNotify](#cdk-events-notify-islackeventnotify)</code> | Notify target to Slack channel.<br/>__*Default*__: none



## interface ISlackEventNotify 🔹 <a id="cdk-events-notify-islackeventnotify"></a>


slack event notify interface.

### Properties


Name | Type | Description 
-----|------|-------------
**slackChannelName**🔹 | <code>string</code> | slack Channel Name for Lambda send message to slack.
**slackWebhookUrl**🔹 | <code>string</code> | slack Webhook Url for Lambda send message to slack.



