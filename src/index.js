'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "QUOTES": [
                "In order to succeed, we must first believe we can",
                "Good, better, best. Never let it rest. 'Til your good is better and your better is best",
                "Problems are not stop signs, they are guidelines",
                "If you can dream it, you can do it.",
                "It always seems impossible until it's done",
                "Always do your best. What you plant now, you will harvest later",
                "Failure will never overtake you if your determination to succeed is strong enough",
                "Don't watch the clock. Do what it does. Keep going" 
            ],
            "SKILL_NAME" : "British Motivational Quotes",
            "GET_QUOTE_MESSAGE" : " ",
            "HELP_MESSAGE" : "You can say tell me a motivational quote, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "QUOTES": [
                "In order to succeed, we must first believe we can",
                "Good, better, best. Never let it rest. 'Til your good is better and your better is best",
                "Problems are not stop signs, they are guidelines",
                "If you can dream it, you can do it.",
                "It always seems impossible until it's done",
                "Always do your best. What you plant now, you will harvest later",
                "Failure will never overtake you if your determination to succeed is strong enough",
                "Don't watch the clock. Do what it does. Keep going"
            ],
            "SKILL_NAME" : "American Motivational Quotes",
            "GET_QUOTE_MESSAGE" : "Hey! ",
            "HELP_MESSAGE" : "You can say tell me a motivational quote, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetQuote');
    },
    'GetNewQuoteIntent': function () {
        this.emit('GetQuote');
    },
    'GetQuote': function () {
        // Get a random space QUOTE from the space QUOTEs list
        // Use this.t() to get corresponding language data
        var quoteArr = this.t('QUOTES');
        var quoteIndex = Math.floor(Math.random() * quoteArr.length);
        var randomQuote = quoteArr[quoteIndex];

        // Create speech output
        var speechOutput = this.t("GET_QUOTE_MESSAGE") + randomQuote;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomQuote)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};