
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

          <div class="col-lg-6"></div>
        </div>
      </div>

      <div class="content">
        <p>
          تم ارسال طلبك وسوف يتم مراجعته وسوف يتم الرد عليك في غضون وقت قصير
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      active: 1,
      radio1: "red",
      value: "",
      value1: "",
      fileds: null,
    };
  },

  methods: {},
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
}
.content {
  padding: 50px;
  background-color: white;
  max-width: 70%;
  margin: 50px auto 0px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  p {
    font-size: 30px;
    font-weight: 700;
    color: #888;
  }
}
</style>
