
<template>
  <div class="createUserProfile">
    <div
      class="container text-center pt-4"
      style="padding-top: 100px !important"
    >
      <h2 v-if="notifiy" class="mb-4">{{ notifiy.title }}</h2>
      <img
        v-if="notifiy.title == 'تم قبولك كصانع محتوى'"
        src="../assets/confetti.png"
        alt=""
        style="margin-top: 20px; margin: auto; margin-bottom: 40px"
      />

      <h2 class="mt-4" v-if="notifiy.title == 'تم قبولك كصانع محتوى'">
        سجّل هذه الخطوة ضمن إنجازاتك كونك أصبحت من فريق
      </h2>
      <h3 class="text-success" v-if="notifiy.title == 'تم قبولك كصانع محتوى'">
        صناعة المحتوى
      </h3>
      <div class="content mt-1" v-if="notifiy.title == 'تم قبولك كصانع محتوى'">
        <div class="addItem">
          <router-link to="/CreateService">
            <h4>اضافة خدمة</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/CreateBlog">
            <h4>اضافة مقال</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/CreatePodcast">
            <h4>اضافة بودكاست</h4>
          </router-link>
        </div>

        <!-- <div class="addItem">
          <router-link to="">
            <h4>اضافة سؤال</h4>
          </router-link>
        </div> -->

        <div class="addItem">
          <router-link to="/CreateConsultation">
            <h4>اضافة استشارة</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/CreateVideo">
            <h4>اضافة فيديو</h4>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  data() {
    return {
      active: 0,
      radio1: "red",
      value: "",
      value1: "",
      notifiy: undefined,
    };
  },

  mounted() {
    const id = this.$route.params.id;

    axios
      .get(`https://dashboard.arabicreators.com/api/show_notification/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.notifiy = res.data.data;
      });
  },

  methods: {},
};
</script>


<style lang="scss" scoped>
.createUserProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #fff;
  padding-bottom: 50px;

  .content {
    padding: 50px;
    max-width: 100%;
    margin: 0 auto 0px;
    padding-top: 50px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .addItem {
      background-color: white;
      width: 200px;
      height: 200px;
      text-align: center;
      padding: 10px;
      margin: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

      a {
        text-decoration: none;
        font-size: 18px;
        color: rgb(52, 52, 52);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
