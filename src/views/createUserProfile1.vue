
<template>
  <div class="createUserProfile">
    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col-lg-6">
            <div class="text">
              <h2>انشاء بروفايل</h2>
              <p>من خلال إنشاء ملف شخصي ، ستظهر في منصة Arabi marketer</p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="steps">
              <el-steps :active="active" finish-status="success">
                <el-step title="الملف الشخصي"></el-step>
                <el-step title="السيرة الذاتية "></el-step>
                <el-step title="بيانات الاتصال "></el-step>
                <!-- <el-step title="الخطوة الاخيرة "></el-step> -->
              </el-steps>

              <!-- <el-button style="margin-top: 12px" @click="next"
                >Next step</el-button
              > -->
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
          >
            <!-- <el-switch v-model="disabeld"></el-switch> -->

            <el-form-item label="المجال" prop="type">
              <el-select
                
                v-model="form.type"
                multiple
                placeholder="المجال "
              >
                <el-option
                  v-for="filed in fileds"
                  :key="filed.id"
                  :label="filed.title"
                  :value="filed.id"
                ></el-option>
                <!-- <el-option label="تسويق" value="36"></el-option>
                 <el-option label="برمجة" value="35"></el-option> -->
              </el-select>
            </el-form-item>

            <el-form-item label="سيرة ذاتية " prop="cv">
              <el-input
               
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 14 }"
                v-model="form.cv"
              ></el-input>
            </el-form-item>

            <!-- <el-button type="primary" @click.prevent="CreateProfile2('form')">حفظ</el-button> -->
            <el-button
              class=""
              type="primary"
              @click.prevent="CreateProfile2('form')"
              plain
              >التالي</el-button
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
      active: 1,
      radio1: "red",
      value: "",
      value1: "",
      fileds: undefined,
      disabeld: true,
      form: {
        type: JSON.parse(localStorage.getItem("type")),
        cv: localStorage.getItem("pio"),
        // cv: undefined,

      },

      rules: {
        type: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        cv: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
      },

      value4: [30, 60],
      marks: {
        0: "1",
        100: "100",
      },
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    if(this.form.cv == 'null'){
      this.form.cv= ' '
    }
  

    Vue.axios("https://dashboard.arabicreators.com/api/type_of_user").then(
      (rr) => {
        this.fileds = rr.data.data;
        console.log(this.fileds);
      }
    );
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push("/BeMarketer");
    },

    CreateProfile2(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      localStorage.setItem("type", JSON.stringify(this.form.type));
      localStorage.setItem("cv", this.form.cv);



      this.next();
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
      background: var(--darkColor);
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
}
</style>