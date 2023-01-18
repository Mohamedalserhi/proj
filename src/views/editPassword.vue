
<template>
  <div class="createUserProfile">
    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col-lg-6">
            <div class="text">
              <h2>تعديل كلمة المرور</h2>
            </div>
          </div>

          <div class="col-lg-6"></div>
        </div>
      </div>

      <div class="content">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            method="post"
            :rules="rules"
            @submit="CreateProfile"
          >
            <el-form-item label="كلمة المرور الحالية" prop="email">
              <el-input
                v-model="form.password"
                show-password
                placeholder=" "
              ></el-input>
            </el-form-item>

            <el-form-item label="كلمة المرور الجديدة" prop="email">
              <el-input
                v-model="form.newPassword"
                show-password
                placeholder=""
              ></el-input>
            </el-form-item>

            <el-form-item label="تأكيد كلمة المرور" prop="email">
              <el-input
                v-model="form.confrmPassword"
                show-password
                placeholder=" "
              ></el-input>
            </el-form-item>

            <el-button
              class=""
              type="primary"
              @click.prevent="CreateProfile('form')"
              plain
              >حفظ</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      active: 0,
      radio1: "red",
      value: "",
      value1: "",
      value2: "",
      countires: null,
      Cities: null,
      imageSelcteed: null,
      beMarketer: null,
      user_id: null,
      // CountryID:2,
      url: null,

      form: {
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        email: localStorage.getItem("email"),
        password: "",
        newPassword: "",
        confrmPassword: "",
        delivery: false,
        // lang: [],
        country_id: [],
        // country_name:localStorage.getItem('country'),
        city_id: [],
        image: "",
        desc: "",
      },

      rules: {
        first_name: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        last_name: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        email: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        desc: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        lang: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "blur" },
        ],
        country_id: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "blur" },
        ],
      },

      value4: [30, 60],
      marks: {
        0: "1",
        100: "100",
      },
    };
  },

  mounted() {},

  methods: {
    CreateProfile(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const dataStep = new FormData();
          dataStep.append("old_password", this.form.password);
          dataStep.append("new_password", this.form.newPassword);
          dataStep.append("confirm_password", this.form.confrmPassword);

          this.axios
            .post(
              "https://dashboard.arabicreators.com/api/edit_password",
              dataStep,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  message: "تم التعديل بنجاح",
                  type: "success",
                });
              } else if (res.data.message == "كلمة المرور الحالية خاطئة") {
                this.$message.error("كلمة المرور الحالية خاطئة");
              } else if (
                res.data.message ==
                "يجب أن يتطابق تأكيد كلمة المرور مع new password"
              ) {
                this.$message.error(
                  "يجب ان تتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور"
                );
              } else if (res.data.message == "new password مطلوب.") {
                this.$message.error("اضف كلمة مرور جديدة");
              } else if (res.data.message == "تأكيد كلمة المرور مطلوب.") {
                this.$message.error("اضف تأكيد كلمة مرور ");
              } else if (
                res.data.message ==
                "يجب أن يكون الحقلان new password و old password مُختلفان"
              ) {
                this.$message.error(
                  "كلمة المرور الجديدة يجب ان تكون مختلفة عن القديمة"
                );
              }
            });

          // alert()

          // localStorage.setItem("image",dataStep.get("image"))
          localStorage.setItem("first_name", this.form.first_name);
          localStorage.setItem("last_name", this.form.last_name);
          // localStorage.setItem("lang",JSON.stringify(this.form.lang))
          localStorage.setItem(
            "country_id",
            JSON.stringify(this.form.country_id)
          );
          // localStorage.setItem("city_id",JSON.stringify(this.form.city_id))
          localStorage.setItem("email", this.form.email);

          this.BeMarketer();
        } else {
          return false;
        }
      });
    },

    next() {},
    onfileSelected(event) {
      this.imageSelcteed = event.target.files[0];

      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>


<style lang="scss" scoped>
.createUserProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 50px;

  nav {
    padding: 20px;
    background-color: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    .nav-bar {
      display: flex;
      justify-content: space-between;
    }
    .logo {
      img {
      }
    }

    a {
      text-decoration: none;
      color: white;
      background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 192.97%);
      border-radius: 5px;
      padding: 6px;
    }
  }

  .header {
    padding-top: 80px;
    .text {
      text-align: right;
      h2 {
        font-weight: 700;
        font-size: 26px;
        margin-bottom: 10px;
      }

      p {
      }
    }

    .steps {
    }
  }
}
.content {
  padding: 50px;
  background-color: white;
  max-width: 70%;
  margin: 50px auto 0px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.img-preview {
  width: 150px;
  height: 150px;
  display: block;
  margin: auto;
  margin-top: 30px;
  border-radius: 50%;
}
</style>

<style lang="scss">
.form {
  max-width: 100%;
  margin: auto;

  .el-form-item__label {
    display: block !important;
    padding-bottom: 0;
    float: unset !important;
    font-weight: 700;
    text-align: right !important;
  }

  .el-select {
    width: 100%;
  }

  .el-input__inner {
    height: 50px;
    border-radius: 10px;
  }

  .el-button-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  .el-button-group > .el-button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .el-button--primary {
    display: block;
    width: 100%;
    background: var(--darkColor);
    border-radius: 10px;
    color: white;
    height: 50px;
    margin-bottom: 10px;
    margin-top: 40px;
    border: none;
  }

  .el-form-item__content {
    display: flex;
    // justify-content: space-between;
  }

  .group-input {
    width: 100%;
    display: flex;
    .el-form-item {
      width: 49%;
      margin: 1%;
    }
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 49%;
    margin: 1%;

    text-align: right !important;
  }

  .prev {
    display: block;
    width: 100%;
    border-radius: 10px;
    color: var(--darkColor);
    height: 50px;
    margin-bottom: 10px;
    margin-top: 40px;
    border: 1px solid var(--darkColor);
    background-color: white;
  }

  .add-more {
    background-color: var(--darkColor);
    color: white;
    padding: 6px;
    display: block;
    margin-bottom: 20px;
  }

  .el-slider {
    margin-bottom: 30px;
  }

  .el-slider__bar {
    background-color: unset;
  }
  .el-slider__runway {
    background-color: #bfbfbf;
    height: 10px;
  }

  .el-slider__stop {
    height: 10px;
    width: 10px;
  }
  .el-slider__button {
    border-color: var(--darkColor);
    border-width: 3px;
    width: 23px;
    height: 23px;
  }
}

.el-steps {
  direction: rtl;

  .el-step__title {
    text-align: center;
  }

  .el-step__line-inner {
    display: none;
  }

  .el-step:last-of-type .el-step__line {
    display: block;
  }
}

.el-input .el-input__inner {
  text-align: right !important;
}

.el-step__title.is-success {
  color: var(--darkColor) !important;
}

.el-step__head.is-success {
  color: var(--darkColor) !important;
  border-color: var(--darkColor) !important;
}
</style>