/**
 Gathered datasets.
 Request includes:
 1. data terms
 2. date range
 3. restriction (location, os & browser, page)
 4. specification: column(s) the response datasets to be separated with

 Response is an array with all the items that include:
 1. request's specification value
 2. data of each term
 3. count for each result
*/

var request = {
	data: ['domainLookup', 'domReady', 'load'],
	startDate: '20121103',
	endDate: '20121118',
	country: 'United States',
	pageType: 'category',
	pageTemp: 1,
	specification: ['operatingSystem', 'browser']
};

var response = [
	{
		operatingSystem: 'OSX',
		browser: 'Chrome',
		domainLookup: 100,
		domReady: 3000,
		load: 10000,
		count: 50
	},
	{
		operatingSystem: 'OSX',
		browser: 'Firefox',
		domainLookup: 100,
		domReady: 4000,
		load: 12000,
		count: 40
	}
];

/**
 Detailed datasets.
 Request includes:
 1. data term(s)
 2. date range and unit
 3. restriction (location, os & browser, page)
 4. specification: data or restriction column of which the terms should be separated in response

 Response is an array with all the items that include:
 1. date of each result
 2. request's specification value
 2. data of each term
 3. count for each result
*/
request = {
	data: ['domainLookup', 'domReady', 'load'],
	startDate: '20121103',
	endDate: '20121118',
	dateUnit: 'day',
	country: 'United States',
	pageType: 'category',
	pageTemp: 1,
	specification: 'data'
};

response = [
	{
		date: '20121103',
		domainLookup: 100,
		domReady: 3000,
		load: 10000,
		count: 50
	},
	{
		date: '20121104',
		domainLookup: 100,
		domReady: 4000,
		load: 12000,
		count: 50
	}
];


var protocol = ('https:' === document.location.protocol ? 'https://' : 'http://');

function requirePerformanceData(type, req, success, fail) {
	var cache = PerformanceDataCache.get(type, req);
	if (cache != null) {
		return cache;
	}
	var timeout = setTimeout(function() { // For using jsonp, use timeout for network error.
		if (timeout != null) {
			timeout = null;
			fail();
		}
	}, 10000);
	$.getJSON(
		protocol + 'www.lightinthebox.com/' + type + '?callback=?',
		req,
		function(resp) {
			if (timeout != null) {
				timeout = null;
				resp = eval('[' + resp + ']')[0];
				clearTimeout(timeout);
				PerformanceDataCache.put(type, req, resp);
				success(resp);
			}
		}
	);
};

// Sort object by keys and export to an array, not supported before ie9
// Object items is not ordered as they were declared for non-numerical key
// refer: http://stackoverflow.com/questions/280713/elements-order-in-a-for-in-loop
function jsonToSortedArray(obj) {
	var sorted = [];
	Object.keys(obj).sort().forEach(function(name) {
		var item = {};
		item[name] = obj[name];
		sorted[sorted.length] = item;
	});
	return sorted;
};

/**
 Use JSON.stringify to cache request.
*/
var PerformanceDataCache = {
	cache: {},
	put: function(type, jsonKey, value) {
		var strKey = JSON.stringify(jsonToSortedArray(jsonKey));
		if (this.cache[type] == null){
			this.cache[type] = {};
			this.cache[type][strKey] = value;
		}
		else if (this.cache[type][strKey] == null) {
			this.cache[type][strKey] = value;
		}
	},
	get: function(type, jsonKey) {
		var strKey = jsonToSortedArray(jsonKey);
		if (this.cache[type] == null){
			return null;
		}
		return this.cache[type][strKey];
	}
};