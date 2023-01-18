
<template>
  <div class="podcast">
    <div class="header">
      <div class="container">
        <div class="innerHeader">
          <h2>انضم الى عربي بودكاست</h2>
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم توليد
            هذا النص من مولد النص العربي
          </p>
          <div class="soial">
            <i class="fa-brands fa-apple"></i>
            <i class="fa-solid fa-podcast"></i>
            <i class="fa-brands fa-soundcloud"></i>
          </div>

          <div class="imgs">
            <div class="row">
              <div class="col-lg-3 col-md-3 col-sm-12 col-12">
                <div class="img-box">
                  <img src="../assets/pod.webp" alt="" />
                </div>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="img-box">
                  <img src="../assets/pod2.webp" alt="" />
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-12 col-12">
                <div class="img-box">
                  <img src="../assets/pod1.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="JoinPodcast">
      <div class="row">
        <div class="col-lg-9 col-md-12 col-sm-12 order">
          <carousel
            v-if="podcastList.length > 0"
            :autoplay="false"
            :items="4"
            :dots="false"
            class="podcast-part"
            :responsive="{
              0: { items: 1, nav: false },
              600: { items: 2, nav: false },
              1000: { items: 3, nav: false },
            }"
          >
            <div
              class="podcast-item"
              style="height: 400px !important"
              v-for="item in podcastList"
              :key="item.id"
            >
              <div class="img-box">
                <img :src="item.image" alt="" />
              </div>

              <div class="item-body mt-4">
                <h3>{{ item.title }}</h3>
                <vue-plyr>
                  <audio controls playsinline>
                    <source :src="item.link" type="audio/mp3" />
                  </audio>
                </vue-plyr>
              </div>
            </div>
          </carousel>
        </div>

        <div class="col-lg-3 col-md-12 col-sm-12 col-12">
          <div class="text-part">
            <h2>انضم الى عربي بودكاست</h2>
            <p>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم توليد
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="JoinPodcast pods">
      <div class="container">
        <div class="heading d-flex justify-content-between mb-2">
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة , لقد تم توليد
            هذا النص من مولد النص العربي
          </p>
          <h2>البودكاست</h2>
        </div>
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-6 col-12"
            v-for="itemp in allPodcasts"
            :key="itemp.id"
          >
            <router-link :to="`/Podcasts/${itemp.id}`">
              <div class="podcast-item">
                <div class="img-box">
                  <img :src="itemp.image" alt="" />
                  <div class="time">
                    <i class="fa-regular fa-clock ms-1"></i>
                    <span>{{ itemp.count_item }} sounds</span>
                  </div>
                </div>

                <div class="item-body">
                  <h3>{{ itemp.title }}</h3>
                  <p v-html="itemp.description"></p>

                  <!-- <h6>{{item.sound_item[0].link}}</h6> -->
                </div>

                <p>انشئ بواسطة {{ itemp.user_info.name }}</p>
                <div class="item-bottom">
                  <div class="icons">
                    <img src="../assets/apple.png" alt="" />
                    <img src="../assets/soundCloud.png" alt="" />
                    <img src="../assets/podcast.png" alt="" />
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <router-link to="/Podcasts" class="btn-all">الكل</router-link>
      </div>
    </div>

    <div class="podcastChannels">
      <div class="container">
        <h2>قنوات البودكاست</h2>
        <carousel
          :autoplay="true"
          :items="3"
          :nav="false"
          class="podcast-part"
          v-if="allChannel"
          :responsive="{
            0: { items: 1, nav: false },
            600: { items: 2, nav: false },
            1000: { items: 3, nav: false },
          }"
        >
          <div class="podcastChannel" v-for="item in allChannel" :key="item.id">
            <img :src="item.image" alt="" />
            <h5 class="m-3">{{ item.title }}</h5>
          </div>
        </carousel>
      </div>
    </div>

    <footerSec />
  </div>
</template>



