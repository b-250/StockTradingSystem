/**
 * Created by Zhao Zihan on 17/6/7.
 */
$().ready(function () {

    $("#tradeManage_stock_form").validate({
        submitHandler : function(form) { 
            $(form).ajaxSubmit({
                dataType:"json",
                success:function( jsondata ){
                    if( jsondata.code == 0 ){
                        alert(jsondata.msg);
                        window.location.href = "/mainManage";
                    }
                }
            });

        },
		rules: {
				stock_id: {
                required: true,
                minlength: 0,
                maxlength: 20
            }
		}
    });

});