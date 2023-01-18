
<template>
  <div class="createUserProfile">
    <div class="container text-center pt-4">
      <h2>سجّل هذه الخطوة ضمن إنجازاتك كونك أصبحت من فريق</h2>
      <h3 class="text-success">صناعة المحتوى</h3>
      <div class="content">
        <div class="addItem">
          <router-link to="/CreatePodcast">
            <img src="../assets/podcasts.png" alt="" />
            <h4>انشاء بودكاست</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/RSS">
            <img src="../assets/rss.png" alt="" />

            <h4>اضافة رابط RSS</h4>
          </router-link>
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h4 {
          margin-top: 15px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
