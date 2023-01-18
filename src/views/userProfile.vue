
<template>
  <div class="marketerProfile">
    <!-- <appNav /> -->
    <div class="header">
      <div class="overlay"></div>
    </div>

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="sideBar">
              <div class="profile">
                <div class="img-profile">
                  <img v-if="profile" :src="profile.image" alt="" />
                </div>
                <h2 v-if="profile">{{ profile.name }}</h2>
                <h5>مسوق</h5>
                <p v-if="profile">
                  <i class="el-icon-location-outline"></i
                  >{{ profile.country.title }}
                </p>

                <el-divider></el-divider>
              </div>

              <div class="myReats">
                <div class="myReat">
                  <span>تقييماتي</span>
                  <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>

                <div class="reatItem">
                  <span>معدل الإستشارات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>

                <div class="reatItem">
                  <span>معدل الإستشارات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>

                <div class="reatItem">
                  <span>معدل الإستشارات</span>
                  <el-button type="info">لم يحسب بعد</el-button>
                </div>
              </div>

              <div class="whoIam">
                <h2>من أنا !</h2>
                <p v-if="profile">
                  {{ profile.pio }}
                </p>
              </div>

              <div class="soial">
                <h4 class="text-end mb-2">منصات اخرى:</h4>
                <a href=""><i class="fa-brands fa-instagram"></i></a>
                <a href=""><i class="fa-brands fa-twitter"></i></a>
                <a href=""><i class="fa-brands fa-facebook-f"></i></a>

                <a href=""><i class="fa-brands fa-pinterest"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="content">
              <div class="tabs">
                <template>
                  <el-tabs type="card" stretch="true" @tab-click="handleClick">
                    <el-tab-pane label="الخدمات">
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن مقالة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="services">
                        <div class="container">
                          <div class="row justify-content-start">
                            <div
                              class="col-lg-6"
                              v-for="item in get_Services"
                              :key="item.id"
                            >
                              <div class="OurServices-item" v-if="get_Services">
                                <div class="img-box">
                                  <img
                                    src="../assets/unsplash_zBTssriiFm0.png"
                                    alt=""
                                  />
                                </div>

                                <div class="item-body">
                                  <div
                                    class="title d-flex justify-content-between"
                                  >
                                    <h5>{{ item.service.title }}</h5>
                                    <span>كتاب</span>
                                  </div>
                                  <p>
                                    {{ item.service.description }}
                                  </p>
                                  <div
                                    class="
                                      bottom-card
                                      d-flex
                                      justify-content-between
                                    "
                                  >
                                    <span
                                      >سعر :
                                      <span>${{ item.price }}</span></span
                                    >
                                    <span>
                                      <span> 152</span>
                                      <i class="fa-solid fa-star"></i>
                                      <span> 987 </span>
                                      <i class="fa-solid fa-user-large"></i
                                    ></span>
                                  </div>

                                  <div class="btn">
                                    <router-link
                                      to="/OurServices/service"
                                      href=""
                                      >شراء الخدمة
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            v-if="paginationInfo"
                            class="el-pagination is-background"
                          >
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
                    </el-tab-pane>
                    <el-tab-pane label="الاستشارات">
                      <div class="inner-content">
                        <div class="pageBanner">
                          <div class="overlay"></div>
                        </div>

                        <div class="itemsFilters">
                          <div class="row">
                            <div class="col-lg-6">
                              <el-input
                                placeholder="ابحث عن مقالة"
                                prefix-icon="el-icon-search"
                                v-model="input2"
                              >
                              </el-input>
                            </div>

                            <div class="col-lg-6 d-flex justify-content-end">
                              <el-button
                                type="success"
                                plain
                                icon="el-icon-sort"
                                >فلتر</el-button
                              >

                              <el-dropdown>
                                <el-button type="primary">
                                  الاحدث
                                  <i
                                    class="el-icon-arrow-down el-icon--right"
                                  ></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>Action 1</el-dropdown-item>
                                  <el-dropdown-item>Action 2</el-dropdown-item>
                                  <el-dropdown-item>Action 3</el-dropdown-item>
                                  <el-dropdown-item>Action 4</el-dropdown-item>
                                  <el-dropdown-item>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>
                          </div>
                        </div>

                        <div class="Consulting">
                          <div class="container">
                            <div class="row">
                              <div
                                class="col-lg-6"
                                v-for="item in get_Consultion"
                                :key="item.id"
                              >
                                <div
                                  class="Consulting-item"
                                  v-if="get_Consultion"
                                >
                                  <div class="itemHead">
                                    <div class="img-item">
                                      <img
                                        :src="get_Consultion.user_info.image"
                                        alt=""
                                      />
                                    </div>
                                    <h3>
                                      {{ item.consultion.title }}
                                    </h3>
                                    <i class="el-icon-caret-left"></i>
                                  </div>
                                  <p>
                                    {{ item.consultion.description }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import appNav from "@/components/navComponent.vue";
import Vue from "vue";

export default {
  components: {
    appNav,
  },

  data() {
    return {
      activeName: "first",
      value: 4,
      input2: "",
      profile: undefined,
      get_Services: null,
      get_Consultion: undefined,
      pagination: null,
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

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("ccccccccc" + res);
        this.profile = res.data.data;

        // this.show=! this.show
      });

    this.getServices();
    this.getConsultion();
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    getServices(page = 1) {
      let urlSer = `https://dashboard.arabicreators.com/api/my_service_buy`;

      Vue.axios
        .get(urlSer, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resSer) => {
          // console.log(resSer);
          const response = resSer.data;
          this.get_Services = resSer.data.service;
          console.log("user" + resSer.data.service);
          this.pagination = response.meta;
        });
    },

    getConsultion(page = 1) {
      let urlSer = `https://dashboard.arabicreators.com/api/my_consultations_buy`;

      Vue.axios
        .get(urlSer, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((resCons) => {
          // console.log(resSer);
          const response = resCons.data;
          this.get_Consultion = resCons.data.consulting;
          console.log("user" + resCons.data.service);
          // this.pagination = response.meta;
        });
    },

    updatePage(page) {
      if (page.number) {
        this.getServices(page.number);
      }
    },
  },
};
</script>




