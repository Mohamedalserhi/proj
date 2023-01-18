<template>
  <div class="blog">




    <breadcrumb :blogName="blogName" :label="label" :link="link" />




    <div class="page-content">
    <div v-if="show2" class="loader">

      <img
        src="../assets/logo.gif"
        width="300"
        height="200"
        style="margin-top: 17%"
        alt="404 image"
      />


    </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <div class="sideBar side-sm">
              <form action="">
                <div class="search">
                  <input
                    class="form-control"
                    type="search"
                    @keyup="getPosts"
                    v-model="search"
                    name=""
                    id=""
                    placeholder="ابحث عن مقال"
                  />
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <!-- @change="checked(catg.id)" -->
                <h3>التصنيف</h3>

                <div v-for="catg in catge" :key="catg.id" class="reatItem">
                  <input
                    type="checkbox"
                    @click="getID($event)"
                    :checked="catge.checked"
                    name=""
                    :id="catg.id"
                  />

                <label class="form-check-label" :for="catg.id">{{ catg.title }}</label>


                  <!-- <span>{{ catg.title }}</span> -->
                </div>
              </form>
            </div>

            <el-drawer :visible.sync="drawer" :direction="direction">
              <div class="sideBar">
                <form action="">
                  <div class="search">
                    <input
                      class="form-control"
                      type="search"
                      @keyup="getPosts"
                      v-model="search"
                      name=""
                      id=""
                      placeholder="ابحث عن مقال"
                    />
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <h3>التصنيف</h3>

                  <div v-for="catg in catge" :key="catg.id" class="reatItem">
                    <input
                      type="checkbox"
                      @click="getID($event)"
                      :checked="catge.checked"
                      name=""
                      :id="catg.id"
                    />

                    <span>{{ catg.title }}</span>
                  </div>
                </form>
              </div>
            </el-drawer>
          </div>
          <div class="col-lg-10">
            <div class="content">
              <div class="LearnWithUs">
                <div class="container">
                  <div class="side-btn d-lg-none">
                    <el-button @click="drawer = true">
                      <i class="fa-solid fa-sliders fs-4 text-dark"></i>
                    </el-button>
                  </div>
                  <p v-if="list.length == 0" class="fw-bold fs-3">
                    لا يوجد محتوى بعد
                  </p>
                  <div class="row">
                    <div
                      v-for="item in list"
                      :key="item.id"
                      class="col-lg-4 col-md-6 col-sm-6 col-12"
                      @click="update"
                    >
                      <router-link
                        :to="`/blog/${item.user_mention}/${item.slug}`"
                      >
                        <div class="atical-item">
                          <div class="img-box">
                            <img :src="item.image" :alt="item.image_info.alt" />
                            <!-- <img src="../assets/img-overlay (2).png" alt="" /> -->
                            <div class="overLay"></div>
                          </div>
                          <div class="item-body">
                            <p v-if="item.title">{{ item.title.substr(0, 34) + '...' }}</p>

                            <span>
                              <span> {{ item.user_info.name }} </span>
                              <i class="fa-solid fa-user ms-2"></i>
                              <span
                                ><span>تعليق</span>
                                {{ item.comment_number }} </span
                              ><i class="fa-solid fa-message ms-2"></i>
                            </span>
                          </div>
                          <div class="over-lay"></div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div v-if="paginationInfo" class="el-pagination is-background">
                  <ul class="el-pager">
                    <li
                      v-for="(page, index) in pageLinks"
                      :key="index"
                      class="number"
                      :class="{ active: page.active }"
                      @click="updatePage(page)"
                    >
                      <button
                        v-if="page.label === 'prev'"
                        class="btn-prev"
                        :disabled="!page.number"
                      >
                        <i class="el-icon el-icon-arrow-left"></i>
                      </button>
                      <button
                        v-else-if="page.label === 'next'"
                        class="btn-next"
                        :disabled="!page.number"
                      >
                        <i class="el-icon el-icon-arrow-right"></i>
                      </button>
                      <span v-else>{{ page.label }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footerSec/> -->
  </div>
</template>



<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumb.vue";

import appNav from "@/components/navComponent";
import appNavUser from "@/components/navComponentInner.vue";
import footerSec from "@/components/footer.vue";

export default {
  name: "ourServices",
  components: { appNavInner, breadcrumb, appNav, appNavUser, footerSec },

  data() {
    return {
      drawer: false,
      direction: "rtl",

      radio: undefined,
      loading: true,
      list: undefined,
      catge: undefined,
      pagination: null,
      show2: true,
      search: null,
      searchResult: undefined,
      label: "انشئ مقال",
      blogName: "المقالات",
      link: "/CreateBlog",

      arrIds: [],

      BlogIds: [],
    };
  },
  computed: {
    paginationInfo() {
      if (!this.pagination) return null;

      return this.pagination;
    },
    pageLinks() {
      const p = this.pagination;
      if (!p) return [];

      let links = JSON.parse(JSON.stringify(p.links));

      return links.map((link, i) => {
        link.number = link.url ? parseInt(link.url.split("=")[1]) : 0;

        if (i === 0) {
          link.label = "prev";
        }
        if (i === links.length - 1) {
          link.label = "next";
          if (p.current_page >= p.last_page) {
            link.number = 0;
          } else {
            link.number = p.current_page + 1;
          }
        }

        return link;
      });
    },
    currentPage() {
      if (!this.pagination) return 0;

      return this.pagination.current_page;
    },
    pageTotal() {
      const p = this.pagination;
      if (!p) return 0;

      return p.last_page;
    },
  },
  methods: {
    getPosts(page = 1) {
      let url = `https://dashboard.arabicreators.com/api/get_all_blogs?page=${page}`;
      const searchID = this.$route.params.id;

      if (this.search) {
        url = `https://dashboard.arabicreators.com/api/blog_search?category_id=${searchID}&title=${this.search}`;
      }

      Vue.axios.get(url).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;

        // this.show = !this.show;

        this.loading = false;

      });
    },
    updatePage(page) {
      if (page.number) {
        this.getPosts(page.number);
      }
    },

    update() {
      this.$router.go();
    },

    getID(event) {
      if (event.target.checked) {
        this.BlogIds.push(event.target.id);
      } else {
        const id = event.target.id;
        for (let data of this.BlogIds) {
          if (data === id) {
            const index = this.BlogIds.indexOf(data);
            this.BlogIds.splice(index, 1);
          }
        }
      }

      this.getData();
    },

    getData() {
      const pars = this.BlogIds.map((str) => {
        return parseInt(str);
      });

      const data = {
        category_id: pars,
      };

      console.log(data.category_id);

      for (let i = 0; i < data.category_id.length; i++) {
        console.log(data.category_id[i]);
      }

      let url1 = `https://dashboard.arabicreators.com/api/blog_search?category_id=${data.category_id}`;

      Vue.axios.get(url1,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;
      });
    },

    checked(BId) {
      // categAsid

      //  let url1 = `https://dashboard.arabicreators.com/api/blog_search?category_id=38&category_id=41`;

      let url1 = `https://dashboard.arabicreators.com/api/blog_search?category_id=${BId}`;

      Vue.axios.get(url1,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;
      });
    },

    vheck(event) {
      // alert(event.target.id)
      if (event.target.checked) {
        this.arrIds.push(event.target.id);
      }

      const id = event.target.id;
      for (let data of this.arrIds) {
        if (data === id) {
          const index = this.arrIds.indexOf(data);
          this.arrIds.splice(index, 1);
        }
      }
    },

    getFilterData() {
      const pars = this.arrIds.map((str) => {
        return parseInt(str);
      });

      const data = {
        selected_catge: pars,
      };
    },
  },




  mounted() {

  setTimeout(() => this.show2=! this.show2, 2500);


    this.getPosts();
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/blog_category",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((catge) => {
        this.catge = catge.data.data;
      });
  },
};
</script>


