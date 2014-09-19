/**
 * Created by Umayr on 9/16/2014.
 */

(function () {
    'use strict';
    var jq = $;

    var View = function (font) {
        var generateHtml = function () {
            var _wrap = jq('<div />')
                .addClass('view-wrap')
                .addClass('hide-next')
                .css(font.getParentCSS())
                .attr('id', font.id);

            var _fontWrap = jq('<div />')
                .addClass('font-view')
                .appendTo(_wrap);

            var _fontText = jq('<h1 />')
                .css(font.getCSS())
                .text(font.name)
                .appendTo(_fontWrap);

            return _wrap;
        };

        this.id = font.id;
        this.font = font;
        this.html = generateHtml();
    }

    View.prototype.inject = function () {
        jq('#app').append(this.html);
    };

    View.prototype.show = function (direction) {
        jq('#' + this.id).removeClass('hide-next').removeClass('hide-prev');
        jq('#' + this.id).addClass('show-' + direction);
    };
    View.prototype.hide = function (direction) {
        jq('#' + this.id).removeClass('show-next').removeClass('show-prev');
        jq('#' + this.id).addClass('hide-' + direction);
    };

    View.prototype.hideAll = function () {
        jq('.view-wrap').removeClass('show');
        jq('.view-wrap').addClass('hide');
    };
    window.View = View;
})();