var config = {
	dimensions: {
		'country': ['fr', 'us', 'it', 'es', 'gb', 'br', 'dk', 'de', 'nl', 'no', 'au', 'be', 'se', 'ca', 'ru', 'ch', 'ie', 'at', 'pt', 'gr'],
		'browser': ['m_chrome-all', 'm_firefox-all', 'm_android-all'],
		'browser & version': ['m_chrome-28', 'm_chrome-27', 'm_chrome-26', 'm_chrome-25', 'm_firefox-22', 'm_firefox-21', 'm_firefox-20', 'm_firefox-19', 'm_android-5.0', 'm_android-4.2', 'm_android-4.1', 'm_android-4.0']
	},
	pageTypes: '<optgroup label="litb">\
						<option value="litb_m_all">litb 全部页面</option>\
						<option value="litb_m_index">litb 首页</option>\
						<option value="litb_m_mobile_products_category">litb 品类页</option>\
						<option value="litb_m_mobile_list">litb List页</option>\
						<option value="litb_m_mobile_advanced_search_result">litb 搜索结果页</option>\
						<option value="litb_m_mobile_narrow_search">litb narrow search页</option>\
						<option value="litb_m_product_info">litb 单品页</option>\
					</optgroup>\
					<optgroup label="mini">\
						<option value="mini_m_all">mini 全部页面</option>\
						<option value="mini_m_index">mini 首页</option>\
						<option value="mini_m_mobile_products_category">mini 品类页</option>\
						<option value="mini_m_mobile_list">mini List页</option>\
						<option value="mini_m_mobile_advanced_search_result">mini 搜索结果页</option>\
						<option value="mini_m_mobile_narrow_search">mini narrow search页</option>\
						<option value="mini_m_product_info">mini 单品页</option>\
					</optgroup>',
	pageTemplates: {
		'm_mobile_products_category': {
			'0': '普通分类列表',
			'1': '一级分类入口',
			'2': '分类入口模板',
			'3': '分类推广模板',
			'4': '分类入口模板(不展开分类树)',
			'9': 'Narrow Search入口'
		}
	}
}