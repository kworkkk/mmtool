import './mediawiki-wrapper.js'
import 'jquery-3.4.1.js'


console.log("test my nuts");


(function () {'use strict';

/**
* @static
* @private
*/
var JSONP = (function (global) {
    // (C) WebReflection Essential - Mit Style
    // cleaned up by Brett Zamir for JSLint and avoiding additional globals and need for conventional [?&]callback= in URL)
    // 'use strict'; // Added above
    var id = 0,
        ns = 'MediaWikiJS',
        prefix = '__JSONP__',
        document = global.document,
        documentElement = document.documentElement;
    return function (uri, callback) {
        var src = prefix + id++,
            script = document.createElement('script'),
            JSONPResponse = function () {
                try { delete global[ns][src]; } catch(e) { global[ns][src] = null; }
                documentElement.removeChild(script);
                callback.apply(this, arguments);
            };
        global[ns][src] = JSONPResponse;
        documentElement.insertBefore(
            script,
            documentElement.lastChild
        ).src = uri + (uri.indexOf('?') > -1 ? '&' : '?') + 'callback=' + ns + '.' + src;
    };
}(window));

/**
* @constructor
* @param {object|string} opts The options (currently "baseURL" and "apiPath" args only); if a string is supplied, it will be used as the baseURL
* @param {object} argObj Object of key-value pairs to be serialized
* @param {function} cb The callback to execute upon server (JSONP) reply
*/
function MediaWikiJS(opts, argObj, cb) {
    if (!(this instanceof MediaWikiJS)) {
        return new MediaWikiJS(opts, argObj, cb);
    }
    if (typeof opts === 'string') {
        this.baseURL = opts;
    }
    else {
        this.apiPath = opts.apiPath;
        this.baseURL = opts.baseURL;
    }
    if (!this.apiPath) {
        this.apiPath = '/w/api.php';
    }
    if (argObj) {
        this.send(argObj, cb);
    }
}

/**
* Send the API request to the server
* @param {object} argObj Object of arguments to be serialized
* @param {function} cb The callback to execute upon server (JSONP) reply
*/
MediaWikiJS.prototype.send = function MediaWikiJS__send (argObj, cb) {
    cb = cb || function () {}; // Are there API calls with side effects?
    var uri, arg, args = '';
    for (arg in argObj) {
        if (argObj.hasOwnProperty(arg)) {
            args += '&' + arg + '=' + encodeURIComponent(argObj[arg]);
        }
    }
    uri = this.baseURL +  this.apiPath + '?format=json' + args;
    JSONP(uri, cb);
};

// EXPORTS
window.MediaWikiJS = MediaWikiJS;
}());


var mwjs = MediaWikiJS({baseURL: 'https://ru.wikiversity.org', apiPath: '/w/api.php'});


var jswikibot = {
	
	
	login: function(){
		/*
		mwjs.send(
			{
				action: 'query',
				meta: 'tokens',
				type: 'login',
				origin: '
			},
			function(data){
				console.log(data)
				var logintoken = data.query.tokens.logintoken
			}
		);
		*/
		
		var logintoken = "16163ef86a4b52b2cb735722c68f499f5cf8fdff+\\"
		
		mwjs.send(
			{
				action: 'login',
				lgname: 'Isbur@mmtool',
				lgpassword: 'sf5vmfng5e1gp1hoi17jf9hpc5d9ddpq',
				lgtoken: logintoken
			},
			function(data){
				console.log(data);
			}
		)
		
	},
	
	
	createCard: function(){
		
		mwjs.send({action: 'edit', page: 'Участник:Isbur', appendtext: 'wikitext'}, function (data) {
					console.log(data);
		});
	},
	
	
	addToCard: function(){
		
	}
}


var MMTool = {
	contextMenu: {
		createCard: {
			
			
			start: function(){
				console.log("Creating menu item...");
				browser.menus.create({
					id: "createCard",
					title: "Create a card"
				});
				jswikibot.createCard()
				
				
			},
			
			
			stop: function(){
				console.log("Removing menu item...");
				browser.menus.remove("createCard");
			}
			
			
		}
	}
}


function entryPoint() {
	console.log("Starting scripts...")
			
	jswikibot.login()
	
	browser.commands.onCommand.addListener(function(command) {
	  if (command == "toggleCreateOrAddCard") {
		console.log("toggling the feature!");
		MMTool.contextMenu.createCard.start()
	  }
	});
	
}


browser.runtime.onMessage.addListener(
	(message) => {
		console.log("Some message was received");
		if (message.command === "start") {
			entryPoint(null);
		}
		else if (message.command === "stop") {
			console.log("Stoping scripts...");
		}
	}
);

browser.commands.onCommand.addListener(function onCommandHandler(command) {
	  if (command == "toggleCreateOrAddCard") {
		browser.commands.onCommand.removeListener(onCommandHandler)
		entryPoint();
	  }
});

