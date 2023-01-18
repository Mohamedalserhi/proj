<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div v-if="show" class="loaderCart">
      <img src="../assets/debit-card.png" alt="" />
      <p class="mt-3 mb-3 fw-bold fs-4">جاري التحويل الى صفحة الدفع</p>
      <pulse-loader
        :loading="loading"
        :color="color"
        :size="size"
      ></pulse-loader>
    </div>

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="user-info">
              <i class="el-icon-right"></i>

              <div class="user-img">
                <img :src="single_consultion.user_info.image" alt="" />
              </div>
              <h3>{{ single_consultion.user_info.name }}</h3>
              <p v-html="single_consultion.description"></p>
              <div class="instruct">
                <i class="el-icon-time"></i>
                <span
                  v-if="single_consultion.hour && single_consultion.hour > 0"
                >
                  hr {{ single_consultion.hour }}</span
                >
                <span
                  v-if="
                    single_consultion.minutes && single_consultion.minutes > 0
                  "
                >
                  min {{ single_consultion.minutes }}</span
                >
              </div>

              <div class="instruct">
                <i class="el-icon-video-camera-solid"></i>
                <!-- <span>يتم توفير تفاصيل مؤتمرات الويب عند التأكيد</span> -->
                <span> على منصة {{ single_consultion.place.title }}</span>
              </div>

              <div class="instruct">
                <i class="el-icon-bank-card"></i>
                <span v-if="single_consultion.price"
                  >{{ single_consultion.price }} USD</span
                >
              </div>

              <div class="instruct">
                <i class="el-icon-date"></i>
                <!-- <span>20:00 - 22:00, Wednesday, August 31, 2022</span> -->
                <span>اوقات الاستشارة:</span>
                <li
                  class="mt-1 mb-0 fw-normal"
                  v-for="item in single_consultion.date"
                  :key="item.id"
                >
                  يوم {{ item.day }} يبدا من {{ item.start_at }} الى
                  {{ item.end_at }}
                </li>
              </div>

              <div class="instruct">
                <i class="el-icon-location"></i>
                <span>أسيا / غزة </span>
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="form">
              <h3>أدخل بياناتك</h3>
              <span class="arabi-mark">صناعة المحتوى</span>

              <el-form
                ref="form"
                :model="form"
                label-width="120px"
                label-position="top"
              >
                <el-form-item label="الاسم بالكامل  ">
                  <el-input
                    v-model="username"
                    placeholder="ادخل الاسم  "
                    disabled
                  ></el-input>
                </el-form-item>

                <el-form-item label="البريد الالكتروني ">
                  <el-input
                    v-model="email"
                    placeholder=" ادخل الايميل"
                    disabled
                  ></el-input>
                </el-form-item>
                <p>يرجى مشاركة أي شيء من شأنه أن يساعد في التحضير لاجتماعنا.</p>
                <el-form-item label="">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 14 }"
                    v-model="form.desc"
                  ></el-input>
                </el-form-item>

                <p>حدد الوقت والتاريخ</p>
                <el-select v-model="form.day" placeholder="Select">
                  <el-option
                    v-for="item in days"
                    :key="item.id"
                    :label="item.day"
                    :value="item.day"
                  >
                  </el-option>
                </el-select>

                <p class="mt-4 mb-2">حدد الوقت</p>

                <!-- <p class="mt-2 mb-2"
                  >الأوقات المتاح فيها 8:00 - 10:00 حدد الوقت الذي يناسبك
                </p> -->

                <el-form-item label="من  " class="form-item">
                  <el-time-select
                    v-model="form.startTime"
                    :picker-options="{
                      start: start_at,
                      step: '00:15',
                      end: start_at,
                    }"
                    placeholder="Select time"
                  >
                  </el-time-select>
                </el-form-item>
                <el-form-item label="الى  " class="form-item">
                  <el-time-select
                    v-model="form.endTime"
                    :picker-options="{
                      start: end_at,
                      step: '00:15',
                      end: end_at,
                    }"
                    placeholder="Select time"
                  >
                  </el-time-select>
                </el-form-item>
                <h5>معلومات الدفع</h5>
                <div class="infoPay">
                  <h6>السعر</h6>
                  <span v-if="single_consultion"
                    >{{ single_consultion.price }} <span>usd</span></span
                  >
                  <!-- <el-button
                    type="primary"
                    icon="el-icon-bank-card"

                    @click.prevent="pay"
                  >
                  ادفع
                  </el-button> -->
                </div>
                <el-button type="primary" @click.prevent="BookConsultion"
                  >تأكيد
                </el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import navbar from "@/components/navComponentInner.vue";
// import pulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    navbar,
  },

  data() {
    return {
      show: false,
      options: [
        {
          value: "Wednesday ",
          label: "Wednesday ",
        },
      ],
      value: "",
      value1: "",
      radio1: "red",
      username: "",
      email: "",
      form: {
        name: "",
        day: "",
        startTime: "",
        endTime: "",
        desc: "",
      },

      single_consultion: undefined,
      start_at: undefined,
      end_at: undefined,
      days: undefined,

      checkOut: undefined,

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },

  mounted() {
    // alert(localStorage.getItem('userEmail'))

    this.username = localStorage.getItem("d");
    this.email = localStorage.getItem("userEmail");
    Vue.axios
      .get(
        `https://dashboard.arabicreators.com/api/single_consultion/${this.$route.params.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("single_consultion" + res);
        this.single_consultion = res.data.data;

        this.start_at = this.single_consultion.date[0].start_at;
        this.end_at = this.single_consultion.date[0].end_at;
        this.days = this.single_consultion.date;

        // alert(this.start_at)

        // this.show=! this.show
      });
  },

  methods: {
    BookConsultion() {
      const data = new FormData();

      data.append("consult_id", this.$route.params.id);
      data.append("date", this.form.day);
      data.append("start_at", this.form.startTime);
      data.append("end_at", this.form.endTime);
      data.append("note", this.form.desc);

      this.show = !this.show;
      window.scrollTo(0, 300);
      Vue.axios
        .post(`https://dashboard.arabicreators.com/api/checkout_cons`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.checkOut = res.data.data.link;
          console.log(this.checkOut);

          // window.location = `${this.checkOut}`;

          window.open(`${this.checkOut}`, "_blank");

          this.show = !this.show;

          if (res.data.message == "added") {
            this.$message({
              message: "تم الحجز",
              type: "success",
            });
          } else if (res.data.code == 400) {
            if (res.data.message == "you need to login") {
              this.$message.error("تحتاج الى تسجيل الدخول");
            }
          }
        });
    },

    pay() {
      // alert(this.checkOut)
    },

    // this.$store.dispatch('user',res.data.token)

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
.loaderCart {
  .v-spinner {
    margin-top: 0 !important;
  }
}
</style>


<style lang="scss">
.loaderCart {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-top: 15%;
  flex-direction: column;
  z-index: 50;

  img {
    margin-bottom: 50px;
  }
}
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
      background: var(--darkColor) !important;
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
      // border-right: 1px solid #bcbbbb;
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
    }
  }
}

.form-item {
  width: 48%;
  float: right;

  .el-input {
    width: 100% !important;
  }
}
</style>