# User prompts

## session.dismissAlert()

Dismiss the alert in current page

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.dismissAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#dismiss-alert)

## session.acceptAlert()

Accept the alert in current page

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.acceptAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#accept-alert)

## session.getAlertText()

Returns the text from an alert

**RETURNS**

Promise&lt;string&gt;

**EXAMPLES**

```typescript
const alertText = await session.getAlertText();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-alert-text)

## session.sendAlertText(text)

Sets the text field of a prompt to the given value.

**PARAMETERS**

- `text`: string - Text to be set in the input area of alert

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.sendAlertText('Test');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#send-alert-text)