;
(function () {
    'use strict';


    var request = window.superagent;
    var webFont = window.WebFont;
    var jq = $;
    var response = null;
    var views = [];
    var Handler = window.Handler;
    var Font = window.Font;
    var View = window.View;
    var screen = 'hello';

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

    (function () {


        registerRoutes();

        getFonts().then(function (result) {
            Q.fcall(loadFontFamilies(result.names))
                .then(injectAllViews())
                .then(registerHandler())
                .then(showFirst());

        }, function (code) {
            console.error(code);
        });

/*
        setInterval(function () {
            showAndHide('#hello', '#app');
        }, 2000);*/
    })();

    function registerRoutes() {
        // TODO: implement client-side routes.
    }

    function showAndHide(toHide, toShow) {
        jq(toHide).removeClass('show').addClass('hide');
        jq(toShow).removeClass('hide').addClass('show');
    }

    function showFirst() {
        views[0].show('next');
    }

    function loadFontFamilies(fontArray) {
        // fonts start loading
        webFont.load({
            google: {
                families: fontArray
            }
        });
    }

    function registerHandler() {
        var handler = new Handler(views, _.size(response));
        jq('html').keyup(function (event) {
            // for next ->
            if (event.keyCode === 39) {
                handler.next();
            }
            // for prev <-

            if (event.keyCode === 37) {
                handler.prev();
            }

            if (event.keyCode === 32) {
                switch(screen){
                    case 'hello': {
                        showAndHide('#hello', '#app');
                        screen = 'app';
                        break;
                    }
                    case 'app':{
                        handler.toggle();
                    }
                }
            }
        });

        return handler;
    }

    function injectAllViews() {
        _.each(response, function (obj) {
            var view = new View(new Font(obj.props));
            view.inject();
            views.push(view);
        });
    }


})();