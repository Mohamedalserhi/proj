<template>
  <div class="footer">
    <div class="container">
      <div class="row">

                <div class="col-lg-3">
          <div class="footer-col">
                  <router-link class="navbar-brand" to="/"
        ><img src="../assets/siteLogo/LOGO-SITE.png" style="height:80px;margin-bottom:15px;" alt=""
      /></router-link>
            <div class="soial">
              <a href=""><i class="fa-brands fa-twitter"></i></a>
              <a href=""><i class="fa-brands fa-facebook-f"></i></a>
              <a href=""><i class="fa-brands fa-youtube"></i></a>
              <a href=""><i class="fa-brands fa-instagram"></i></a>
            </div>

            <form action="">
              <div class="input">
                <input
                  class="form-control"
                  type="search"
                  placeholder="ادخل البريد  "
                  aria-label="Search"
                  v-model="emailHome"
                />
                <button @click.prevent="homeRegister" v-on:keyup.enter="homeRegister" class="btn btn-outline-success" type="submit">
                  تسجيل
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="footer-col">
            <div class="">
              <router-link to="/">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>الرئيسية </span>
              </router-link>
            </div>


                        <div class="">
              <router-link to="/aboutUs">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>من نحن </span>
              </router-link>
            </div>

            <div class="">
              <router-link to="/HowItsWork">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>كيف يعمل الموقع</span>
              </router-link>
            </div>

            <div class="">
              <router-link to="/OurServices">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>خدماتنا</span>
              </router-link>
            </div>

            <div class="">
              <router-link to="/blog">
                <i class="fa-solid fa-chevron-left"></i>
              <span>المقالات</span>
              </router-link>
            </div>

            <div class="">
              <router-link to="/Consulting">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>الاستشارات</span>
              </router-link>
            </div>

            <div class="">
              <router-link to="/Arabipodcast">
                <i class="fa-solid fa-chevron-left"></i>
              <span>بودكاست</span>
              </router-link>
            </div>
          </div>
        </div>

                <div class="col-lg-3">
          <div class="footer-col">


            <div class="">
              <router-link to="/privacyPolicy">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>سياسة الخصوصية</span>
              </router-link>
            </div>

        
            <div class="">
              <router-link to="/UsagePolicy">
                 <i class="fa-solid fa-chevron-left"></i>
              <span>سياسة الاستخدام</span>
              </router-link>
            </div>

              <div class="">
              <router-link to="/SellingPolicy">
                <i class="fa-solid fa-chevron-left"></i>
              <span>سياسة الدفع</span>
              </router-link>
            </div>


            <div class="">
              <router-link to="/refundPolicy">
                <i class="fa-solid fa-chevron-left"></i>
              <span>سياسة الاستراد</span>
              </router-link>
            </div>


            <div class="">
              <router-link to="/rights_guarantee">
                <i class="fa-solid fa-chevron-left"></i>
              <span>ضمان الحقوق</span>
              </router-link>
            </div>


            <div class="">
              <router-link to="/commonQuestions">
                <i class="fa-solid fa-chevron-left"></i>
              <span>الاسئلة الشائعة</span>
              </router-link>
            </div>

          </div>
        </div>




        <div class="col-lg-3">
          <div class="footer-col">
            <div class="">
              <i class="fa-solid fa-location-dot"></i>
              <p>تفاصیل العنوان تفاصیل العنوان تفاصیل العنوان</p>
            </div>

            <div class="">
              <i class="fa-solid fa-phone"></i>
              <p>0096-55887799</p>
            </div>

            <div class="">
              <i class="fa-solid fa-envelope"></i>
              <p>www.contentCreator.com</p>
            </div>
          </div>
        </div>
      </div>

      <div class="copyRight">
        <p>© 2022 by ROUND TABLE PIZZA A GLOBAL FRANCHISE GROUP® LLC COMPANY</p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "footerSection",
  data() {
    return {
      emailHome:null,

    }
  },
  methods: {
      homeRegister(){

    this.$router.push(`/createAccount`)

    localStorage.setItem('email',this.emailHome)


    },
},
};


</script>




<style lang="scss" scoped>
.footer {
  font-family: 'Tajawal', sans-serif;
  margin-top: 0px;
  padding: 30px;
  padding-top: 80px;
  padding-bottom: 10px;
  background: var(--darkColor);
  color: white;
  direction: rtl;
  position: relative;
  bottom: 0;

  .footer-col {
    margin-bottom: 40px;

    div {
      margin-bottom: 10px;
      display: flex;
      span {
        font-weight: 500;
        font-size: 20px;
      }

      a{
        color: #fff;
        text-decoration: unset;
      }

      .fa-chevron-left {
        color:var(--lightColor);
        margin-left: 10px;
      }

      p {
      }

      .fa-location-dot {
        font-size: 20px;
        margin-left: 10px;
      }

      .fa-phone {
        font-size: 20px;
        margin-left: 10px;
      }

      .fa-envelope {
        font-size: 20px;
        margin-left: 10px;
      }
    }

    .soial {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      a {
        color: white;
        margin: 8px;
        .fa-twitter {
          font-size: 20px;
        }

        .fa-facebook-f {
          font-size: 20px;
        }

        .fa-youtube {
          font-size: 20px;
        }

        .fa-instagram {
          font-size: 20px;
        }
      }
    }

    form {
      display: flex;
      position: relative;
      justify-content: center;
      height: 50px;
      .input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: white;
        border-radius: 15px;
        width: 80%;
        direction: rtl;
        height: 100%;
      }

      input {
        height: 100%;
        border: none;
      }

      .form-control {
        &:focus {
          box-shadow: unset !important;
          border: none !important;
        }
      }

      button {
        // position: absolute;
        // right: 10px;
        // top: 0;
        background-color: var(--lightColor);
        color: white;
        height: 100%;
        border: none;
        padding: 6px 26px;
        border-radius: 15px !important;
      }
    }
  }

  .copyRight {
    direction: ltr;
    text-align: left;
    border-top: 1px solid var(--lightColor);
    padding-top: 8px;
    p {
      font-size: 18px;
      margin-bottom: 0;
    }
  }
}
</style>


