<template>
  <div class="ourServices">
    <!-- <appNavInner /> -->
    <breadcrumb :blogName="pageLabel" :label="label" :link="link" />

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-2">
            <div class="sideBar side-sm">
              <form action="">
                <div class="search">
                  <input
                    class="form-control"
                    type="search"
                    name=""
                    id=""
                    placeholder="ابحث عن الفيديو"
                  />
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <h3>التصنيف</h3>

                <div v-for="catg in catge" :key="catg.id" class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>{{ catg.title }}</span>
                </div>
              </form>
            </div>

            <el-drawer
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose"
            >
              <div class="sideBar">
                <form action="">
                  <div class="search">
                    <input
                      class="form-control"
                      type="search"
                      name=""
                      id=""
                      placeholder="ابحث عن الفيديو"
                    />
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>

                  <h3>التصنيف</h3>

                  <div v-for="catg in catge" :key="catg.id" class="reatItem">
                    <input type="checkbox" name="" id="" />
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
                  <div class="side-btn d-lg-none mb-2">
                    <el-button @click="drawer = true">
                      <i class="fa-solid fa-sliders fs-4 text-dark"></i>
                    </el-button>
                  </div>
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6 col-sm-6 col-12"
                      v-for="item in list"
                      :key="item.id"
                    >
                      <div class="item">
                        <router-link :to="`/videos/${item.id}`">
                          <div class="img-cover">
                            <img :src="item.thum_image" alt="" />
                            <img src="../assets/learn-cover.png" alt="" />
                            <img
                              src="../assets/video.png"
                              class="video-img"
                              alt=""
                            />
                          </div>
                          <div class="item-body">
                            <p>{{ item.title }}</p>

                            <!-- <p>{{item.url}}</p> -->
                            <el-button
                              type="primary"
                              plain
                              round
                              class="mb-2"
                              @click.prevent="dialogVisible = true"
                            >
                              شاهد <i class="el-icon-video-play"></i>
                            </el-button>

                            <div class="auther">
                              <div class="img-box">
                                <img :src="item.user_info.image" alt="" />
                              </div>
                              <span>{{ item.user_info.name }}</span>
                            </div>
                          </div>
                        </router-link>
                      </div>
                      <el-dialog :visible.sync="dialogVisible">
                        <vue-plyr>
                          <div
                            data-plyr-provider="youtube"
                            allowfullscreen
                            allowtransparency
                            allow="autoplay"
                            :data-plyr-embed-id="item.url"
                          ></div>
                        </vue-plyr>
                      </el-dialog>
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
  </div>
</template>



<script>
import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumb.vue";
import Vue from "vue";

export default {
  name: "ourServices",
  components: { appNavInner, breadcrumb },
  data() {
    return {
      drawer: false,
      direction: "rtl",

      list: undefined,
      catge: undefined,
      show: true,
      pagination: null,
      vedio: null,
      dialogVisible: false,

      pageLabel: "الفيديوهات",
      link: "/CreateVideo",
      label: "انشئ فيديو",
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
      let url = `https://dashboard.arabicreators.com/api/get_all_videos?page=${page}`;

      Vue.axios.get(url).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;

        console.log(this.list);
      });
    },
    updatePage(page) {
      if (page.number) {
        this.getPosts(page.number);
      }
    },

    update() {},
  },

  mounted() {
    this.getPosts();
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/video_category")
      .then((catge) => {
        this.catge = catge.data.data;

        this.show = !this.show;
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
.ourServices {
  direction: rtl;
  font-family: "Cairo", sans-serif;

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
        margin-bottom: 20px;
        a {
          .img-cover {
            height: 250px;

            .video-img {
              width: 30px;
              height: 20px;
            }
          }
        }

        .img-box {
          border-radius: 50%;
          overflow: hidden;
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
    border: 1px solid var(--darkColor) !important;
    background-color: white !important;
    line-height: 40px;
    color: var(--darkColor) !important;
    font-weight: 700 !important;
    font-size: 15px;
  }

  .el-pager li:not(.disabled) {
    &:hover {
      color: #173b07 !important;
    }
  }

  .el-pager li:not(.disabled).active {
    background: var(--darkColor) !important;
    color: var(--mainColor) !important;
  }
}

.el-dialog__body {
  padding: 0 !important;
}
.el-dialog__headerbtn {
  top: 7px !important;
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

.v-spinner {
  margin-top: 20%;
}
</style>




