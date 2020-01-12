# Cookies

## session.getAllCookies()

Returns all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

Promise&lt;[Cookie](#cookie)[]&gt;

**EXAMPLES**

```typescript
const cookies = await session.getAllCookies();
// cookies = [
//   {
//     name: 'cookie name',
//     value: 'cookie value',
//     path: '/',
//     domain: 'localhost',
//     secure: false,
//     httpOnly: true
//   }
// ]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-all-cookies)

## session.getNamedCookie(propertyName)

Returns cookie based on the cookie name

**PARAMETERS**

- `propertyName`: string

**RETURNS**

Promise&lt;[Cookie](#cookie)&gt;

**EXAMPLES**

```typescript
const cookie = await session.getNamedCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-named-cookie)

## session.addCookie(cookie)

Adds a single cookie to the cookie store associated with the active document’s address.

**PARAMETERS**

- `cookie`: [Cookie](#cookie)

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.addCookie({ name: 'test cookie', value: 'test value' });
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#add-cookie)

## session.deleteCookie(propertyName)

Delete a cookie based on its name

**PARAMETERS**

- `propertyName`: string

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.deleteCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-cookie)

## session.deleteAllCookies()

Delete all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.deleteAllCookies();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-all-cookies)

## Cookie

An object defining the cookie.

**PROPERTIES**

- `name`: string
- `value`: string
- `path?`: string
- `domain?`: string
- `secure?`: boolean
- `httpOnly?`: boolean
- `expiry?`: number
