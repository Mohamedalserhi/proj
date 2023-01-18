<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>تعديل فيديو</h2>
          <p>ستتم مراجعة خدمتك فور انشاءه واعلامك باشعار اذا كان متاح لنشر</p>
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            label-position="top"
          >
            <el-form-item label="عنوان الفيديو " prop="title">
              <el-input
                v-model="form.title"
                placeholder="أدخل العنوان "
              ></el-input>
            </el-form-item>

            <el-form-item label="التصنيف" prop="types">
              <el-select
                v-model="form.types"
                multiple=""
                placeholder="اختر التصنيف"
              >
                <el-option
                  v-for="item in selectItems"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="الوصف" prop="description">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 14 }"
                v-model="form.description"
              ></el-input>
            </el-form-item>

            <span class="text-end d-block fw-bold mb-3">صورة للفيديو</span>

            <button
              style="display: block; height: 35px; margin-bottom: 10px"
              class="fileInput1"
              @click.prevent="$refs.fileInput1.click()"
            >
              اضغط هنا لتحميل صورة للفيديو
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput1"
              multiple
              @change="onfileSelected"
            />

            <el-switch
              class="mt-4 mb-4"
              style="display: block"
              v-model="form.type"
              active-color="#13ce66"
              inactive-color="#13ce66"
              inactive-text="مصدر فيديو"
              active-text="رفع الفيديو"
            >
            </el-switch>

            <el-form-item v-if="!form.type" label="المصدر" prop="url">
              <el-input
                v-model="form.url"
                placeholder="أدخل المصدر "
              ></el-input>
            </el-form-item>

            <el-form-item v-if="form.type" label="اضف فيديو">
              <!-- <input type="file" @change="onfileSelected2" /> -->

              <button
                style="display: block; height: 35px; margin-bottom: 10px"
                class="fileInput1"
                @click.prevent="$refs.fileInput2.click()"
              >
                اضغط هنا لتحميل الفيديو
              </button>
              <input
                type="file"
                style="display: none"
                ref="fileInput2"
                multiple
                @change="onfileSelected2"
              />
            </el-form-item>

            <el-form-item label="كلمات مفتاحية " prop="keywords">
              <input-tag
                v-model="form.keywords"
                placeholder="أدخل الكلمة المفتاحية "
                add-tag-on-keys="13"
              ></input-tag>
            </el-form-item>

            <el-button type="primary" @click.prevent="addVideo('form')"
              >تعديل الفيديو</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

import navbar from "@/components/navComponentInner.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    navbar,
    Editor,
  },

  data() {
    return {
      radio1: "red",

      form: {
        title: "",
        description: "",
        keywords: "",
        type: false,
        url: "",
        types: [],
      },
      rules: {
        title: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        description: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        url: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        category: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
        types: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      imageSelcteed: null,
      videoSelcteed: null,
      selectItems: undefined,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/video_category")
      .then((rr) => {
        console.log(rr);
        this.selectItems = rr.data.data;
      });

    const id = this.$route.params.id;

    localStorage.setItem("ViedoID", id);
  },

  methods: {
    onfileSelected(event) {
      this.imageSelcteed = event.target.files[0];
    },

    onfileSelected2(e) {
      this.videoSelcteed = e.target.files[0];
    },

    addVideo(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      const dataForm = new FormData();

      dataForm.append(
        "thum_image",
        this.imageSelcteed,
        this.imageSelcteed.name
      );
      dataForm.append("title", this.form.title);
      dataForm.append("types", JSON.stringify(this.form.types));
      dataForm.append("description", this.form.description);
      dataForm.append("type", this.form.type);
      dataForm.append("keywords", JSON.stringify(this.form.keywords));
      dataForm.append("video_id", localStorage.getItem("ViedoID"));
      if (this.form.type) {
        dataForm.append("video", this.videoSelcteed, this.videoSelcteed.name);
      } else if (!this.form.type) {
        dataForm.append("url", this.form.url);
      }

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/update_video",
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

          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تم التعديل بنجاح",
              type: "success",
            });

            this.$router.push('/')
          } else {
            this.$message.error("حدث خطأ ما");
          }
        });
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

      .el-upload-dragger {
        width: 100%;
        height: 200px;
      }
    }
  }
  .vue-input-tag-wrapper {
    width: 100%;
    background-color: #fafafa;
    border-radius: 5px;
    height: 45px;
    border: none;
  }

  .el-switch__label--right {
    margin-right: 10px;
    margin-left: 0px;
  }

  .el-switch__label--left {
    margin-right: 0px;
    margin-left: 10px;
  }
}
</style>