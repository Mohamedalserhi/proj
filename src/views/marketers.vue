<template>
  <div class="blog">
    <breadcrumb :blogName="blogName" />

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
                    placeholder="بحث"
                  />
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                 <h3 class="catg-title">التصنيف</h3>

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

                <!-- <div v-for="catg in catge" :key="catg.id" class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>{{ catg.title }}</span>
                </div> -->

                <!-- <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div>

                <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div>
                <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div>
                <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div>
                <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div>
                <div class="reatItem">
                  <input type="checkbox" name="" id="" />
                  <span>تصميم تجربة المستخدم</span>
                </div> -->
              </form>
            </div>

            <el-drawer :visible.sync="drawer" :direction="direction">
              <div class="sideBar">
                <form action="">
                  <div class="search">
                    <input
                      class="form-control"
                      type="search"
                      name=""
                      id=""
                      placeholder="بحث"
                    />
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>

                  <h3>التصنيف</h3>
                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
                  </div>

                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
                  </div>
                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
                  </div>
                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
                  </div>
                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
                  </div>
                  <div class="reatItem">
                    <input type="checkbox" name="" id="" />
                    <span>تصميم تجربة المستخدم</span>
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
                      class="col-lg-3 col-md-4 col-sm-6"
                      v-for="item in get_all_markter"
                      :key="item.id"
                    >
                      <router-link
                        :to="`/marketers/${item.mention}`"
                        style="
                          border: none;
                          color: inherit;
                          text-decoration: none;
                        "
                      >
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

      get_all_markter: undefined,
      blogName: "صناع المحتوى",
      label: "صناع المحتوى",
      show: true,
      BlogIds: [],
      catge: undefined,
      list:[],

    };
  },


  methods: {
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

      let url1 = `https://dashboard.arabicreators.com/api/marketer_search?category_id=${data.category_id}`;

      Vue.axios.get(url1).then((res) => {
        const response = res.data.data;
        this.get_all_markter = response.data;
        this.pagination = response.meta;
      });
    },
  },

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_all_markter", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        this.get_all_markter = res.data.data.data;
        this.show = !this.show;
      }),

          Vue.axios
      .get("https://dashboard.arabicreators.com/api/type_of_user")
      .then((catge) => {
        this.catge = catge.data.data;
      });
  },

      
  

  
};
</script>


<style lang="scss" scoped>
.blog {
  direction: rtl;
  font-family: "Tajawal", sans-serif;
  position: relative;
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
    }
  }
}

.breadcrumbSec .InnerNav .btns .addVideo {
  display: none;
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



