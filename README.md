# twindy-headless

Vue components to be used with [twindy](https://github.com/holtwick/twindy) CSS framework.

These components implement UI view behaviours, but do not provide a specific design. Sample implementations will be available, but are not attached to the components by default.

---

**WORK IN PROGRESS / VUE3 ONLY**

---

### tw-button

Import:

```js
import twButton from "twindy-headless/components/tw-button.vue"
```

Use in template:

```vue
<tw-button @action="doSomething">Do it</tw-button>
```

Define styles:

```css
.tw-button {
  /* Your styles */
}
```

### tw-input

### tw-modal

### tw-items

Items in dropdowns, menus or selection lists.

### tw-list

Represents a list of entries that is optimized for scrolling.

One or multiple entries can be selected.

TODO: Navigate using cursor keys; selecting using space

### tw-popover

Positions an overlay using [Popper](https://popper.js.org/).

```js
<tw-popover :target="anchorElement" arrow mode="tooltip">
  Hello <b>World</b>
</tw-popover>
```

### tw-tooltip-trigger

If placed somewhere in the project will show tooltips for elements having a `tooltip` attribute defining the tooltip plain text content. `tooltip-placement` attribute can be used to set the direction relative to the element, where the tooltip should appear. Default is `top`.

See also: `tw-popover`

### tw-debug

Debug output of Vue reactive objects. Requires CSS import:

```js
import "twindy-headless/index.css"
```

---

### useActive(props)

This helper is used to activate an element. `tw-modal` and `tw-popover` use it and can be activated through two separate ways:

1. Attach a reactive boolean to `v-model`. If `true` the element will show up and on `false` will hide. If the element closes itself it reflects the state in the value.
2. Trigger via setting the property `:active` to `true`. You need to make sure to set it to `false` yourself or listen to `@close` events to trigger more than once.

```ts
let show = useActive(props)
```

### useFontLoaded(fontName:string, action: Function)

Executes `action` when the font specified in `fontName` is loaded. Example:

```
useFontLoaded("Inter", resizeInputField)
```

### useDocumentClass(className)

For the lifetime of a component adds the `className` to `html` element.

---

- Uses Typescript
- Plans to support ARIA
- Mobile friendly
