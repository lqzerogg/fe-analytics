var mysql      = require('mysql'),
	dateutil   = require('./public/javascripts/dateutil')

var dataUtil = function() {

	var db = function() {
		var pool = mysql.createPool({
			host     : '192.168.66.211',
			user     : 'fe_admin',
			password : 'ek8E9f#s',
			database : 'fe_platform',
			timezone : '+0000'
		})

		this.doQuery = function(sql, cb) {
			pool.getConnection(function(err, connection) {
				connection.query(sql, function(err, results) {
					if (err) {
						console.log(err.code)
						console.log('fatal: ' + err.fatal)
						throw err
						return
					}

					cb(results)

					connection.end()
				})
			})
		}

		return this
	}()


	this.getId = function(tableName, rowName, values, cb) {
		db.doQuery('select distinct(id) from ' + tableName + ' where ' + rowName + ' in (' + mysql.escape(values) + ')', function(results) {
			var i = 0, ar = []
			for(i in results) {
				ar.push(results[i].id)
			}
			cb(ar)
		})
	}

	this.getResult = function(sql, cb) {
		db.doQuery(sql, function(results) {
			cb(results)
		})
	}

	return this
}()

dateutil.formatDate = function(dateStr) {
	var date = dateStr.split('');
	if (date.length === 14) {
		date.splice(12, 0, ':');
		date.splice(10, 0, ':');
		date.splice(8, 0, ' ');
	}
	date.splice(6, 0, '-');
	date.splice(4, 0, '-');
	return date.join('')
}

dateutil.setMonday = function(date) {
	var day = date.getDay(),
		diff = date.getDate() - day + (day == 0 ? -6:1) // adjust when day is sunday
	return new Date(date.setDate(diff));
}

exports.getData = function(options, res) {
	var siteId, abTagId, countryId, browserId, pageId

	var startDate = dateutil.parse(dateutil.formatDate(options.startDate))
	var endDate   = dateutil.parse(dateutil.formatDate(options.endDate))

	switch (options.dateUnit) {
		case 'hour':
			break
		case 'day':
			endDate.setDate(endDate.getDate() + 1)
			break
		case 'week':
			startDate = dateutil.setMonday(startDate)
			endDate   = dateutil.setMonday(endDate)
			endDate.setDate(endDate.getDate() + 7)
			break
		case 'month':
			startDate.setDate(1)
			endDate.setMonth(endDate.getMonth() + 1)
			endDate.setDate(1)
	}

	dataUtil.getId('fe_site', 'site', options.site, function(ar) {
		if (ar.length === 0)
			return res.send(500, 'No result for site = ' + options.site)
		siteId = ar
		dataUtil.getId('fe_abtag', 'abtag', options.abTag, function(ar) {
			if (ar.length === 0)
				return res.send(500, 'No result for abtag = ' + options.abTag)
			abTagId = ar
			dataUtil.getId('fe_country', 'country', options.country, function(ar) {
				if (ar.length === 0)
					return res.send(500, 'No result for country = ' + options.country)
				countryId = ar
				dataUtil.getId('fe_browser_type_and_version', 'browser', options.browser, function(ar) {
					if (ar.length === 0)
						return res.send(500, 'No result for browser = ' + options.browser)
					browserId = ar
					dataUtil.getId('fe_page_type_and_template', 'page', options.page, function(ar) {
						if (ar.length === 0)
							return res.send(500, 'No result for page = ' + options.page)
						pageId = ar

						var count = 0, results = []
						while (startDate < endDate) {
							var regionDate = new Date(startDate),
								formattedDate
							switch (options.dateUnit) {
								case 'hour':
									formattedDate = dateutil.format(startDate, 'YmdHis')
									regionDate.setMinutes(59)
									break
								case 'day':
									formattedDate = dateutil.format(startDate, 'Ymd')
									break
								case 'week':
									formattedDate = dateutil.format(startDate, 'Ymd')
									regionDate.setDate(regionDate.getDate() + 6)
									break
								case 'month':
									formattedDate = dateutil.format(startDate, 'Ym')
									regionDate.setMonth(regionDate.getMonth() + 1)
									regionDate.setDate(0)
									break;
								case 'all':
									formattedDate = dateutil.format(startDate, 'Ymd')
									regionDate = endDate
									break;
							}
							var sql =
							  ' select "'
							  + options.page + '" as page, "'
							  + options.browser + '" as browser, "'
							  + options.abTag + '" as abtag, "'
							  + options.country + '" as country, '
							  + formattedDate + ' as date, '
							  +'sum(networkLatencytime * counter) as sumNetworkLatency, \
								sum(domcontentloadtime * counter) as sumDomReady, \
								sum(loadresponsetime * counter) as sumLoad, \
								sum(counter) as sumcount from '
							  + ((options.dateUnit == 'hour') ? 'fe_hourly_performance' : 'fe_daily_performance')
							  +' where logdate >= "' + dateutil.format(startDate, 'Y-m-d H:i') + '" AND logdate <= "' + dateutil.format(regionDate, 'Y-m-d H:i') 
							  +'" AND page_id = ' + pageId
							  +' AND browser_id = ' + browserId
							  +' AND abtag = ' + abTagId
							  +' AND country_id = ' + countryId
							  +' AND website = ' + siteId

							dataUtil.getResult(sql, function(result) {
								if (result[0].sumcount) {
									result[0].count = '' + result[0].sumcount
									if (result[0].sumcount > 0) {
										result[0].networkLatency = Math.round(result[0].sumNetworkLatency / result[0].sumcount)
										result[0].domReady       = Math.round(result[0].sumDomReady / result[0].sumcount)
										result[0].load           = Math.round(result[0].sumLoad / result[0].sumcount)
									}
								} else {
									result[0].count = result[0].networkLatency = result[0].domReady = result[0].load = 0
								}
								results.push(result[0])
								if (results.length === count) {
									results.sort(function(a, b) {
										return a.date > b.date ? 1 : -1
									})
									res.send(results)
								}
							})

							switch (options.dateUnit) {
								case 'hour':
									startDate.setHours(startDate.getHours() + 1)
									break
								case 'day':
									startDate.setDate(startDate.getDate() + 1)
									break
								case 'week':
									startDate.setDate(startDate.getDate() + 7)
									break
								case 'month':
									startDate.setMonth(startDate.getMonth() + 1)
									break
								case 'all':
									startDate = endDate
									break
							}
							count++;
						}
					})
				})
			})
		})
	})
}