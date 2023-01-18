<template>
  <div class="blog">
    <breadcrumb :blogName="blogName" :label="label" :link="link" />

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
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
                    @change="checked(catg.id)"
                    name=""
                    :id="catg.id"
                  />
                  <span>{{ catg.title }}</span>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-10">
            <div class="content">
              <div class="LearnWithUs">
                <div class="container">
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
                            <img src="../assets/img-overlay.png" alt="" />
                          </div>
                          <div class="item-body">
                            <p>{{ item.title }}</p>
                            <span>
                              <span> {{ item.user_info.name }} </span>
                              <i class="fa-solid fa-user ms-2"></i>
                              <span
                                ><span>تعليق</span>
                                {{ item.comment_number }} </span
                              ><i class="fa-solid fa-message ms-2"></i>
                            </span>
                          </div>
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
      list: undefined,
      catge: undefined,
      pagination: null,
      show: true,
      search: null,
      searchResult: undefined,
      label: "انشئ مقال",
      blogName: "المقالات",
      link: "/CreateBlog",
      CreatorsMentionData: undefined,
      CreatorsMention: [],
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
      const mention = this.$route.params.mention;

      let url = `https://dashboard.arabicreators.com/api/all_blog_user/${mention}?page=${page}`;
      const searchID = this.$route.params.id;

      if (this.search) {
        url = `https://dashboard.arabicreators.com/api/blog_search?category_id=${searchID}&title=${this.search}`;
      }

      Vue.axios.get(url).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;

        this.show = !this.show;
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

    checked(BId) {
      // categAsid

      let url1 = `https://dashboard.arabicreators.com/api/blog_search?category_id=${BId}`;

      Vue.axios.get(url1).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;
      });
    },
  },

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/blog_category")
      .then((catge) => {
        this.catge = catge.data.data;
      });

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

