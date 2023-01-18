<template>
  <div class="ourServices">
    <breadcrumb :blogName="blogName" :label="label" :link="link" />

    <div class="page-content">
      <div v-if="show" class="loader">
      <img
        src="../assets/logo.gif"
        width="300"
        height="200"
        style="margin-top: 17%"
        alt="404 image"
      />

   
    </div>
      <div class="container">
        <div class="content">
          <div class="LearnWithUs">
            <div class="container">
              <div class="row">
                <div class="col-lg-2">
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

                      <!-- <el-checkbox   @click="getID($event)"
                      :checked="catge.checked"
                      name=""
                      :id="catg.id"> {{ catg.title }} </el-checkbox> -->

                  </div>
                </div>

                <div class="col-lg-10">
                  <div class="row">
                    <div
                      class="col-lg-4 col-md-6 col-sm-6 col-12"
                      v-for="item in ourServices"
                      :key="item.id"
                    >
                      <div class="OurServices-item">
                        <router-link
                          :to="`/OurServices/${item.id}`"
                          @click="update"
                        >
                          <div class="img-box">
                            <img :src="item.thumb_image" alt="" />
                          <div class="img-user">
                          <router-link :to="`/Marketers/${item.user_info.mention}`">
                            <img
                              :src="item.user_info.image"
                              alt=""
                              loading="lazy"
                            />
                          </router-link>
                        </div>
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
                              v-html="item.description.replace(/<\/?[^>]+>/ig, '').substr(0, 38) + '...'"
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
                          <button @click.prevent="payNow(item.id)">اشتري الان</button>
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

    <el-dialog title="اشعار" :visible.sync="dialogVisible" width="30%">
      <span style="font-size: 17px">تم إضافة الخدمة الى سلة المشتريات</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="p-2 m-1" type="primary"
          ><router-link @click="dialogVisible = false" to="/Cart"
            >ادفع الان</router-link
          ></el-button
        >
        <el-button class="p-2 m-1" @click="dialogVisible = false"
          >تصفح المزيد</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>



<script>
import Vue from "vue";
import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumbSer.vue";

export default {
  name: "ourServices",
  components: { appNavInner, breadcrumb },
  data() {
    return {
      label: "انشئ خدمة",
      blogName: "الخدمات",
      link: "/CreateService",
      ourServices: undefined,
      pagination: undefined,
      list: undefined,
      catge: undefined,

      userAuth: localStorage.getItem("user"),

      show: true,
      dialogVisible: false,
      BlogIds: [],
    };
  },

  mounted() {


// alert(this.show)

    setTimeout(() => this.show= ! this.show, 1500);

    this.getServices();

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/service_category")
      .then((catge) => {
        this.catge = catge.data.data;
      });
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

      let url1 = `https://dashboard.arabicreators.com/api/service_search?category_id=${data.category_id}`;

      Vue.axios.get(url1).then((res) => {
        const response = res.data.data;
        this.ourServices = response.data;
        // this.list = response.data;
        this.pagination = response.meta;
      });
    },


    getServices(page = 1) {
      Vue.axios
        .get(
          `https://dashboard.arabicreators.com/api/get_all_service?page=${page}`
        )
        .then((res) => {
          const response = res.data.data;
          this.ourServices = response.data;
          this.ourServices = JSON.parse(this.ourServices);
          this.pagination = response.meta;
          console.log(response);
          this.show = !this.show;
        });
    },


    updatePage(page) {
      if (page.number) {
        this.getServices(page.number);
      }
    },

    // update() {
    //   this.$router.go();
    // },

    payNow(serviceId){
      if (this.userAuth){
        this.addToCart(serviceId)
            this.$message({
              message: "الذهاب للشراء الان",
              type: "success",
            });
        this.$router.push("/Cart");
      } else if (!this.userAuth) {
        this.$message.error("تحتاج الى تسجيل الدخول");

        setTimeout(() => this.$router.push("/signIn"), 1500);
      }
    },



    addToCart(serviceId) {
      const data = new FormData();

      data.append("service_id", serviceId);

      Vue.axios
        .post(`https://dashboard.arabicreators.com/api/add_to_cart`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.message == "added") {
            // this.$message({
            //   message: "اضفيت الى السلة",
            //   type: "success",
            // });

            this.dialogVisible = true;

            this.$store.dispatch("count", res.data.data.count);
            // alert(this.$store.state.count)
            localStorage.setItem("itemCount", res.data.data.count);
          } else if (res.data.message == "you need to login") {
            this.$message.error("تحتاج الى تسجيل الدخول");

            setTimeout(() => this.$router.push("/signIn"), 2000);
          }
        });
    },

    update(e) {
      e.stopPropagation();

      this.$router.go();
    },
  },
};
</script>


<style lang="scss" scoped>
.ourServices {
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
            color: #70d644;
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
    }
  }

  .OurServices-item {
    border: 1px solid #c0c0c0;
    border-radius: 15px;
    direction: rtl;
    margin-bottom: 15px;
    height: 383px;

    .img-box {
      width: 100%;
      height: 180px;
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
        border: 2px solid white;

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
      padding: 3px;
      padding-top: 10px;
      height: 127px;

      .title {
        margin: 10px 0 0px 0;
        h5 {
          color: #302d2d;
          font-size: 15px;
          font-weight: 500;
          text-align: right;
          padding-left: 3px;
        }

        span {
          color: white;
          background-color: #677a5f;
          border-radius: 6px;
          padding: 5px 5px;
          height: 28px;
          font-size: 12px;
        }
      }

      p {
        margin-bottom: 10px;
        text-align: right;
        color: #838383 !important;
        font-weight: 500;
        font-size: 13px;
        p {
          color: #838383 !important;
        }
      }

      .bottom-card {
        span {
          margin-left: 6px;
          font-size: 14px;

          .price {
            font-weight: 600;
          }
        }
      }
    }

    .btn {
      width: 100%;
      margin-top: 0px;
      display: flex;
      align-items: center;
      button {
        background: var(--darkColor);
        border-radius: 8px;
        padding: 8px 14px;
        color: white;
        text-decoration: unset;
        display: inline-block;
        width: 50%;
        margin: 1%;
        /* margin: auto; */
        border: none;
        font-size: 13px;
        border-radius: 5px;
      }
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
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

  // .loader {
  //   display: flex;
  //   justify-content: center;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   z-index: 50;
  // }

  // .v-spinner {
  //   margin-top: 20%;
  // }
}

.comments {
  margin-bottom: 20px;
}

.catg-title {
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
</style>


<style>
.el-dialog__footer {
  text-align: center !important;
}

.el-dialog__header {
  text-align: right;
}

.el-dialog__headerbtn {
  right: unset !important;
  left: 8px !important;
}
</style>

