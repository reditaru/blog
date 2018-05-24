

/**
 * Created by reditaru on 2017/12/24.
 */
(function () {
    // initial layout
    $('.collapse-menu').hide();
    $('.nav-collapse a').click(function () {
        $('.collapse-menu').toggle();
    });
    var chatOpenStatus = false, notReadCount = 0;
    $('.chat_block').hide();
    $('.chat_icon i').click(function () {
        var chatBlock = $('.chat_block');
        chatBlock.toggle();
        chatBlock.animate({ scrollTop: chatBlock.prop('scrollHeight') }, 100);
        chatOpenStatus = !chatOpenStatus;
        checkShowNotRead();
    });
    $('.not_read_count').hide();
    // template util
    function template(str, obj) {
        return str.replace(/\$\{([^\}]+)\}/g, (match, key) => (obj[key] || ''));;
    }
    function checkShowNotRead() {
        if (chatOpenStatus) {
            notReadCount = 0;
            $('.not_read_count').text(notReadCount);
            $('.not_read_count').hide();
        }
    }
    // socket 
    Pace.options.ajax.trackWebSockets = false;
    // socket server address
    var socket = io('http://localhost:3000');
    var myName, sendStatus = {};
    socket.on('connect', function() {
        $('.online_status').css('background-color', 'lightgreen');
        checkShowNotRead();
    });
    socket.on('disconnect', function() {
        $('.online_status').css('background-color', 'grey');
        $('.online_people').text('离线');
    });
    socket.on('online status', function(status) {
        var stat = JSON.parse(status);
        $('.online_people').text(stat.onlineNums + '人');
    });
    socket.on('name', function(name) {
        if (!myName) {
            myName = name;
            $('.chat_name').text(name);
        }
    });
    socket.on('msg', function(msg) {
        var chatBlock = $(".chat_main");
        var message = JSON.parse(msg);
        var time = message.date;
        message.date = moment.unix(time/1000).fromNow();
        var msgHtml = $(template(
            '<div class="event msg">' +
                '<div class="content">' +
                    '<div class="summary">' +
                        '<div class="user">${user}</div>' +
                        '<div class="date" data-time="' + time + '">${date}</div>' +
                    '</div>' +
                    '<div class="extra text">${content}</div>' +
                '</div>' +
            '</div>', message));
        chatBlock.append(msgHtml);
        chatBlock.animate({ scrollTop: chatBlock.prop('scrollHeight') }, 100);
        if (!chatOpenStatus) {
            notReadCount++;
            $('.not_read_count').text(notReadCount > 15? '15+' : notReadCount);
            $('.not_read_count').show();
        }
        checkShowNotRead();
    });
    socket.on('msg reply', function(time) {
        clearTimeout(sendStatus[time]);
        delete sendStatus[time];
    });
    $('#msgInput').keyup(function(event) {
        if (event.keyCode === 13) {
            var now = Date.now();
            var message = {
                user: myName,
                date: now,
                content: filterXSS($(this).val())
            }
            socket.emit('msg', JSON.stringify(message));
            $(this).val('');
            var chatBlock = $('.chat_main');
            message.date = moment(now).fromNow();
            var msgHtml = $(template(
            '<div class="event msg right floated">' +
                '<div class="content">' +
                    '<div class="summary" style="width: 100%;">' +
                        '<div class="date right floated" style="float: right;" data-time="' + now + '">${date}</div>' +
                        '<div class="user right floated">${user}</div>' +
                    '</div>' +
                    '<div class="extra text right floated">${content}</div>' +
                '</div>' +
            '</div>', message));
            chatBlock.append(msgHtml);
            chatBlock.animate({ scrollTop: chatBlock.prop('scrollHeight') }, 100);
            sendStatus[now] = setTimeout(function() {
                if (sendStatus[now]) {
                    $('.date.right[data-time="' + now + '"]').parent().append('<div class="label right floated"><i class="exclamation circle icon red"></i></div>');
                    delete sendStatus[now];
                }
            }, 10000);
        }
    });
    setTimeout(function update() {
        $('.chat_main .msg .date').each(function(item) {
            $(this).text(moment.unix($(this).attr('data-time')/1000).fromNow());
        });
        setTimeout(update, 60000);
    }, 60000);
})();