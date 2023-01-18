<template>
  <div class="signIn">
    <div class="row">
      <div class="col-lg-6">
        <div class="img-card">
          <img src="../assets/signBack.png" alt="" />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="signInCard">
          <img src="../assets/siteLogo/LOGO-SITE.png" alt="" />
          <h3>اعادة تعيين كلمة المرور</h3>

          <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="الكود" prop="code">
              <el-input
                v-model="form.code"
                placeholder="ادخل الكود المرسل"
              ></el-input>
            </el-form-item>

            <el-form-item label="كملة المرور الجديدة" prop="password">
              <el-input
                v-model="form.newPassword"
                placeholder="ادخل كلمة مرور جديدة"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="تأكيد كلمة المرور " prop="ConfirmPassword">
              <el-input
                v-model="form.confirm_password"
                placeholder="تأكيد كلمة المرور"
                show-password
              ></el-input>
            </el-form-item>

            <el-button type="primary" @click.prevent="ResetPassword('form')"
              >تأكيد</el-button
            >
          </el-form>

          <p><el-link type="success"> تسجيل الدخول</el-link> رجوع الى</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        code: "",
        newPassword: "",
        confirm_password: "",
      },
      rules: {
        code: [
          { required: true, message: "  كود التحقق مطلوب", trigger: "blur" },
        ],

        password: [
          { required: true, message: "كلمة المرور مطلوبة", trigger: "blur" },
        ],

        ConfirmPassword: [
          {
            required: true,
            message: "تأكيد كلمة المرور مطلوب",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    async ResetPassword(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const dataForm = new FormData();
      dataForm.append("code", this.form.code);
      dataForm.append("password", this.form.newPassword);
      dataForm.append("confirm_password", this.form.confirm_password);

      const res = await this.axios
        .post(
          "https://dashboard.arabicreators.com/api/reset_my_password",
          dataForm
        )
        .then((r) => {
          if (r.data.code == 200) {
            this.$message({
              message: 'تم اعادة  بنجاح"',
              type: "success",
            });

            this.$router.push("/");
            this.$router.go();
          } else if (r.data.message == "code مطلوب.") {
            this.$message.error("كود التحقق مطلوب");
          } else if (
            r.data.message == "يجب أن يتطابق تأكيد كلمة المرور مع كلمة السر"
          ) {
            this.$message.error("يجب أن يتطابق تأكيد كلمة المرور مع كلمة السر");
          } else if (r.data.message == "خطأ بالرمز المرسل") {
            this.$message.error("خطأ بالرمز المرسل");
          } else if (r.data.message == "تأكيد كلمة المرور مطلوب.") {
            this.$message.error("تأكيد كلمة المرور مطلوب.");
          }
        });
      console.log(res);
      console.log(localStorage.getItem("token"));
      // this.$store.dispatch('user',res.data.token)
    },
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
      margin-bottom: 100px;
      height: 60px;
    }

    h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 60px;
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
    background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 192.97%);
  }
}

.forgetPassLink {
  margin-right: auto !important;
  margin-bottom: 80px !important;
  display: block !important;
  // color: #70d644 !important;
  text-align: left;

  &:hover {
    border: none;
  }
}

p {
}
</style>