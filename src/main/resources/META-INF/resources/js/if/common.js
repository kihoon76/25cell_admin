var Hotplace = (function() {
	var _ROOT_CONTEXT = $('body').data('url');
	
	/*******************************************************
	 * waitMe
	 *******************************************************/
	var _loadEl;
	var _loadTxt = '';//'로딩 중입니다';
	var _loadEndCount = 0;
	
	var _loadEffects = {
		bounce: 'bounce',
		rotateplane: 'rotateplane',
		stretch: 'stretch',
		orbit: 'orbit',
		roundBounce: 'roundBounce',
		win8: 'win8',
		win8_linear: 'win8_linear',
		ios: 'ios',
		facebook: 'facebook',
		rotation: 'rotation',
		timer: 'timer',
		pulse: 'pulse',
		progressBar: 'progressBar',
		bouncePulse: 'bouncePulse'
	};
	
	function _runWaitMe(loadEl, num, effect, msg){
		
		var fontSize = '';
		var maxSize = '';
		var loadTxt = msg || '';//'로딩 중입니다';
		var textPos = '';
		
		switch (num) {
			case 1:
			maxSize = '';
			textPos = 'vertical';
			fontSize = '25px';
			break;
			case 2:
			loadTxt = '';
			maxSize = 30;
			textPos = 'vertical';
			break;
			case 3:
			maxSize = 30;
			textPos = 'horizontal';
			fontSize = '18px';
			break;
		}
		
		_loadEl = loadEl;
		_loadEl.waitMe({
			effect: effect,
			text: loadTxt,
			bg: 'rgba(255,255,255,0.4)',//'rgba(255,255,255,0.4)',
			color: '#000',
			maxSize: maxSize,
			source: 'img.svg',
			textPos: textPos,
			fontSize: fontSize,
			onClose: function() {}
		});
	}
	
	return {
		ajax: function(params) {
			$.ajax(_ROOT_CONTEXT + params.url, {
				async: (params.async == null)? true : params.async,
				beforeSend: function(xhr) {
					var activeMask = (params.activeMask == undefined) ? true : params.activeMask; //전체설정 이후 마스크 개별설정
					if(activeMask && !params.isMaskTran) Hotplace.showMask(params.loadEl, params.loadMsg);
					
					if(params.beforeSend && typeof params.beforeSend === 'function') {
						params.beforeSend(xhr);
					} 
				},
				contentType: params.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: params.dataType || 'json',
				method: params.method || 'POST',
				context: params.context || document.body,
				data: params.data,
				statusCode: {
					404: function() {
						console.log('Page not found');
					}  
				},
				success: function(data, textStatus, jqXHR) {
					if(!params.success || typeof params.success !== 'function') {
						throw new Error('success function not defined');
					}
					
					try {
						params.success(data, textStatus, jqXHR);
						
					} 
					finally {
						var activeMask = (params.activeMask == undefined) ? true : params.activeMask; 
						if(activeMask) {
							Hotplace.hideMask();
						} 
						
					}
				},
				error: function(jqXHR, textStatus, e) {
					if(!params.error || typeof params.error !== 'function') {
						//Default 동작
					}
					else {
						params.error(jqXHR, textStatus, e);
					}
					
					var activeMask = (params.activeMask == undefined) ? true : params.activeMask; 
					if(activeMask) {
						Hotplace.hideMask();
					} 
				},
				complete: function(jqXHR, textStatus) {
					if(params.complete) params.complete(jqXHR);
				},
				timeout: params.timeout || 300000
			});
		},
		showMask: function(loadEl, msg) {
			if(loadEl) {
				loadEl = $(loadEl);
			}
			else {
				loadEl = $('body');
			}
			_runWaitMe(loadEl, 1, _loadEffects.ios, msg);
		},
		hideMask: function() {
			_loadEl.waitMe('hide');
		}
	}
})();
