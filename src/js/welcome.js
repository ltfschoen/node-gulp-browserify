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

module.exports = Welcome;