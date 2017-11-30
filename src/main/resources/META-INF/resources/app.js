Ext.Loader.setConfig({enabled: true});
Ext.apply(Ext.form.field.VTypes, {
   daterange : function(val, field) {
	   if(field.startDateField) {
		   var start = Ext.getCmp(field.startDateField);
		   if(Ext.isEmpty(start)) return false;

		   var startDate = start.getRawValue();
		   if(Ext.isEmpty(startDate)) {
			   this.daterangeText = '시작일자를 입력해주세요';
			   field.setRawValue('');
			   return false;
		   }
		   else {
			   if(parseInt(startDate.replace(/-/g, ''), 10) - parseInt(val.replace(/-/g,''), 10) > 0) {
				   this.daterangeText = '종료일자는 시작일자와 같거나 이후여야 합니다.';
				   field.setRawValue('');
				   return false;
			   }
		   }
	   }

	   return true;
   }
   ,number : function(val, field) {
	   if(!/^\d+$/.test(val)) {
		   this.numberText = '숫자만 입력해주세요';
		   field.setValue(1);
		   return false;
	   }

	   return true;
   }
});

Ext.application({
    name: 'Hotplace'
   ,appFolder: '/resources/app'
   ,autoCreateViewport: true
   ,controllers : [
        'Hotplace.controller.NoticeController'
   ]
   ,launch:function(){
	 //similar to jQuerys $(document).ready, fired on when application is ready
	 String.prototype.replaceAt = function(index, character) {
		 return this.substr(0, index) + character + this.substr(index+character.length);
	 };

	 Array.prototype.remove = function() {
		 var what, a = arguments, L = a.length, ax;
		 while(L && this.length) {
			 what = a[--L];
			 while((ax = this.indexOf(what)) !== -1) {
				 this.splice(ax, 1);
			 }
		 }

		 return this;
	 };

	 Array.prototype.contains = function(v) {
		 if(v == undefined) return false;
		 for(var x = 0, L = this.length; x < L; x++) {
			 if(this[x] == v) return true;
		 }

		 return false;
	 };

   }
});
