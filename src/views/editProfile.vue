
<template>
  <div class="createUserProfile">
    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col-lg-6">
            <div class="text">
              <h2>تعديل الملف الشخصي</h2>
              <p>من خلال تعديل ملف شخصي ....</p>
            </div>
          </div>

          <div class="col-lg-6"></div>
        </div>
      </div>

      <div class="content">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            label-position="top"
            method="post"
            :rules="rules"
            @submit="CreateProfile"
          >
           

            <div class="img-box">
              <img :src="profile.cover" alt="" />
              <div class="edit edit2" @click.prevent="$refs.fileInput.click()">
                <div class="">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                @change="onfileCoverSelected"
              />
            </div>

            <div class="img-pro">
              <img :src="profile.image" alt="" />
              <div class="edit edit3" @click.prevent="$refs.fileInput2.click()">
                <div class="">
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
              <input
                type="file"
                style="display: none"
                ref="fileInput2"
                @change="onfileSelected"
              />
            </div>

            <div class="group-input">
              <el-form-item label=" الاسم الاول " prop="first_name">
                <el-input
                  v-model="form.first_name"
                  placeholder="الاسم الاول"
                ></el-input>
              </el-form-item>

              <el-form-item label=" الاسم الاخير " prop="last_name">
                <el-input
                  v-model="form.last_name"
                  placeholder="الاسم الاخير"
                ></el-input>
              </el-form-item>
            </div>

            <el-form-item label="الدولة " prop="country_id">
              <el-select
                class="ms-2"
                v-model="form.country_id"
                placeholder="الدولة"
                @change="city"
              >
                <el-option
                  v-for="country in countires"
                  :key="country.id"
                  :label="country.title"
                  :value="country.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="البريد الالكتروني " prop="email">
              <el-input
                v-model="form.email"
                placeholder="البريد الالكتروني "
              ></el-input>
            </el-form-item>

            <el-button
              class=""
              type="primary"
              @click.prevent="CreateProfile('form')"
              plain
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

