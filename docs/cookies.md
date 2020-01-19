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

## session.getNamedCookie(name)

Returns cookie based on the cookie name

**PARAMETERS**

- `name`: string - Name of the cookie object to be returned

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

- `cookie`: [Cookie](#cookie) - Cookie object to add in browser for current domain

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

- `propertyName`: string - Cookie name to delete

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

- `name`: string - The name of the cookie.
- `value`: string - The cookie value.
- `path?`: string - The cookie path. Defaults to "/" if omitted when adding a cookie.
- `domain?`: string - The domain the cookie is visible to.
  Defaults to the current browsing context’s document’s URL domain if omitted when adding a cookie.
- `secure?`: boolean - Whether the cookie is a secure cookie. Defaults to false if omitted when adding a cookie.
- `httpOnly?`: boolean - Whether the cookie is an HTTP only cookie. Defaults to false if omitted when adding a cookie.
- `expiry?`: number - When the cookie expires, specified in seconds since Unix Epoch.
  Defaults to 20 years into the future if omitted when adding a cookie.
