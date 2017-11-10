# backbone.vdomview

This library provides a VirtualDOM-aware Backbone View, called
`Backbone.VDOMView`.

It depends on Matt Esch's [virtual-dom](https://github.com/Matt-Esch/virtual-dom) implementation
as well as David Frank's [vdom-parser](https://github.com/bitinn/vdom-parser).

## How to use

To use it, extend `Backbone.VDOMView`. Then, instead of implementing a `render`
method in your view, add a `renderHTML` view which returns the HTML to be
rendered (*including* the root element of the view).

The rest will then be handled by `VDOMView`, which will automatically
generate a diff between the view's current DOM element and the HTML returned by
`renderHTML`. It will then patch the actual DOM element with this diff.

For example:

    const MyView = Backbone.VDOMView.extend({

        tagName: 'span',
        className: 'vdom-span',

        renderHTML () {
            return this.template(_.assign(this.model.toJSON()));
        }
    });

### The renderHTML method

One important difference between `Backbone.VDOMView` and Backbone.View that
should be noted is that `renderHTML` should include the root element of the
view.

So in the example above `renderHTML` should return `<span class="vdom-span"> ... </span>`
as the outer part of the HTML string.

This is different from normal Backbone.View classes, where your template will
only return the *inner* part of the view element.


### The beforeRender and afterRender lifecycle methods

`Backbone.VDOMView` will call two lifecycle methods (if they exist).
These are `beforeRender` and `afterRender` and are respectively called
before and after `renderHTML` is called.

---

`Backbone.VDOMView` is used in [converse.js](https://conversejs.org).

If you have any questions, feel free to [create an issue](https://github.com/jcbrand/backbone.vdomview/issues)
or [contact me directly](http://opkode.com/contact.html).
