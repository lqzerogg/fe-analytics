var config = {
	dimensions: {
		'country': ['fr', 'us', 'it', 'es', 'gb', 'br', 'dk', 'de', 'nl', 'no', 'au', 'be', 'se', 'ca', 'ru', 'ch', 'ie', 'at', 'pt', 'gr'],
		'browser': ['chrome-all', 'firefox-all', 'ie-all'],
		'browser & version': ['chrome-28', 'chrome-27', 'chrome-26', 'firefox-21', 'firefox-20', 'ie-10', 'ie-9']
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
		'firefox-all': 'Firefox',
		'firefox-21':  'Firefox 21',
		'firefox-20':  'Firefox 20',
		'ie-all':      'Internet Explorer',
		'ie-10':       'Internet Explorer 10',
		'ie-9':        'Internet Explorer 9'
	},
	pageTypes: '<optgroup label="litb">\
						<option value="litb_all">litb 全部页面</option>\
						<option value="litb_index">litb 首页</option>\
						<option value="litb_products_category">litb 品类页</option>\
						<option value="litb_advanced_search_result">litb 搜索结果页</option>\
						<option value="litb_narrow_search">litb narrow search页</option>\
						<option value="litb_product_info">litb 单品页</option>\
					</optgroup>\
					<optgroup label="mini">\
						<option value="mini_all">mini 全部页面</option>\
						<option value="mini_index">mini 首页</option>\
						<option value="mini_products_category">mini 品类页</option>\
						<option value="mini_advanced_search_result">mini 搜索结果页</option>\
						<option value="mini_narrow_search">mini narrow search页</option>\
						<option value="mini_product_info">mini 单品页</option>\
					</optgroup>',
	pageTemplates: {
		'products_category': {
			'20': '分类入口模板(含子类入口)',
			'21': '子分类推广模板(方/128)',
			'22': '子分类推广模板(通/方/128/176)',
			'23': '基础类目模板(通/方/128/176)',
			'24': '基础类目模板(方/176/List)',
			'27': '分类入口模板',
			'28': '子分类推广模板(长/176/240)',
			'29': '子分类推广模板(通/长/176/240)',
			'30': '基础类目模板(长/176/240/List)',
			'33': '特卖会模板(长/176/284)',
			'34': '特卖会模板(方/176/176)',
			'100': '模块化-分类入口模板(含子类入口)',
			'107': '模块化-分类入口模板',
			'103': '模块化-基础类目模板(通/方/128/176)',
			'104': '模块化-基础类目模板(方/176/List)'
		},
		'narrow_search': {
			'25': 'Narrow Search模板(方/176/List)',
			'26': 'Narrow Search模板(3C/方/176/List)',
			'31': 'Narrow Search模板(长/176/240/List)',
			'32': 'Narrow Search模板(3C/长/176/240/List)'
		},
		'product_info': {
			'3': '婚纱礼服',
			'4': '通用模板',
			'5': '通用模板(1500)',
			'6': '婚纱礼服-通栏',
			'7': '通用模板(数据显示分离)'
		}
	}
}