export default {
  data() {
    return {
      active: 0,
      radio1: "red",
      value: "",
      value1: "",
      value2: "",
      countires: null,
      Cities: null,
      imageSelcteed: null,
      imageSelcteedCover: null,
      beMarketer: null,
      user_id: null,
      // CountryID:2,
      url: null,
      url2: null,
      profile: undefined,

      form: {
        first_name: localStorage.getItem("first_name"),
        last_name: localStorage.getItem("last_name"),
        email: localStorage.getItem("email"),
        password: "",
        newPassword: "",
        confrmPassword: "",
        delivery: false,
        // lang: [],
        country_id:undefined,
        // country_name:localStorage.getItem('country'),
        city_id: [],
        image: "",
        desc: "",
      },

      rules: {
        first_name: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        last_name: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        email: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        desc: [{ required: true, message: "هذا الحقل مطلوب", trigger: "blur" }],
        lang: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "blur" },
        ],
        country_id: [
          { required: true, message: " هذا الحقل مطلوب ", trigger: "blur" },
        ],
      },

      value4: [30, 60],
      marks: {
        0: "1",
        100: "100",
      },
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_all_countires")
      .then((rr) => {
        console.log(rr);
        this.countires = rr.data.data;
      });

    // if (this.form.country_id == 1) {
    //   this.form.country_id == "فلسطين";
    // } else if (this.form.country_id == 2) {
    //   this.form.country_id == "مصر";
    // } else if (this.form.country_id == 3) {
    //   this.form.country_id == "Danmark";
    // } else if (this.form.country_id == 4) {
    //   this.form.country_id == "المغرب";
    // } else if (this.form.country_id == 5) {
    //   this.form.country_id == "العراق";
    // }

    this.city();

    this.profileData();
  },

  methods: {
    onfileSelected(event) {
      this.imageSelcteed = event.target.files[0];

      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);

      this.EditImage();
    },

    onfileCoverSelected(event) {
      this.imageSelcteedCover = event.target.files[0];

      const file = event.target.files[0];
      this.url2 = URL.createObjectURL(file);

      this.EditCover();
    },

    profileData() {
      Vue.axios
        .get("https://dashboard.arabicreators.com/api/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.profile = res.data.data;
          this.type = this.profile.type;
          this.form.country_id=res.data.data.country.id
          
        });
    },

    EditCover() {
      const dataImg = new FormData();
      dataImg.append(
        "cover",
        this.imageSelcteedCover,
        this.imageSelcteedCover.name
      );

      Vue.axios
        .post(
          "https://dashboard.arabicreators.com/api/upload_profile_cover",
          dataImg,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 400) {
            this.$message.error("قم باضافة صورة");
          } else if (res.data.code == 200) {
            // this.$message({
            //   message: "تم تعديل صورة الغلاف بنجاح",
            //   type: "success",
            // });
            this.profileData();
          }
        });
    },

    EditImage() {
      const dataStep = new FormData();
      dataStep.append("image", this.imageSelcteed, this.imageSelcteed.name);

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/upload_profile_image",
          dataStep,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 400) {
            this.$message.error("قم باضافة صورة");
          } else if (res.data.code == 200) {
            // this.$message({
            //   message: "تم تعديل الصورة الشخصية بنجاح",
            //   type: "success",
            // });
            this.profileData();
          }
        });
    },

    CreateProfile(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });

      localStorage.setItem("first_name", this.form.first_name);
      localStorage.setItem("last_name", this.form.last_name);
      localStorage.setItem("country_id", JSON.stringify(this.form.country_id));
      localStorage.setItem("email", this.form.email);

      const dataStep = new FormData();

      dataStep.append("first_name", this.form.first_name);
      dataStep.append("last_name", this.form.last_name);
      dataStep.append("country_id", JSON.stringify(this.form.country_id));
      dataStep.append("email", this.form.email);

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/edit_profile",
          dataStep,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تم  تعديل البروفايل بنجاح",
              type: "success",
            });

            this.$router.push('/')
          }
        });
    },

    city() {
      let url = `https://dashboard.arabicreators.com/api/get_all_city_user_country_id/${this.form.country_id}`;
      Vue.axios.get(url).then((resCity) => {
        // console.log(resCity);
        this.Cities = resCity.data.data;
      });
      // console.log(this.country_id)
    },

    BeMarketer() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push("/createUserProfile1");
    },

    next() {},
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
      background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 192.97%);
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
}

.img-preview {
  width: 150px;
  height: 150px;
  display: block;
  margin: auto;
  margin-top: 30px;
  border-radius: 50%;
}
</style>

<style lang="scss">
.form {
  max-width: 100%;
  margin: auto;

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

    text-align: right !important;
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
    border-color: var(--darkColor);
    border-width: 3px;
    width: 23px;
    height: 23px;
  }
}

.el-steps {
  direction: rtl;

  .el-step__title {
    text-align: center;
  }

  .el-step__line-inner {
    display: none;
  }

  .el-step:last-of-type .el-step__line {
    display: block;
  }
}

.el-input .el-input__inner {
  text-align: right !important;
}

.el-step__title.is-success {
  color: var(--darkColor) !important;
}

.el-step__head.is-success {
  color: var(--darkColor) !important;
  border-color: var(--darkColor) !important;
}
</style>

<style lang="scss" scoped>
.img-box {
  width: 100%;
  height: 350px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}

.img-pro {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  right: 50%;
  transform: translateX(75px);
  top: -75px;

  img {
    width: 100%;
    height: 100%;
  }
}

.edit {
  position: absolute;
  left: 45%;
  top: 38%;
  cursor: pointer;
}

.edit2 {
    font-size: 24px;
    left: 2%;
    top: 5%;
    color: black;
    background-color: white;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    line-height: 45px;
}

.edit3 {
  font-size: 17px;
}
</style>