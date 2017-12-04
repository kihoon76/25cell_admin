$(function(){
	var $editor = $('#noticeEditor');
	var $title = $('#noticeTitle');
	var extTab = parent.Ext.getCmp('app-contents');
	
	CKEDITOR.replace('noticeEditor', {
		height: '500px',
		on: {
			'loaded': function() {
				
			},
		}
	});
	
	$('#btnModifyNotice').on('click', function() {
		var data = CKEDITOR.instances.noticeEditor.getData();
		var title = $.trim($title.val());
		
		Hotplace.ajax({
			url: 'notice/if/content/' + $editor.data('num'),
			data: { content: data, title: title },
			method: 'POST',
			success: function(data, textStatus, jqXHR) {
				if(data.success) {
					Hotplace.showExtConfirm({
						type: 'alert',
						msg: '수정되었습니다'
					});
				}
				else {
					parent.Ext.Msg.alert('오류', data.errMsg);
					Hotplace.showExtConfirm({
						type: 'alert',
						title: '오류',
						msg: data.errMsg,
						icon: parent.Ext.MessageBox.ERROR
					});
				}
			}
		});
	});
	
	var categoryPanel = parent.Ext.getCmp('app-category');
	
	$('#btnDeleteNotice').on('click', function() {
		var writeNum = $(this).data('num');
		
		Hotplace.showExtConfirm({
			title: '알림',
			msg: writeNum + '번 글을 삭제하시겠습니까?',
			type: 'confirm',
			callback: function(btn) {
				if(btn == 'ok') {
					Hotplace.ajax({
						url: 'notice/if/content/' + writeNum,
						method: 'DELETE',
						success: function(data, textStatus, jqXHR) {
							if(data.success) {
								Hotplace.showExtConfirm({
									type: 'alert',
									msg: '삭제되었습니다',
									callback: function() {
										categoryPanel.rmCategoryInTab('notice-grid-' + writeNum);
										extTab.remove(parent.Ext.getCmp('notice-grid-' + writeNum + '-panel'));
									}
								});
							}
							else {
								Hotplace.showExtConfirm({
									type: 'alert',
									title: '오류',
									msg: data.errMsg,
									icon: parent.Ext.MessageBox.ERROR
								});
							}
						}
					});
				}
				else {
					return;
				}
			}
		});
		
	});
	
	$('#btnNoticeReg').on('click', function() {
		var data = $.trim(CKEDITOR.instances.noticeEditor.getData());
		var title = $.trim($title.val());
		
		if(title) {
			if(data) {

				Hotplace.ajax({
					url: 'notice/if/regist',
					data: { content: data, title: title },
					method: 'POST',
					success: function(data, textStatus, jqXHR) {
						console.log(data)
						if(data.success) {
							parent.Ext.Msg.alert('결과', data.datas[0] + '번 글로 등록되었습니다', function() {
								window.location.reload();
							});
						}
						else {
							parent.Ext.Msg.alert('오류', data.errMsg);
						}
					}
				});
			}
			else {
				parent.Ext.Msg.alert('알림', '내용을 입력하세요', function() {
					$editor.focus();
				});
			}
		}
		else {
			parent.Ext.Msg.alert('알림', '제목을 입력하세요', function() {
				$title.focus();
			});
			
		}
	})
	
});