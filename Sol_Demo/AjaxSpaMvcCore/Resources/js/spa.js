$(function () {
    $(document).on('click', 'a', function (e) {
        linkClick(e, $(this));
    });

    $(document).on('submit', 'form', function (e) {
        if (e.isDefaultPrevented()) {
            return;
        }
        e.preventDefault();
        var form = $(this);
        if (typeof form.valid !== "undefined") {
            if (!form.valid()) {
                return;
            }
        }
        var action = form.attr('action');
        var method = form.attr('method');
        var data = form.serialize();

        // submit clicked button value
        var submitValue = form.data('submit');
        if (submitValue != null) {
            var submit = $('input[type=submit][value="' + submitValue + '"]', form);
            if (submit.length == 1) {
                var submitName = submit.attr('name');
                if (submitName != null) {
                    data += '&' + encodeURI(submitName) + '=' + encodeURI(submit.attr('value'));
                }
            }
        }

        spaLoad(action, method, data);
    });
});


function linkClick(e, link) {
    if (e.isDefaultPrevented()) {
        return;
    }
    var action = link.attr('href');
    // '/#' is breadcrumb - left menu navigation
    if (action == null || action[0] != '/' || action.startsWith('/#')) {
        return;
    }
    e.preventDefault();
    spaLoad(action, "GET");
};

function spaLoad(action, type, data, pushHistory) {
    abortAjax();
    $.ajax({
        url: action,
        type: type,
        dataType: 'html',
        data: data
    }).done(function (response, status, xhr) {
        renderPage(xhr, pushHistory);
    }).fail(function (xhr) {
        // unauthorized or access denied
        if (xhr.status === 401 || xhr.status === 403) {
            return;
        }

        // ignore aborted requests
        if (xhr.status === 0 || xhr.readyState === 0) {
            return;
        }
        // mark status as handled/aborted
        xhr.status = 0;
        renderPage(xhr, pushHistory);
    });
}

function renderPage(xhr, pushHistory) {
    // clear/reset js state
    clearIntervals();
    resetGlobalVariables();

    if (pushHistory == null || pushHistory == true) {
        // location will be null by custom asp.net error page
        var location = xhr.getResponseHeader('Location');
        history.pushState('', '', location);
    }

    // load document
    if (xhr.responseText.startsWith('<!DOCTYPE html>')) {
        // whole document is refreshed
        var newDocument = document.open('text/html');
        newDocument.write(xhr.responseText);
        newDocument.close();
    } else {
        $('#spa-content').html(xhr.responseText);
        // init new page
        initControls($('#spa-content'));
        // set page title
        var titleDiv = $('#title-div', '#spa-content');
        document.title = titleDiv.text();
        // update username in navbar
        var usernameDiv = $('#username-div', '#spa-content');
        $('#username').text(usernameDiv.text());
    }
}

// history management
$(function () {
    window.onpopstate = function () {
        var action = window.location.pathname + window.location.search;
        spaLoad(action, "GET", null, false);
    };

    $(document).ajaxSend(function (e, xhr) {
        xhrPool.push(xhr);
    });
    $(document).ajaxComplete(function (e, xhr) {
        xhrPool = $.grep(xhrPool, function (x) { return x != xhr; });
    });
});

var xhrPool = [];
var abortAjax = function () {
    $.each(xhrPool, function (idx, xhr) {
        xhr.abort();
    });
};

function resetGlobalVariables() {
    window.clickCount = 0;
    window.times = [];
}

function clearIntervals() {
    for (var i = 0; i < window.intervals.length; i++) {
        window.clearInterval(window.intervals[i]);
    }
    window.intervalsintervals = [];
}