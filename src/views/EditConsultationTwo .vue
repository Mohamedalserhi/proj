<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>تعديل الاستشارة</h2>
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="مدة الاستشارة ">
              <el-select v-model="form.region" placeholder="اختيار وقت اخر  ">
                <el-option label="تسويقية" value="تسويقية "></el-option>
                <el-option label="تسويقية" value="تسويقية"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label=" " prop="time">
              <el-input
                class="m-2"
                v-model="form.hour"
                placeholder=""
              ></el-input>
              <el-select class="m-2" v-model="form.mints" placeholder="دقائق ">
                <el-option label="10" value="10"></el-option>
                <el-option label="20" value="20"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="تاريخ بداية الاستشارة " prop="start_date">
              <el-date-picker
                v-model="form.start_date"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              >
                type="date">
              </el-date-picker>

              <el-date-picker
                v-model="form.end_date"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              >
                type="date">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="أوقات الاستشارة ">
              <el-select class="m-2" v-model="form.region" placeholder=" ">
                <el-option label="zoom" value=""></el-option>
                <el-option label="zoom" value=""></el-option>
              </el-select>
              <el-time-select
                class="m-2"
                v-model="value"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                placeholder="00:00"
              >
              </el-time-select>

              <el-time-select
                class="m-2"
                v-model="value"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                placeholder="00:00"
              >
              </el-time-select>
            </el-form-item>
            <el-button class="add-more">اضافة اخر +</el-button>

            <span class="text-end d-block fw-bold mb-3">سعر الاستشارة </span>

            <el-slider v-model="form.price" :marks="marks" prop="">
              <el-slider v-model="form.price"></el-slider>
            </el-slider>

            <el-form-item label="طريقة الدفع  " prop="url">
              <el-select v-model="form.payment_id" placeholder="فيزا ">
                <el-option
                  v-for="item in consultation_payments"
                  :key="item.id"
                  :value="item.id"
                  :label="item.title"
                  style="background-image: url()"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="رابط الاستشارة " prop="url">
              <el-input
                v-model="form.url"
                placeholder="arabimarketing.com"
              ></el-input>
            </el-form-item>

            <el-button type="primary" plain @click.prevent="postData('form')"
              >تعديل</el-button
            >
            <el-button class="prev" @click="perv">السابق</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import navbar from "@/components/navComponentInner.vue";
export default {
  components: {
    navbar,
  },

  data() {
    return {
      radio1: "red",
      value: "",
      value1: "",
      value2: "",

      form: {
        url: "",
        start_date: "",
        end_date: "",
        hour: "",
        mints: "",
        price: 0,
        payment_id: "",
      },

      rules: {
        url: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        time: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        type_id: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        start_date: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
        end_date: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      value4: [30, 60],
      marks: {
        0: "1",
        200: "200",
      },
      consultation_payments: null,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/consultation_payments")
      .then((rr) => {
        console.log(rr);
        this.consultation_payments = rr.data.data;
      });
  },

  methods: {
    postData(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const dataForm = new FormData();

      dataForm.append("title", localStorage.getItem("title"));
      dataForm.append("description", localStorage.getItem("description"));
      dataForm.append("type_id", localStorage.getItem("type_id"));
      dataForm.append("place_id", localStorage.getItem("place_id"));
      dataForm.append("color", localStorage.getItem("color"));

      dataForm.append("hour", this.form.hour);
      dataForm.append("mints", this.form.mints);
      dataForm.append("start_date", this.form.start_date);
      dataForm.append("end_date", this.form.end_date);
      dataForm.append("price", this.form.price);
      dataForm.append("payment_id", this.form.payment_id);
      dataForm.append("url", this.form.url);

      const ConstID = localStorage.getItem("ConsultID");
      // alert(ConstID)
      this.axios
        .post(
          `https://dashboard.arabicreators.com/api/update_consultion/${ConstID}`,
          dataForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);

          if (res.data.code == 400) {
            this.$message.error("حدث خطأ");
          } else if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تم التعديل  بنجاح",
              type: "success",
            });

            this.$router.push("/marketerProfile");
            // this.$router.go();
          }
        });
    },

    onSubmit() {
      console.log("submit!");
    },

    perv() {
      this.$router.go(-1);
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
    padding-top: 50px;
    padding-bottom: 50px;

    .header {
      text-align: right;
      h2 {
        font-weight: 700;
      }

      p {
      }
    }

    .form {
      max-width: 100%;
      margin: auto;

      .el-form-item__label {
        display: block;
        text-align: right;
        padding-bottom: 0;
        font-weight: 700;
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
        background: linear-gradient(
          239.11deg,
          #70d644 -31.67%,
          #567a46 192.97%
        );
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

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 49%;
        margin: 1%;
      }

      .prev {
        display: block;
        width: 100%;
        border-radius: 10px;
        color: #70d644;
        height: 50px;
        margin-bottom: 10px;
        margin-top: 40px;
        border: 1px solid #70d644;
        background-color: white;
      }

      .add-more {
        background-color: #70d644;
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
        border-color: #70d644;
        border-width: 3px;
        width: 23px;
        height: 23px;
      }
    }
  }
}
</style>