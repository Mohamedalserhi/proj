<template>
  <div class="signIn">
    <div class="row">
      <div class="col-lg-6">
        <div class="img-card">
          <img src="../assets/signBack.jpg" alt="" />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="signInCard">
          <img src="../assets/siteLogo/LOGO-SITE.png" alt="" />
          <h3>اشتراك</h3>

          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            :rules="rules"
            method="post"
            @submit.prevent="Register"
            
          >
            <el-form-item label="البريد الالكتروني " prop="email">
              <el-input
                v-model="form.email"
                placeholder="ادخل الايميل"
              ></el-input>
             <p class="text-start text-danger">{{checkEmail}}</p>

            </el-form-item>

            <el-form-item label="الاسم الاول" prop="name">
              <el-input
                v-model="form.first_name"
                placeholder="ادخل الاسم"
              ></el-input>
             <p class="text-start text-danger">{{checkFirstName}}</p>

            </el-form-item>

            <el-form-item label="الاسم الاخير">
              <el-input
                v-model="form.last_name"
                placeholder="ادخل الاسم"
              ></el-input>
             <p class="text-start text-danger">{{checkLastName}}</p>


              <!-- <p class="text-start">{{this.$store.state.stutus}}</p> -->
            </el-form-item>

            <el-form-item style="position: relative" label="اسم المستخدم">
              <span class="at">@</span>
              <el-input
                v-model="form.mention"
                placeholder="name"
                @input="checkName"
                style="text-indent: 30px"
              ></el-input>
              <p class="text-start">{{ this.$store.state.stutus }}</p>
              <p class="text-start text-danger">{{checkCountry}}</p>

            </el-form-item>

            <el-form-item label="الدولة " prop="country_id">
              <el-select
                @change="city"
                class="ms-2 d-flex w-100"
                v-model="form.country_id"
                placeholder="الدولة"
              >
                <el-option
                  v-for="country in countires"
                  :key="country.id"
                  :label="country.title"
                  :value="country.id"
                ></el-option>
              </el-select>
              <p class="text-start text-danger">{{checkCountry}}</p>

            </el-form-item>



            <el-form-item label="كلمة المرور" prop="password">
              <el-input
                v-model="form.password"
                placeholder=""
                show-password
              ></el-input>
              <p class="text-start text-danger">{{CheckPssword}}</p>
            </el-form-item>


            <el-form-item label="كلمة المرور مرة اخرى">
              <el-input
                v-model="form.confirm_password"
                placeholder=""
                show-password
              ></el-input>
              <p class="text-start text-danger">{{CheckPsswordAgain}}</p>
            </el-form-item>
              <p class="text-end"><el-checkbox v-model="terms" :checked="terms">اوافق على الشروط والاحكام </el-checkbox> </p>
              <p class="text-start text-danger" style="font-size:12px;">{{Terms}}</p>

            <el-button type="primary"  v-on:keyup.enter="Register" @click.prevent="Register"
              >اشترك الان</el-button
            >


          </el-form>

          <p>
            <router-link to="/signIn" type="success">سجل دخول</router-link> اذا
            كنت تمتلك حساب
          </p>
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
      arrMsg: [],
      countires: null,
      terms:undefined,
      form: {
        first_name: "",
        last_name: "",
        mention: "",
        email: localStorage.getItem("email"),
        password: "",
        confirm_password: "",
        country_id: [],

        checkUserName: undefined,
      },
      CheckPssword:undefined,
      CheckPsswordAgain:undefined,
      checkFirstName:undefined,
      checkLastName:undefined,
      checkEmail:undefined,
      checkMention:undefined,
      checkCountry:undefined,
      Terms:undefined,


    };
  },

  mounted() {
    // this.checkName()

  //  if (localStorage.getItem("token")) {
  //     this.$router.push("/");
  //   }

    Vue.axios
      .get("https://dashboard.arabicreators.com/api/get_all_countires")
      .then((rr) => {
        console.log(rr);
        this.countires = rr.data.data;
      });
  },

  methods: {
    checkName() {
      if (this.form.first_name.length >= 3) {
        this.axios
          .post("https://dashboard.arabicreators.com/api/check_name", this.form)
          .then((res) => {
            console.log(res.data.message);
            this.checkUserName = res.data.message;
            this.$store.dispatch("stutus", res.data.message);
          });
      }


    },

    checkPassword(){

    },

          agreeTerms(){

      },

    async Register() {
      // this.$refs[e].validate((valid) => {
      //   if (valid) {
      //     console.log("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });


            if(this.terms == true){

                 const res = await this.axios
        .post("https://dashboard.arabicreators.com/api/register", this.form)
        .then((r) => {
          this.arrMsg = [];

          if (r.data.code == 400) {

            // alert(r.data.message.password)

            console.log(r.data.message)

            if(r.data.message.password){
              this.CheckPssword= r.data.message.password.toString()
            }else if(! r.data.message.password){
              this.CheckPssword =" "
            }

            if(r.data.message.confirm_password){
            this.CheckPsswordAgain= r.data.message.confirm_password.toString()

            } else if(! r.data.message.confirm_password){
                this.CheckPsswordAgain =" "
            }

            if(r.data.message.first_name){
                this.checkFirstName= r.data.message.first_name.toString()
            } else if(! r.data.message.first_name){
               this.checkFirstName=" "

            }
           
            if(r.data.message.last_name){
              this.checkLastName= r.data.message.last_name.toString()
            } 
             else if( ! r.data.message.last_name){
                this.checkLastName =" "
             }
            
            if(r.data.message.email){
              this.checkEmail= r.data.message.email.toString()
            }

            else if (! r.data.message.email){
              this.checkEmail =" "
            }

            if(r.data.message.mention){
            this.checkMention= r.data.message.mention.toString()

            } else if(! r.data.message.mention){
              this.checkMention =" "
            }
            
            if(r.data.message.country_id){
              this.checkCountry= r.data.message.country_id.toString()
            }

            else if (! r.data.message.country_id){
              this.checkCountry= " "
            }

            

              this.Terms= " "
            

            console.log(this.checkEmail)

            // if (Array.isArray(r.data.message)) {
            //   // alert(this.arrMsg.length)

            //   for (let index = 0; index < r.data.message.length; index++) {
            //     this.arrMsg.push(r.data.message[index]);
            //   }

            //   for (let i = 0; i < this.arrMsg.length; i++) {
            //     setTimeout(
            //       () => this.$message.error(this.arrMsg[i]),

            //       1000
            //     );
            //   }
            // }
          } else if (r.data.code == 200) {
            this.$message({
              message: "تم التسجيل بنجاح",
              type: "success",
            });
            localStorage.setItem("showBtn", true);
            localStorage.setItem("token", r.data.data.token);
            localStorage.setItem("userEmail", this.form.email);
            // localStorage.setItem('UserName',this.form.name)

            this.$router.push("/");
            this.$router.go();
          }
        });
      console.log(res);
      localStorage.setItem("token", res.data.data.token);
      console.log(localStorage.getItem("token"));
      this.$store.dispatch("user", res.data.token);
        }

        else{
             this.Terms= 'لم توافق على الشروط والاحكام'

        }


    },
  },
};
</script>




