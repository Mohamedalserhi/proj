<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <div class="header">
          <h2>انشاء استشارة</h2>
          <p>من خلال إنشاء استشارة ، ستظهر في منصة Arabi marketer</p>
        </div>

        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="عنوان الاستشارة " prop="title">
              <el-input
                v-model="form.title"
                placeholder="أدخل العنوان "
              ></el-input>
            </el-form-item>

            <el-form-item label="نوع الاستشارة " prop="type_id">
              <el-select v-model="form.type_id" placeholder="نوع الاستشارة ">
                <el-option
                  v-for="item in consultation_category"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="مكان الاستشارة " prop="place_id">
              <el-select v-model="form.place_id" placeholder="مكان الاستشارة ">
                <el-option
                  v-for="item in consultation_places"
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

            <span class="text-end d-block fw-bold mb-3">لون الاستشار ة </span>

            <div>
              <el-radio-group v-model="form.color" prop="color">
                <el-radio-button
                  label="#8A0000"
                  style="background: #8a0000"
                ></el-radio-button>
                <el-radio-button
                  label="#FD9010"
                  style="background: #fd9010"
                ></el-radio-button>
                <el-radio-button
                  label="#00508A"
                  style="background: #00508a"
                ></el-radio-button>
                <el-radio-button
                  label="#8A0074"
                  style="background: #8a0074"
                ></el-radio-button>
                <el-radio-button
                  label="#67B979"
                  style="background: #67b979"
                ></el-radio-button>
                <el-radio-button
                  label="#F3DB04"
                  style="background: #f3db04"
                ></el-radio-button>
                <el-radio-button
                  label="#8A4200"
                  style="background: #8a4200"
                ></el-radio-button>
                <el-radio-button
                  label="#F5547B"
                  style="background: #f5547b"
                ></el-radio-button>
              </el-radio-group>
            </div>

            <el-button type="primary" @click="onSubmit">التالي</el-button>
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
      form: {
        title: "",
        description: "",
        type_id: "",
        place_id: "",
        color: "",
      },

      rules: {
        title: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        description: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        type_id: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        place_id: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
        color: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "change" },
        ],
      },

      consultation_category: null,
      consultation_places: null,
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/consultation_category")
      .then((rr) => {
        console.log(rr);
        this.consultation_category = rr.data.data;
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/consultation_places")
      .then((rr) => {
        console.log(rr);
        this.consultation_places = rr.data.data;
      });
  },

  methods: {
    onSubmit() {
      localStorage.setItem("title", this.form.title);
      localStorage.setItem("description", this.form.description);
      localStorage.setItem("type_id", this.form.type_id);
      localStorage.setItem("place_id", this.form.place_id);
      localStorage.setItem("color", this.form.color);

      this.$router.push("/CreateConsultationTwo");
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
    }
  }
}
</style>


<style lang="scss">
.el-radio-button {
  position: relative;
  display: inline-block;
  outline: 0;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border: none;
  background-color: beige;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.el-radio-button__inner {
  display: none !important;
}

// .is-active{
//   transition: all .3s;
//   border: 4px solid #8fc5e6;
// }
</style>