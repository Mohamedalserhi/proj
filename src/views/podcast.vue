<!--<template>
  <div class="store">
    <!-- <h1>This is an store page</h1> 
  </div>
</template>
-->


<template>
  <div class="ourServices">
    <breadcrumb :blogName="blogName" :label="label" :link="link" />

    <div class="page-content">
      <div class="JoinPodcast">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-6 col-12"
              v-for="itemp in allPodcasts"
              :key="itemp.id"
              @click.prevent="update"
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
    <!-- <footerSec/> -->
  </div>
</template>



<script>
import Vue from "vue";
import breadcrumb from "@/components/breadcrumb.vue";

import appNav from "@/components/navComponent";
import appNavUser from "@/components/navComponentInner.vue";
import footerSec from "@/components/footer.vue";

export default {
  name: "podcast",
  components: { breadcrumb, appNav, appNavUser, footerSec },
  data() {
    return {
      display: "block",
      allPodcasts: undefined,
      allPodcastsNew: undefined,
      pagination: undefined,
      blogName: "البودكاست",
      label: "اضافة بودكاست",
      link: "/addPodcast",
      show: true,

      listn: false,

      audio: null,
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: 0,
      checkingCurrentPositionInTrack: "",
      trackDuration: 0,
      currentProgressBar: 0,
      isPlaylistActive: true,
      currentSong: 0,
      debug: false,
      sounds: [],

      audioFile: null,
    };
  },

  computed: {},

  async mounted() {
    await this.getPodcasts();

    for (let i in this.allPodcasts) {
      if (i.count_item > 0) continue;
      this.allPodcastsNew[i] = this.allPodcasts[i];
    }
  },

  methods: {
    update() {
      this.$router.go();
    },

    getPodcasts(page = 1) {
      Vue.axios
        .get(
          `https://dashboard.arabicreators.com/api/get_all_podcasts?page=${page}`
        )
        .then((res) => {
          const response = res.data.data;
          const podcastsData = response.data;
          this.allPodcasts = podcastsData;
          this.pagination = response.meta;
          // this.show = !this.show;
          if (podcastsData[0].sound_item) {
                      this.sounds = podcastsData[0].sound_item;

          }
        });
    },

    lis() {
      this.listn = !this.listn;
      this.stopAudio();
    },

    updatePage(page) {
      if (page.number) {
        this.getPodcasts(page.number);
      }
    },
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
};
</script>





<style lang="scss" scoped>
.ourServices {
  position: relative;
}
.JoinPodcast {
  font-family: "Tajawal", sans-serif;

  margin-bottom: 50px;
  margin-top: 100px;
  background: white;
  padding: 15px;
  position: relative;
  direction: rtl;
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
    color: inherit !important;
    text-decoration: none !important;
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
      height: 300px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      .time {
        // display:none !important;
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
        color: var(--darkColor);
        background: var(--mainColor);
        border-radius: 15px;
        padding: 0;
        padding-right: 5px;
        margin: 8px;
        display: flex;
        align-items: center;
        a {
          text-decoration: none;
          color: var(--darkColor);
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
.el-pager {
  display: flex !important;
  justify-content: center;
}
.el-pagination .el-pager li {
  height: 40px !important;
  width: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
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



<style lang="scss" scoped>
$primary_color: rgba(0, 0, 0, 0.75);
$player_width: 80rem;
$player_padding: 1.5rem;
$player_border_radius: 0.5rem;

$button_size: 2rem;

$anim_duration: 0.5s;

.audioPlayer {
  position: fixed;
  bottom: -23px;
  background-color: #eceff1;
  min-height: 14rem;
  width: 100%;
  border-radius: 0 !important;
  z-index: 5 !important;
  overflow: hidden;
  padding: 1.5rem;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 0.5rem;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  .nav-icon {
    width: 15px;
    height: 12px;

    position: absolute;
    top: ($player_padding)- ($player_padding/4);
    left: $player_padding;

    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    cursor: pointer;

    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: $primary_color;
      border-radius: 6px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
    }
    span:nth-child(1) {
      top: 0px;
    }

    span:nth-child(2) {
      top: 5px;
    }

    span:nth-child(3) {
      top: 10px;
    }

    &.isActive span:nth-child(1) {
      top: 5px;
      transform: rotate(135deg);
    }

    &.isActive span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }

    &.isActive span:nth-child(3) {
      top: 5px;
      transform: rotate(-135deg);
    }
  }
  .audioPlayerList {
    color: $primary_color;
    width: 100%;
    height: 100%;
    transition: $anim_duration;
    transform: translateX(-200%);
    position: absolute;
    margin-top: $player_padding;
    overflow: auto;
    z-index: 10;
    will-change: transform;

    &.isActive {
      transform: translateX(0);
    }
    .item {
      margin-bottom: 1.5rem;
      border-left: 0.1rem solid transparent;
      transition: 0.2s;

      &:hover {
        padding-left: 0.5rem;
        cursor: pointer;
      }
      .title {
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        margin-bottom: 0.75rem;
      }
      .artist {
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.8rem;
      }
      &.isActive {
        border-left-color: black;
        padding-left: 1rem;
      }
    }
    .debugToggle {
      cursor: pointer;
      color: red;
    }
  }
  .audioPlayerUI {
    margin-top: $player_padding;
    will-change: transform, filter;
    transition: $anim_duration;
    &.isDisabled {
      transform: scale(0.75) translateX(100%);
      filter: blur(5px) grayscale(100%);
    }
    .albumDetails {
      text-align: center;
      margin: 0;

      p {
        margin: 0px;
        &.title {
          font-size: 1rem;
          color: rgba(0, 0, 0, 1);
        }
        &.artist {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          font-weight: none;
          color: $primary_color;
          transition-delay: 100ms;
        }
      }
    }
    .albumImage {
      width: ($player_width)- ($player_padding * 2);
      height: ($player_width)- ($player_padding * 2);
      overflow: hidden;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        z-index: 10;
        object-fit: cover;
        object-position: 50% 50%;
        border-radius: $player_border_radius;
      }
    }
    .playerButtons {
      position: relative;
      margin: 0 auto;
      //margin-bottom: 1.5rem;
      text-align: center;

      .button {
        font-size: $button_size;
        display: inline-block;
        vertical-align: middle;
        padding: 0.5rem;
        margin: 0 0.25rem;
        color: rgba(0, 0, 0, 0.75);
        border-radius: 50%;

        outline: 0;
        text-decoration: none;
        cursor: pointer;
        transition: $anim_duration;

        &.play {
          font-size: 2 * $button_size;
          margin: 0 1.5rem;
        }
        &:active {
          opacity: 0.75;
          transform: scale(0.75);
        }
        &.isDisabled {
          color: rgba(0, 0, 0, 0.2);
          cursor: initial;
        }
        &.isDisabled:active {
          transform: none;
        }
      }
    }
    .currentTimeContainer {
      width: 100%;
      height: 1rem;

      display: flex;
      justify-content: space-between;

      .currentTime,
      .totalTime {
        font-size: 0.5rem;
        font-family: monospace;
        color: $primary_color;
      }
    }

    .currentProgressBar {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 0.75rem 0;
      .currentProgress {
        background-color: $primary_color;
        width: 0px;
        height: 1px;
        transition: 100ms;
      }
    }
  }
}

// .loader {
//   margin: 60px auto;
//   font-size: 10px;
//   position: relative;
//   text-indent: -9999em;
//   display: none !important;
// }

/* data change transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $anim_duration;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* pen specific formatting */
body {
  background: #29b6f6;

  color: rgba(255, 255, 255, 0.7);
  font-family: Raleway, sans-serif;

  padding: 3rem;
}
.heading {
  text-align: center;
  margin: 0;
  margin: 2rem 0;
  font-family: Inconsolata, monospace;

  h1 {
    color: #eceff1;
    margin: 0;
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
  }
  a {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.3s;
    text-decoration-style: dotted;
    &:hover {
      color: rgba(255, 255, 255, 1) !important;
    }
    &:visited {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.close {
  float: right;
  font-size: 20px;
  cursor: pointer;
}

// .loader {
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
//   position: absolute !important;
//   right: 0;
//   top: 0;
//   z-index: 50;
//   background-color: rgb(255, 255, 255) !important;
// }

// .v-spinner {
//   margin-top: 20%;
// }
</style>