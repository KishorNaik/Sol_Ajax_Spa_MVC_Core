if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) == prefix;
    }
}

//Global Variables
var clickCount = 0;
var times = [new Date()];

$(function () {
    $.ajaxSetup({ cache: false });

    initControls('body');
});

function initControls(context) {
    //Custom style set like this:
    //$('footer', context).css('color', 'red');
    initShortcuts(context);
    initForms(context);
}

function initShortcuts(context) {
    var elements = $('[data-shortcut]', context);
    elements.each(function () {
        var elem = $(this);
        var keys = elem.data('shortcut');
        shortcut.add(keys, function () {
            if (elem.is('a')) {
                elem[0].click();
            }
        });
        elem.on('destroyed', function () {
            shortcut.remove(keys);
        });
    });
}

function initForms(context) {
    var forms = $('form', context);
    forms.each(function () {
        var form = $(this);
        var submits = form.find('input[type=submit]');
        submits.click(function () {
            var submit = $(this);
            form.data('submit', submit.val());
        });
    });
}

function navigate(url) {
    var anchor = $('<a href="' + url + '"></a>');
    anchor.click(function (e) {
        if (linkClick != null) {
            linkClick(e, $(this));
        }
    });
    anchor[0].click();
}

// clear interval timers
var intervals = [];
var oldSetInterval;
// is not null after document.write
if (oldSetInterval == null) {
    oldSetInterval = window.setInterval;
    window.setInterval = function (func, interval) {
        var id = oldSetInterval(func, interval);
        intervals.push(id);
    }
}

$.event.special.destroyed = {
    remove: function (e) {
        if (e.handler) {
            e.handler.apply(this, arguments);
        }
    }
}