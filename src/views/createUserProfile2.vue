
<template>
  <div class="createUserProfile">
    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col-lg-6">
            <div class="text">
              <h2>انشاء بروفايل</h2>
              <p>من خلال إنشاء ملف شخصي ، ستظهر في منصة Arabi marketer</p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="steps">
              <el-steps :active="active" finish-status="success">
                <el-step title="الملف الشخصي"></el-step>
                <el-step title="السيرة الذاتية "></el-step>
                <el-step title="بيانات الاتصال "></el-step>
                <!-- <el-step title="الخطوة الاخيرة "></el-step> -->
              </el-steps>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            label-position="top"
          >
            <span class="d-block mb-4 fs-3">مواقع التواصل </span>

            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="حدد المنصات الاجتماعية"
              class="mb-2"
              @change="alertName()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <!-- <span>{{ value }}</span> -->

            <el-form-item
              class="soialItem instagram m-2"
              :style="{ display: isActive5 }"
            >
              <img src="../assets/instagram.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.instagram"
                clearable
              >
              </el-input>
              <div @click="remove5('instagram')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem facebook m-2"
              :style="{ display: isActive }"
            >
              <img src="../assets/facebook.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.facebook"
                clearable
              >
              </el-input>

              <!-- <i class="el-icon-delete d-block" ></i> -->
              <!-- <i class="fa-solid fa-trash"></i> -->
              <div @click="remove1('facebook')">
                <i class="fa-solid fa-xmark del"></i>
              </div>

            </el-form-item>

            <el-form-item
              class="soialItem twitter m-2"
              :style="{ display: isActive2 }"
            >
              <img src="../assets/twitter.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.twitter"
                clearable
              >
              </el-input>

              <div @click="remove2('twitter')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem pintrest m-2"
              :style="{ display: isActive3 }"
            >
              <img src="../assets/pintrest.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.pintrest"
                clearable
              >
              </el-input>
              <div @click="remove3('pintrest')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem blog m-2"
              :style="{ display: isActive4 }"
            >
              <img src="../assets/blog.png" alt="" />
              <el-input
                placeholder="www.blog.com"
                class="soialItemInput"
                v-model="form.blog"
                clearable
              >
              </el-input>
              <div @click="remove5('blog')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem snapchat m-2"
              :style="{ display: isActive6 }"
            >
              <img src="../assets/snapchat.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.snapchat"
                clearable
              >
              </el-input>
              <div @click="remove6('snapchat')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem linkedin m-2"
              :style="{ display: isActive7 }"
            >
              <img src="../assets/linkedin.png" alt="" />
              <el-input
                placeholder="@Dena_musalem"
                class="soialItemInput"
                v-model="form.linkedin"
                clearable
              >
              </el-input>
              <div @click="remove7('linkedin')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem podcast m-2"
              :style="{ display: isActive8 }"
            >
              <img src="../assets/broadcast-mic.png" alt="" />
              <el-input
                placeholder="www.podcast.com"
                class="soialItemInput"
                v-model="form.podcast"
                clearable
              >
              </el-input>
              <div @click="remove8('podcast')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>

            <el-form-item
              class="soialItem ecommerce m-2"
              :style="{ display: isActive9 }"
            >
              <img src="../assets/shopping-cart.png" alt="" />
              <el-input
                placeholder="www.ecommerce.com"
                class="soialItemInput"
                v-model="form.ecommerce"
                clearable
              >
              </el-input>
              <div @click="remove9('ecommerce')">
                <i class="fa-solid fa-xmark del"></i>
              </div>
            </el-form-item>
            <!-- 
            <el-form-item prop="followers_number">
              <el-input
                v-model="form.followers_number"
                type="number"
                placeholder="عدد المتابعين"
              ></el-input>
            </el-form-item> -->
            <p class="mt-4 fs-3">عدد المتابعين</p>
            <el-radio-group v-model="form.followers_number">
              <el-radio label="5000-10000">5,000-10,000</el-radio>
              <el-radio label="10000-50000">10,000-50,000</el-radio>
              <el-radio label="50000-100000">50,000-100,000</el-radio>
              <el-radio label="1000000">1,000,000 فأكثر </el-radio>
            </el-radio-group>

            <!-- <el-form-item  class="text-end">
              <el-select v-model="form.more" class="text-end" multiple placeholder="مشاهدة المزيد " >
                <el-option label="تسويق" value="36"></el-option>
                 <el-option label="برمجة" value="35"></el-option>

              </el-select>
            </el-form-item> -->

            <!-- <el-button type="primary" @click="CreateProfile3('form')">حفظ</el-button> -->
            <el-button
              class=""
              type="primary"
              plain
              @click="CreateProfile3('form')"
              >ارسال</el-button
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
      active: 2,
      radio: 5000,
      form: {
        instagram: "",
        facebook: "",
        twitter: "",
        pintrest: "",
        blog: "",
        snapchat: "",
        linkedin: "",
        ecommerce: "",
        podcast: "",

        followers_number:localStorage.getItem('followers_number'),
        more: [],
        social: [],
      },

      isActive: "unset",
      isActive2: "unset",
      isActive3: "unset",
      isActive4: "unset",
      isActive5: "unset",
      isActive6: "unset",
      isActive7: "unset",
      isActive8: "unset",
      isActive9: "unset",

      options: [
        {
          value: "instagram",
          label: "instagram",
        },
        {
          value: "facebook",
          label: "facebook",
        },
        {
          value: "twitter",
          label: "twitter",
        },
        {
          value: "pintrest",
          label: "pintrest",
        },
        {
          value: "snapchat",
          label: "snapchat",
        },
        {
          value: "blog",
          label: "blog",
        },

        {
          value: "linkedin",
          label: "linkedin",
        },

        {
          value: "ecommerce",
          label: "ecommerce",
        },

        {
          value: "podcast",
          label: "podcast",
        },
      ],
      value: [],

      rules: {
        instagram: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
        followers_number: [
          { required: true, message: "هذا الحقل مطلوب", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }

          Vue.axios
        .get("https://dashboard.arabicreators.com/api/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.profile = res.data.data;
          
          if(res.data.data.social){
            this.form.facebook=res.data.data.social.facebook;
            this.form.instagram=res.data.data.social.instagram;
            this.form.twitter=res.data.data.social.twitter;
            this.form.pintrest=res.data.data.social.pintrest;
            this.form.blog=res.data.data.social.blog;
            this.form.snapchat=res.data.data.social.snapchat;
            this.form.linkedin=res.data.data.social.linkedin;
            this.form.ecommerce=res.data.data.social.ecommerce;
            this.form.podcast=res.data.data.social.podcast;
          }

          // alert(this.form.podcast)
          
        });
   


  },

  methods: {
    remove1(item) {
      this.isActive = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove2(item) {
      this.isActive2 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove3(item) {
      this.isActive3 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove4(item) {
      this.isActive4 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove5(item) {
      this.isActive5 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove6(item) {
      this.isActive6 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove7(item) {
      this.isActive7 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove8(item) {
      this.isActive8 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    remove9(item) {
      this.isActive9 = "none";
      this.value;

      const index = this.value.indexOf(item);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    },

    alertName() {
      const v = [];

      for (let i = 0; i < this.value.length; i++) {
        v.push(this.value[i]);
      }

      for (let j = 0; j < v.length; j++) {
        if (this.value.includes(v[j])) {
          this.$el
            .querySelector(`.${v[v.length - 1]}`)
            .classList.toggle(`${v[v.length - 1]}`);
          this.$el.querySelector(`.${v[v.length - 1]}`).classList.add(`rem`);
        }
        //   else if(! this.value.includes(v[j])){
        //  this.$el.querySelector(`.${this.value[this.value.length -1]}`).classList.toggle(`${v[v.length -1]}`)

        //   }
      }

      // alert(v[v.length -1])
      const result = v[v.length - 1];
      // this.$el.querySelector(`.img${v[v.length -1]}`).style.display='block'
    },

    next() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push("/createUserProfile3");
    },

    CreateProfile3(e) {
      const dataStep3 = new FormData();
      dataStep3.append("instagram", this.form.instagram);
      dataStep3.append("facebook", this.form.facebook);
      dataStep3.append("twitter", this.form.twitter);
      dataStep3.append("pintrest", this.form.pintrest);
      dataStep3.append("snapchat", this.form.snapchat);
      dataStep3.append("linkedin", this.form.linkedin);
      dataStep3.append("blog", this.form.blog);
      dataStep3.append("ecommerce", this.form.ecommerce);
      dataStep3.append("podcast ", this.form.podcast);

      dataStep3.append("followers_number", this.form.followers_number);

      localStorage.setItem('followers_number',this.form.followers_number)

      // dataStep3.append("image", localStorage.getItem("image"));
      dataStep3.append("first_name", localStorage.getItem("first_name"));
      dataStep3.append("last_name", localStorage.getItem("last_name"));
      // dataStep3.append("lang", localStorage.getItem("lang"));
      dataStep3.append("country_id", localStorage.getItem("country_id"));
      // dataStep3.append("city_id", localStorage.getItem("city_id"));
      dataStep3.append("email", localStorage.getItem("email"));
      dataStep3.append("type", localStorage.getItem("type"));
      dataStep3.append("cv", localStorage.getItem("cv"));

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/edit_profile",
          dataStep3,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          localStorage.setItem("showBtn", false);
          if (res.data.code == 200) {
            // this.$message({
            //   showClose: true,
            //   message: "تم الاضافة بنجاح",
            //   type: "success",
            // });
            this.BeMarketer();
            window.scrollTo(0, 0);
          } else {
            this.$message.error("خطأ بادخال البيانات");
          }

          // this.$refs[e].validate((valid) => {
          //   if (valid) {
          //     console.log("submit!");

          //   } else {
          //     console.log("error submit!!");
          //     return false;
          //   }
          // });
        });
    },

    BeMarketer() {
      //  if (this.active++ > 2) this.active = 0;
      // this.$router.push('/createUserProfile1')

      this.user_id = localStorage.getItem("userId");
      const data = new FormData();
      data.append("user_id", this.user_id);

      Vue.axios
        .post("https://dashboard.arabicreators.com/api/be_marketer", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((re) => {
          if (re.data.message == "تم ارسال طلبك للادارة") {
            this.$message({
              message: "تم الارسال بنجاح، سيتم مراجعة طلبك خلال ٢٤ ساعة",
              type: 'success'
            });
            this.$router.push("/wellcomeMarketer");
          } else if (re.data.message == "انت بالفعل مسوق لدينا ") {
            this.$message.error("انت بالفعل مسوق لدينا");
          }

          console.log(re.data);
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.del {
  margin: 4px;
  position: absolute;
  top: 12px;
  left: -25px;
  font-size: 18px;
  color: #bdbbbb;
}

.podcast {
  display: none !important;
}

.ecommerce {
  display: none !important;
}

.linkedin {
  display: none !important;
}

.snapchat {
  display: none !important;
}

.instagram {
  display: none !important;
}

.facebook {
  display: none !important;
}

.twitter {
  display: none !important;
}

.pintrest {
  display: none !important;
}

.blog {
  display: none !important;
}

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
      background: var(--darkColor);
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

  .soialItem img {
    width: 5%;
    height: 41px;
    margin: 5px;
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
</style>

<style lang="scss">
.form {
  max-width: 100%;
  margin: auto;
  direction: ltr !important;

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
    direction: ltr !important;
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
}

.el-steps {
  direction: rtl;

  .el-step__title {
    text-align: center;
  }

  .soialItem {
    display: flex;
  }

  .el-input {
    direction: ltr !important;
  }
}

.form .el-radio {
  color: #606266;
  display: block;
  font-weight: 500;
  width: 200px;
  text-align: right;
  line-height: 1;
  margin-bottom: 11px;
  cursor: pointer;
  white-space: nowrap;
  outline: 0;
}

.form .el-radio__inner {
  margin-left: 10px;
}

.form .el-radio-group {
  display: block;
}

.form .el-radio:last-child {
  margin-right: 30px;
}

.form .el-radio__label {
  font-size: 18px;
}

.form .el-radio__inner {
  width: 18px;
  height: 18px;
}

.el-icon-close {
  right: unset !important;
  left: -5px !important;
}

.createUserProfile .el-select .el-tag {
  margin: 2px 6px 2px 0px !important;
}
</style>