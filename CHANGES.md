# Changelog

## 1.0.2 (2018-01-29)

- Now also checks for `toDOM` if `toHTML` is not defined. `toDOM` must return a
  single DOM element (with potentially many children).
- Upgrade Backbone to 1.4.0 and Snabbdom 0.7.3

## 1.0.1 (2018-01-29)

- Transpile the `dist` version for older browsers.

## 1.0.0 (2018-01-15)

- Use Snabbdom, instead of virtual-dom and vdom-parser, for the virtual-DOM implementation.
- Use `toHTML` as convention instead of `renderHTML`.
- Use Backbone.NativeView instead of Backbone.View, if it's available.

## 0.0.2 (2017-11-10)

- Add `beforeRender` and `afterRender` lifecycle methods.

## 0.0.1 (2017-11-10)

- Initial release
