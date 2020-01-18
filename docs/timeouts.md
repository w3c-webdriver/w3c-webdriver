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

- `script?`: number
- `pageLoad?`: number
- `implicit?`: number
