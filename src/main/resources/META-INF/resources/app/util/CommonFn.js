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
});