# backbone.vdomview

This library provides a VirtualDOM-aware Backbone View, called
`Backbone.VDOMView`.

It depends on [snabbdom](https://github.com/snabbdom/snabbdom) for the
virtual-DOM implementation.

## How to use

To use it, extend `Backbone.VDOMView`. Then, instead of implementing a `render`
method in your view, add either a `toVNode` or `toHTML` method.

* `toVNode` must return a virtual node as returned by snabbdom's `h` function.
* `toHTML` must return a string of HTML representing the view.

The HTML of the `toHTML` must be structured that there's a root element
containing everything else. This root element is the view's top-level element,
in other words, it's the `this.el` or `this.$el` attribute of the View.

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

Or alternatively:

    const MyView = Backbone.VDOMView.extend({

        tagName: 'span',
        className: 'vdom-span',

        toVNode() {
            return h(
                'span#container.two.classes',
                 {on: {click: anotherEventHandler}},
                [ h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}},
                    'This is now italic type'),
                    ' and this is still just normal text',
                  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
                ]
            );
        }
    });

### The toHTML method

One important difference between `Backbone.VDOMView` and Backbone.View that
should be noted is that `toHTML` should include the root element of the
view.

So in the example above `toHTML` should return `<span class="vdom-span"> ... </span>`
as the outer part of the HTML string.

This is different from normal Backbone.View classes, where your template will
only return the *inner* part of the view element.


### The beforeRender and afterRender lifecycle methods

`Backbone.VDOMView` will call two lifecycle methods (if they exist).
These are `beforeRender` and `afterRender` and are respectively called
before and after `toHTML` is called.

---

`Backbone.VDOMView` is used in [converse.js](https://conversejs.org).

If you have any questions, feel free to [create an issue](https://github.com/jcbrand/backbone.vdomview/issues)
or [contact me directly](http://opkode.com/contact.html).
