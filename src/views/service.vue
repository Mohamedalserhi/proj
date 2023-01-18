<template>
  <div class="service">
    <!-- <appNavInner /> -->
    <div class="contentPage">
      <div class="container">
        <!-- <div class="back"></div> -->
        <div class="service-dec">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">الرئيسية</router-link>
              </li>

              <li class="breadcrumb-item">
                <router-link to="#">الخدمات</router-link>
              </li>

              <!-- <li class="breadcrumb-item active" aria-current="page">
                    {{ Service.title.substr(0,12) }}
                  </li> -->
            </ol>
          </nav>
          <!-- <span>كتاب</span> -->
    <el-alert v-if="alertShow"
    title="تم ايقاف نشر الخدمة"
    type="error">
  </el-alert>
          <h3 v-if="Service && Service.title">{{ Service.title }}</h3>
          <!-- <p v-if="Service && Service.title">
                {{ Service.title }}
              </p> -->
        </div>

        <div class="row">
          <div class="col-lg-8">
            <div class="content">
              <!-- <h3>الوصف</h3> -->
              <p
                v-if="Service && Service.title"
                v-html="Service.description"
              ></p>
            </div>

            <div class="serves-adds" v-if="serves_adds">
              <h3>تطويرات متوفرة لهذه الخدمة</h3>
              <div class="item mb-2" v-for="item in serves_adds" :key="item.id">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="">
                    <div class="d-flex">
                      <input
                        type="checkbox"
                        @click="addOns($event, item.price)"
                        :id="item.id"
                        class="ms-2 form-check-input"
                        name=""
                      /><label :for="item.id" class="mb-0 form-check-label">{{
                        item.title
                      }}</label>
                    </div>
                    <p v-if="item.time > 0">سوف يزيد {{ item.time }} يوم</p>
                  </div>
                  <p class="mb-0">
                    مقابل {{ item.price }}$ إضافية على سعر الخدمة
                  </p>
                </div>
              </div>

              <p v-if="serves_adds.length == 0">
                لا يوجد اي تطويرات لهذه الخدمة
              </p>
            </div>

            <div class="payer_instraction text-end mt-4">
              <h5>تعليمات للمشتري</h5>
              <p
                v-if="Service.buyer_instructions"
                v-html="Service.buyer_instructions"
              ></p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="service-pay">
              <div class="img-ser">
                <img :src="Service.thumb_image" alt="" />
              </div>

              <p class="text-dark mt-3">{{ Service.title }}</p>
              <div class="priceLabel">
                <!-- <span class="price" v-if="Service.price">
                  {{ Service.price }} <span>$</span></span
                > -->

                <span class="price"> {{ mainPrice }} <span>$</span></span>
                <span class="book">{{ Service.type }}</span>
              </div>
              <div class="features">
                <div class="feature" v-for="item in specialties" :key="item.id">
                  <i class="fa-solid fa-star"></i>
                  <span>{{ item.title }}</span>
                </div>
              </div>

              <a
                href=""
                v-if="ProductOwner != myAcc"
                @click.prevent="addToCart(Service.id)"
                class="btn"
                >اضف الى السلة</a
              >

              <a
                href=""
                v-if="ProductOwner == myAcc"
                @click.prevent="StopPosting(Service.id)"
                class="btn"
              >
               {{statusBtn}}</a
              >

              <div class="ser-btns">
                <a
                  href=""
                  class="btn m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  >صور الخدمة</a
                >
                <a v-if="Service.url" :href="Service.url" class="btn"
                  >عرض الخدمة</a
                >
              </div>
            </div>

            <div class="ServiceOwner">
              <h5>صاحب الخدمة</h5>

              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between">
                  <div class="img-user">
                   <router-link :to="`/Marketers/${Service.user_info.mention}`">
                     <img :src="Service.user_info.image"  alt="" />
                   </router-link>
                  </div>
                  <div class="info">
                    <h3>{{ Service.user_info.name }}</h3>
                    <h6>{{ Service.user_info.type }}</h6>
                  </div>
                </div>

              <el-button @click.prevent="sendMassge(Service.user_info.mention)"  class="mt-3 mb-2">تواصل   <i class="el-icon-s-promotion"></i></el-button>

              </div>
            </div>
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <!-- <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1> -->
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-lg-4" v-for="img in imgs" :key="img">
                      <div class="img-box">
                        <img :src="img" alt="" />
                      </div>
                    </div>
                  </div>
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
import appNavInner from "@/components/navComponentInner.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default {
  data() {
    return {
      myAcc: localStorage.getItem("name"),
      userId:localStorage.getItem('userId'),
      userAuth: localStorage.getItem("user"),
      ProductOwner: undefined,
      value: 5,
      body: null,
      serves_adds: undefined,

      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",

      editorConfig: {},
      Service: {},
      RealetedServices: {},
      ServiceId: null,
      allComments: {},
      imgs: [],
      specialties: [],

      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],

      value: "",

      meatDesc: undefined,
      meatTitle: undefined,
      keywords: [],

      adds_one: [],

      mainPrice: undefined,

      statusBtn:'ايقاف نشر الخدمة',

      status:1,

      ServiceStatus:undefined,

      alertShow:false,
    };
  },

  metaInfo() {
    return {
      title: this.meatTitle,
      titleTemplate: null,
      htmlAttrs: {
        lang: "ar",
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.meatDesc,
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: this.keywords,
        },
      ],

      
    };
  },

  components: {
    appNavInner,
  },
  mounted() {
    const ItemID = this.$route.params.id;
    let url = `https://dashboard.arabicreators.com/api/single_service/${ItemID}`;

    axios.get(url).then((res) => {
      const postData = res.data.data;
      this.Service = postData;
      this.ServiceId = postData.id;

      this.ServiceStatus =postData.status
         if(this.ServiceStatus == 0){
              this.alertShow=true
              this.statusBtn='الخدمة معطلة'
        }
      

      this.ProductOwner = res.data.data.user_info.name;

      this.mainPrice = parseInt(res.data.data.price);

      // alert(parseInt(res.data.data.price))

      this.serves_adds = postData.extra;

      this.meatDesc = this.Service.description;
      this.meatTitle = this.Service.title;

      this.Service.keywords.forEach((item) => {
        this.keywords.push(item);
      });

      this.keywords = JSON.parse(this.keywords);

      this.Service.images.forEach((item) => {
        this.imgs.push(item);
      });

      this.Service.specialties.forEach((item) => {
        this.specialties.push(item);
      });
    });


  },

  methods: {


        sendMassge(mention){

           if (this.userAuth) {
      this.$router.push(`/chat/${mention}`)
      } else if (!this.userAuth) {
        this.$message.error("تحتاج الى تسجيل الدخول");

        setTimeout(() => this.$router.push("/signIn"), 2000);
      }
    },

    onSubmit() {},

    StopPosting(ServiceId) {
      const data = new FormData();

      this.status = 0
      data.append("user_id", this.userId);
      data.append("status ", this.status);
      this.axios
        .post(
          `https://dashboard.arabicreators.com/api/change_status/${ServiceId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تم ايقاف نشر الخدمة بنجاح",
              type: "success",
            });

            this.ServiceStatus=res.data.data.status

            if(this.ServiceStatus == 0){
              this.alertShow=true
              this.statusBtn='الخدمة معطلة'
            }
          } else if (res.data.code == 400) {
            this.$message.error("حدث خطأ !");
          }
        });
    },

    GetPrice(prise) {
      //  alert(parseInt(prise))
      //  this.addOns();
    },

    addOns(event, price) {
      if (event.target.checked) {
        this.adds_one.push(event.target.id);
        this.mainPrice += parseInt(price);
      } else {
        const id = event.target.id;
        for (let data of this.adds_one) {
          if (data === id) {
            const index = this.adds_one.indexOf(data);
            this.adds_one.splice(index, 1);
          }
        }
        this.mainPrice -= parseInt(price);
      }
    },

    update() {
      this.$router.go();
    },

    sendComment() {
      const comment = new FormData();
      comment.append("body", this.body);
      comment.append("service_id", this.ServiceId);

      this.axios
        .post(
          "https://dashboard.arabicreators.com/api/add_service_comment",
          comment,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((resComment) => {
          if (resComment.data.code == 200) {
            this.$message({
              showClose: true,
              message: "تمت الاضافة بنجاح",
              type: "success",
            });
          } else if (resComment.data.code == 400) {
            this.$message.error("حدث خطأ !");
          }
        });
    },

    addToCart(serviceId) {
      const data = new FormData();

      data.append("service_id", serviceId);
      data.append("extra_ids", this.adds_one);
      Vue.axios
        .post(`https://dashboard.arabicreators.com/api/add_to_cart`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.message == "added") {
            this.$message({
              message: "اضفيت الى السلة",
              type: "success",
            });
            this.$store.dispatch("count", res.data.data.count);
            // alert(this.$store.state.count)
            localStorage.setItem("itemCount", res.data.data.count);

            // this.$router.go()
          } else if (res.data.message == "you need to login") {
            this.$message.error("تحتاج الى تسجيل الدخول");

            setTimeout(() => this.$router.push("/signIn"), 2000);
          }
        });
    },
  },
};
</script>



