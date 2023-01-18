<template>
  <div class="podcast">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">الرئيسية </el-breadcrumb-item>
        <el-breadcrumb-item
          ><router-link to="/Podcasts"
            >كل البودكاست
          </router-link></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><router-link to="" v-if="podcast">{{
            podcast.title
          }}</router-link></el-breadcrumb-item
        >
      </el-breadcrumb>

      <h3 v-if="podcast" class="mt-4">{{ podcast.title }}</h3>
      <p v-if="podcast" v-html="podcast.description"></p>
      <div class="row">
        <div class="col-lg-4" v-for="item in podcastList" :key="item.id">
          <div class="podcast-item">
            <div class="img-box">
              <img :src="item.image" alt="" />
            </div>
            <h3>{{ item.title }}</h3>

            <vue-plyr>
              <audio controls playsinline>
                <source :src="item.link" type="audio/mp3" />
                <!-- <source src="https://feeds.soundcloud.com/stream/1375903192-ghandourpodcast-100a.mp3" type="audio/ogg" /> -->
              </audio>
            </vue-plyr>
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
import axios from "axios";

import appNav from "@/components/navComponent";
import appNavUser from "@/components/navComponentInner.vue";
import footerSec from "@/components/footer.vue";

export default {
  data() {
    return {
      podcast: undefined,
      podcastList: {},
      show: true,

      meatDesc: undefined,
      meatTitle: undefined,
      keywords: [],
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
    appNav,
    appNavUser,
    footerSec,
  },

  mounted() {
    const itemID = this.$route.params.id;
    let url = `https://dashboard.arabicreators.com/api/single_podcast/${itemID}`;
    axios.get(url).then((res) => {


      if(res.data.data){
              const podcastData = res.data.data;
                this.podcast = podcastData;

                      if(this.podcast.sound_item){
        this.podcastList = this.podcast.sound_item;
      }
      }

      


      console.log("single podcast" + podcastData);

      this.meatDesc = this.podcast.description;
      this.meatTitle = this.podcast.title;

      this.podcast.keywords.forEach((item) => {
        this.keywords.push(item);
      });
      this.show = !this.show;
    });
  },

  methods: {
    onSubmit() {},

    update() {
      this.$router.go();
    },
  },
};
</script>


<style lang="scss" scoped>
.podcast {
  direction: rtl !important;
}

.podcast-item {
  margin: 10px;
  margin-top: 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  overflow: hidden;

  .img-box {
    widows: 100%;
    height: 250px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
    color: var(--darkColor);
  }
}

.el-breadcrumb {
  display: flex;
  justify-content: start;
  margin-bottom: 15px;
  margin-top: 20px;

  .el-breadcrumb__item {
    font-size: 18px;
  }
}
</style>