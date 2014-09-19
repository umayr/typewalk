/**
 * Created by Umayr on 9/16/2014.
 */
(function () {
    'use strict';
    var jq = $;

    var Font = function (props) {
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
                (this.background.type === 'gradient') ? _generateGradient(this.background.colors) : ''
        }
    };

    function _generateGradient(colorArray) {
        // TODO: Generate CSS gradient props here.
    }

    window.Font = Font;
})();