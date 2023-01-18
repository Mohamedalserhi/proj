
<template>
  <div class="createUserProfile">
    <div
      class="container text-center pt-4"
      style="padding-top: 100px !important"
    >
      <h2>سجّل هذه الخطوة ضمن إنجازاتك كونك أصبحت من فريق</h2>
      <h3 class="text-success">صناعة المحتوى</h3>
      <div class="content">
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="addItem">
              <router-link to="/CreateService">
                <h4>اضافة خدمة</h4>
                <img src="../assets/add/box.png" alt="" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="addItem">
              <router-link to="/CreateBlog">
                <h4>اضافة مقال</h4>
                <img src="../assets/add/blogging.png" alt="" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="addItem">
              <router-link to="/CreatePodcast">
                <h4>اضافة بودكاست</h4>
                <img src="../assets/add/podcast.png" alt="" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="addItem">
              <router-link to="/CreateConsultation">
                <h4>اضافة استشارة</h4>
                <img src="../assets/add/discussion.png" alt="" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="addItem">
              <router-link to="/CreateVideo">
                <h4>اضافة فيديو</h4>
                <img src="../assets/add/video-marketing.png" alt="" />
              </router-link>
            </div>
          </div>
        </div>

        <!-- <div class="addItem">
          <router-link to="">
            <h4>اضافة سؤال</h4>
          </router-link>
        </div> -->
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
    };
  },

  mounted() {},

  methods: {},
};
</script>


<style lang="scss" scoped>
.createUserProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
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
      width: 100%;
      height: 160px;
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
        flex-direction: column;
      }

      img {
        width: 60px;
        height: 60px;
      }

      h4 {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
