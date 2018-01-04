# backbone.vdomview

This library provides a VirtualDOM-aware Backbone View, called
`Backbone.VDOMView`.

It depends on [snabbdom](https://github.com/snabbdom/snabbdom) for the
virtual-DOM implementation.

## How to use

To use it, extend `Backbone.VDOMView`. Then, instead of implementing a `render`
method in your view, add a `toHTML` method which returns the View's HTML as a
string.

The HTML of the `toHTML` must be structured so that there's a root element
containing everything else. This root element is the view's top-level element,
in other words, it's the DOM node represented by the `this.el` or `this.$el`
attribute of the View.

React has a similar requirement that JSX returned by a component's `render` method
should have a root node which contains everything else.

The rest will then be handled by `VDOMView`, which will automatically
generate a diff between the view's current DOM element and new virtual-DOM
node and then patch the actual DOM with this diff.

For example:

    const MyView = Backbone.VDOMView.extend({

        tagName: 'span',
        className: 'vdom-span',

        toHTML () {
            return this.template(_.assign(this.model.toJSON()));
        }
    });

### The toHTML method

One important difference between `Backbone.VDOMView` and `Backbone.View`
that should be noted is that the HTML being rendered (in the case of
`Backbone.VDOMView` this is done in the `toHTML` method) should include
the root element of the view.

So in the example above `toHTML` should return `<span class="vdom-span"> ... </span>`
as the outer part of the HTML string.

This is different from normal Backbone.View classes, where your template will
only return the *inner* part of the view element.

### Event registration on virtual nodes

[Snabbdom](https://github.com/snabbdom/snabbdom) implements non-core
functionality in separate modules.

Backbone.VDOMView makes use of all Snabbdom's modules except for the
`eventlisteners` module.

The `eventlisteners` module allows you to add event listeners
when creating a virtual node via the `h` method.

However Backbone.VDOMView doesn't use the `h` method of Snabbdom at all (it
doesn't even include the code for it). Instead, it expects you to render the
HTML for the view in the `toHTML` method, for example by using an underscore or
lodash template.

There's therefore no way to attach these event listeners.

This way of registering event listeners is also in contrast to [Backbone's
declarative way of registering events](http://backbonejs.org/#View-events),
which is more the "Backbone way".

Backbone.VDOMView will make sure that these declaratively registered event
listeners will remain active whenever the View's DOM representation changes.

### The beforeRender and afterRender lifecycle methods

`Backbone.VDOMView` will call two lifecycle methods (if they exist).
These are `beforeRender` and `afterRender` and are respectively called
before and after `toHTML` is called.

### Using Backbone.VDOMView without jQuery

Backbone can be used without jQuery by using
[Backbone.NativeView](https://github.com/akre54/Backbone.NativeView) instead of
Backbone.View.

If Backbone.NativeView is available, then the VDOMView will use that instead of
Backbone.View.

---

`Backbone.VDOMView` is used in [converse.js](https://conversejs.org).

If you have any questions, feel free to [create an issue](https://github.com/jcbrand/backbone.vdomview/issues)
or [contact me directly](http://opkode.com/contact.html).
