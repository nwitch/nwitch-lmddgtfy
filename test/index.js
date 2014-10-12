var lmddgtfy = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var Stream = require('readable-stream').PassThrough;
var irc = require('slate-irc');

test('exports a function which returns a function when called', function(t) {
  t.plan(2);
  t.ok(isFunction(lmddgtfy));
  t.ok(isFunction(lmddgtfy()));
});

test('replies when commanded', function(t) {
  t.plan(2);
  var stream = new Stream();
  var client = irc(stream);
  client.use(lmddgtfy());

  var testCommand = ':KenanY!KenanY@irc.kenany.me PRIVMSG #nwitch :' +
                    '!lmddgtfy how do i javascript\r\n'

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, testCommand);
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :KenanY: ' +
                       'https://lmddgtfy.net/?q=how+do+i+javascript');
        break;
    }
  });

  stream.write(testCommand);
});