<style lang="scss" scoped>
.el-pager {
  display: flex;
  justify-content: center;
}
.el-pagination .el-pager li {
  height: 40px !important;
  width: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blog {
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  .page-content {
    .sideBar {
      margin-top: 50px;

      form {
        .search {
          position: relative;

          input {
            background-color: #eee;
            border-radius: 3px;
            border: none;
            height: 45px;
          }

          .fa-magnifying-glass {
            position: absolute;
            left: 10px;
            top: 30%;
            color: var(--darkColor);
          }
        }

        h3 {
          text-align: right;
          font-size: 18px;
          margin-top: 20px;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .reatItem {
          text-align: right;
          margin-bottom: 15px;

          input {
            margin-left: 8px;
          }

          span {
            font-size: 15px;
          }
        }
      }
    }
  }

  .content {
    .LearnWithUs {
      margin-top: 50px;

      .item {
        a {
          .img-cover {
            height: 250px;

            .video-img {
              width: 30px;
              height: 20px;
            }
          }
        }
      }

      .atical-item {
        position: relative;
        width: 100%;
        height: 330px;
        margin: 10px;
        color: black;

        .over-lay {
        }

        .img-box {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          border-radius: 10px;
          overflow: hidden;

          .overLay{
    width: 100%;
    height: 100%;
    background: linear-gradient(to top , #f3f3f3e3,transparent);
    position: absolute;
    z-index: 3;
          }

          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;

            &:first-child {
              z-index: 3;
            }

            &:last-child {
              z-index: 4;
            }
          }
        }

        .item-body {
          position: absolute;
          bottom: 0;
          z-index: 5;
          padding: 10px;

          p {
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 5px;
          }

          span {
            margin-left: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
  .loader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 50;
  }
</style>


<style lang="scss">
.el-radio__label {
  font-size: 18px !important;
  margin-right: 10px !important;
}

.el-skeleton {
  width: 100%;
  text-align: right;
  position: absolute;
  z-index: 15;
  background-color: white;
}
.el-pagination {
  direction: ltr;
  margin-top: 40px;
  margin-bottom: 60px;

  .el-pager li,
  .btn-prev,
  .btn-next {
    color: white;
    border-radius: 50% !important;
    height: 40px !important;
    min-width: 40px !important;
    border: 1px solid #4ebb1f;
    background-color: white !important;
    line-height: 40px;
    color: #4ebb1f;
    font-weight: 700 !important;
    font-size: 15px;
  }

  .el-pager li:not(.disabled) {
    &:hover {
      color: #173b07 !important;
    }
  }

  .el-pager li:not(.disabled).active {
    background: linear-gradient(239.11deg, #70d644 -31.67%, #567a46 192.97%);
    color: white;
  }
}
</style>




<style>
.el-drawer__header {
  padding: 0;
}

.el-drawer {
  padding: 15px;
}

.side-btn {
  display: block;
  margin-left: auto !important;
  margin-top: 30px !important;
  text-align: left;
}

@media (max-width: 986px) {
  .side-sm {
    display: none;
  }

  .atical-item {
    margin: 0 !important;
    margin-top: 10px !important;
  }
}

@media (max-width: 506px) {
  .side-sm {
    display: none;
  }

  .atical-item {
    margin: 0 !important;
    margin-top: 10px !important;
  }
}
</style>

