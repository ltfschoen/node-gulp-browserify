var domready = require("domready");

function Welcome(message) {
    this.message = message;
}

Welcome.prototype = function() {
    var showWelcomeMessage = function() {
        return this.message;
    };

    return {
        showWelcomeMessage: showWelcomeMessage
    };
}();

module.exports = function() {
    return exports._call.apply(this.args);
};

domready(function () {
    // exports.test = "Hello World!";
    exports._call = function() {
      var w = new Welcome("hi");
      alert(w.showWelcomeMessage());
    };
});