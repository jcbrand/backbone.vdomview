/*!
 * Backbone.VDOMView
 *
 * MIT Licensed. Copyright (c) 2017, JC Brand <jc@opkode.com>
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            "virtual-dom",
            "vdom-parser",
            "backbone"
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments
        module.exports = factory(
            require('virtual-dom'),
            require('vdom-parser'),
            require('backbone')
        );
   }
}(this, function (vdom, vdom_parser, Backbone) {
    "use strict";

    Backbone.VDOMView = Backbone.View.extend({

        render () {
            const patches = vdom.diff(
                vdom_parser(this.el),
                vdom_parser(this.renderHTML())
            );
            const root = vdom.patch(this.el, patches);
            this.setElement(root);
            return this;
        }
    });
    return Backbone.VDOMView;
}));
