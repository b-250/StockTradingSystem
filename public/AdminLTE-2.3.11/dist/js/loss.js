/**
 * Created by pankaicheng on 17/5/31.
 */
$().ready(function () {

    $("#loss_form").validate({
        submitHandler : function(form) {
            $(form).ajaxSubmit({
                dataType:"json",
                success:function( jsondata ){
                    if( jsondata.code == 200 ){
                        alert(jsondata.msg);
                        window.location.href = "/index";
                    }else{
                        alert(jsondata.msg);
                    }
                }
            });

        },
        rules: {
            name: {
                required: true
            },
            idnumber: {
                required : true,
                minlength: 18,
                maxlength: 18
            },
            username: {}
        },
        messages: {
            name: {
                required: "*请输入姓名"
            },
            idnumber:{
                required: "*请输入身份证号",
                minlength: jQuery.validator.format("*请输入正确的身份证号"),
                maxlength: jQuery.validator.format("*请输入正确的身份证号")
            }
            }
        }

    });

});