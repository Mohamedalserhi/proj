<template>
  <div class="breadcrumbSec">
    <nav aria-label="breadcrumb">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">الرئيسية</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{blogName}}</li>
        </ol>

        <p>
          يقدم المسوقين على الموقع مجموعة متنوعة من الخدمات الاحترافية التي
          تساعد على تطوير اعمالك ونمو مشاريعك
        </p>
      </div>
    </nav>

    <div class="container">
      <div class="InnerNav">
      <h2>  {{blogName}} </h2>
      <div class="btns">
        <!-- <a href="">فلتر<i class="fa-solid fa-filter"></i></a> -->
        <router-link v-if="showAuth" :to="link" class="addVideo" > {{label}}<i class="fa-solid fa-plus"></i></router-link>
        <a href="" class="new">الاحدث<i class="fa-solid fa-chevron-down"></i></a>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
export default {

  name: "breadcrumb",
  props:["label","blogName","link"],

  data(){
    return{
     showBtnAddBlog:false,
     showAuth:false,

    }
  },

  computed:{
    
  },

  mounted() {
  this.show()
  this.show2()
  },

  methods:{
    // reload(){
    //   this.$router.go();

    // }

        show(){
        if(localStorage.getItem('token') && localStorage.getItem('profileType')=='marketer'){
            this.showBtnAddBlog =true
           }else if(! localStorage.getItem('token') && localStorage.getItem('profileType')!='marketer'){
            this.showBtnAddBlog =false

         }
  },

                   show2(){
        if(localStorage.getItem('token')){
            this.showAuth =true
           }else if(! localStorage.getItem('token')){
            this.showAuth =false

         }


    }
  }
};
</script>






<style lang="scss" scoped>

.breadcrumbSec{
  font-family: 'Tajawal', sans-serif;
  direction: rtl;

nav {

  padding: 50px;
  background-color: #f2f2f2;

  .breadcrumb {
    .breadcrumb-item {
      font-size: 20px;
      color: black;
      font-weight: 700;
      a {
        color: black;
        text-decoration: none;
      }

      &::before {
        float: right;
      }
    }
  }

  p {
    text-align: right;
  }
}

.InnerNav{
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2{

    font-size: 34px;
    color: var(--darkColor);
    font-weight: 700;
    position: relative;
    text-align: right;

    &::before {
      content: "";
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
      width: 146px;
      height: 5px;
      position: absolute;
      bottom: -18px;
      right: 0%;
      background-size: contain;
    }
    }

    .btns{

        a{

            margin-left: 10px;
            padding: 8px;
            border:1px solid var(--darkColor);
            border-radius: 6px;
            color: var(--darkColor);
            text-decoration: unset;

            .fa-filter{
                margin-right: 5px;
            }

            .fa-plus{
                margin-right: 5px;

            }

            .fa-chevron-down{
                margin-right: 5px;

            }


        }

        .new{
            background: var(--darkColor);
            color: white;
        }

        .addVideo{
            background: #F2F2F2;
        }
    }
}

}
</style>


<style>
  @media (max-width: 986px) {

      .breadcrumbSec nav .breadcrumb .breadcrumb-item{
    font-size: 16px !important;
  }

  .breadcrumbSec nav{
    padding: 20px !important;
  }

  .breadcrumbSec nav p{
    font-size: 16px !important;
  }

  .breadcrumbSec .InnerNav{
    align-items: center;
  }

  .breadcrumbSec .InnerNav h2{
    font-size: 28px !important;
  }

  .breadcrumbSec .InnerNav h2::before{
    width: 90px !important;
    bottom: -9px !important;
  }

  .breadcrumbSec .InnerNav .btns a{
    font-size: 14px !important;
  }
}

@media (max-width: 506px) {
  .breadcrumbSec nav .breadcrumb .breadcrumb-item{
    font-size: 16px !important;
  }

  .breadcrumbSec nav{
    padding: 20px !important;
  }

  .breadcrumbSec nav p{
    font-size: 16px !important;
  }

  .breadcrumbSec .InnerNav{
    align-items: center;
  }

  .breadcrumbSec .InnerNav h2{
    font-size: 26px !important;
  }

  .breadcrumbSec .InnerNav h2::before{
    width: 90px !important;
    bottom: -9px !important;
  }

  .breadcrumbSec .InnerNav .btns a{
    font-size: 12px !important;
  }
  
}
</style>