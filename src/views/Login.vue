<template>
  <div>
    <!-- 登录页面 -->
    <!-- 到源代码中 login.html的代码 粘贴到此处 -->

    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span class="tips" id="uname_prompt_text"></span
              ><span
                class="tips"
                id="uname_prompt_text"
                style="display: inline"
                v-if="loginfailed"
                >用户名或密码不正确</span
              >
              用户名：
            </dt>
            <dd>
              <input
                type="text"
                id="uname"
                v-model="unameOrPhone"
                placeholder="邮箱/手机号"
              />
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt><span class="tips" id="pwd_prompt_text"></span>密码：</dt>
            <dd>
              <input
                type="password"
                id="pwd"
                placeholder="密码"
                v-model="upwd"
              />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="login">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unameOrPhone: "",
      upwd: "",
      loginfailed: false,
    };
  },
  methods: {
    login() {
      let url = "user_login.php";
      let params = `unameOrPhone=${this.unameOrPhone}&upwd=${this.upwd}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);
        let { code, phone, uid, uname } = res.data;

        if (code == 1) {
          //跳转到首页
          this.$router.push({ path: "/" });

          //保持登录状态
          this.$store.commit("updateUser", { uid, uname });
        } else {
          this.loginfailed = true;
        }
      });
    },
  },
};
</script>

<style>
</style>