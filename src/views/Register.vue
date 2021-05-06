<template>
  <div>
    <!-- 注册页面 -->
    <!-- 到源代码中 register.html的代码 粘贴到此处 -->

    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="uname"
            @blur="checkName"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="unameStatus == 2 || unameStatus == 1 || unameStatus == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="unameStatus == 4"
          ></em>
          <i style="display: inline" v-if="unameStatus == 2"
            >请输入正确的邮箱格式</i
          >
          <i style="display: inline" v-if="unameStatus == 1"
            >请输入您的注册邮箱</i
          >
          <i style="display: inline" v-if="unameStatus == 3"
            >此邮箱已被其他用户注册</i
          >
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="upwd"
            @blur="checkUpwd"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="upwdStatus == 1 || upwdStatus == 2"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="upwdStatus == 3"
          ></em>
          <i style="display: inline" v-if="upwdStatus == 1">请输入您的密码</i>
          <i style="display: inline" v-if="upwdStatus == 2"
            >密码长度应为6~12个字符之间</i
          >
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="pwd2"
            @blur="checkPwd2"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="pwd2Status == 1"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="pwd2Status == 2"
          ></em>
          <i style="display: inline" v-if="pwd2Status == 1"
            >两次输入的密码不一致</i
          >
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="phoneStatus == 3 || phoneStatus == 2 || phoneStatus == 1"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="phoneStatus == 4"
          ></em>
          <i style="display: inline" v-if="phoneStatus == 2"
            >请输入正确的手机号码</i
          >
          <i style="display: inline" v-if="phoneStatus == 1"
            >请填写您的手机号</i
          >
          <i style="display: inline" v-if="phoneStatus == 3"
            >此手机号已被其他用户注册</i
          >
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="cvcode"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" checked v-model="agree" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" @click="doReg" v-if="agree">提交注册</button>
          <button type="button" disabled="" class="disabled" v-else>
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agree: true,
      uname: "",
      upwd: "",
      pwd2: "",
      phone: "",
      cvcode: "",
      unameStatus: 0, //邮箱 的默认状态
      upwdStatus: 0,
      pwd2Status: 0,
      phoneStatus: 0,
    };
  },

  methods: {
    doReg() {
      console.log(this.uname, this.upwd, this.pwd2, this.phone, this.cvcode);

      if (
        this.unameStatus == 4 &&
        this.upwdStatus == 3 &&
        this.pwd2Status == 2 &&
        this.phoneStatus == 4
      ) {
        // 注册请求
        let url = "user_register.php";
        let params = `uname=${this.uname}&upwd=${this.upwd}&phone=${this.phone}`;

        this.axios.post(url, params).then((res) => {
          console.log(res);
          let { code, uid, uname } = res.data;
          if (code == 1) {
            alert("恭喜您,注册成功!");

            // vuex提供的变量 $store
            // commit(方法名, 参数)
            //平行组件之间通信
            this.$store.commit("updateUser", { uid, uname });

            //跳转到首页
            this.$router.push({ path: "/" });
          } else {
            alert("注册失败!");
          }
        });
      } else {
        alert("请确保您的信息填写正确!!");
      }
    },
    checkName() {
      // 检查email 格式, 具体情况:
      // 0. 默认状态
      // 1. 空
      if (this.uname.trim() == "") {
        this.unameStatus = 1;
        console.log("空");
        return;
      }

      // 2. 格式错误
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.uname)) {
        this.unameStatus = 2;
        console.log("格式错误");
        return;
      }

      // 3. 已存在
      //需要发送请求,查询是否存在
      //doudou@qq.com 是存在的
      let url = "user_check_uname.php?uname=" + this.uname;
      this.axios.get(url).then((res) => {
        console.log(res);

        let { code } = res.data;
        if (code == 1) {
          this.unameStatus = 3;
        } else {
          this.unameStatus = 4;
        }
      });
      // 4. 正确
    },

    checkUpwd() {
      //在输入密码时,检查一下重复密码输入框
      this.checkPwd2();

      // 检查upwd 格式, 具体情况:
      // 0. 默认状态
      // 1. 空
      let upwd_length = this.upwd.trim().length;
      if (upwd_length == 0) {
        this.upwdStatus = 1;
        console.log("空");
        return;
      }
      // 2. 格式错误
      //密码正则，6-12位的数字和字母的组合
      // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
      if (upwd_length < 6 || upwd_length > 12) {
        this.upwdStatus = 2;
      } else {
        this.upwdStatus = 3;
      }

      // 3. 正确
    },

    checkPwd2() {
      if (this.pwd2 !== this.upwd) {
        this.pwd2Status = 1;
      } else {
        this.pwd2Status = 2;
      }
    },

    checkPhone() {
      // 检查email 格式, 具体情况:
      // 0. 默认状态
      // 1. 空
      if (this.phone.trim().length == 0) {
        this.phoneStatus = 1;
        console.log("空");
        return;
      }
      // 2. 格式错误
      let reg = /^1[3-9]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.phoneStatus = 2;
        console.log("格式错误");
        return;
      }
      // 3. 已存在
      //需要发送请求,查询是否存在   已存在:15555555555
      let url = "user_check_phone.php?phone=" + this.phone;
      this.axios.get(url).then((res) => {
        console.log(res);
        let { code } = res.data;

        if (code == 1) {
          this.phoneStatus = 3;
        } else {
          this.phoneStatus = 4;
        }
      });

      // 4. 正确
    },
  },
};
</script>

<style>
</style>