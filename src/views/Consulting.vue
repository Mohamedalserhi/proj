<template>
  <div class="ourServices">
    <!-- <appNavInner /> -->
    <breadcrumb :blogName="blogName" :label="label" :link="link" />

    <div class="page-content">
      <div class="container">
        <div class="content">
          <div class="Consulting">
            <div class="container">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6 col-12"
                  v-for="item in list"
                  :key="item.id"
                >
                  <div class="Consulting-item" @click.prevent="update">
                    <router-link :to="`/Consulting/${item.id}`">
                      <div class="img-box">
                        <img :src="item.user_info.image" alt="" />
                      </div>
                      <h3>{{ item.user_info.name }}</h3>
                      <p v-html="item.description"></p>

                      <div class="info">
                        <div class="time">
                          <i class="fa-regular fa-clock ms-1"></i>
                          <!-- <span>{{item.hour || 0}} <span>ساعة</span> و {{item.minutes || 0}} <span>دقيقة</span></span> -->
                          <span>{{ item.hour || 0 }} ساعة</span>
                        </div>
                        <span
                          >USD <span>{{ item.price }}</span></span
                        >
                      </div>

                      <button @click.prevent="book(item.id)">احجز</button>
                    </router-link>
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
</template>



<script>
import Vue from "vue";
import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "ourServices",
  components: { appNavInner, breadcrumb },

  data() {
    return {
      pagination: null,
      list: null,

      label: "انشئ استشارة",
      blogName: "الاستشارات",
      link: "/CreateConsultation",
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
    getConsulting(page = 1) {
      let url = `https://dashboard.arabicreators.com/api/get_all_consultation?page=${page}`;

      Vue.axios.get(url,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      }).then((res) => {
        const response = res.data.data;
        this.list = response.data;
        this.pagination = response.meta;
        console.log(response);
      });
    },

    updatePage(page) {
      if (page.number) {
        this.getConsulting(page.number);
      }
    },

    update() {
      this.$router.go();
    },

    book(id) {
      this.$router.push(`/registration/${id}`);
    },
  },

  mounted() {
    this.getConsulting();
  },
};
</script>


<style lang="scss" scoped>
.page-content {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  margin-bottom: 60px;

  .Consulting {
    margin-top: 60px;

    .Consulting-item {
      position: relative;
      padding: 20px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 10px;
      background: #f9f9f9;
      margin-bottom: 20px;
      button {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 20px;
        color: white;
        text-decoration: unset;
        display: inline-block;
        width: 100%;
        margin: auto;
        border: none;
        margin-top: 30px;
      }
      .img-box {
        width: 38%;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin: auto;
        margin-bottom: 30px;
        img {
        }
      }

      h3 {
        font-size: 20px;
        color: rgb(129 129 129);
        font-weight: 700;
        margin-top: 13px;
        margin-bottom: 13px;
        text-decoration: none;
      }

      p {
        font-size: 18px;
        color: rgb(46, 46, 46);
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: right;
      }

      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        span {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 18px;
          color: #000;
        }

        .time {
          position: relative;
          right: -20px;
          background: url(data:image/png;base64,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);
          background-repeat: no-repeat;
          background-size: cover;
          width: 92px;
          height: 29px;
          opacity: 0.8;

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
    }
  }
}
</style>


<style lang="scss">
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



