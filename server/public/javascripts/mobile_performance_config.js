var config = {
	dimensions: {
		'country': ['fr', 'us', 'it', 'es', 'gb', 'br', 'dk', 'de', 'nl', 'no', 'au', 'be', 'se', 'ca', 'ru', 'ch', 'ie', 'at', 'pt', 'gr'],
		'browser': ['chrome-all', 'firefox-all', 'android-all'],
		'browser & version': ['chrome-28', 'chrome-27', 'chrome-26', 'chrome-25', 'firefox-22', 'firefox-21', 'firefox-20', 'firefox-19', 'android-5.0', 'android-4.2', 'android-4.1', 'android-4.0']
	},
	countries: {
		'fr': 'France',
		'us': 'United States',
		'it': 'Italy',
		'es': 'Spain',
		'gb': 'United Kingdom',
		'br': 'Brazil',
		'dk': 'Denmark',
		'de': 'Germany',
		'nl': 'Netherlands',
		'no': 'Norway',
		'au': 'Australia',
		'be': 'Belgium',
		'se': 'Sweden',
		'ca': 'Canada',
		'ru': 'Russian Federation',
		'ch': 'Switzerland',
		'ie': 'Ireland',
		'at': 'Austria',
		'pt': 'Portugal',
		'gr': 'Greece'
	},
	browsers: {
		'chrome-all':  'Chrome',
		'chrome-28':   'Chrome 28',
		'chrome-27':   'Chrome 27',
		'chrome-26':   'Chrome 26',
		'chrome-25':   'Chrome 25',
		'firefox-all': 'Firefox',
		'firefox-22':  'Firefox 22',
		'firefox-21':  'Firefox 21',
		'firefox-20':  'Firefox 20',
		'firefox-19':  'Firefox 19',
		'android-all': 'Android',
		'android-5.0': 'Android 5.0',
		'android-4.2': 'Android 4.2',
		'android-4.1': 'Android 4.1',
		'android-4.0': 'Android 4.0'
	},
	pageTypes: '<optgroup label="litb">\
						<option value="litb_all">litb 全部页面</option>\
						<option value="litb_index">litb 首页</option>\
						<option value="litb_mobile_products_category">litb 品类页</option>\
						<option value="litb_mobile_list">litb List页</option>\
						<option value="litb_mobile_advanced_search_result">litb 搜索结果页</option>\
						<option value="litb_mobile_narrow_search">litb narrow search页</option>\
						<option value="litb_product_info">litb 单品页</option>\
					</optgroup>\
					<optgroup label="mini">\
						<option value="mini_all">mini 全部页面</option>\
						<option value="mini_index">mini 首页</option>\
						<option value="mini_mobile_products_category">mini 品类页</option>\
						<option value="mini_mobile_list">mini List页</option>\
						<option value="mini_mobile_advanced_search_result">mini 搜索结果页</option>\
						<option value="mini_mobile_narrow_search">mini narrow search页</option>\
						<option value="mini_product_info">mini 单品页</option>\
					</optgroup>',
	pageTemplates: {
		'mobile_products_category': {
			'0': '普通分类列表',
			'1': '一级分类入口',
			'2': '分类入口模板',
			'3': '分类推广模板',
			'4': '分类入口模板(不展开分类树)',
			'9': 'Narrow Search入口'
		}
	}
}