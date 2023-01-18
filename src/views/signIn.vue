<template>
  <div class="signIn">
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <div class="img-card">
          <img src="../assets/signBack.png" alt="" />
        </div>
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="signInCard">
          <img src="../assets/siteLogo/LOGO-SITE.png" alt="" />
          <h3>تسجيل الدخول</h3>

          <!-- <button href="" @click="authGoogle()">asdadas</button> -->
          <div class="btns">
            <!-- <a href="" class="google" @click.prevent="authGoogle()"
              ><i class="fa-brands fa-google"></i> <span>google</span></a
            > -->
            <a href="" class="apple"
              ><i class="fa-brands fa-apple"></i> <span>apple</span></a
            >
            <a href="" class="facebook"
              ><i class="fa-brands fa-facebook"></i> <span>facebook</span></a
            >
          </div>

          <el-divider content-position="center">OR</el-divider>

          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            method="post"
            @submit.prevent="signIn"
            :rules="rules"
          >
            <el-form-item label="البريد الالكتروني" prop="email">
              <el-input
                v-model="form.email"
                placeholder="ادخل البريد الالكتروني "
              ></el-input>
             <p class="text-start text-danger">{{emailCheck}}</p>

            </el-form-item>

            <el-form-item label="كلمة المرور" prop="password">
              <el-input
                v-model="form.password"
                show-password
                placeholder="ادخل كلمة المرور"
              ></el-input>
            <p class="text-start text-danger">{{passwordCheck}}</p>

            </el-form-item>

            <el-button @click.prevent="signIn('form')">تسجيل الدخول</el-button>
          </el-form>

          <router-link to="/forgetPassword" class="forgetPassLink"
            >هل نسيت كلمة المرور</router-link
          >

          <p>
            <router-link to="/createAccount" type="primary"
              >اشترك الان</router-link
            >
            اذا لا تمتلك حساب
          </p>
        </div>
      </div>
    </div>

    <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
  </div>
</template>


<script>
export default {
  components: {},

  data() {
    return {
      isLogin: false,

      arrMsg: [],
      form: {
        email: "",
        password: "",
      },
      emailCheck:undefined,
      passwordCheck:undefined,
    };
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },

  methods: {
    async signIn(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const res = await this.axios
        .post("https://dashboard.arabicreators.com/api/login", this.form)
        .then((r) => {
          this.arrMsg = [];

          if (r.data.code == 400) {

          // this.emailCheck= r.data.message[0].toString()
          // this.passwordCheck= r.data.message[1].toString()


            if (Array.isArray(r.data.message)) {
              for (let index = 0; index < r.data.message.length; index++) {
                this.arrMsg.push(r.data.message[index]);
              }

              for (let i = 0; i < this.arrMsg.length; i++) {
                setTimeout(
                  () => this.$message.error(this.arrMsg[i]),

                  1000
                );
              }
            }
          } else if (r.data.code == 200) {


            
            localStorage.setItem("token", r.data.data.token);
            localStorage.setItem(
              "requiredChangePassword",
              r.data.data.required_change_password
            );

                              this.$message({
                    message: "تم تسجيل الدخول بنجاح",
                    type: "success",
                  });

                  this.$router.push("/");

                  this.$router.go();

    
          }
        });
 
      console.log(res);
    },

    // async authGoogle() {
    //   const googleUser = await this.$gAuth.signIn();
    //   console.log("googleUser", googleUser);
    //   console.log("getId", googleUser.getId());
    //   console.log("getBaseProfile", googleUser.getBasicProfile());
    //   console.log("getAuthResponse", googleUser.getAuthResponse());
    //   console.log(
    //     "getAuthResponse$G",
    //     this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
    //   );
    //   this.isLogin = this.$gAuth.isAuthorized;
    // },
  },
};
</script>




<style lang="scss" scoped>
.signIn {
  overflow: hidden;
  font-family: "Tajawal", sans-serif;

  .signInCard {
    max-width: 70%;
    margin: 100px auto;
    img {
      margin-left: auto;
      display: block;
      margin-bottom: 30px;
      height: 60px;
    }

    h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 60px;
    }

    .btns {
      margin-bottom: 60px;
      a {
        text-decoration: none;
        padding: 10px 15px;
        border: 1px solid #888;
        border-radius: 5px;
        margin: 10px;
        width: 150px;
        display: inline-block;

        span {
          margin-left: 5px;
        }
      }

      .google {
        background-color: white;
        color: black;
      }

      .apple {
        background-color: black;
        color: white;
      }

      .facebook {
        background-color: #1977f3;
        color: white;
      }
    }
  }

  .img-card {
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.el-form {
  direction: rtl;
  .el-form-item {
    .el-input {
      .el-input__inner {
        background-color: #fafafa;
        border: none;
        height: 50px;
      }

      .el-input__suffix {
        right: unset !important;
        left: 0 !important;
      }

      .el-input__inner {
        padding-right: 10px !important;
        padding-left: 30px;
      }
    }
    .el-form-item__label {
      float: right;
      color: black;
      font-weight: 700;
    }
  }

  .el-button {
    width: 100%;
    color: white;
    margin-bottom: 20px;
    height: 50px;
    background: var(--darkColor) !important;
  }
}

.forgetPassLink {
  margin-right: auto !important;
  margin-bottom: 80px !important;
  display: block !important;
  text-align: left;

  &:hover {
    border: none;
  }
}

p {
}


</style>



<style >
@media (max-width: 986px) {
}

@media (max-width: 557px) {
  .signIn .img-card {
    height: 60%;
    display: none;
  }

  .signIn .signInCard img {
    margin-left: unset !important;
    margin: auto !important;
  }

  .signIn .signInCard .btns {
    display: flex;
  }

  .signIn .signInCard .btns a {
    padding: 5px 10px !important;
    margin: 4px !important;
    width: unset !important;
  }
}
</style>