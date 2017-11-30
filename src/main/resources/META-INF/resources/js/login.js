var splashscreen;

var task = new Ext.util.DelayedTask(function() {
    // Fade out the body mask
    splashscreen.fadeOut({
        duration: 1000,
        remove:true
    });
    // Fade out the icon and message
    splashscreen.next().fadeOut({
        duration: 1000,
        remove:true,
        listeners: {
            afteranimate: function() {
                // Set the body as unmasked after the animation
                Ext.getBody().unmask();
            }
        }
    });
});

function startLoading() {
	// Start the mask on the body and get a reference to the mask
	splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');
	// Add a new class to this mask as we want it to look different from the default.
	splashscreen.addCls('splashscreen');
}

Ext.onReady(function() {
	
	Ext.getDoc().on('keydown', function(e, t) {
		if(e.getKey() == e.BACKSPACE) {
			if(t.hasAttribute('readonly')) {
				return false;
			}
		}
		else if(t.nodeName == 'BODY' || t.nodeName == 'DIV') return false;
	});

	var form = Ext.create('Ext.form.Panel', {
		plain: true,
		border:0,
		fieldDefaults: {
			labelWidth:55,
			anchor: '100%'
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			html: '<img src="http://hotplace.ddns.net:10001/resources/images/hotplace.png" style="width:600px; height:400px;">',
			
		}, {
			xtype:'textfield',
			fieldLabel:'아이디',
			id: 'id',
			margin: '30 10 10 10'
		}, {
			xtype:'textfield',
			fieldLabel:'비밀번호',
			inputType: 'password',
			id: 'pw',
			margin: '10 10 10 10'
		}]

	});

	Ext.create('Ext.window.Window', {
		title: 'Hotplace 관리자 로그인',
		height: 600,
		width: 600,
		layout: 'fit',
		closable: false,
		draggable: false,
		items: form,
		buttons: [{
			text: '로그인',
			listeners: {
				click: {
					fn: function() {
						var param = {
							id:Ext.getCmp('id').getValue(),
							pw:Ext.getCmp('pw').getValue()
						};

						startLoading();
						task.delay(1000000);
						Ext.Ajax.request({
							url: 'http://hotplace.ddns.net:10001/login',
							headers: {
								'Content-Type': 'application/json'
							},
							method: 'POST',
							jsonData: param,
							success:function(res) {
								try {
									var data = JSON.parse(res.responseText);
									if(data.success) {
										window.location.href="http://hotplace.ddns.net:10001/index";
									}
									else {
										Ext.MessageBox.alert('info', '로그인에 실패했습니다.');
										task.delay(0);
									}
								}
								catch(e) {
									task.delay(0);
									throw e;
								}
							},
							failure: function() {
								task.delay(0);
							}
						});
					}
				}
			}

		}]
	}).show();
});