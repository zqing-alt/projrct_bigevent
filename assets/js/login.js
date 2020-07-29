$(function () {
  // 注册与登录切换
  $('#link_reg,#link_login').click(function () {
    $(this).parents('form').hide().siblings('form').show();
  });

  // 表单验证
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,
      "密码为6到12位,且不能有空格"
    ],
    repwd: function (value) {
      if ($('#form_reg [name=password]').val() != value) {
        return "两次输入密码不一致";
      }
    }
  });

  // 监听表单提交事件
  // 注册
  $('#form_reg').on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    }
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data,
      success: function (res) {
        if (res.status != 0) return layer.msg(res.message);
        layer.msg("注册成功,请登录");
        $('#link_login').click();
      }
    })
  });
  // 登录
  $('#form_login').on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("登录失败");
        layer.msg("登录成功");
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    })
  });
})