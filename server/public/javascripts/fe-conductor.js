/*jslint white:true, vars:true, browser:true, forin:true, eqeq:true, unparam:true */

/*global $, litb */

(function() {

	"use strict";

	var workers = {
		performanceSender : function(options) {
			if (window.performance && window.performance.timing) {
				$(window).load( function() {
					var vt = '', pt;
					for (pt in window.performance.timing) {
						vt += ('&' + pt + '=' + window.performance.timing[pt]);
					}
					var src = ('https:' == document.location.protocol ? 'https://' : 'http://') +
						litb.fe_analytics_site +
						'/fe_performance_tracking.php?mainPage=' + litb.mainPage +
						(litb.pageTemplate ? '&pageTemplate=' + litb.pageTemplate : '') +
						(litb.cutSel ? '&country=' + litb.cutSel : '') +
						(litb.abTestType ? '&abTestType=' + litb.abTestType : '') +
						vt;
					$('body').append('<img src="' + src + '" width="1" height="1" />');
				});
			}
		}
	};

	var config = [
		{ // 规则1
			condition : {
				pages : [ 'index', 'products_category', 'advanced_search_result', 'narrow_search', 'product_info' ]
				// pages : [ 'index', 'products_category', 'advanced_search_result', 'narrow_search', 'product_info', 'shopping_cart', 'checkout_payment_process' ],
				// countries : [ 'us', 'fr' ]
			},
			worker : workers.performanceSender
		}
	];

	$.each(config, function(idx, rule) {
		// Check the page rule.
		if (litb.mainPage && rule.condition.pages) {
			if (rule.condition.pages.indexOf(litb.mainPage) === -1) {
				return;
			}
		}

		// Check the country rule.
		if (litb.cutSel && rule.condition.countries) {
			if (rule.condition.countries.indexOf(litb.cutSel) === -1) {
				return;
			}
		}

		// If passed all the conditions, call the worker.
		rule.worker.call(this, {});
	});
}());