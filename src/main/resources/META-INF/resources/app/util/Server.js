Ext.define("Asher.util.Server", {
	 singleton : true
	,uses : ['Asher.util.Constants', 'Asher.util.CommonFn']
	,send : function(cfg) {
		var Format = Ext.util.Format;
		var body = Ext.getBody();
		Ext.Ajax.on('beforerequest', function(conn, options) {
			if(Ext.isFunction(cfg.beforerequest)) {
				cfg.beforerequest();
			}

			//grid일 경우
			if(Ext.isEmpty(options.proxy)) {
				body.mask(cfg.loadText || '로딩중입니다..', 'loading');
			};
		}, body);

		Ext.Ajax.on('requestcomplete', function()  {body.unmask()}, body);
		Ext.Ajax.on('requestexception', function() {body.unmask()}, body);

		var finalCfg = {
			url    : Asher.util.CommonFn.getFullUrl(cfg.url)
		   ,method : cfg.method ? Format.uppercase(cfg.method) : 'POST'
		   ,headers : {
			   ajax : 'on'
		   }
		   ,params : cfg.params || ''
		   ,success : function(response, opts) {
			   var responseText = Format.trim(response.responseText);
			   try {
				   var resultJson = Ext.decode(responseText);
				   var code = resultJson.code;
				   if(Asher.util.Constants.FAILURE == code) {
					   //세션오류일 경우
					   if(resultJson.sessionError) {

					   }
					   else {
						   Ext.Msg.alert('오류', '서버 오류가 발생했습니다.');
					   }
				   }
				   else {
					   cfg.success(response, responseText, opts);
				   }
			   }
			   catch(e) {
				   cfg.success(response, responseText, opts);
			   }
		   }
		   ,failure : function(response, opts) {
			   cfg.failure(response, opts);
		   }
		   ,timeout : Asher.util.Constants.ajaxTimeout
		   ,scope : this
		};

		if(cfg.jsonData) {
			finalCfg.jsonData = cfg.jsonData;
		}

		Ext.Ajax.request(finalCfg);
	}
});