/**
 * Created by Umayr on 9/16/2014.
 */

(function () {
    'use strict';

    var Handler = function (views, size) {

        this.current = 0;
        this.direction = null;
        this.total = size;
        this.views = views;

        console.log(this);
    };

    Handler.prototype.next = function () {
        if (this.current < (this.total - 1)) {
            this.current++;
            this.direction = 'next';
            this.switchFont();
        }
    };

    Handler.prototype.prev = function () {
        if (this.current > 0) {
            this.current--;
            this.direction = 'prev';
            this.switchFont();
        }
    };
    /*Handler.prototype.view = function () {
     var view = views[this.current];
     var font = view.font;

     jq('#app').removeClass('show').addClass('hide');
     jq('#view').removeClass('hide').addClass('show');
     };*/
    Handler.prototype.switchFont = function () {
        var showView = this.views[this.current];
        var hideView = (this.direction == 'next') ? this.views[this.current - 1] : this.views[this.current + 1];

        hideView.hide(this.direction);
        showView.show(this.direction);

    };

    window.Handler = Handler;

})();
