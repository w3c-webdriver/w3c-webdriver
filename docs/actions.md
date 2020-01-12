# Actions

## session.performActions(actionSequences)

Sends virtualised device input to the web browser like keyboard or pointer events in a series of actions.

**PARAMETERS**

- `actionSequences`: [ActionSequence](#actionsequence)[]

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'none',
    id: 'none_id',
    actions: [{ type: 'pause', duration: 0 }]
  },
  {
    type: 'pointer',
    id: 'click on b field',
    actions: [
      { type: 'pause', duration: 0 },
      { type: 'pointerMove', x: 118, y: 121 },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ]
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'type in 15',
    actions: [
      { type: 'pause', duration: 100 },
      { type: 'keyDown', value: '1' },
      { type: 'keyUp', value: '1' },
      { type: 'keyDown', value: '5' },
      { type: 'keyUp', value: '5' }
    ]
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'pointer',
    id: 'click on add button',
    actions: [
      {
        type: 'pointerMove',
        x: 1,
        y: 1,
        origin: await session.findElement('css selector', '#add')
      },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ],
    parameters: {
      pointerType: 'mouse'
    }
  }
]);
```

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [
      { type: 'keyDown', value: 'a' },
      { type: 'keyUp', value: 'a' },
      { type: 'keyDown', value: 'b' },
      { type: 'keyUp', value: 'b' },
      { type: 'keyDown', value: Key.LEFT },
      { type: 'keyUp', value: Key.LEFT },
      { type: 'keyDown', value: Key.DELETE },
      { type: 'keyUp', value: Key.DELETE }
    ]
  }
]);
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#perform-actions)

## session.releaseActions()

Release all the keys and pointer buttons that are currently depressed

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [{ type: 'keyDown', value: 'a' }]
  }
]);
await session.releaseActions();
// Now 'a' key was pressed
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#release-actions)

## ActionSequence

**POSSIBLE VALUES**

- [NullActionSequence](#nullactionsequence)
- [KeyActionSequence](#keyactionsequence)
- [PointerActionSequence](#pointeractionsequence)

## NullActionSequence

**PROPERTIES**

- `type`: `'none'`
- `id`: string
- `actions`: [PauseAction](#pauseaction)[]

## PauseAction

**PROPERTIES**

- `type`: `'pause'`
- `duration`: number

## KeyActionSequence

**PROPERTIES**

- `type`: `'key'`
- `id`: string
- `actions`: [KeyAction](#keyaction)[]

## KeyAction

**POSSIBLE VALUES**

- [PauseAction](#pauseaction)
- [KeyDownAction](#keydownaction)
- [KeyUpAction](#keyupaction)

## KeyDownAction

**PROPERTIES**

- `type`: `'keyDown'`
- `value`: string

## KeyUpAction

**PROPERTIES**

- `type`: `'keyUp'`
- `value`: string

## PointerActionSequence

**PROPERTIES**

- `type`: `'pointer'`
- `id`: string
- `actions`: [PointerAction](#pointeraction)[]
- `parameters?`: [PointerParameters](#pointerparameters)

## PointerAction

**POSSIBLE VALUES**

- [PauseAction](#pauseaction)
- [PointerMoveAction](#pointermoveaction)
- [PointerUpAction](#pointerupaction)
- [PointerDownAction](#pointerdownaction)

## PointerMoveAction

**PROPERTIES**

- `type`: `'pointerMove'`
- `x`: number
- `y`: number
- `duration?`: number
- `origin`: [Element](elements.md#element) | `'pointer'` | `'viewport'`

## PointerUpAction

**PROPERTIES**

- `type`: `'pointerUp'`
- `button`: number

## PointerDownAction

**PROPERTIES**

- `type`: `'pointerDown'`
- `button`: number

## PointerParameters

**PROPERTIES**

- `pointerType`: `'mouse'` | `'pen'` | `'touch'`

## NullAction

**PROPERTIES**

- `type`: `'pause'`
- `duration`: number

## Key

**POSSIBLE VALUES**

- `NULL`
- `CANCEL`
- `HELP`
- `BACKSPACE`
- `TAB`
- `CLEAR`
- `RETURN`
- `ENTER`
- `SHIFT`
- `CONTROL`
- `ALT`
- `PAUSE`
- `ESCAPE`
- `SPACE`
- `PAGE_UP`
- `PAGE_DOWN`
- `END`
- `HOME`
- `LEFT`
- `UP`
- `RIGHT`
- `DOWN`
- `INSERT`
- `DELETE`
- `SEMICOLON`
- `EQUALS`
- `NUMPAD0`
- `NUMPAD1`
- `NUMPAD2`
- `NUMPAD3`
- `NUMPAD4`
- `NUMPAD5`
- `NUMPAD6`
- `NUMPAD7`
- `NUMPAD8`
- `NUMPAD9`
- `MULTIPLY`
- `ADD`
- `SEPARATOR`
- `SUBTRACT`
- `DECIMAL`
- `DIVIDE`
- `F1`
- `F2`
- `F3`
- `F4`
- `F5`
- `F6`
- `F7`
- `F8`
- `F9`
- `F10`
- `F11`
- `F12`
- `META`
- `ZENKAKUHANKAKU`
- `R_SHIFT`
- `R_CONTROL`
- `R_ALT`
- `R_META`
- `R_PAGEUP`
- `R_PAGEDOWN`
- `R_END`
- `R_HOME`
- `R_ARROWLEFT`
- `R_ARROWUP`
- `R_ARROWRIGHT`
- `R_ARROWDOWN`
- `R_INSERT`
- `R_DELETE`
