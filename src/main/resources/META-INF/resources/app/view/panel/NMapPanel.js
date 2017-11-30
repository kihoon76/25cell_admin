Ext.define('Hotplace.view.panel.NMapPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.nmappanel',
	initComponent: function() {
		var mapHtml  = '<div id="map">';
		    mapHtml += '<div class="buttons">';
		    mapHtml += '	<input id="cadastral" type="button" class="control-btn control-btn-default" value="지적도" /> ';
            mapHtml += '</div>'; 
            mapHtml += '</div>';
		
	
		Ext.apply(this, {
			html:mapHtml,
		});
		
		this.callParent();
	},
	createMap: function() {
		var that = this;
		var mapOptions = {
		 	center: new naver.maps.LatLng(36.0207091, 127.9204629), //지도의 초기 중심 좌표(36.0207091, 127.9204629)
	        zoom: 3, //지도의 초기 줌 레벨
	        mapTypeControl: true,
	        mapTypeControlOptions: {
	        	style: naver.maps.MapTypeControlStyle.DROPDOWN
	        }
		};
		this.nmap = new naver.maps.Map('map', mapOptions);
		
		var btn = Ext.get('cadastral');
		
		//지적편집도
		var cadastralLayer = new naver.maps.CadastralLayer();
		naver.maps.Event.addListener(that.nmap, 'cadastralLayer_changed', function(cadastralLayer) {
		    if (cadastralLayer) {
		    	btn.removeCls('control-btn-default');
		    	btn.addCls('control-btn-primary');
		    } 
		    else {
		    	btn.removeCls('control-btn-primary');
		    	btn.addCls('control-btn-default');
		    }
		});

		btn.on('click', function(e) {

		    if (cadastralLayer.getMap()) {
		        cadastralLayer.setMap(null);
		    } else {
		        cadastralLayer.setMap(that.nmap);
		    }
		});
		
		Ext.Ajax.request({
			url: 'maptype/standard',
			method: 'GET',
			success: function(res) {
				try {
					var jo = Ext.decode(res.responseText);
					that.createDotmap(jo.datas);
				}
				catch(e) {
					console.log(e.message);
				}
			},
			fail:function() {
				
			}
		});
	},
	afterFirstLayout: function() {
		this.callParent();
		this.createMap();
	}
	,createDotmap: function(datas) {
		var that = this;
		var radiusPerZoom = {3 : 10, 4 : 15, 5 : 20, 6 : 25,	7 : 30,	8 : 35,	9 : 40,	10 : 45};
		
		var dotMap = new naver.maps.visualization.DotMap({
		    map: that.nmap,
		    opacity: 0.3,
		    radius:10,
		    data: datas
		});
		
		naver.maps.Event.addListener(that.nmap, 'zoom_changed', function(zoom) {
			
			//dotMap.setOptions('radius', radiusPerZoom[curZoom]);
			console.log(zoom);
			curZoom = zoom;
		});
		
		var idx = 0;
		var circles = [], markers = [], infoWindows = [];
		
		var listener = naver.maps.Event.addListener(that.nmap, 'click', function(e) {
			
			
			infoWindows.push(new naver.maps.InfoWindow({
		        content: '<div style="width:150px;text-align:center;padding:10px;">위도 </div>'
		    }));
			
		    markers.push(new naver.maps.Marker({
		        position: new naver.maps.LatLng(e.coord.y, e.coord.x),
		        map: that.nmap,
		        clickable: true,
		        __gIdx: idx
		    }));
		    
		    naver.maps.Event.addListener(markers[idx], 'dblclick', function(e) {
		    	var gIdx = e.overlay.__gIdx;
		    	markers[gIdx].setMap(null);
		    	circles[gIdx].setMap(null);
		    	infoWindows[gIdx].setMap(null);
		    	//naver.maps.Event.removeListener(listeners[gIdx]);
		    });
		    
		    naver.maps.Event.addListener(markers[idx], 'mouseover', function(e) {
		    	console.log(e);
		    	var gIdx = e.overlay.__gIdx;
		    	infoWindows[gIdx].open(map, markers[gIdx]);
		    });
		    
		    circles.push(new naver.maps.Circle({
			    map: that.nmap,
			    center: new naver.maps.LatLng(e.coord.y, e.coord.x),
			    radius: 200,

			    strokeColor: '#5347AA',
			    strokeOpacity: 0.5,
			    strokeWeight: 2,
			    fillColor: '#E51D1A',
			    fillOpacity: 0.3
			}));
			
		    idx++;
		});
	}
});