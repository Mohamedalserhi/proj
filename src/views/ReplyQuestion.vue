<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>اضافة بيانات الرد على السؤال</h2>
          <p>ستتم اضافة بيانات للملف الشخصي فور انشاءها</p>
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
          >
            <el-form-item label="نوع الاسئلة ">
              <el-select v-model="form.region" placeholder="اختر التصنيف">
                <el-option label="تسويقية" value="تسويقية "></el-option>
                <el-option label="تسويقية" value="تسويقية"></el-option>
              </el-select>
            </el-form-item>

            <p class="text-end mb-4">معدل الرد على السؤال خلال كم ساعة</p>
            <el-slider v-model="value4" :marks="marks">
              <el-slider v-model="value4"></el-slider>
            </el-slider>

            <div class="d-flex justify-content-between">
              <p class="text-end mb-4">كم رسالة خلال الاسبوع</p>
              <el-switch v-model="value6" active-color="#64aa45"> </el-switch>
            </div>
            <el-slider v-model="value4" :marks="marks">
              <el-slider v-model="value4"></el-slider>
            </el-slider>

            <p class="text-end mb-4">سعر السؤال</p>
            <el-slider v-model="value4" :marks="marks">
              <el-slider v-model="value4"></el-slider>
            </el-slider>

            <el-button type="primary" @click="onSubmit">انشاء</el-button>
          </el-form>
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

  data() {
    return {
      radio1: "red",
      value6: true,
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

      value4: [50],
      marks: {
        100: "0",
        0: "5000",
      },

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },

  mounted() {
        window.scrollTo(0, 0);

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
      max-width: 60%;
      margin: auto;
      margin-top: 100px;

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

      .el-slider {
        margin-bottom: 50px;
      }

      .el-slider__runway {
        background: #bfbfbf;
      }
    }
  }
}
</style>