<style lang="scss">
.marketerProfile {
  font-family: "Tajawal", sans-serif;

  direction: rtl;
  background-color: #f0efef;

  .header {
    width: 100%;
    height: 500px;
    // position: relative;
    // background-image: url("../assets/marketerProf.png");
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
    .overlay {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.6;
    }
  }

  .sideBar {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
    top: -200px;
    border-radius: 10px;
    .profile {
      .img-profile {
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: auto;
        height: 100px;
        margin-bottom: 15px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      h2 {
        font-size: 24px;
        font-weight: 700;
        text-transform: capitalize;
        color: #222;
        margin-bottom: 15px;
      }

      h5 {
      }

      p {
        //icon
      }
    }

    .myReats {
      margin-bottom: 20px;

      .myReat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        margin-top: 20px;

        span {
          font-weight: 700;
          color: #636363;
        }

        .el-rate {
          direction: ltr;
        }

        // rate

        .el-rate__icon {
          font-size: 25px;
        }
      }

      .reatItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        span {
          font-weight: 600;
          font-size: 18px;
        }

        .el-button {
          background-color: #b6b6b6;
          border: none;
          padding: 10px;
        }

        .num {
          color: white;
          background: var(--darkColor);
          border-radius: 4px;
          width: 95px;
        }

        //btn
      }
    }

    .whoIam {
      margin-bottom: 20px;
      text-align: right;

      h2 {
        font-weight: 700;
        margin-bottom: 25px;
        font-size: 22px;
      }

      p {
        margin-bottom: 40px;
        color: #7e7e7e;
        line-height: 2;
      }

      .el-button {
        background-color: #b6b6b6;
        border: none;
        padding: 15px 40px;
      }

      // btn
    }

    .soial {
      margin-bottom: 20px;

      a {
        border: 1px solid #b7b7b7;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin: 10px;
        padding: 10px;
        display: inline-block;
        .fa-facebook-f,
        .fa-pinterest,
        .fa-twitter,
        .fa-instagram {
          color: #3e3b3b;
          font-size: 26px;
        }
      }
    }
  }

  .content {
    margin-bottom: 30px;
    .tabs {
      .el-tabs--card > .el-tabs__header .el-tabs__nav {
        padding: 10px;
      }
      .el-tabs__header {
        background-color: white;
      }

      .el-tabs__item.is-active {
        background: var(--darkColor);
        border-radius: 10px;
        color: white !important;
      }

      .el-tabs__item {
        &:hover {
          color: unset !important;
        }
      }

      .el-tabs--card > .el-tabs__header .el-tabs__item {
        border: unset !important;
      }
    }

    .inner-content {
      padding-bottom: 50px;
    }

    .pageBanner {
      width: 100%;
      height: 230px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
      background-image: url("../assets/marketerBanner.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      .overlay {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.5;
      }
    }

    .itemsFilters {
      .el-input {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));

        .el-icon-search {
          color: var(--darkColor);
          font-weight: 700;
          font-size: 20px;
        }

        ::placeholder {
          font-size: 17px;
        }

        .el-input__inner {
          border: none;
          border-radius: 9px;
        }
      }

      .el-button--primary {
        background: var(--darkColor);
        border-radius: 10px;
        color: white;
        margin-right: 15px;
      }

      .el-button {
        font-weight: 700;
      }

      .el-dropdown {
      }
    }
  }

  .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    direction: rtl;
    margin-bottom: 20px;
    background-color: white;

    .img-box {
      width: 100%;
      height: 250px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .item-body {
      padding: 10px;

      .title {
        margin: 10px 0 10px 0;
        h5 {
          color: #302d2d;
          font-size: 18px;
          font-weight: 700;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 8px;
        }
      }

      p {
        margin-bottom: 10px;
        text-align: right;
        color: black;
        font-weight: 500;
      }

      .bottom-card {
        span {
          margin-left: 6px;
        }
      }

      .btn {
        width: 100%;
        margin-top: 10px;
        a {
          background: var(--darkColor);
          border-radius: 8px;
          padding: 8px 20px;
          color: white;
          text-decoration: unset;
          display: inline-block;
          width: 100%;
          margin: auto;
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
    border-radius: 13px;
    overflow: hidden;
    .img-box {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
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
      padding: 14px;
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

  .podcast-item {
    margin-top: 30px !important;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    margin: 6px;
    direction: rtl;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    .img-box {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .time {
        position: absolute;
        bottom: 10px;
        right: 0;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAAAiCAYAAABGIRcbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAArRSURBVHgB7VpLbl3HET11STOzmFmB3070gJBBZplmJjqSkCG1A3IJ2UDAoRwkgBAECAx4M16FR/Yr9+2uz6m+l5ZlSfTEDUG8n/5U1+fU6bpP8Cu0v3999Reo/GO9FpH+TNdr79AuVDXe5Qttz9cx7XLxF0pz6OgqYndrD4mxvX9/5WM01/Nl+PnU1jGrXDhrNydaf7FxXbhcqmwo5mwD+4Bsi8Sbvi3BE7aX/7s6np3JHUSfjSdDDe3etUPqTINFW/up6VlIy/a8K61rfH3U/rVbYdWQ8XJ86dDHx5h4qyhz9WubLGRi45tkbkQTiP2C554MqU9ilFf/v37WPOC+Sf9siELalth2j4HucKHY0U9FUwnQ6pWmIGWDYYSMZEdB6BtpEB/rThAaCx/BGD857+wrruAxU3GEuBprItaztdfXp4jw3ek/brt5ezz87uKzu+YtN91rVsFOKizo0D2q0j0AaGMBZ135w3Th2YYibhCxkBhWMDOHp5O+hKPG5gy5hvJMWUOhrYWJ3ClQI1rLHDvGQY7RiPB8rp8qUl6/PV5+d3F+qyfcibs/Zo9HKHsI6f+FeN4noY1fd2RQYejxORMO44kKB6hHjZjWlWCTplGAco+MnMWw43sw44/QG2bza6nGri3WkpRbN6D9Ya1FxuXFeTOG4nWb+XPDCKmYqWPv3evUfJd9ioE38Hg47WK7G1GREKS2BkMNhY9pKfKFSs4zGTovM/+EbSJItlGgRfJYUiiqxj40hkjPpe4poQv5iPD16r/Xt+3PfVvo81jUtmUrJeYHhXIF5Dxz/hjJ2zuqw0rmEdogZj9OQ2e+6lez4WkU5ahQWOwjjaGUE+h9timHzBHd53eC4JFtjvfBRnn59uq4iDy0mQ4IrxJLAblRzA7gSvQoAMhtdRJeKA9ZThHfRXWtqkyCD4oyC680gCpmXF+IAESwu1NYf0/q3UApehpNwigRZJ0WBgkusKbe4xcb5eW/r45y3nKGyDEBPJVJCVKKcodikYCqlFQTh0O5ATWlWzGO54Mcj/jXIUMrrFAsTQlXwMyr0GOAJqmyEpHIrQcdBob3h6NQ1KRhkYDw/kZZjYFzWRP40ZW9GCC4kgf/8aSnCE+fmFP29zyAiJ70MLun6KhsbTzr3UWRhnfPBjGzCSqE8pWENu01n1eqEU/2LgwT55RCpU3hGeXhPGzw2TDvEyk3b46Hz1Z62y49qYZHl8MT+oHV3HPyTI9P2cCS433ifPIW9qzSCAIdVhDGRR4mE4CgRG9JjUmPQV4+U/UywtoyiAbRZ5JvP9piDQ5/YnnvNMrNw/Hy/PcXt23oyqr+EPMGxhs1da0ukfGk4vC6gco2tmUUTFjNsIJNX9pceCHDQEGaiQyMHhUCgdmTa8Lfi2AieMj+5IhuUmeJbNwCWRl18tPGOL9tPV+328tUCCmWFC5C9+CNDMMNvSn57A54lnvddsiV7MDosOhDcsPM2sSV0vXmcCnsWBama5SblyFO3giJGXIRp3FdiN7DlJ/MEKkHpLHDbBN52KjB26v/XLeo0Pv2+hLMnIiCcikkvGuQGsNJhjehc0TxloK5IfNSWWQdm3L4+tt8xVsjSIKbVEuEgU/07MXq0QXUKsE2EkrjioBMahY+0iCjJX2pTvnyzdVRz+ShvTwYX87Fc0FSIKRkjEDfgWe0+aSmjB6SHJ/wH3zgzD4gPAZVAgRzLYlJx1BOXqdi0xnIqxEaE4enPO3P7GzSSxhPXe9SlT98yPQ6J8ukSoOcmDHuWscjK6w02sAO8wklOPPaN6QzH6nnDtAJZar4BjS47GQ8sJo6GAsXJYNMsPEhG1Ojlv6Hl1VH8uWlOiW6cxDTNIeKSMt8FnkvnI0NDNaVyouvrh+wMqpcSDIBKrtFRYUykRtjw02Kh+IRQ3tyDx+d+g7avchpVDNlj509lqDnqGCZsshJa82GCYtpcYrIOa5IV7OUdwSLw6gc1b6ihX4oePnnX7/5st1/2UT5tsujSK5vKpN0vvDRvqYOwXFyRgUScqd5/+hmU6rpVAfwW7RE/563lM4gkCKLsaFx308rI9o8YUM15O2j1KNvKLi/VqvJ2TO7lv7liSRW14+mDiyv6smOZSc1SdS1PXqZMWO8OgirU3VLLKyzv725vml/2im95ZQuAyd2M6hNx2eMmTZmpSmja8PIwt3rKxiBiMhz8gCUCizdgyOD4GwnQrtgzmOFyUOBODCg+jutsBcrCb0narvFhTGm0mipr8XkntrNmz8fluX7583772VBwWjfoMEFIWPAAJ/OUTeLzSak8GNsinRsXJvTfE8LeYJDyiLjUF92OuVAMpDS+YLIhsM4OCf0281ccdyNvSQh6CM0NBZ7zgzVx1tw+IFVJqTdGOdMfrhrPZ6PwPByilFh5Plkd5ZilOnQRs93841sPFjNTHmCnupVRcHzeFo9QAuWH/aICyhShhOgJrrE/4h0Otmn2kPqtExGCpgE+Oyb8Nk3zvFwhov7NtlzsFziB4qTMtSYe8lcRlE68Mni+HUitH7MRfIMxGk9JJk8udThwFTbiYhGwo13strax80whQoVY6VxvRRkKMqXMCYbUiboUbJAhMy7jeKtG0fOH9o0z2YF0hZ03gNtJp3A2d2SLG8PYiJN0hru/lQ+Z0y3vlN8mCIDyN1RzHE2vwFw1cb6ikDavdJPjRyATvfgzxLmTyp+8Eb9cYeIbhL9z2mdDEj/zHt4FLZ8s0BgOp8ZfOvgfaRyYZ6WNTUw1JmCwhFKlYAqr4PpwNCcMMXRsCh0k9hjSFqlRNpU3WCK4caPnJPVAeS5wX0mI9JWeX+jeHvxrz89b0vei5y+CDdxQcMgU3SacgdcLFkvKhsQZQ+qiRO0GRqnmUeE1sK0NvIj3IBDLfhPMJRl7zyrTARgmaKAoLV4/yyD5xEjNUrPMOvslzaPnJYmDooKmYMECMqPI1x2QxKPgFIu0TRG19syXHfzmYCibNwno6Oz2FYxrmDz3pyswmj5iplzh8I3ZSGf2wTLvXE8Z/SUuembzwcbZW0rUzvH9zdtj3f0Nc4+vM4n39zQnEd2v82QIUs+cOIQWSaNI7KfL8LwNsOeWzrbA9eCZGKPBMlDAhF1Fpbr7H4uSIhGRJ5QxtS9c8qHtE6j8cM9VhodRGMrlAm0JcrlOnxrQ28dm6ncoQlcruxaH+P5uQRjj81uWcBkOT0HaHj3yF+R4ONTQI2sXDZzoUkwDNLHZnnGZfmoRvEWZ5zxlZJ4+VSQ3KmYzjlkG/qeRy1Bl2gg7y9OARRlWU4Q/sa/d/AFk29N7Pc5WMi4jswClBpXRCHc+KdShSho8umaGecB9j2/JnVJ8JjpO/ctnl/gjqDQFVsNUOeZ14czoZQB9cBdElMt/W8gap1wmaPMd1Ar3yS7pLMpR+sTNCcDTfgvys+F4PjP9a1gXUr8ecdgVObJckdV1tqYJSE9PyLQ+owKpmRETz++1KkSvh8NnCsScoFqGET+sZ2aNwzZgScxirc44zSmFqBEUcPnDnnECLu5aqKgfkYI5kPDKdegQCBmD3ekzboWkDDqTKwYM6nGyFuRb+BxYTObMelDIExmqHyanPKu9uKrP94qltdt8QNkn4nNxolcU1xpy6A2xtxzPYKxIArMoMq5IRWdciEKiPEqZAvnMREVnL+idkhR2dc2MvG0YTK19YcZ+K3tth8BP9+7m13jK9kAAAAASUVORK5CYII=);
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
        color: white;
        background: var(--darkColor);
        border-radius: 15px;
        padding: 0;
        padding-right: 5px;
        margin: 8px;
        display: flex;
        align-items: center;
        a {
          text-decoration: none;
          color: white;
          margin-left: 5px;
        }
        img {
        }
      }
    }
  }

  .item {
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    a {
      text-decoration: none;
      color: black;

      .img-cover {
        width: 100%;
        height: 300px;
        position: relative;
        img {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
        }

        .video-img {
          top: 20px;
          right: 15px;
          width: 40px;
          height: 30px;
        }
      }

      .item-body {
        padding: 15px;
        background-color: white;
        p {
          font-weight: 600;
        }

        .auther {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #302d2d4c;
          padding-top: 10px;

          .img-box {
            width: 30px;
            height: 30px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          span {
          }
        }
      }
    }
  }

  .Consulting {
    margin-top: 40px;
    .Consulting-item {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 10px;
      text-align: right;
      border-top: 1px solid black;
      .itemHead {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .img-item {
          margin-left: 10px;
          img {
          }
        }

        h3 {
          font-size: 19px;
          font-weight: 700;
        }

        .el-icon-caret-left {
          font-size: 25px;
        }

        p {
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

// .loader{
//       background-color: white;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     right: 0;
//     top: 0;
//     z-index: 50;
// }

// .loader{
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     right: 0;
//     top: 0;
//     z-index: 50;
//     background-color: white;
// }

// .v-spinner{
//   margin-top: 20%;
// }
</style>