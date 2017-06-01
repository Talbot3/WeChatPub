let assert = require('assert');
let thunkify = require('thunkify');
let _JWT = require('jsonwebtoken');
let unless = require('koa-unless');
let util = require('util');

let JWT = {decode: _JWT.decode, sign: _JWT.sign, verify: thunkify(_JWT.verify)};

module.exports = function(opts){
	console.log(opts)
	opts = opts || {};
	opts.key = opts.key || 'user';

	let tokenResolvers = [resolveCookie, resolveAuthorizationHeader];

	if (opts.getToken && util.isFunction(opts.getToken)){
		tokenResolvers.unshift(opts.getToken);
	}

	let middleware = function* jwt(next){
		let token, msg, user, parts, scheme, credentials, secret;
		for(let i = 0;i < tokenResolvers.length; i++){
			let output = tokenResolvers[i].call(this, opts);

			if (output){
				token = output;
				break;
			}
		}
	
		if(!token && !opts.passthrough){
			this.throw(401, 'No authentication token found\n');
		}

		secret = (this.state && this.state.secret) ? this.state.secret : opts.secret;
		if(!secret){
			this.throw(500, 'Invalid secret\n');
		}

		try{
			console.log(token,secret,opts);
			user = yield JWT.verify(token, secret, opts);
		}catch(e){
			msg = 'Invalid token' + (opts.debug ? ' - ' + e.message+'\n' : '\n');
		}

		if (user || opts.passthrough){
			this.state = this.state || {};
			this.state[opts.key] = user;
			yield next;
		}else{
			this.throw(401, msg);
		}
	};

	middleware.unless = unless;
	return middleware;
};

/**
 * resolveAuthorizationHeader - Attempts to parse the token from the Authorization header
 * this function checks the Authorization header for a 'Bearer <token>' pattern and return the token section
 *
 * @this the ctx object passed to the middleware
 * 
 * @param  {[type]} opts the middleawre's options
 * @return {[type]}      the resolved token or null if not found
 */
function resolveAuthorizationHeader(opts){
	if(!this.header || !this.header.authorization){
		return;
	}
	//console.log(this.header.authorization);
	let parts = this.header.authorization.split(' ');
	if (parts.length === 2){
		let scheme = parts[0];
		let credentials = parts[1];

		if(/^Bearer$/i.test(scheme)){
			return credentials;
		}
	}else{
		if(!opts.passthrough){
			this.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"\n');
		}
	}
}

/**
 * resovleCookies - Attempts to retrieve the token from a cookie
 *
 * this funtion uses the opts.cookie option to retrieve the token
 *
 * @this the ctx object passed to the middleware
 * 
 * @param  {[type]} opts this middleware's options
 * @return {[type]}      the resolved token or null if not found
 */
function resolveCookie(opts){
	if (opts.cookie && this.cookies.get(opts.cookie)){
		return this.cookies.get(opts.cookie);
	}
}

//export jwt methods as convenience
module.exports.sign = _JWT.sign;
module.exports.verify = _JWT.verify;
module.exports.decode = _JWT.decode;