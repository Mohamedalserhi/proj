<template>
  <div class="createConsultaion">
    <!-- <navbar /> -->

    <div class="content">
      <div class="container">
        <span class="arabi-mark">Arabi marketer</span>

        <div class="user-img">
          <img v-if="profile.image" :src="profile.image" alt="" />
        </div>
        <h3 v-if="profile.name">{{ profile.name }}</h3>
        <p v-if="profile.pio" v-html="profile.pio"></p>

        <div class="soial">
          <a v-if="profile.social.instagram" :href="profile.social.instagram"
            ><i class="fa-brands fa-instagram"></i
          ></a>
          <a v-if="profile.social.twitter" :href="profile.social.twitter"
            ><i class="fa-brands fa-twitter"></i
          ></a>
          <a v-if="profile.social.facebook" :href="profile.social.facebook"
            ><i class="fa-brands fa-facebook-f"></i
          ></a>
          <a v-if="profile.social.pinterest" :href="profile.social.pinterest"
            ><i class="fa-brands fa-pinterest"></i
          ></a>
        </div>

        <div class="">
          <div class="row">
            <div class="col-lg-6" v-for="item in listPage" :key="item.id">
              <div class="Consulting-item">
                <div class="itemHead">
                  <div class="img-item">
                    <img :src="item.user_info.image" alt="" />
                  </div>
                  <h3>{{ item.title }}</h3>
                  <i class="el-icon-caret-left"></i>
                </div>
                <p v-html="item.description"></p>
              </div>
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
      profile: null,
      list: null,
      listPage: [],
      user: null,

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

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        this.profile = res.data.data;
        this.user = res.data.data.name;
        localStorage.setItem("user", res.data.data.name);
      });

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_all_consultation")
      .then((res) => {
        const response = res.data.data;
        this.list = response.data;
        console.log(response);

        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].user_info.name == localStorage.getItem("user")) {
            // this.user=this.list[i].user_info.name

            this.listPage.push(this.list[i]);
          }
        }
      });
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

    .arabi-mark {
      width: 240px;
      font-size: 20px;
      font-weight: 700;
      color: white;
      background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 192.97%);
      position: absolute;
      left: -48px;
      top: 37px;
      padding: 10px 20px;
      transform: rotate(-43deg);
      text-align: center;
    }
  }

  .Consulting-item {
    background-color: #f0efef;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    text-align: right;
    border-top: 1px solid black;
    .itemHead {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .img-item {
        margin-left: 10px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }

      h3 {
        font-size: 19px;
        font-weight: 700;
      }

      .el-icon-caret-left {
        font-size: 25px;
      }

      p {
      }
    }
  }

  .soial {
    margin-bottom: 20px;

    a {
      border: 1px solid #b7b7b7;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin: 10px;
      padding: 10px;
      display: inline-block;
      .fa-facebook-f,
      .fa-pinterest,
      .fa-twitter,
      .fa-instagram {
        color: #3e3b3b;
        font-size: 26px;
      }
    }
  }
}

.user-img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>