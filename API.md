# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### EventNotify <a name="EventNotify" id="cdk-events-notify.EventNotify"></a>

Event Notfiy Construct Class.

#### Initializers <a name="Initializers" id="cdk-events-notify.EventNotify.Initializer"></a>

```typescript
import { EventNotify } from 'cdk-events-notify'

new EventNotify(scope: Construct, id: string, props?: EventNotifyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-events-notify.EventNotify.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-events-notify.EventNotify.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-events-notify.EventNotify.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-events-notify.EventNotifyProps">EventNotifyProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-events-notify.EventNotify.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-events-notify.EventNotify.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-events-notify.EventNotify.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-events-notify.EventNotifyProps">EventNotifyProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-events-notify.EventNotify.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-events-notify.EventNotify.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-events-notify.EventNotify.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-events-notify.EventNotify.isConstruct"></a>

```typescript
import { EventNotify } from 'cdk-events-notify'

EventNotify.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-events-notify.EventNotify.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-events-notify.EventNotify.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-events-notify.EventNotify.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### EventNotifyProps <a name="EventNotifyProps" id="cdk-events-notify.EventNotifyProps"></a>

event notify interface.

#### Initializer <a name="Initializer" id="cdk-events-notify.EventNotifyProps.Initializer"></a>

```typescript
import { EventNotifyProps } from 'cdk-events-notify'

const eventNotifyProps: EventNotifyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-events-notify.EventNotifyProps.property.lineNotifyToken">lineNotifyToken</a></code> | <code>string</code> | Line Notify Token for Lambda send notify permission. |
| <code><a href="#cdk-events-notify.EventNotifyProps.property.slack">slack</a></code> | <code><a href="#cdk-events-notify.ISlackEventNotify">ISlackEventNotify</a></code> | Notify target to Slack channel. |

---

##### `lineNotifyToken`<sup>Optional</sup> <a name="lineNotifyToken" id="cdk-events-notify.EventNotifyProps.property.lineNotifyToken"></a>

```typescript
public readonly lineNotifyToken: string;
```

- *Type:* string
- *Default:* none

Line Notify Token for Lambda send notify permission.

---

##### `slack`<sup>Optional</sup> <a name="slack" id="cdk-events-notify.EventNotifyProps.property.slack"></a>

```typescript
public readonly slack: ISlackEventNotify;
```

- *Type:* <a href="#cdk-events-notify.ISlackEventNotify">ISlackEventNotify</a>
- *Default:* none

Notify target to Slack channel.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ISlackEventNotify <a name="ISlackEventNotify" id="cdk-events-notify.ISlackEventNotify"></a>

- *Implemented By:* <a href="#cdk-events-notify.ISlackEventNotify">ISlackEventNotify</a>

slack event notify interface.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-events-notify.ISlackEventNotify.property.slackChannelName">slackChannelName</a></code> | <code>string</code> | slack Channel Name for Lambda send message to slack. |
| <code><a href="#cdk-events-notify.ISlackEventNotify.property.slackWebhookUrl">slackWebhookUrl</a></code> | <code>string</code> | slack Webhook Url for Lambda send message to slack. |

---

##### `slackChannelName`<sup>Required</sup> <a name="slackChannelName" id="cdk-events-notify.ISlackEventNotify.property.slackChannelName"></a>

```typescript
public readonly slackChannelName: string;
```

- *Type:* string

slack Channel Name for Lambda send message to slack.

---

##### `slackWebhookUrl`<sup>Required</sup> <a name="slackWebhookUrl" id="cdk-events-notify.ISlackEventNotify.property.slackWebhookUrl"></a>

```typescript
public readonly slackWebhookUrl: string;
```

- *Type:* string

slack Webhook Url for Lambda send message to slack.

---