<script>
import appNavInner from "@/components/navComponentInner.vue";
import breadcrumb from "@/components/breadcrumb.vue";
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "arabiPodcast",
  components: { appNavInner, breadcrumb, carousel },

  data() {
    return {
      podcast: undefined,
      podcastList: {},
      show: true,
      keywords: [],

      allPodcasts: [],
      allPodcastsNew: undefined,

      allChannels: undefined,
    };
  },

  mounted() {
    const itemID = "28";
    let url = `https://dashboard.arabicreators.com/api/single_podcast/${itemID}`;
    axios.get(url,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
    }).then((res) => {
      
      if(res.data.data){
        const podcastData = res.data.data;
              this.podcast = podcastData;


              
      if(this.podcast.sound_item){
        this.podcastList = this.podcast.sound_item;
      }

      }



      console.log("single podcast" + podcastData);

      this.podcast.keywords.forEach((item) => {
        this.keywords.push(item);
      });
      this.show = !this.show;
    });

    axios
      .get(`https://dashboard.arabicreators.com/api/get_all_podcasts`,{  headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },})
      .then((res) => {
        const response = res.data.data;
        const podcastsData = response.data;
        // this.allPodcasts = podcastsData;

        this.allChannel = podcastsData;

        for (let i = 0; i < podcastsData.length; i++) {
          if (podcastsData[i].count_item > 0) {
            this.allPodcasts.push(podcastsData[i]);

            // for (let j = 0; j < 3; j++) {
            // }
          }
        }

        // this.show = !this.show;
        // this.sounds = podcastsData[0].sound_item;
      });
  },

  methods: {},
};
</script>


