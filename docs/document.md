# Document

## session.getPageSource()

Returns a string serialization of the DOM of the current browsing context active document.

**RETURNS**

Promise&lt;string&gt;

**EXAMPLES**

```typescript
const source = await session.getPageSource();
// source = '<!DOCTYPE html><head><title>...'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-page-source)

## session.executeScript&lt;T&gt;(script, args)

Inject a snippet of JavaScript into the page for execution in the context of the
currently selected frame. The executed script is assumed to be synchronous and
the result of evaluating the script is returned to the client.

**PARAMETERS**

- `script`: string - JavaScript to execute in browser context
- `args`: any[] - Arguments to sent to executed script

**RETURNS**

Promise&lt;T&gt;

**EXAMPLES**

```typescript
const script = `
  const [name] = arguments;
  return `Hello from ${name}!`;
`;
const message = await session.executeScript(script, ['WebDriver']);
// message = 'Hello from WebDriver!'
```

```typescript
const button = await session.findElement('css selector', '#red-button');
const script = `
   const [element] = arguments;
   return element.id;
`;
const id = await session.executeScript(script, [button]);
// id = 'red-button'
```

```typescript
const script = `
   return document.querySelector('#red-button');
`;
const button = await session.executeScript(script);
const id = await button.getProperty('id');
// id = 'red-button'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#execute-script)

## session.executeAsyncScript&lt;T&gt;(script, args)

causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
result of the function is ignored. Instead an additional argument is provided as the final
argument to the function. This is a function that, when called, returns its first argument
as the response.

**PARAMETERS**

- `script`: string - JavaScript to execute in browser context
- `args`: any[] - Arguments to sent to executed script

**RETURNS**

Promise&lt;T&gt;

**EXAMPLES**

```typescript
const script = `
  const [a, b, callback] = arguments;
  setTimeout(() => callback(a * b), 1000);
`;
const message = await session.executeAsyncScript(script, [5, 3]);
// message = 15
```

```typescript
const button = await session.findElement('css selector', '#red-button');
const script = `
   const [element, callback] = arguments;
   callback(element.id);
`;
const id = await session.executeAsyncScript(script, [button]);
// id = 'red-button'
```

```typescript
const script = `
   const [callback] = arguments;
   callback(document.querySelector('#red-button'));
`;
const button = await session.executeAsyncScript(script);
const id = await button.getProperty('id');
// id = 'red-button'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#execute-async-script)
