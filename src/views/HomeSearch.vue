<template>
  <div class="blog">
    <!-- <breadcrumb :blogName="blogName" :label="label" :link="link" /> -->

    <div class="page-content">
      <div class="container">
        <div class="row">

          <div class="col-lg-12">
            <div class="content">
              <div class="LearnWithUs">
                <div class="container">

                  <div class="side-btn d-lg-none">
                    <el-button @click="drawer = true">
                      <i class="fa-solid fa-sliders fs-4 text-dark"></i>
                    </el-button>
                  </div>

                      <h2 class="mb-4 fs-1">نتائج البحث</h2>

                      <div class="" v-if="users.length== 0 && podcasts.length== 0 && services.length== 0">
                        
                      <img src="../assets/not-found.png" class="mb-4" alt="">
                      <p class="fw-bold" >لا يوجد نتائج ؟</p>

                      </div>


                        <div class="" v-if="users">

                          <h4 class="mb-4 text-end">صناع المحتوى :</h4>

                                  <div class="row">
                    <div
                      class="col-lg-3 col-md-4 col-sm-6"
                      v-for="item in users"
                      :key="item.id"
                    >
                      <router-link
                        :to="`/marketers/${item.mention}`"
                        style="
                          border: none;
                          color: inherit;
                          text-decoration: none;">

                        <div class="markerter-item">
                          <div class="img-cover">
                    <img src="../assets/background.jpg" loading="lazy" alt="" />
                            <img :src="item.image" class="img-man" alt="" />
                          </div>

                          <div class="item-body">
                            <h5>{{ item.name }}</h5>

                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                        </div>





                    <div class="mt-4" v-if="podcasts.length > 0">

                      <h4 class="mb-4 text-end">البودكاست :</h4>

                               <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-6 col-12"
              v-for="itemp in podcasts"
              :key="itemp.id"
              @click.prevent="update"
            >
              <router-link :to="`/Podcasts/${itemp.id}`">
                <div class="podcast-item">
                  <div class="img-box">
                    <img :src="itemp.image" alt="" />
                    <div class="time">
                      <i class="fa-regular fa-clock ms-1"></i>
                      <span>{{ itemp.count_item }} sounds</span>
                    </div>
                  </div>

                  <div class="item-body">
                    <h3>{{ itemp.title }}</h3>
                    <p v-html="itemp.description"></p>

                  </div>

                  <p>انشئ بواسطة {{ itemp.user_info.name }}</p>
                  <div class="item-bottom">
                    <div class="icons">
                      <img src="../assets/apple.png" alt="" />
                      <img src="../assets/soundCloud.png" alt="" />
                      <img src="../assets/podcast.png" alt="" />
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div> 
                    </div>





                  <div class="mt-4"  v-if="services.length > 0">

                    <h4 class="mb-4 text-end">الخدمات :</h4>
                    
                    <div class="row">
                    <div
                      class="col-lg-4 col-md-6 col-sm-6 col-12"
                      v-for="item in services"
                      :key="item.id">

                      <div class="OurServices-item">
                        <router-link
                          :to="`/OurServices/${item.id}`"
                          @click="update"
                        >
                          <div class="img-box">
                            <img :src="item.thumb_image" alt="" />
                          </div>

                          <div class="item-body">
                            <div class="title d-flex justify-content-between">
                              <h5>{{ item.title }}</h5>
                              <span>{{ item.type}}</span>
                            </div>
                            <p
                              v-if="item.description.length < 38"
                              v-html="item.description"
                            ></p>
                            <p
                              v-if="item.description.length > 38"
                              v-html="item.description.substr(0, 38) + '...'"
                            ></p>

                            <div
                              class="bottom-card d-flex justify-content-between"
                            >
                              <span
                                >سعر :
                                <span class="price"
                                  >${{ item.price }}</span
                                ></span
                              >
                              <span>
                                <span> 152</span>
                                <i class="fa-solid fa-star"></i>
                                <span> 987 </span>
                                <i class="fa-solid fa-user-large"></i
                              ></span>
                            </div>
                          </div>
                        </router-link>

                        <div class="btn">
                          <button class="" @click.prevent="addToCart(item.id)">
                            اضف الى السلة
                          </button>
                          <button @click.prevent="payNow">اشتري الان</button>
                        </div>
                      </div>

                    </div>
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
      show: true,
      search: null,
      searchResult: undefined,
      label: "انشئ مقال",
      blogName: "المقالات",
      link: "/CreateBlog",
      podcasts:undefined,
      services:undefined,
      users:undefined,

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

            const SerachWords = this.$route.params.id;

