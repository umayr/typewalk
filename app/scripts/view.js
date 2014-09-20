/**
 * Created by Umayr on 9/16/2014.
 */

(function () {
    'use strict';
    var jq = $;

    var View = function (font) {
        var _fontDetailsMarkup = '<div class="font-details white"><div class="container"><div class="row"><div class="col-md-offset-2 col-md-8"><h1>[0]</h1><h3>Lorem ipsum dolor sit amet.</h3></div></div><div class="row"><div class="col-md-offset-2 col-md-4"><br/><p>Consectetur adipiscing elit. Aenean facilisis suscipit mauris et tincidunt. Nulla pretium ligula leo, sed posuere turpis suscipit eu. Sed rhoncus vestibulum diam, blandit faucibus sem venenatis vitae. Pellentesque interdum, sem nec tristique malesuada, orci dui consectetur mauris, nec pharetra quam dui non leo. Duis interdum lectus sit amet odio auctor egestas. </p><blockquote><p>Morbi congue <em>eros arcu</em> pretium. <span class="small">Bec Aliquet.</span></p></blockquote><p>Phasellus purus nunc, consectetur sed libero vitae, commodo accumsan sem. Vestibulum egestas, mi non sodales hendrerit, libero purus semper nibh, at pretium arcu magna a magna. Etiam ut purus sed purus ullamcorper imperdiet. Aenean pharetra eget dui nec fermentum. Curabitur congue lorem justo, ut porttitor felis rhoncus sed. Phasellus a rhoncus libero. Nunc ut tincidunt ipsum. In vehicula massa ut facilisis gravida. </p></div><div class="col-md-4"><br/><p>Aliquam erat volutpat. Integer vel est consequat, vulputate odio sodales, finibus lacus. Nam malesuada mauris sapien, at vulputate ex condimentum vel. Suspendisse id erat turpis. Suspendisse sed lacinia purus. Donec rhoncus massa ut elit commodo, quis tincidunt neque cursus. Phasellus ligula odio, aliquam et aliquam quis, condimentum efficitur lorem. Donec in diam sed magna efficitur hendrerit. Duis sed nunc ultricies, hendrerit metus mattis, malesuada urna. Ut efficitur vestibulum enim, a convallis nisl fermentum ac. Pellentesque vulputate eget neque nec aliquet. Pellentesque eleifend eget tellus vel placerat. Phasellus at fermentum est, quis congue turpis. <strong>Nam malesuada aliquet ligula. Etiam ut ultrices leo.</strong></p><br/><p>Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed risus dolor, pulvinar vitae velit at, iaculis efficitur neque. </p></div></div></div></div>';
        var generateHtml = function () {
            var _wrap = jq('<div />')
                .addClass('view-wrap')
                .addClass('hide-next')
                .attr('id', font.id);

            var _fontWrap = jq('<div />')
                .addClass('font-view')
                .css(font.getParentCSS())
                .appendTo(_wrap);

            var _fontText = jq('<h1 />')
                .css(font.getCSS())
                .text(font.name)
                .appendTo(_fontWrap);

            var _markup = _fontDetailsMarkup.replace('[0]', font.name);
            var _fontDetails = jq(_markup)
                .css(font.getDetailsCSS())
                .appendTo(_wrap);

            return _wrap;
        };

        this.id = font.id;
        this.font = font;
        this.html = generateHtml();
        this.current = 'title';
        // title - white - black

    };

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

    View.prototype.toggle = function () {
        switch (this.current) {
            case 'title':
            {
                jq('#' + this.id).find('.font-details').addClass('flipped');
                jq('#' + this.id).find('.font-view').addClass('flipped');
                this.current = 'white';
                break;
            }
            case 'white' :
            {
                jq('#' + this.id).find('.font-details').addClass('black');
                this.current = 'black';
                break;
            }
            case 'black' :
            {
                jq('#' + this.id).find('.font-details').removeClass('flipped');
                jq('#' + this.id).find('.font-view').removeClass('flipped');
                this.current = 'title';
                jq('#' + this.id).find('.font-details').removeClass('black');
                break;
            }
        }


    };
    window.View = View;
})();