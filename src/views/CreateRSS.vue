<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>اضافة رابط RSS</h2>
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
            <el-form-item label="رابط RSS" prop="link">
              <el-input
                v-model="form.link"
                placeholder="أدخل الرابط "
              ></el-input>
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

export default {
  components: {
    navbar,
  },

  data() {
    return {
      radio1: "red",

      form: {
        title: "",
        type: "",
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

      dataForm.append("type", this.form.type);
      dataForm.append("url", this.form.link);

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/add_new_podcast",
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
}
</style>

<style lang="scss">
.vue-input-tag-wrapper .new-tag {
  background-color: transparent !important;
  border: none !important;
  height: 50px !important;
}
</style>