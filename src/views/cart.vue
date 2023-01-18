<template>
  <div class="Cart">
    <div v-if="show" class="loaderCart">
      <img src="../assets/debit-card.png" alt="" />
      <p class="mt-3 mb-3 fw-bold fs-4">جاري التحويل الى صفحة الدفع</p>
      <pulse-loader
        :loading="loading"
        :color="color"
        :size="size"
      ></pulse-loader>
    </div>
    <div class="container">
      <h2>عربة التسوق</h2>
      <!-- <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
        voluptatum repellat iste.
      </p> -->

      <div class="row">
        <div class="col-lg-4">
          <div class="summary">
            <h2>ملخص الطلب</h2>

            <div class="sum">
              <h2>
                المجموع الفرعي <span>({{ itemsLength || 0 }} منتجات)</span>
              </h2>
              <h4 v-if="itemPrice">{{ itemPrice }} $</h4>
            </div>

            <el-divider></el-divider>

            <div class="sum">
              <h2>المجموع <span>شامل الضريبة</span></h2>
              <h4 v-if="sumPrice">{{ sumPrice }} $</h4>
            </div>

            <a href="" class="d-block btn" @click.prevent="pay">ادفع</a>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="text-center m-4" v-if="carts.length == 0">
            <img
              src="../assets/empty-cart.png"
              class="m-auto"
              alt=""
              style="width: 150px"
            />
            <p class="fw-bold mt-4 text-center">
              لا يوجد اي عناصر في السلة! <a href="/OurServices">اضف الان</a>
            </p>
          </div>
          <div class="" v-if="carts.length > 0">
            <div class="cart-item" v-for="item in carts" :key="item.id">
              <div class="img-box">
                <img
                  v-if="item.service.thumb_image"
                  :src="item.service.thumb_image"
                  alt=""
                />
              </div>

              <div class="text-item">
                <h3 v-if="item.service.title">{{ item.service.title }}</h3>
                <!-- <p v-html="item.service.description.substring(0, 15) "></p> -->
                <span class="d-block">  احصل على الخدمة خلال <span>{{item.day}} ايام</span></span>
                <a
                  href=""
                  @click.prevent="deleteItem(item.id)"
                  class="d-inline-block"
                  ><i class="el-icon-delete ms-2"></i>حذف</a
                >
              </div>

              <h2 v-if="item.price" class="price">{{ item.price }}$</h2>
            </div>
          </div>
        </div>
      </div>

      <a href="/OurServices" class="btn continueShop mt-4">متابعة التسوق</a>
    </div>

    <div class="help">
      <div class="container">
        <div class="innerhelp">
          <div class="">
            <h2>متواجدين دائمًا لمساعدتك</h2>
            <p>تواصل معنا من خلال أي من قنوات الدعم التالية:</p>
          </div>

          <div class="d-flex">
            <div class="m-2">
              <h5>مركز المساعدة <i class="el-icon-warning-outline"></i></h5>
              <h3>help@gmail.com</h3>
            </div>

            <div class="m-2">
              <h5>الدعم عبر الايميل <i class="el-icon-chat-square"></i></h5>
              <h3>info@gmail.com</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";

export default {
  data() {
    return {
      carts: undefined,
      checkout: undefined,
      itemPrice: undefined,
      sumPrice: 0,
      itemsLength: undefined,
      show: false,
    };
  },

  components: {},

  mounted() {
    Vue.axios
      .get("https://dashboard.arabicreators.com/api/carts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((rr) => {
        this.carts = rr.data.data.item;
        //    alert(this.carts);
        this.itemPrice = rr.data.data.item[0].price;
        this.itemsLength = rr.data.data.item.length;

        localStorage.setItem("itemCount", rr.data.data.count);
        this.$store.dispatch("count", rr.data.data.count);

        for (let i = 0; i < rr.data.data.item.length; i++) {
          this.sumPrice += parseInt(rr.data.data.item[i].price);
        }
      });
  },

  methods: {
    deleteItem(id) {
      this.axios
        .delete(
          `https://dashboard.arabicreators.com/api/delete_from_carts/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);

          this.$router.go();

          localStorage.setItem(
            "itemCount",
            localStorage.getItem("itemCount") - 1
          );
          this.$store.dispatch("count", localStorage.getItem("itemCount"));
        });
    },

    pay() {
      this.show = !this.show;
      window.scrollTo(0, 0);

      Vue.axios
        .get("https://dashboard.arabicreators.com/api/checkout", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((r) => {
          this.checkout = r.data.data;

          // window.location=`${r.data.data.link}`
          window.open(`${r.data.data.link}`, "_blank");

          this.show = !this.show;
        });
    },

    // this.$store.dispatch('user',res.data.token)
  },
};
</script>


<style lang="scss">
.loaderCart {
  .v-spinner {
    margin-top: 0 !important;
  }
}
</style>


<style lang="scss" scoped>
.loaderCart {
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 10%;
  // top: 50%;
  // right: 50%;
  // transform: translate(0, 0);
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  z-index: 50;

  img {
    margin-bottom: 50px;
  }
}
.Cart {
  overflow: hidden;
  font-family: "Tajawal", sans-serif;
  text-align: right;

  h2 {
    padding-top: 60px;
    text-align: right;
    margin-bottom: 15px;
  }

  p {
    text-align: right;
  }

  .cart-item {
    position: relative;
    direction: rtl;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 6px;
    margin: 15px;
    margin-right: 0;
    padding: 15px;
    background: #f7f7f7;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .img-box {
      width: 150px;
      height: 120px;
      overflow: hidden;
      margin-left: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .price {
      position: absolute;
      left: 30px;
    }

    a {
      margin-top: 15px;
      color: rgb(26, 25, 25);
      text-decoration: none;
    }

    .text-item {
      text-align: right;
      margin-left: 50px;
    }
  }

  .summary {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 6px;
    padding: 15px;
    direction: rtl;
    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      span {
        font-size: 14px;
      }
    }

    .sum {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;

      h2 {
        font-size: 22px;
        font-weight: 500;
      }

      h4 {
        color: rgb(80, 80, 80);
        font-weight: 600;
        font-size: 20px;
      }
    }

    a {
      background: var(--darkColor);
      color: white;
    }
  }

  .continueShop {
    border-color: var(--darkColor);
    color: var(--darkColor);

    &:hover {
      border-color: var(--darkColor) !important;
    }
  }

  .help {
    background-color: #f7f7f7;
    padding: 20px;
    margin-top: 50px;
  }

  .innerhelp {
    display: flex;
    justify-content: space-between;
    direction: rtl;
    align-items: center;

    div {
    }
  }
}
</style>


