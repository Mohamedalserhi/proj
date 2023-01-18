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
          <h3>نسيت كلمة المرور</h3>

          <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="البريد الالكتروني " prop="email">
              <el-input
                v-model="form.email"
                placeholder="ادخل الايميل"
              ></el-input>
            </el-form-item>

            <el-button type="primary" @click.prevent="forgetPasseord('form')"
              >تأكيد</el-button
            >
          </el-form>

          <p><a href="/signIn" type="success"> تسجيل الدخول</a> رجوع الى</p>
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
        email: "",
      },

      rules: {
        email: [
          {
            required: true,
            message: "البريد الالكتروني مطلوب",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    async forgetPasseord(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const dataForm = new FormData();
      dataForm.append("email", this.form.email);
      const res = await this.axios
        .post("https://dashboard.arabicreators.com/api/forget_email", dataForm)
        .then((r) => {
          if (r.data.code == 200) {
            this.$message({
              message: 'تم ارسال كود التحقق الى البريد الالكتروني"',
              type: "success",
            });

            this.$router.push("/resetPassword");
          } else if (r.data.message == "هذا الايميل غير متوفر في سجلاتنا") {
            this.$message.error("هذا الايميل غير متوفر في سجلاتنا");
          } else if (r.data.message == "البريد الالكتروني مطلوب.") {
            this.$message.error("البريد الالكتروني مطلوب.");
          }
        });
      console.log(res);
      console.log(localStorage.getItem("token"));
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