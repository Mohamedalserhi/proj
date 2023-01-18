<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="pagehead">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">استشارات</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="row">
          <div class="col-lg-6">
            <div class="headItem">
              <h3>بروفايل</h3>
              <h3>استشارات اخرى</h3>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="headItem justify-content-end">
              <el-button type="success" icon="el-icon-document-copy">
                رابط الصفحة
              </el-button>
              <el-button type="success" plain icon="el-icon-plus"
                >اضافة استشارة</el-button
              >
            </div>
          </div>
        </div>

        <el-divider></el-divider>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
          >
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                تحميل صورة

                <div class="el-upload__tip" slot="tip">
                  JPG, GIF or PNG. Max size of 5MB.
                </div>
              </div>
            </el-upload>

            <el-form-item label="الاسم">
              <el-input v-model="form.name" placeholder="الاسم"></el-input>
            </el-form-item>

            <el-form-item label="رسالة ترحيبيه ">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 14 }"
                v-model="form.desc"
              ></el-input>
            </el-form-item>

            <el-form-item label="اللغة">
              <el-select v-model="form.region" placeholder="العربية">
                <el-option label="العربية " value="العربية  "></el-option>
                <el-option label="العربية " value="العربية "></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="تنسيق التاريخ ">
              <el-select
                class="m-2"
                v-model="form.region"
                placeholder="MM/DD/YYYY "
              >
                <el-option label="MM/DD/YYYY " value="MM/DD/YYYY "></el-option>
                <el-option label="MM/DD/YYYY " value="MM/DD/YYYY "></el-option>
              </el-select>

              <el-select
                class="m-2"
                v-model="form.region"
                placeholder="تنسيق الوقت  "
              >
                <el-option label="24h" value="24h"></el-option>
                <el-option label="24h" value="24h"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="الدولة ">
              <el-select v-model="form.region" placeholder="السلطة الفلسطيينة ">
                <el-option
                  label="السلطة الفلسطيينة  "
                  value="السلطة الفلسطيينة   "
                ></el-option>
                <el-option
                  label="السلطة الفلسطيينة  "
                  value="السلطة الفلسطيينة  "
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label=" الوحدة الزمنية  ">
              <el-select v-model="form.region" placeholder="الوحدة الزمنية ">
                <el-option label="اسيا" value="اسيا "></el-option>
                <el-option label="اسيا" value="اسيا"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" plain @click="onSubmit">حفظ</el-button>
            <el-button class="prev">الغاء</el-button>
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
      value: "",
      value1: "",
      value2: "",

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

  methods: {
    onSubmit() {
      console.log("submit!");
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

  .pagehead {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .headItem {
      display: flex;
      h3 {
        margin-left: 10px;
        font-size: 18px;
        &:first-child {
          font-weight: 700;
        }
      }

      .el-button {
        margin-left: 10px;
      }
    }
  }

  .el-breadcrumb {
    display: flex;
    justify-content: start;
    margin-bottom: 80px;
    margin-top: 20px;

    .el-breadcrumb__item {
      font-size: 24px;
    }
  }

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