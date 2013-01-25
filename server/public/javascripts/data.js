var protocol = ('https:' === document.location.protocol ? 'https://' : 'http://'),
	queue = 0, completed = 0;

function requirePerformanceData(req, success, fail, init, progress, destroy) {
	var cache = PerformanceDataCache.get(req);
	if (cache) {
		success(cache);
		return;
	}
	if (queue++ === 0) {
		completed = 0;
		init();
	}
	var timeout = setTimeout(function() { // For using jsonp, use timeout for network error.
		if (timeout != null) {
			timeout = null;
			fail();
		}
	}, 60000);
	$.getJSON(
		protocol + 'test.webservice.com/index.php?method=vela.item.performance.get&callback=?&format=STRING',
		req,
		function(resp) {
			if (timeout != null) {
				timeout = null;
				clearTimeout(timeout);
				PerformanceDataCache.put(req, resp);
				progress(++completed / queue * 100);
				if (completed === queue) {
					queue = 0;
					destroy();
				}
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
		var strKey = JSON.stringify(jsonToSortedArray(jsonKey));
		return this.cache[strKey];
	}
};
