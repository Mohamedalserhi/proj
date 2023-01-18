
<template>
  <div class="aboutUs" style="padding-top: 20px !important">
    <div class="container text-center pt-4">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item>سياسة الاسترجاع والاستبدال</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 style="padding-top: 50px !important">سياسة الاسترجاع والاستبدال</h1>
      <div class="content">
        <div class="row justify-content-center">
          <p v-html="content" class="text-end"></p>
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

      content: undefined,
    };
  },

  mounted() {
        window.scrollTo(0, 0);

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/return_exchange_policy")
      .then((res) => {
        this.content = res.data.data.body;
      });
  },

  methods: {},
};
</script>


<style lang="scss" scoped>
.el-breadcrumb {
  display: flex;
  justify-content: start;
  margin-bottom: 15px;
  margin-top: 20px;

  .el-breadcrumb__item {
    font-size: 18px;
  }
}

.aboutUs {
  font-family: "Tajawal", sans-serif;
  direction: rtl;
  background-color: #f0efef;
  padding-bottom: 50px;

  h1 {
    font-size: 30px;
    color: var(--darkColor);
    font-weight: 700;
    position: relative;
    text-align: right;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 126px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      right: 0%;
      background-size: contain;
    }
  }

  .content {
    padding: 50px;
    max-width: 100%;
    margin: 50px auto 0px;
    padding-top: 50px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: white;

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

      p {
        font-size: 16px;
        text-transform: capitalize;
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
