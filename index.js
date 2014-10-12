var behest = require('behest');

function lmddgtfy() {
  return function(irc) {
    irc.on('message', function(evt) {
      var from = evt.from;
      var to = evt.to;
      var message = evt.message;

      if (!behest.isValid(message)) {
        return;
      }

      var command = behest(message);
      if (command.command === 'lmddgtfy') {
        var destination = to.charAt(0) === '#' ? to : from;
        irc.send(destination, from + ': https://lmddgtfy.net/?q='
                              + command.params.join('+'));
      }
    });
  };
}

module.exports = lmddgtfy;