;
(function () {
    'use strict';


    var request = window.superagent;
    var webFont = window.WebFont;
    var jq = $;
    var response = null;
    var views = [];

    function getFonts() {
        var deferred = Q.defer();
        if (response == null) {
            request('fonts.json')
                .end(function (res) {
                    if (res.status == 200 || res.type == 'application/json') {
                        response = $.parseJSON(res.text);
                        var fontArray = [];
                        _.each(response, function (font, index) {
                            fontArray.push(font.props.fontName + '::latin');
                        });
                        deferred.resolve({json: response, names: fontArray});
                    }
                    else {
                        deferred.reject(res.status);
                    }
                });
        }
        else {
            deferred.resolve(response);
        }

        return deferred.promise;
    }

    function queryFont(json, name) {
        return _.first(_.where(json, {font: name}))

    }

    /*
     getJSON().then(function (res) {
     var fontArray = [];
     _.each(res, function (font) {
     fontArray.push(font.props.fontName + '::latin');
     });
     console.log(fontArray);

     var props = (queryFont(res, 'pt-sans')).props;
     var font = new Font(props);


     console.log(font);
     console.log(font.getURL());
     console.log(font.id);
     console.log(font.getCSS());
     console.log(font.getParentCSS());

     var view = new View(font);

     console.log(view);

     }, function (code) {
     console.error(code);
     });*/

    getFonts().then(function (result) {
        Q.fcall(loadFontFamilies(result.names))
            .then(registerHandler())
            .then(injectAllViews());
    }, function (code) {
        console.error(code);
    });


    function loadFontFamilies(fontArray) {
        // fonts start loading
        webFont.load({
            google: {
                families: fontArray
            }
        });
    }

    function Font(props) {
        this.name = props.fontName;
        this.id = (typeof props.id === 'undefined') ? props.fontName.toLowerCase().replace(/ /g, '-') : props.id;
        this.weights = props.weights;
        this.type = props.type;
        this.size = props.size;
        this.background = props.background;
        this.foreground = props.foreground;
    }

    Font.prototype.getURL = function () {
        return "http://fonts.googleapis.com/css?family=" + this.name.replace(/ /g, '+');
    };
    Font.prototype.getCSS = function () {
        return {
            "font-family": this.name + ', ' + this.type,
            "font-weight": this.weights[0],
            "font-size": (typeof this.size !== 'undefined') ? this.size : '5.5em',
            "color": this.foreground.colors[0]
        }
    };
    Font.prototype.getParentCSS = function () {
        return {
            "background": (this.background.type === 'plain') ? this.background.colors[0] :
                (this.background.type === 'gradient') ? generateGradient(this.background.colors) : ''
        }
    };

    function View(font) {
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

    function Handler() {
        this.current = 0;
        this.direction = null;
        this.total = _.size(response);
        this.array = _.toArray(response);
    }

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

    Handler.prototype.switchFont = function () {
        var showView = views[this.current];
        var hideView = (this.direction == 'next') ? views[this.current - 1] : views[this.current + 1];
        /*
         var hideView;

         if(this.direction == 'next'){
         //jq('#app').addClass(this.direction).removeClass('prev');
         hideView = views[(this.current - 1)];
         }

         if(this.direction == 'prev'){
         //jq('#app').removeClass('next').addClass(this.direction);
         hideView = views[(this.current + 1)];
         }*/


        console.log('show : ' + showView.id);
        console.log('hide : ' + hideView.id);


        hideView.hide(this.direction);
        showView.show(this.direction);

    };

    function registerHandler() {
        var handler = new Handler();

        jq('html').keyup(function (event) {
            // for next ->
            if (event.keyCode === 39) {
                handler.next();
            }
            // for prev <-
            if (event.keyCode === 37) {
                handler.prev();
            }
        })
    }

    function injectAllViews() {
        _.each(response, function (obj) {
            var view = new View(new Font(obj.props));
            view.inject();
            views.push(view);
        });
        console.log(views);
    }

    function generateGradient(colorArray) {
        // TODO: Generate CSS gradient props here.
    }

})();