<style lang="scss" scoped>
.signIn {
  overflow: hidden;
  font-family: "Tajawal", sans-serif;

  .signInCard {
    max-width: 70%;
    margin: 100px auto;
    img {
      margin-left: auto;
      display: block;
      margin-bottom: 80px;
      height: 60px;
    }

    h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 60px;
    }
  }

  .img-card {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>


<style lang="scss">
.el-form {
  direction: rtl;
  .el-checkbox__label{
    margin-right: 5px !important;
  }
  .el-form-item {
    .el-input {
      .el-input__inner {
        background-color: #fafafa;
        border: none;
        height: 50px;
      }

      .el-input__suffix {
        right: unset !important;
        left: 0 !important;
      }

      .el-input__inner {
        padding-right: 10px !important;
        padding-left: 30px;
      }
    }
    .el-form-item__label {
      float: right;
      color: black;
      font-weight: 700;
      width: 150px !important;
    }
  }

  .el-button {
    width: 100%;
    color: white;
    margin-bottom: 20px;
    height: 50px;
    background: var(--darkColor);
  }
}

.forgetPassLink {
  margin-right: auto !important;
  margin-bottom: 80px !important;
  display: block !important;
  text-align: left;

  &:hover {
    border: none;
  }
}

p {
}

.el-form-item__content{
    -webkit-position: relative ;
-moz-position: relative  !important;
-ms-position: relative !important;
-o-position: relative !important ;
position: relative !important;
}

.at {
  background-color: #e6e6e6;
  width: 37px;
  z-index: 5;
  height: 50px;
  color: #5f5a5a;
  font-size: 26px;
  -webkit-position: absolute;
  -moz-position: absolute;
  -ms-position: absolute;
  -o-position: absolute;
  position: absolute;
}
</style>