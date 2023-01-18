
<template>
  <div class="createUserProfile">
    <!-- <nav>
      <div class="container">
        <div class="nav-bar">
          <div class="logo">
            <img src="../assets/siteLogo/logo-2.png" alt="" />
          </div>

          <a href="">العودة الي الملف الشخصي </a>
        </div>
      </div>
    </nav> -->

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
                <el-step title="الخطوة الاخيرة "></el-step>
              </el-steps>
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
          >
            <div class="item" v-for="item in questions" :key="item.title">
              <div class="" v-if="item.type == 'multi'">
                <p ref="titleCheck">{{ item.title }}</p>
                <el-checkbox-group v-model="answer">
                  <el-checkbox
                    v-for="answer in item.answer"
                    :key="answer.id"
                    :label="answer.title"
                  >
                  </el-checkbox>
                </el-checkbox-group>
              </div>

              <div class="" v-if="item.type == 'single'">
                <p ref="titleRadio">{{ item.title }}</p>
                <el-radio-group v-model="radio">
                  <el-radio
                    v-for="answer in item.answer"
                    :key="answer.title"
                    :label="answer.title"
                    >{{ answer.title }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>

            <el-button type="primary" @click.prevent="CreateProfile4"
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
import { Alert } from "bootstrap";

export default {
  data() {
    return {
      active: 3,
      radio: "",
      value: "",
      value1: "",
      value2: "",
      checked: false,

      questions: undefined,
      answer: [],
      answer2: [],
      res: [],
      title: [],
      result: [],

      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      value4: [30, 60],
      marks: {
        0: "1",
        100: "100",
      },
    };
  },

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/questions", {})
      .then((res) => {
        this.questions = res.data.data;

        console.log("qqqqqqqqq" + this.questions);
      });

    this.arrDem();
  },

  methods: {
    arrDem() {
      this.title.push(this.$refs.titleCheck[0].innerText);
      this.title.push(this.$refs.titleRadio[0].innerText);

      this.res = [this.answer];

      this.result = this.res.concat(this.radio);

      console.log("" + this.title);
      console.log("" + this.res);
    },

    CreateProfile4() {
      this.arrDem();

      // alert(this.title)
      const dataStep3 = new FormData();

      this.result.forEach((item, index) => {
        dataStep3.append(`answer[${index}]`, item);
      });

      this.title.forEach((item, index) => {
        dataStep3.append(`title[${index}]`, item);
      });

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/edit_profile_step_4",
          dataStep3,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {});

      this.BeMarketer();
    },

    BeMarketer() {
      //  if (this.active++ > 2) this.active = 0;
      // this.$router.push('/createUserProfile1')

      this.user_id = localStorage.getItem("userId");
      const data = new FormData();
      data.append("user_id", this.user_id);

      Vue.axios
        .post("https://dashboard.arabicreators.com/api/be_marketer", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((re) => {
          if (re.data.message == "تم ارسال طلبك للادارة") {
            this.$message({
              message: "تم التحويل الى مسوق  بنجاح بانتظار موافقة الادارة",
              type: "success",
            });
            this.$router.push("/");
          } else if (re.data.message == "انت بالفعل مسوق لدينا") {
            this.$message.error("انت بالفعل مسوق لدينا");
          }

          console.log(re.data);
        });
    },

    next() {
      if (this.active++ > 2) this.active = 0;
    },
    onSubmit() {
      console.log("submit!");
      alert(this.checkList);
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

  .item {
    text-align: right;
    max-width: 70%;
    margin: auto;
    margin-bottom: 30px;

    p {
      font-size: 20px;
    }

    li {
      margin-bottom: 10px;
    }
  }
}
</style>

<style lang="scss">
.form {
  max-width: 100%;
  margin: auto;
  direction: ltr !important;

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
    direction: ltr !important;
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

  .el-checkbox__label {
    padding-right: 10px !important;
    font-size: 20px;
  }
}

.el-steps {
  direction: rtl;

  .el-step__title {
    text-align: center;
  }

  .soialItem {
    display: flex;
  }

  .el-input {
    direction: ltr !important;
  }
}
</style>