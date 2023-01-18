
<template>
  <div class="createUserProfile">
    <div
      class="container text-center pt-4"
      style="padding-top: 100px !important"
    >
      <h2 class="mb-4">تم الارسال بنجاح، سيتم مراجعة طلبك خلال ٢٤ ساعة</h2>
    
      <img
        class="mb-4 mt-3"
        style="width: 200px"
        src="../assets/siteLogo/Black.png"
        alt=""
      />
      <!-- <h3 class="text-success">صناعة المحتوى</h3> -->
      <p class="mt-2">المتابعة في تصفح الموقع</p>
      <div class="content">
        <div class="addItem">
          <router-link to="/">
            <img src="../assets/home.png" class="d-block mb-3" alt="" />
            <h4>الصفحة الرئيسية</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/OurServices">
            <img
              src="../assets/brand-identity.png"
              class="d-block mb-3"
              alt=""
            />
            <h4>المنتجات</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/OurServices">
            <img src="../assets/product.png" class="d-block mb-3" alt="" />
            <h4>الخدمات</h4>
          </router-link>
        </div>

        <div class="addItem">
          <router-link to="/marketerProfile">
            <img src="../assets/user.png" class="d-block mb-3" alt="" />
            <h4>البروفايل</h4>
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

  mounted() {
    window.scrollTo(0, 0);

    if (!localStorage.getItem("token")) {
      this.$router.push("/signIn");
    }
  },

  methods: {},
};
</script>


<style lang="scss" scoped>
.createUserProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 100px;

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
        flex-direction: column;
      }
    }
  }
}
</style>
