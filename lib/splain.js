var url = require('url');
var util = require('util'),
	fmt = util.format;

var _ = require('lodash');

function isUrl(str) {
	if (! _.isString(str)) return false;
	
	return Boolean(url.parse(str).protocol);
}

function isInteger(n) {
	return _.isNumber(n) && (n % 1 == 0)
}
	

/*
function entab(str, n) {
	return _.times(n, function () { return str; }).join('');
}

function describeValue(v, level) {
	level = level ? level : 0;
	if (_.isArray(v)) return describeArray(v, level);
	if (_.isObject(v)) return describeObject(v, level);
	else return describeScalar(v, level);
}

function describeArray(a, level) {
	if (a.length)
		return fmt('array [ %s\n%s]', describeValue(a[0], level + 1), entab('  ', level));
	return 'array of nothing';
}

function describeScalar(v, level) {
	// TODO: detect ints and floats, maybe signedness
	
	if (isUrl(v)) return 'url';
	if (isInteger(v)) return 'integer';
	
	return typeof(v);
}

function describeObject(o, level) {
	var pairs = _.map(o, function (v, k) {
		return fmt('%s%s: %s', entab('  ', level + 1), k, describeValue(v, level+1));
	});
	
	return fmt('object of { \n%s\n%s}', pairs.join("\n"), entab('  ', level));
}
*/

function omap(o, cb) {
	var out = {};
	_.each(o, function (v, k) {
		out[k] = cb(v, k, o);
	});
	return out;
}

function describe (v, options) {
	options = _.merge({}, defaults, options);
	if (_.isArray(v)) return [ describe(v[0], options) ];
	if (_.isObject(v)) return omap(v, function (x) { return describe(x, options); });
	if (options.detect_url && isUrl(v)) return 'url';
	if (options.detect_int && isInteger(v)) return 'integer';
	return typeof(v);
}

function explain (v, options) {
	return util.inspect(describe(v, options), { depth: null });
}

var defaults = {
	detect_url: true,
	detect_int: true
};

module.exports = {
	describe: describe,
	explain: explain
};