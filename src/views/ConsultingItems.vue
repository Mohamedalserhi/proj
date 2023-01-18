<template>
  <div class="consultingsItems">
    <!-- <appNav /> -->
    <div class="pagehead">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">استشارات</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="row">
          <div class="col-lg-6">
            <div class="headItem">
              <h3>بروفايل</h3>
              <h3>استشارات اخرى</h3>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="headItem justify-content-end">
              <a href="/shareProfile">
                <el-button type="success" icon="el-icon-document-copy">
                  رابط الصفحة
                </el-button>
              </a>
              <a href="/CreateConsultation">
                <el-button type="success" plain icon="el-icon-plus"
                  >اضافة استشارة</el-button
                >
              </a>
            </div>
          </div>
        </div>

        <el-divider></el-divider>
      </div>
    </div>

    <div class="pageContent">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            v-for="item in list"
            :key="item.id"
          >
            <div class="consult-item">
              <div class="itemHead">
                <el-checkbox v-model="checked"></el-checkbox>

                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom"></i>
                    <i class="el-icon-s-tools"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <h3>{{ item.title }}</h3>
              <p v-html="item.description"></p>
              <span>{{ item.type.title }} </span>
              <div class="cons-marketing">
                <div class="item">
                  <img src="../assets/zoom.png" alt="" />
                  <span>{{ item.place.title }}</span>
                </div>

                <p>
                  <span> {{ item.hour || " " }} </span> ساعة
                </p>
                <p>
                  و <span> {{ item.minutes }} </span> دقيقة
                </p>
              </div>

              <el-divider></el-divider>

              <div class="copyLink">
                <div class="item">
                  <i class="el-icon-document-copy"></i>

                  <a href="">نسخ الرابط </a>
                </div>

                <div class="item">
                  <el-button type="success">مشاركة</el-button>
                </div>
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
import appNav from "@/components/navComponentInner.vue";

export default {
  components: {
    appNav,
  },
  data() {
    return {
      checked: false,
      list: null,
      pagination: null,
    };
  },

  methods: {
    getConsulting(page = 1) {
      let url = `https://dashboard.arabicreators.com/api/get_all_consultation?page=${page}`;

      Vue.axios.get(url).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;
        console.log(response);
      });
    },
  },

  mounted() {
    this.getConsulting();
  },
};
</script>



<style lang="scss" scoped>
.consultingsItems {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;
  .pagehead {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    .headItem {
      display: flex;
      h3 {
        margin-left: 10px;
        font-size: 18px;
        &:first-child {
          font-weight: 700;
        }
      }

      .el-button {
        margin-left: 10px;
      }
    }
  }

  .pageContent {
    padding-bottom: 100px;
    .consult-item {
      background-color: white;
      border-radius: 10px;
      margin: 10px;
      padding: 15px;
      border-top: solid 10px;
      border-color: var(--dsrkColor);
      text-align: right;
      margin-bottom: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      .itemHead {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .el-dropdown {
          .el-icon-s-tools {
            font-size: 20px;
          }
        }
      }

      h3 {
        margin-bottom: 10px;
        font-size: 22px;
      }

      p {
        color: rgb(159, 150, 150);
        margin-bottom: 15px;
      }

      span {
        font-weight: 600;
        margin-bottom: 8px;
      }

      .cons-marketing {
        display: flex;
        justify-content: start;
        margin-top: 10px;
        .item {
          margin-left: 20%;
          img {
            margin-left: 8px;
          }

          span {
          }
        }

        p {
          font-weight: 600;
          color: black;
          margin-bottom: 0;
          span {
            font-weight: 600;
          }
        }
      }

      .copyLink {
        display: flex;
        justify-content: space-between;
        .item {
          a {
            margin-right: 5px;
            color: black;
            text-decoration: unset;
          }

          .el-icon-document-copy {
          }

          .el-button {
            padding: 6px 15px;
          }
        }
      }
    }
  }
  .unActive {
    opacity: 0.5;
  }

  .active {
    opacity: 1;
  }

  .el-breadcrumb {
    display: flex;
    justify-content: start;
    margin-bottom: 80px;
    margin-top: 20px;

    .el-breadcrumb__item {
      font-size: 24px;
    }
  }
}
</style>



<style lang="scss">
.el-button--success {
  background-color: var(--darkColor) !important;
}

.el-button--success.is-plain {
  color: white !important;
}
</style>