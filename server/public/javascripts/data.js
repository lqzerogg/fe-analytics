var protocol = ('https:' === document.location.protocol ? 'https://' : 'http://');

function requirePerformanceData(req, success, fail) {
	var cache = PerformanceDataCache.get(req);
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
		protocol + 'http://test.webservice.com/index.php?method=vela.item.performance.get?callback=?',
		req,
		function(resp) {
			if (timeout != null) {
				timeout = null;
				resp = eval('[' + resp + ']')[0];
				clearTimeout(timeout);
				PerformanceDataCache.put(req, resp);
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
	put: function(jsonKey, value) {
		var strKey = JSON.stringify(jsonToSortedArray(jsonKey));
		if (typeof(this.cache[strKey]) == 'undefined' || this.cache[strKey] == null) {
			this.cache[strKey] = value;
		}
	},
	get: function(jsonKey) {
		var strKey = jsonToSortedArray(jsonKey);
		return this.cache[strKey];
	}
};