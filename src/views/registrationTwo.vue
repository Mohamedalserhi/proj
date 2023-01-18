<template>
  <div class="createConsultaion two">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="user-info">
              <i class="el-icon-right"></i>
              <span class="arabi-mark">Arabi marketer</span>

              <div class="user-img">
                <img src="../assets/cons-man.png" alt="" />
              </div>
              <h3>Mohammed Mohammed</h3>
              <p>احجز 4 جلسات تعليم بودكاست من الصفر الى الاحتراف</p>
              <div class="instruct">
                <i class="el-icon-time"></i>
                <span> hr 2</span>
              </div>

              <div class="instruct">
                <i class="el-icon-video-camera-solid"></i>
                <span>يتم توفير تفاصيل مؤتمرات الويب عند التأكيد</span>
              </div>

              <div class="instruct">
                <i class="el-icon-bank-card"></i>
                <span>$350 USD</span>
              </div>

              <div class="instruct">
                <i class="el-icon-date"></i>
                <span>20:00 - 22:00, Wednesday, August 31, 2022</span>
              </div>

              <div class="instruct">
                <i class="el-icon-location"></i>
                <span>أسيا / غزة </span>
              </div>

              <div class="whatGet">
                <p>احجز 4 جلسات تعليمية للبودكاست ستحصل من هذه</p>
                <ul>
                  <li>كيف تبدأ البودكاست؟ محتوى البود كاست ؟</li>
                  <li>كيف تبدأ بالتسجيل بصوتك كيف تضبط صوتك؟</li>
                  <li>كيف تجعل الكل يسمعك؟</li>
                  <li>كيف تنشر البودكاست ؟</li>
                  <li>كيف تسوق للبودكاست؟</li>
                  <li>نشر الحلقة الأولى لك</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="form">
              <h3>حدد الوقت والتاريخ</h3>
              <el-form
                ref="form"
                :model="form"
                label-width="120px"
                label-position="top"
              >
                <el-select v-model="value1" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <span
                  >الأوقات المتاح فيها 8:00 - 10:00 حدد الوقت الذي يناسبك
                </span>
                <el-time-select
                  v-model="value"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                  }"
                  placeholder="Select time"
                >
                </el-time-select>

                <el-button type="primary" @click="onSubmit">تأكيد </el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import navbar from "@/components/navComponentInner.vue";
export default {
  components: {
    navbar,
  },

  name: "Home",
  metaInfo: {
    title: "page title",
    titleTemplate: null,
    htmlAttrs: {
      lang: "ar",
    },
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "my standard description",
      },
    ],
  },

  data() {
    return {
      options: [
        {
          value: "Saturday ",
          label: "Saturday ",
        },
        {
          value: "Sunday ",
          label: "Sunday ",
        },
        {
          value: "Monday ",
          label: "Monday ",
        },
        {
          value: "Tuesday ",
          label: "Tuesday ",
        },
        {
          value: "Wednesday ",
          label: "Wednesday ",
        },
        {
          value: "Thursday  ",
          label: "Thursday  ",
        },
        {
          value: "Friday",
          label: "Friday",
        },
      ],
      radio1: "red",
      value: "",
      value1: "",
      lang: "ar",
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

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss">
.createConsultaion {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 50px;

  .content {
    padding: 50px;
    background-color: white;
    max-width: 70%;
    margin: 50px auto 0px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;

    .arabi-mark {
      width: 240px;
      font-size: 20px;
      font-weight: 700;
      color: white;
      background: var(--darkColor);
      position: absolute;
      left: -48px;
      top: 37px;
      padding: 10px 20px;
      transform: rotate(-43deg);
      text-align: center;
    }

    .form {
      text-align: right;
      max-width: 90%;
      border-right: none;
      padding-right: 40px;
      .el-form-item__label {
        display: block;
        text-align: right;
        padding-bottom: 0;
        font-weight: 700;
      }

      h3 {
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 40px;
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

      h5 {
        margin-bottom: 15px;
        font-size: 18px;
      }

      .infoPay {
        border: 1px solid #dcdfe6;
        padding: 10px;
        border-radius: 10px;

        h6 {
          font-weight: 700;
        }

        span {
          margin-bottom: 15px;
        }

        .el-button--primary {
          display: block;
          width: 100%;
          background: linear-gradient(
            239.11deg,
            #44bcd6 -31.67%,
            #567a46 192.97%
          );
          border-radius: 10px;
          color: white;
          height: 50px;
          margin-bottom: 10px;
          margin-top: 40px;
          border: none;
        }
      }
    }

    .user-info {
      text-align: right;

      .user-img {
        margin-bottom: 15px;
        img {
        }
      }

      h3 {
        margin-bottom: 10px;
        opacity: 0.5;
        font-size: 22px;
        color: #000;
      }

      p {
        margin-bottom: 40px;
        font-weight: 700;
      }

      .instruct {
        margin-bottom: 15px;

        span {
          margin-right: 10px;
        }
      }

      .el-icon-right {
        margin-bottom: 20px;
        color: var(--darkColor);
        font-size: 25px;
        font-weight: 700;
        cursor: pointer;
      }

      .el-icon-time,
      .el-icon-video-camera-solid,
      .el-icon-bank-card,
      .el-icon-date,
      .el-icon-location {
        font-size: 22px;
        color: #8e8b8b;
      }

      .whatGet {
        margin-top: 30px;
      }
    }
  }
}

.two {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
    margin-bottom: 30px !important;
    margin-top: 10px I !important;
  }
}
</style>