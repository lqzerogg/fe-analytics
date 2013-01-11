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
		protocol + 'test.webservice.com/index.php?method=vela.item.performance.get&callback=?&format=STRING',
		req,
		function(resp) {
			if (timeout != null) {
				timeout = null;
				clearTimeout(timeout);
				PerformanceDataCache.put(req, resp);
				success(resp);
			}
		}
	);
};

// Sort object by keys and export to an array
// Object items is not ordered as they were declared for non-numerical key
// refer: http://stackoverflow.com/questions/280713/elements-order-in-a-for-in-loop
function jsonToSortedArray(obj) {
	var sorted = [], keys = [], key;
	for (key in obj) {
		keys.push(key);
	}
	keys.sort().forEach(function(name) {
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
