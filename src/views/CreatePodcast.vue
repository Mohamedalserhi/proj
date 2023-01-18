<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>اضافة بودكاست</h2>
          <!-- <p>من خلال إنشاء استشارة ، ستظهر في منصة Arabi marketer</p> -->
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
            method="post"
            @submit="postData"
          >
            <el-form-item label="عنوان البودكاست" prop="title">
              <el-input
                v-model="form.title"
                placeholder="أدخل العنوان "
              ></el-input>
            </el-form-item>

            <el-form-item label="التصنيف" prop="category">
              <el-select
                v-model="form.category"
                multiple
                placeholder="اختر التصنيف"
              >
                <el-option
                  v-for="item in selectItems"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="الوصف" prop="description">
              <editor
                api-key="lq78n5tuhbwnunb6moxdzq6d2cyx8o895bfzepnwbw3mc29e"
                :init="{
                  height: 500,
                  menubar: 'false',
                  plugins: [
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  ],
                  toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  toolbar_sticky: true,
                  image_caption: true,
                  toolbar_mode: 'sliding',
                }"
                v-model="form.description"
                style="width: 100%"
              />
            </el-form-item>

            <span class="text-end d-block fw-bold mb-3">صورة البودكاست</span>

            <button
              style="display: block; height: 35px; margin-bottom: 10px"
              class="fileInput1"
              @click.prevent="$refs.fileInput.click()"
            >
              اضغط هنا لتحميل صورة البودكاست
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              multiple
              @change="onfileSelected"
            />

            <el-form-item label="رابط البودكاست" prop="link">
              <el-input
                v-model="form.link"
                placeholder="أدخل الرابط "
              ></el-input>
            </el-form-item>

            <el-form-item label="مدة البودكاست " prop="time">
              <el-input
                v-model="form.time"
                placeholder="أدخل المدة "
              ></el-input>
            </el-form-item>

            <el-form-item label="كلمات مفتاحية " prop="keywords">
              <input-tag
                v-model="form.keywords"
                placeholder="أدخل الكلمة المفتاحية "
                add-tag-on-keys="13"
                class="blogInput"
              ></input-tag>
            </el-form-item>

            <el-button type="primary" @click="postData('form')"
              >اضافة</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import navbar from "@/components/navComponentInner.vue";
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    navbar,
    Editor,
  },

  data() {
    return {
      radio1: "red",
      editor: ClassicEditor,

      form: {
        title: "",
        category: "",
        description: "",
        keywords: "",
        time: "",
        types: [],
        link: "",
      },

      rules: {
        title: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        time: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        link: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        description: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        category: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      imageSelcteed: null,
      selectItems: undefined,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/podcast_category")
      .then((rr) => {
        console.log(rr);
        this.selectItems = rr.data.data;
      });
  },

  methods: {
    onfileSelected(event) {
      this.imageSelcteed = event.target.files[0];
    },

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

      dataForm.append("image", this.imageSelcteed, this.imageSelcteed.name);
      dataForm.append("title", this.form.title);
      dataForm.append("description", this.form.description);
      dataForm.append("keywords", this.form.keywords);
      dataForm.append("time", this.form.time);
      dataForm.append("types", JSON.stringify(this.form.category));
      dataForm.append("link", this.form.link);

      this.axios
        .post("https://dashboard.arabicreators.com/api/add_podcast", dataForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);

          if (res.data.code == 400) {
            this.$message.error("حدث خطأ");
          } else if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تمت الاضافة بنجاح",
              type: "success",
            });
            this.$router.push("/Podcasts");
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
      max-width: 100% !important;
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
}
</style>

<style lang="scss">
.vue-input-tag-wrapper .new-tag {
  background-color: transparent !important;
  border: none !important;
  height: 50px !important;
}
</style>

