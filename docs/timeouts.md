# Timeouts

## session.getTimeouts()

Gets timeout durations associated with the current session.

**RETURNS**

Promise&lt;[Timeouts](#timeouts)&gt;

**EXAMPLES**

```typescript
const timeout = await session.getTimeouts();
// timeout = {
//   script: 30000,
//   pageLoad: 60000,
//   implicit: 40000
// }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-timeouts)

## session.setTimeouts(timeout)

Configure the amount of time that a particular type of operation can execute for before
they are aborted and a Timeout error is returned to the client.

**PARAMETERS**

- `timeout`: [Timeouts](#timeouts) - Session timeout configuration object

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.setTimeouts({
  script: 30000,
  pageLoad: 60000,
  implicit: 40000
});
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-timeouts)

## Timeouts

WebDriver Timeout configuration object

**PROPERTIES**

- `script?`: number - Session script timeout in milliseconds.
Determines when to interrupt a script that is being evaluated.
- `pageLoad?`: number - Session page load timeout in milliseconds.
Provides the timeout limit used to interrupt navigation of the browsing context.
- `implicit?`: number - Session implicit wait timeout in milliseconds.
Gives the timeout of when to abort locating an element.