<style lang="scss">
.podcast {
  .header {
    background: var(--mainColor);
    height: 70vh;
    direction: rtl;
    font-family: "Tajawal", sans-serif;
    margin-bottom: 300px;
    .navbar {
      padding: 20px;
      direction: rtl;
      position: relative;
      z-index: 5;
      width: 100%;
      background-color: transparent !important;
      font-family: "Tajawal", sans-serif;

      .nav-link {
        color: white;
        font-weight: 700;
        font-size: 20px;
        text-transform: capitalize;
        margin-left: 20px;
        &:hover {
          color: var(--darkColor);

          text-decoration: underline;
        }

        .active {
          color: var(--darkColor);

          text-decoration: underline;
        }
      }

      .nav-item.active {
        color: var(--darkColor);

        text-decoration: underline;
      }

      .fa-magnifying-glass {
        font-size: 20px;
      }
    }

    .innerHeader {
      h2 {
        font-weight: 700;
        color: var(--darkColor);
        margin-bottom: 20px;
        padding-top: 50px;
      }

      p {
        font-weight: 700;
        color: var(--darkColor);
        margin-bottom: 20px;
      }

      .soial {
        .fa-apple {
          color: var(--darkColor);
          font-size: 40px;
          margin: 10px;
        }

        .fa-podcast {
          color: var(--darkColor);
          font-size: 40px;
          margin: 10px;
        }

        .fa-soundcloud {
          color: var(--darkColor);
          font-size: 40px;
          margin: 10px;
        }
      }

      .imgs {
        margin-top: 45px;
        .row {
          align-items: end;
        }
        .img-box {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          height: 180px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .col-lg-6 {
          .img-box {
            height: 300px;

            img {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .JoinPodcast {
    font-family: "Tajawal", sans-serif;
    margin-bottom: 50px;
    margin-top: 100px;
    background: white;
    padding: 15px;
    position: relative;
    .text-part {
      color: black;
      margin-top: 100px;
      text-align: right;
      margin-right: 50px;
    }

    .podcast-part {
      margin-left: -30px;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    .podcast-item {
      height: 420px;
      background-color: white;
      border-radius: 15px;
      overflow: hidden;
      margin: 6px;
      direction: rtl;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;

      .img-box {
        width: 100%;
        height: 250px;
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
          filter: sepia(1);

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
          background: var(--lightColor);
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
      border: 2px solid var(--darkColor);
      color: var(--darkColor);

      margin-top: 40px;
      border-radius: 8px;
      padding: 8px;
      text-decoration: unset;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .podcastChannels {
    background-color: #f0efef;
    padding-top: 100px;
    padding-bottom: 100px;
    font-family: "Tajawal", sans-serif;

    h2 {
      text-align: right;
      font-weight: 600;
      margin-bottom: 30px;
    }

    .podcastChannel {
      background: white;
      padding: 50px;
      padding-right: 80px;
      padding-left: 80px;
      margin: 10px;
      height: 360px;
      img {
        width: 100%;
        height: 210px;
      }
    }
  }
}

@media (max-width: 970px) {
  .podcast .header .innerHeader .imgs .img-box img {
    width: 100%;
  }

  .podcast .header {
    margin-bottom: 150px;
    height: 60vh;
  }

  .podcast .JoinPodcast .podcast-part {
    margin-left: 5px !important;
  }

  .JoinPodcast .text-part {
    margin-right: 5px !important;
    text-align: center !important;
    margin-bottom: 20px !important;
  }

  .order {
    order: 2 !important;
  }
}

@media (max-width: 770px) {
  .podcast .header .innerHeader .imgs .img-box img {
    width: 100%;
  }

  .podcast .header {
    margin-bottom: 150px;
    height: auto;
  }

  .podcast .header .innerHeader .imgs .img-box {
    height: 200px !important;
    margin-bottom: 10px;
  }

  // .owl-carousel .owl-item {
  //   width: 280px !important;
  // }

  .podcast .JoinPodcast .text-part {
    margin-top: 30px;
  }

  .podcast .JoinPodcast .heading h2 {
    font-size: 28px;
  }

  .podcast .JoinPodcast .heading h2::before {
    content: "";
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
    width: 119px;
    height: 5px;
    position: absolute;
    bottom: -8px !important;
    right: 0%;
    background-size: contain;
  }

  .podcast .JoinPodcast .heading p {
    max-width: 170px;
    display: none;
  }

  .podcast .pods .podcast-item {
    width: 100% !important;
    margin: auto;
    margin-bottom: 15px;
  }

  .podcast .podcastChannels .podcastChannel {
    background: white;
    padding: 25px;
    padding-right: 30px;
    padding-left: 30px;
    margin: 10px;
  }

  .podcast .JoinPodcast .podcast-part {
    margin-left: 5px !important;
  }

  .JoinPodcast .text-part {
    margin-right: 5px !important;
    text-align: center !important;
    margin-bottom: 20px !important;
  }

  .order {
    order: 2 !important;
  }
}

@media (max-width: 570px) {
  .podcast .header .innerHeader .imgs {
  }

  .podcast .header .innerHeader .imgs .img-box {
    margin-bottom: 15px;
  }

  .podcast .header .innerHeader .imgs .img-box img {
    width: 100%;
  }

  .podcast .header {
    margin-bottom: 150px;
    height: auto;
  }

  .podcast .header .innerHeader .imgs .img-box {
    height: 170px !important;
  }

  // .owl-carousel .owl-item {
  //   width: 240px !important;
  // }

  .podcast .JoinPodcast .text-part {
    margin-top: 30px;
  }

  .podcast .JoinPodcast .heading h2 {
    font-size: 28px;
  }

  .podcast .JoinPodcast .heading h2::before {
    content: "";
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAAAGCAYAAACIE681AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8SURBVHgB7dIhDgAgEAPBO77X9/Z9oEjwCJKyoyortiXNwpds996vOjg/3P4YBYQgZsQgZsQgZsQgZsRYMlAJ7AqLy0MAAAAASUVORK5CYII=);
    width: 119px;
    height: 5px;
    position: absolute;
    bottom: -8px !important;
    right: 0%;
    background-size: contain;
  }

  .podcast .JoinPodcast .heading p {
    max-width: 170px;
    display: none;
  }

  .podcast .pods .podcast-item {
    width: 320px !important;
    margin: auto;
    margin-bottom: 15px;
  }

  .podcast .podcastChannels .podcastChannel {
    background: white;
    padding: 40px;
    padding-right: 50px;
    padding-left: 50px;
    margin: 10px;
  }

  .podcast .JoinPodcast .podcast-part {
    margin-left: 5px !important;
  }

  .JoinPodcast .text-part {
    margin-right: 5px !important;
    text-align: center !important;
    margin-bottom: 20px !important;
  }

  .order {
    order: 2 !important;
  }
}
</style>