// header('Cache-Control: no-cache, no-store, must-revalidate');
// header('Pragma: no-cache');
// header('Expires: 0');
      
      // let url = `https://dashboard.arabicreators.com/api/get_all_blogs?page=${page}`;
      let url2 =`  http://dashboard.arabicreators.com/api/home_search?title=${SerachWords}`
      const searchID = this.$route.params.id;

      // if (this.search) {
      //   url = `https://dashboard.arabicreators.com/api/blog_search?category_id=${searchID}&title=${this.search}`;
      // }

      Vue.axios.get(url2,{
         headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }).then((res) => {
        const response = res.data.data;
        // this.list = response.data;
        // this.pagination = response.meta;

          this.users=response.user
          this.services=response.service
          this.podcasts=response.podcast

        // setTimeout(() => (this.loading = false), 800)
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








 


  },

  mounted() {
    this.getPosts();

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
        height: 350px;
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



<style lang="scss" scoped>
  .markerter-item {
    // border: 1px solid #d5d5d5;
    // padding: 10px;
    // border-radius: 15px;
    padding-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    margin-bottom: 10px;
    .img-cover {
      position: relative;
      top: 0;
      height: 240px;
      width: 100%;
      margin-bottom: 15px;

      img {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        // filter: sepia(1);
      }

      .img-man {
        // padding: 15px;
        // right: 10%;
        width: 100%;
        filter: sepia(0);
      }
    }

    .item-body {
      h5 {
        font-weight: 700;
        margin-bottom: 10px;
      }

      .stars {
        margin-bottom: 15px;
        .fa-star {
          color: gold;
          margin-left: 6px;
        }
      }
    }
    .info {
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        color: white;
        background: linear-gradient(
          239.11deg,
          var(--darkColor) -31.67%,
          #567a46 192.97%
        );
        border-radius: 2px;
        padding: 6px 16px;
        margin: 8px;
      }
    }

    a {
      &:hover {
        color: rgb(68, 68, 68) !important;
        border: none !important;
      }
    }
  }


          .podcast-item {
      background-color: white;
      border-radius: 15px;
      overflow: hidden;
      margin: 6px;
      direction: rtl;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      a {
        text-decoration: none;
        color: inherit;
      }
      .img-box {
        width: 100%;
        height: 260px !important;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .time {
          // display: none !important;
          position: absolute;
          bottom: 10px;
          right: 0;
          background: url(data:image/png;base64,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);
          background-repeat: no-repeat;
          background-size: cover;
          width: 92px;
          height: 29px;
          opacity: 0.8;
          filter: sepia(1) !important;

          .fa-clock {
            color: white;
            font-size: 14px;
          }

          span {
            font-size: 10px;
            color: white;
          }
        }
      }

      .item-body {
        padding: 10px;
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        p {
          font-size: 15px;
        }
      }

      .item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icons {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin: 8px;
          }
        }
        .btn {
          color: black;
          background: var(--mainColor);
          border-radius: 15px;
          padding: 0;
          padding-right: 5px;
          margin: 8px;
          display: flex;
          align-items: center;
          a {
            text-decoration: none;
            color: black;
            margin-left: 5px;
          }
          img {
          }
        }
      }
    }


      .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    margin: 0px;
    direction: rtl;

    .img-box {
      width: 100%;
      height: 250px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      .img-user {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        bottom: 10px;
        right: 10px;

        a {
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .item-body {
      padding: 10px;

      .title {
        margin: 10px 0 10px 0;
        h5 {
          color: #302d2d;
          font-size: 15px;
          font-weight: 500;
          text-align: right;
          padding-left: 3px;
          margin-bottom: 5px;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 8px;
          height: 30px;
          font-size: 14px;
        }
      }

      p {
        margin-bottom: 5px;
        text-align: right;
        font-weight: 500;
      }

      .bottom-card {
        span {
          margin-left: 6px;
        }
      }
    }

    .btn {
      width: 100%;
      margin-top: 0px;
      border: none !important;
      button {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 20px;
        color: white !important;
        text-decoration: unset;
        display: inline-block;
        width: 48%;
        margin: 1%;
        border: none;
      }
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

