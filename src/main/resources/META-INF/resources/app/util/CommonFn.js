Ext.define('Hotplace.util.CommonFn', {
	 singleton : true
    ,getFullUrl : function(url) {
    	var fullUrl = Hotplace.util.Constants.context;
    	if(!Ext.isEmpty(url)) {
    		if(url.indexOf('/') != 0) {
    			fullUrl += '/' + url;
    		}
    		else {
    			fullUrl += url;
    		}
    	}

    	return fullUrl;
    }
    ,getHmsTwoDigitByString : function(d) {
    	var nd = Number(d);
    	if(nd < 10) return '0' + d;
    	return d;
    }
    ,getHmsTwoDigitById : function(id) {
    	var v = Ext.getCmp(id).getValue();
    	return this.getHmsTwoDigitByString(v);
    }
	,showLog : function(isDebug, title, log) {
		try {
			if(isDebug) {
				console.log('#####################################################################');
				console.log('#' + title || 'No Title');
				console.log('---------------------------------------------------------------------');
				console.log(log);
				console.log('#####################################################################');
			}
		}
		catch(e) {
			var logWin = window.open('', 'logWin', 'height=250,width=250,toolbar=no,scrollbars=yes,menubar=no');
			logWin.document.write('#####################################################################');
			logWin.document.write('#' + title || 'No Title');
			logWin.document.write('---------------------------------------------------------------------');
			logWin.document.write(log);
			logWin.document.write('#####################################################################');
		}
	}
	,commify : function(v) {
		if(Ext.isEmpty(v)) return '';
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		v += '';                          // 숫자를 문자열로 변환

		while (reg.test(v))
		{
			v = v.replace(reg, '$1' + ',' + '$2');
		}

		return v;
	}
	,timeColon : function(v) {
		if(Ext.isEmpty(v)) return '';
		var reg = /(^[+-]?\d+)(\d{2})/;   // 정규식
		v += '';                          // 숫자를 문자열로 변환

		while (reg.test(v))
		{
			v = v.replace(reg, '$1' + ':' + '$2');
		}

		return v;
	}
	,birthDash : function(birth) {
	   if(birth == '' || birth.length != 8) return '';

	   return birth.substr(0,4) + '-' + birth.substr(4,2) + '-' + birth.substr(6);
	}
	,clone : function(p, c) {
	    c = c || (p.constructor === Array ? [] : {});
	    for (var i in p) {
	        if (typeof p[i] === 'object' && p[i] !== null) {
	            c[i] = p[i].constructor === Array ? [] : {};
	            this.clone(p[i], c[i]);
	        } else {
	            c[i] = p[i];
	        }
	    }
	    return c;
	}
	,dateDiff : function(startYmd, endYmd) {
		if(Ext.isEmpty(startYmd) || Ext.isEmpty(endYmd)) return null;

		var s = parseInt(startYmd.replace(/-/g, ''), 10);
		var e = parseInt(endYmd.replace(/-/g, ''), 10);
		return s - e;
	}
	,isPlainObjEmpty : function(obj) {
		return !obj || Object.keys(obj).length == 0;
	}
	,redirectStoreAjax: function(response) {
		var context = Hotplace.util.Constants.context;
		var rText = null
		
		if(response && (rText = response.responseText)) {
			 
			if(!Ext.String.trim(rText).startsWith('{')) {
				//html로 간주
				Ext.Msg.alert('', '세션만료 또는 중복로그인으로 인해 다시 로그인해주세요', function() {
					window.location.href = context + '/signin';
				});
				
				return;
			}
			
			var jo = Ext.decode(response.responseText);
			 
			if(!jo.success && jo.errCode) {
				var errCode = jo.errCode;
				
				if(errCode == '202') {
					Ext.Msg.alert('', '중복로그인이  발생했습니다.', function() {
						window.location.href = context + '/signin';
					});
					return;
				} 
			}
		}
		else {
			Ext.Msg.alert('', '중복로그인이  발생했습니다.', function() {
				window.location.href = context + '/signin';
			});
		}
	}
	,ajax: function(param) {
		var config = {};
		if(!param) throw new Error('파라미터 객체없음');
		if(!param.url) throw new Error('url not found');
		
		var context = Hotplace.util.Constants.context;
		var myMask = null;
		
		config.url = context + param.url;
		config.method = (param.method || 'GET').toUpperCase();
		config.timeout = param.timeout || 60000;
		
		if(param.params) config.params = param.params;
		if(param.headers) config.headers = param.headers;
		if(param.jsonData) config.jsonData = param.jsonData;
		
		config.success = function(response) {
			try {
				var jo = Ext.decode(response.responseText);
				var errCode = jo.errCode;
				
				//중복로그인 세션 체크
				if(!jo.success) {
					if(errCode == '202') {
						Ext.Msg.alert('', '중복로그인이  발생했습니다.', function() {
							window.location.href = context + '/signin';
						});
						return;
					}
				}
				
				if(param.success) {
					param.success(jo);
				}
				
			}
			catch(e) {
				if(!Ext.String.trim(response.responseText).startsWith('{')) {
					//html로 간주
					Ext.Msg.alert('', '세션만료 되었습니다.', function() {
						window.location.href = context + '/signin';
					});
				}
			}
			finally {
				if(myMask) myMask.hide();
			}
		}
		
		config.failure = function(response) {
			if(myMask) myMask.hide();
			Ext.Msg.alert('', '오류가 발생했습니다.');
			
			if(param.failure) param.failure(response);
		}
		
		if(param.loadmask) {
			myMask = new Ext.LoadMask(param.loadmask.el || Ext.getBody(), {msg: param.loadmask.msg || 'loading..'});
			myMask.show();
		}
		
		Ext.Ajax.request(config);
	}
});