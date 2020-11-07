# API Reference

**Classes**

Name|Description
----|-----------
[EeventNotify](#cdk-events-notify-eeventnotify)|*No description*


**Structs**

Name|Description
----|-----------
[EventNotifyProps](#cdk-events-notify-eventnotifyprops)|*No description*



## class EeventNotify 🔹 <a id="cdk-events-notify-eeventnotify"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new EeventNotify(scope: Construct, id: string, props?: EventNotifyProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EventNotifyProps](#cdk-events-notify-eventnotifyprops)</code>)  *No description*
  * **lineNotifyToken** (<code>string</code>)  Line Notify Token for Lambda send notify permisson. __*Optional*__




## struct EventNotifyProps 🔹 <a id="cdk-events-notify-eventnotifyprops"></a>






Name | Type | Description 
-----|------|-------------
**lineNotifyToken**?🔹 | <code>string</code> | Line Notify Token for Lambda send notify permisson.<br/>__*Optional*__



