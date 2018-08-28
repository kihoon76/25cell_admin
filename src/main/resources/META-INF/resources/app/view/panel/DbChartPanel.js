Ext.define('Hotplace.view.panel.DbChartPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'dbchartpanel',
	initComponent: function() {
		
		var socket = new SockJS('/monitor/db');
		var txt43, txt42, txt2 = null;
		
		socket.onmessage = function(event) {
			console.log(event.data);
			var json = null;
			
			if(txt43 == null) txt43 = Ext.getCmp('192.168.0.43');
			if(txt42 == null) txt42 = Ext.getCmp('192.168.0.42');
			//if(txt2 == null) txt2 = Ext.getCmp('192.168.0.2');
			
			txt43.setFieldStyle('background-color: white');
			txt42.setFieldStyle('background-color: white');
			//txt2.setFieldStyle('background-color: white');
			
			
			if(event.data.indexOf('{') > -1) {
				setTimeout(function() {
					json = Ext.JSON.decode(event.data);
					
					txt43.setFieldStyle(json['43'] == true ? 'background-color: red' : 'background-color: blue');
					txt42.setFieldStyle(json['42'] == true ? 'background-color: red' : 'background-color: blue');
					//txt2.setFieldStyle(json['2'] == true ? 'background-color: red' : 'background-color: blue');
					
					
					fompanel.setTitle('DB CONNECTION STATUS (last updated: ' + Ext.Date.format(new Date(), 'Y-m-d H:i:s') + ')');
				}, 2000);
			}
			
		}
		
		var fompanel = Ext.create('Ext.form.Panel', {
			title: 'DB CONNECTION STATUS',
			 bodyPadding: 5,
			 //width: 350,
			 layout: 'anchor',
			 defaults: {
				 anchor: '100%'
			 },
			 defaultType: 'textfield',
			 items: [{
				 fieldLabel: '192.168.0.43',
			     id: '192.168.0.43',
			     readOnly: true
			 },{
				 fieldLabel: '192.168.0.42',
				 id: '192.168.0.42',
				 readOnly: true
		    }/*,{
				 fieldLabel: '192.168.0.2',
				 id: '192.168.0.2',
				 readOnly: true
		    }*/],
		});
		
		Ext.apply(this, {
			items: [{
				items: fompanel
			}],
			listeners: {
				destroy: function() {
					socket.close();
				}
			}
		});
		
		this.callParent(arguments);
	}
});