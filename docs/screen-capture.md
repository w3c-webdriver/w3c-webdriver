# Screen capture

## session.takeScreenshot()

Takes a screenshot of the top-level browsing context’s viewport.

**RETURNS**

Promise&lt;Buffer&gt;

**EXAMPLES**

```typescript
const screenshot = await session.takeScreenshot();
// screenshot = Buffer containing PNG
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#take-screenshot)

## element.takeScreenshot()

Takes a screenshot of the visible region encompassed by the bounding rectangle of an element

**RETURNS**

Promise&lt;Buffer&gt;

**EXAMPLES**

```typescript
const screenshot = await session.takeScreenshot();
// screenshot = Buffer containing PNG
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#take-screenshot)
