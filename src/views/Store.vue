

<template>
  <div class="ourServices">
    <!-- <appNavInner /> -->
    <breadcrumb :blogName="blogName" :label="label" :link="link" />

    <div class="page-content">
      <div class="JoinPodcast">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="podcast-item">
                <div class="img-box">
                  <img src="../assets/girlPodcast.png" alt="" />
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <span>25 <span>دقيقة</span></span>
                  </div>
                </div>

                <div class="item-body">
                  <h3>شُعاع ينيّر دِربك للحيِاة الجامعيّة</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم
                    توليد
                  </p>
                </div>
                <div class="item-bottom">
                  <div class="icons">
                    <img src="../assets/apple.png" alt="" />
                    <img src="../assets/soundCloud.png" alt="" />
                    <img src="../assets/podcast.png" alt="" />
                  </div>

                  <div class="btn">
                    <a href="" class="">استمع</a>
                    <img src="../assets/run.png" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="podcast-item">
                <div class="img-box">
                  <img src="../assets/girlPodcast.png" alt="" />
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <span>25 <span>دقيقة</span></span>
                  </div>
                </div>

                <div class="item-body">
                  <h3>شُعاع ينيّر دِربك للحيِاة الجامعيّة</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم
                    توليد
                  </p>
                </div>
                <div class="item-bottom">
                  <div class="icons">
                    <img src="../assets/apple.png" alt="" />
                    <img src="../assets/soundCloud.png" alt="" />
                    <img src="../assets/podcast.png" alt="" />
                  </div>

                  <div class="btn">
                    <a href="" class="">استمع</a>
                    <img src="../assets/run.png" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-12">
              <div class="podcast-item">
                <div class="img-box">
                  <img src="../assets/girlPodcast.png" alt="" />
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <span>25 <span>دقيقة</span></span>
                  </div>
                </div>

                <div class="item-body">
                  <h3>شُعاع ينيّر دِربك للحيِاة الجامعيّة</h3>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم
                    توليد
                  </p>
                </div>
                <div class="item-bottom">
                  <div class="icons">
                    <img src="../assets/apple.png" alt="" />
                    <img src="../assets/soundCloud.png" alt="" />
                    <img src="../assets/podcast.png" alt="" />
                  </div>

                  <div class="btn">
                    <a href="" class="">استمع</a>
                    <img src="../assets/run.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>



<script>
import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "podcast",
  components: { appNavInner, breadcrumb },
  data() {
    return {
      label: "انشئ مقال",
      blogName: "المتجر",
      link: "/CreateBlog",
    };
  },
};
</script>


<style lang="scss" scoped>
.JoinPodcast {
  font-family: "Tajawal", sans-serif;

  margin-bottom: 50px;
  margin-top: 100px;
  background: white;
  padding: 15px;
  position: relative;
  direction: rtl;
  font-family: "Tajawal", sans-serif;

  .text-part {
    color: black;
    margin-top: 100px;
    text-align: right;
    margin-right: 50px;
  }

  .podcast-part {
    margin-left: -30px;
  }
  .podcast-item {
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
        background: #72d749;
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

  .owl-nav {
    position: absolute;
    right: -250px;
    top: 273px;

    .owl-prev {
      color: #000 !important;
      font-size: 14px;
      margin: 5px;
      padding: 4px 7px;
      display: inline-block;
      cursor: pointer;
      background: unset;
      border: 2px solid;
      border-radius: 50%;
      height: 46px;
      width: 47px;
      line-height: 30px;
      text-transform: capitalize;
    }

    .owl-next {
      color: #000 !important;
      font-size: 14px;
      margin: 5px;
      padding: 4px 7px;
      display: inline-block;
      cursor: pointer;
      background: unset;
      border: 2px solid;
      border-radius: 50%;
      height: 46px;
      width: 47px;
      line-height: 32px;
      text-transform: capitalize;
    }
  }

  .heading {
    margin-bottom: 50px;
    p {
      max-width: 400px;
      color: #000;
      text-align: right;
    }

    h2 {
      font-size: 34px;
      color: #70d644;
      font-weight: 700;
      position: relative;
      text-align: right;

      &::before {
        content: "";
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
        width: 146px;
        height: 5px;
        position: absolute;
        bottom: 0px;
        right: 0%;
        background-size: contain;
      }
    }
  }
  .btn-all {
    display: block;
    margin: auto;
    width: 160px;
    border: 2px solid #70d644;
    color: #70d644;
    margin-top: 40px;
    border-radius: 8px;
    padding: 8px;
    text-decoration: unset;
    font-size: 18px;
    font-weight: 700;
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