<style lang="scss" scoped>
.service {
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  .contentPage {
    color: var(--darkColor);
    position: relative;
    // height: 60vh;
    // .back {
    //   height: 40vh;
    //   background: var(--darkColor);
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   width: 100%;
    //   z-index: -1;
    // }
    .service-dec {
      text-align: right;
      padding-top: 50px;
      margin-top: 30px;
      span {
        background-color: #677a5f;
        padding: 6px;
        border-radius: 4px;
        margin-bottom: 20px;
        display: inline-block;
      }

      h3 {
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 30px;
      }

      p {
        font-weight: 600;
        font-size: 18px;
      }
    }

    .service-pay {
      position: relative;
      top: 5.7%;
      width: 400px;
      background-color: white;
      // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      border-radius: 5px;
      height: 600px;
      margin-bottom: 20px;
      overflow: hidden;
      border: 2px solid #eaeaea;
      padding: 15px;
      .img-ser {
        width: 100%;
        height: 240px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .priceLabel {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .price {
          font-weight: 700;
          font-size: 28px;
          color: #000;
        }
        span {
        }

        .book {
          background-color: #677a5f;
          padding: 6px;
          border-radius: 4px;
          display: inline-block;
          height: 32px;
          color: white;
        }
      }

      .features {
        padding: 10px;
        text-align: right;
        color: black;
        margin-top: 15px;
        margin-bottom: 15px;
        .feature {
          margin-bottom: 6px;
          .fa-user-large,
          .fa-star,
          .fa-face-smile,
          .fa-check,
          .fa-infinity {
            margin-left: 10px;
          }

          span {
          }
        }
      }

      a {
        display: block;
        background-color: var(--darkColor);
        // background: var(--darkColor);
        color: white;
        padding: 8px;
        margin: 1%;
      }

      .ser-btns {
        margin-top: 15px;

        a {
          display: inline-block;
          background: white;
          width: 98%;
          color: var(--darkColor);
          border: 1px solid var(--darkColor);
          // margin: 0.5%;
        }
      }
    }

    .ServiceOwner {
      position: relative;
      top: 5.7%;
      width: 400px;
      background-color: white;
      border-radius: 5px;
      overflow: hidden;
      border: 2px solid #eaeaea;
      padding: 15px;
      margin-bottom: 70px;

      h5{
        text-align: right;
        margin-bottom: 20px;
      }
      .img-user {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 15px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        text-align: right;
        h3 {
          font-size: 20px;
        }
      }
    }
  }

  .modal-dialog {
    max-width: 75%;
  }

  .modal {
    .modal-body {
      height: 500px;
      overflow-y: scroll;
      .img-box {
        width: 100%;
        height: 230px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .content {
    margin-top: 40px;
    text-align: right;
    h3 {
      font-weight: 700;
      font-size: 20px;
      color: black;
      margin-bottom: 20px;
    }

    p {
      color: #666;
    }
  }

  .breadcrumb {
    .breadcrumb-item {
      font-size: 17px;
      color: #0d6efd;
      font-weight: 700;
      a {
        color: #0d6efd;
        text-decoration: none;
      }

      &::before {
        float: right;
        color: var(--darkColor);
        margin-left: 5px;
      }
    }
  }
}
</style>


<style lang="scss">
.serves-adds {
  color: #000;
  text-align: right;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid #eaeaea;
  border-radius: 5px;

  h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: var(--darkColor);
  }

  .el-checkbox {
    display: flex;
    align-items: center;
  }

  .el-checkbox__label {
    padding-right: 10px !important;
    font-size: 15px !important;
    color: black;
  }

  p {
    margin-top: 6px;
    font-size: 12px;
  }

  label {
    font-weight: 500;
    font-size: 13px;
    color: var(--darkColor);
  }

  .select {
    width: 100px !important;
  }
}

.payer_instraction {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid #eaeaea;
  border-radius: 5px;
}
</style>