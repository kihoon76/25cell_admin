$(function(){
	var $editor = $('#noticeEditor');
	
	CKEDITOR.replace('noticeEditor', {
		height: '800px',
		on: {
			'loaded': function() {
				
			}
		}
	});
	
	$('#btnModify').on('click', function() {
		var data = CKEDITOR.instances.noticeEditor.getData();
		Hotplace.ajax({
			url: 'notice/if/content/' + $editor.data('num'),
			data: { content: data },
			method: 'POST',
			success: function(data, textStatus, jqXHR) {
				console.log(data)
				if(data.success) {
					parent.Ext.Msg.alert('결과', '수정되었습니다');
				}
				else {
					parent.Ext.Msg.alert('오류', data.errMsg);
				}
			}
		});
	});
	
});