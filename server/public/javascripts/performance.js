var loadMask = {
	init: function() {
		$('#loadMask').show().find('.meter > span').css('width', 0);
	},
	progress: function(p) {
		$('#loadMask > .meter > span').css('width', p + '%');
	},
	complete: function() {
		$('#loadMask').fadeOut('slow');
	},
	completeNow: function() {
		$('#loadMask').fadeOut(0);
	}
}

var protocol = ('https:' === document.location.protocol ? 'https://' : 'http://');

var dataUtil = {
	queue: 0,
	taskManager: {
		tasks: [],
		size: function() {
			return this.tasks.length;
		},
		add: function(task) {
			this.tasks.push(task);
		},
		remove: function(task) {
			this.tasks.splice($.inArray(task, this.tasks), 1);
		},
		shift: function() {
			return this.tasks.shift();
		},
		reset: function() {
			this.tasks = []
		}
	},

	getPerformanceData: function(req, success, fail) {
		var cache = PerformanceDataCache.get(req),
			taskManager = this.taskManager,
			_this = this;
		if (cache) {
			success(cache);
			return;
		}
		if (_this.queue++ === 0) {
			loadMask.init();
		}
		var timeout = setTimeout(function() { // For using jsonp, use timeout for network error.
			if (timeout != null) {
				timeout = null;
				fail();
				_this.queue = 0;
				loadMask.complete();
			}
		}, 2 * 60 * 1000);
		var xhr = $.ajax({
			url: protocol + 'test.webservice.com/index.php?method=vela.item.performance.get&callback=?&format=STRING',
			data: req,
			dataType: 'jsonp',
			success: function(resp) {
				if (timeout != null && xhr.timeout != null) {
					taskManager.remove(xhr);
					timeout = null;
					clearTimeout(timeout);
					PerformanceDataCache.put(req, resp);
					loadMask.progress( (_this.queue - taskManager.size()) / _this.queue * 100);
					if (taskManager.size() === 0) {
						_this.queue = 0;
						loadMask.complete();
					}
					success(resp);
				}
			}
		});
		xhr.timeout = timeout;
		taskManager.add(xhr);
	},

	cancel: function() {
		// If all task(s) have been completed, return false
		// Otherwise return true
		if (this.taskManager.size() === 0) {
			return false
		}
		var xhr = this.taskManager.shift();
		while (xhr) {
			clearTimeout(xhr.timeout)
			xhr.timeout = null;
			xhr = this.taskManager.shift()
		}
		this.queue = 0
		loadMask.completeNow();
		return true
	}
}

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

/*********************************************************
 For state BOF
 *********************************************************/

 // Is pjax supported by this browser?
$.support.pjax =
  window.history && window.history.pushState && window.history.replaceState
  // pushState isn't reliable on iOS until 5.
  && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/)

function parseOptions() {
	var obj = {}
	obj.from = $('#date-start').val()
	obj.to   = $('#date-end').val()
	obj.unit = $('#date-unit').val()
	obj.browser = $('#browser').val()
	obj.country = $('#country').val()
	obj.page    = $('#page-type').val()
	$('#page-template').is(':visible') && (obj.template = $('#page-template').val())
	obj.ab = []
	$('.data-ab:checked').each(function() {
		obj.ab.push($(this).val())
	})
	return obj
}

function setOptions(obj) {
	$('#date-start').val(obj.from)
	$('#date-end').val(obj.to)
	$('#date-unit').val(obj.unit)
	obj.unit === 'hour' ? $('#date-range').hide() : $('#date-range').show()
	$('#browser').val(obj.browser)
	$('#country').val(obj.country)
	$('#page-type').val(obj.page).change()
	$('#page-template').hide()
	obj.template && $('#page-template').val(obj.template).show()
	$('.data-ab').attr('checked', false)
	$(obj.ab).each(function(idx, value) {
		$('.data-ab[value=' + value + ']').attr('checked', true)
	})
	resetAB()
}

function pushState() {
	var url = '/performance?' + (/mobile/.test(location.search) ? 't=mobile&' : '') + $.param(parseOptions());
	(url !== location.pathname + location.search) && window.history.pushState(parseOptions(), document.title, url)
}

function replaceState() {
	var url = '/performance?' + (/mobile/.test(location.search) ? 't=mobile&' : '') + $.param(parseOptions());

	(url !== location.pathname + location.search) && window.history.replaceState(parseOptions(), document.title, url)
}

/*********************************************************
 For state EOF
 *********************************************************/
