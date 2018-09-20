Ext.define('Hotplace.view.panel.NMapPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.nmappanel',
	initComponent: function() {
		var mapHtml  = '<div id="map" style="width: 100%; height: 800px;">';
//		    mapHtml += '<div class="buttons" style="position: relative; top: 10px; left: 30px; z-index: 1000;">';
//		    mapHtml += '	<input id="cadastral" type="button" class="control-btn control-btn-default" value="지적도" /> ';
//            mapHtml += '</div>'; 
            mapHtml += '</div>';
		var that = this;
		var marker = null;
		
        function search() {
        	var lat = Ext.getCmp('nmap-lat');
        	var lng = Ext.getCmp('nmap-lng');
        	
        	if(lat.validate() && lng.validate()) {
        		morph(parseFloat(lat.getValue()), parseFloat(lng.getValue()));
        	}
        }
        
        function morph(lat, lng) {
        	that.nmap.morph(new naver.maps.LatLng(lat, lng), 14, {duration: 100});
        	getMarker(lat, lng);
        }
        
        function getMarker(lat, lng) {
        	if(marker == null) {
        		marker = new naver.maps.Marker({
        		    position: new naver.maps.LatLng(lat, lng),
        		    map: that.nmap
        		});
        	}
        	else {
        		marker.setPosition(new naver.maps.LatLng(lat, lng));
        	}
        }
        
        function jijeokOnOff() {
        	
        }
        
		Ext.apply(this, {
			layout: {
				align: 'stretch',
				type: 'vbox'
			},
			items:[{
				xtype: 'panel',
				tbar: ['위도 : ', {
					xtype: 'textfield',
					id: 'nmap-lat',
					value: '33.3590628',
					allowBlank: false
				}, '경도 : ', {
					xtype: 'textfield',
					id: 'nmap-lng',
					allowBlank: false,
					value: '126.534361',
					enableKeyEvents: true,
					listeners: {
						keydown: function(t, e) {
							//전체를 선택한 경우 동작 안함
							if(e.keyCode == 13) {
								search();
							}
						}
					}
				}, {
					xtype: 'button',
					iconCls: 'icon-search',
					listeners: {
						click: function() {
							search();
						}
					}
						
				}, '->', {
					xtype: 'button',
					text: '지적도',
					pressed: true,
					listeners: {
						click: function(button) {
							var state = button.toggle();
							console.log(state)
							if(state.pressed) {
								 that.cadastralLayer.setMap(that.nmap);
							}
							else {
								that.cadastralLayer.setMap(null);
							}
						}
					}
				}]
				
			},{
				html:mapHtml,
			}]
			
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
		
		//var btn = Ext.get('cadastral');
		
		//지적편집도
		this.cadastralLayer = new naver.maps.CadastralLayer();
				
		this.cadastralLayer.setMap(that.nmap);

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