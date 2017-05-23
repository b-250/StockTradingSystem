/**
 * Created by pankaicheng on 17/5/19.
 */
$().ready(function () {

    $("#login_form").validate({
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            }
        },
        messages: {
            username: {
                required: "*请输入用户名",
                minlength: jQuery.validator.format("*用户名不能小于{0}个字符"),
                maxlength: jQuery.validator.format("*用户名不能大于{0}个字符"),
                notnumber: "*用户名不能是纯数字"
            },
            password: {
                required: "*请输入密码",
                minlength: jQuery.validator.format("*密码不能小于{0}个字符"),
                maxlength: jQuery.validator.format("*密码不能大于{0}个字符")
            }
        }

    });

});

$("#login-btn").click(function () {
    var log_type = $("input[name='loginType']:checked").val();
    //alert(log_type);
    $.post("/",
        {
            username: $('#login_bond_id').val(),
            password: $('#login_password').val(),
            loginType: log_type
        },
        function (data,status) {
            if (data.code==0){
                //alert("提示：" + data.msg);
                $('#login-modal').modal('show');
                $('#login-tab').removeClass('active');
                $('#login-li').removeClass('active');
                $('#register-li').addClass('active');
                $('#register-tab').addClass('active');
                $("#login_error").text(" * 用户名或密码错误");
            }
            else if (data.code ==1){
                $("#login-button").hide();
                $("#register-button").hide();
                alert("注册成功");
            }
        }
    )
});