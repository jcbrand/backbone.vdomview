/*!
 * Backbone.VDOMView
 *
 * MIT Licensed. Copyright (c) 2017, JC Brand <jc@opkode.com>
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            "snabbdom",
            "snabbdom-attributes",
            "snabbdom-class",
            "snabbdom-dataset",
            "snabbdom-props",
            "snabbdom-style",
            "tovnode",
            "underscore",
            "backbone"
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments
        module.exports = factory(
            require('snabbdom'),
            require('snabbdom-attributes'),
            require('snabbdom-class'),
            require('snabbdom-dataset'),
            require('snabbdom-props'),
            require('snabbdom-style'),
            require('tovnode'),
            require('underscore'),
            require('backbone')
        );
   }
}(this, function (
        snabbdom,
        snabbdom_attributes,
        snabbdom_class,
        snabbdom_dataset,
        snabbdom_props,
        snabbdom_style,
        tovnode,
        _,
        Backbone) {
    "use strict";

    let domParser = new DOMParser();
    const patch = snabbdom.init([
        snabbdom_attributes.default,
        snabbdom_class.default,
        snabbdom_dataset.default,
        snabbdom_props.default,
        snabbdom_style.default
    ]);

    function parseHTMLToDOM (html_str) {
        /* Parses a string with HTML and returns a DOM element.
         *
         * Forked from vdom_parser:
         *      https://github.com/bitinn/vdom-parser
         */
        if (typeof html_str !== 'string') {
            throw new Error('Invalid parameter type in parseHTMLToDOM');
        }
        if ( !('DOMParser' in window) ) {
            throw new Error(
                'DOMParser is not available, '+
                'so parsing string to DOM node is not possible.');
        }
        if (!html_str) {
            return document.createTextNode('');
        }
        domParser = domParser || new DOMParser();
        const doc = domParser.parseFromString(html_str, 'text/html');

        // most tags default to body
        if (doc.body.firstChild) {
            return doc.getElementsByTagName('body')[0].firstChild;

        // some tags, like script and style, default to head
        } else if (doc.head.firstChild && (doc.head.firstChild.tagName !== 'TITLE' || doc.title)) {
            return doc.head.firstChild;

        // special case for html comment, cdata, doctype
        } else if (doc.firstChild && doc.firstChild.tagName !== 'HTML') {
            return doc.firstChild;

        // other element, such as whitespace, or html/body/head tag, fallback to empty text node
        } else {
            return document.createTextNode('');
        }
    }

    Backbone.VDOMView = Backbone.View.extend({

        updateEventListeners (old_vnode, new_vnode) {
            this.setElement(new_vnode.elm);
        },

        render () {
            if (_.isFunction(this.beforeRender)) {
                this.beforeRender();
            }
            const new_vnode = tovnode.toVNode(parseHTMLToDOM(this.toHTML()));
            new_vnode.data.hook = _.extend({
               create: this.updateEventListeners.bind(this),
               update: this.updateEventListeners.bind(this)
            });
            const el = this.vnode ? this.vnode.elm : this.el;
            if (el.outerHTML !== new_vnode.elm.outerHTML) {
                this.vnode = patch(this.vnode || this.el, new_vnode);
            }
            if (_.isFunction(this.afterRender)) {
                this.afterRender();
            }
            return this;
        }
    });
    return Backbone.VDOMView;
}));
