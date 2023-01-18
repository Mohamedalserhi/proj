import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
// import AboutView from "../views/AboutView.vue";
import blog from "../views/Blog.vue";
import OurServices from "../views/OurServices.vue";
import store from "../views/Store.vue";
import podcast from "../views/ArabiPodcast.vue";
import allPodcast from "../views/podcast.vue"
import marketers from "../views/marketers.vue"
import service from "../views/service.vue"
import serviceItem from "../views/serviceItem.vue"
import videos from "../views/videos.vue"
import VideoItem from "../views/VideoItem.vue"
import blogItem from "../views/blogItem.vue"
import Consulting from "../views/Consulting.vue"
import marketerProfile from "../views/marketerProfile.vue"
import marketersProfile from "../views/marketersProfile.vue"

import userProfile from "../views/userProfile.vue"
import ConsultingItems from "../views/ConsultingItems.vue"
import CreateConsultation from "../views/CreateConsultation.vue"
import CreateConsultationTwo from "../views/CreateConsultationTwo.vue"

import EditConsultation from "../views/EditConsultation.vue"
import EditConsultationTwo from "../views/EditConsultationTwo .vue"

import CreatePodcast from "../views/CreatePodcast.vue"
import CreateVideo from "../views/CreateVideo.vue"
import CreateService from "../views/CreateService.vue"
import CreateBlog from "../views/CreateBlog.vue"
import ReplyQuestion from "../views/ReplyQuestion.vue"
import registration from "../views/registration.vue"
import registrationTwo from "../views/registrationTwo.vue"
import shareProfile from "../views/shareProfile.vue"
import CreateProfile from "../views/CreateProfile.vue"
import CreateTicket from "../views/CreateTicket.vue"
import Ticket from "../views/Ticket.vue"
import signIn from "../views/signIn.vue"
import createAccount from "../views/createAccount.vue"
import forgetPassword from "../views/forgetPassword.vue"
import resetPassword from "../views/resetPassword.vue"

import createUserProfile from "../views/createUserProfile.vue"
import createUserProfile1 from "../views/createUserProfile1.vue"
import createUserProfile2 from "../views/createUserProfile2.vue"
import createUserProfile3 from "../views/createUserProfile3.vue"
import createUserProfile4 from "../views/createUserProfile4.vue"

import add from "../views/add.vue"

import PodcastItem from "../views/PodcastItem.vue"

import RSS from "../views/CreateRSS.vue"

import addPodcast from "../views/addPodcast.vue"

import Cart from "../views/cart.vue"

import EditBlog from "../views/EditBlog.vue"

import EidtVideo from "../views/EidtVideo.vue"

import chatIndex from "../views/chat/index.vue"
import chat from "../views/chat/chat.vue"
import chatChannel from "../views/chat/chatChannel.vue"

import EditPodcast from "../views/EditPodcast.vue"

import ConsultingItem from "../views/ConsultingItem.vue"

import blogUser from "../views/BlogUser.vue"

import tool from "../views/toolItem.vue"

import notification from "../views/notification.vue"

import wellcomeMarketer from "../views/wellcomeMarketer.vue"

import editProfile from "../views/editProfile.vue"

import editPassword from "../views/editPassword.vue"

import Purchases from "../views/Purchases.vue"



import allNotifications from "../views/allNotifications.vue"

import aboutUs from "../views/aboutUs.vue"

import commonQuestions from "../views/commonQuestions.vue"

import privacyPolicy from "../views/privacyPolicy.vue"

import refundPolicy from "../views/refundPolicy.vue"

import UsagePolicy from "../views/UsagePolicy.vue"

import SellingPolicy from "../views/SellingPolicy.vue"

import rights_guarantee from "../views/rights_guarantee.vue"

import HomeSearch from "../views/HomeSearch.vue"

import HowItsWork from "../views/HowItsWork.vue"

import EditService from "../views/EditService.vue"


Vue.use(VueRouter);

import Meta from 'vue-meta'

Vue.use(Meta, {
  keyName: 'metaInfo',

})



const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: AboutView,
  // },
  {
    path: "/blog",
    name: "blog",
    component: blog,
  },
  // {
  //   path: "/blog/blogItem",
  //   name: "blogItem",
  //   component: blogItem,
  // },
  {
    path: "/blog/:mention/:slug",
    name: "blogItem",
    component: blogItem,
  },
  {
    path: "/OurServices",
    name: "OurServices",
    component: OurServices,
  },

  {
    path: "/OurServices/:id",
    name: "service",
    component: service,
  },
  {
    path: "/store",
    name: "store",
    component: store,
  },
  {
    path: "/Arabipodcast",
    name: "podcast",
    component: podcast,
  },
  {
    path: "/Podcasts",
    name: "allPodcast",
    component: allPodcast,
  },
  {
    path: "/marketers",
    name: "marketers",
    component: marketers,
  },
  // {
  //   path: "/service",
  //   name: "service",
  //   component: service,
  // },
  {
    path: "/videos",
    name: "videos",
    component: videos,
  },
  {
    path: "/Consulting",
    name: "Consulting",
    component: Consulting,
  },

  ,
  {
    path: "/Consulting/:id",
    name: "ConsultingItem",
    component: ConsultingItem,
  },
  {
    path: "/userProfile",
    name: "userProfile",
    component: userProfile,
  },
  {
    path: "/marketerProfile",
    name: "marketerProfile",
    component: marketerProfile,
  },

  {
    path: "/marketers/:mention",
    name: "marketersProfile",
    component: marketersProfile,
  },

  {
    path: "/ConsultingItems",
    name: "ConsultingItems",
    component: ConsultingItems,
  },

  {
    path: "/CreateConsultation",
    name: "CreateConsultation",
    component: CreateConsultation,
  },

  {
    path: "/CreateConsultationTwo",
    name: "CreateConsultationTwo",
    component: CreateConsultationTwo,
  },


  {
    path: "/EditConsultation/:id",
    name: "EditConsultation",
    component: EditConsultation,
  },

  {
    path: "/EditConsultationTwo",
    name: "EditConsultationTwo",
    component: EditConsultationTwo,
  },

  {
    path: "/CreatePodcast",
    name: "CreatePodcast",
    component: CreatePodcast,
  },
  {
    path: "/CreateVideo",
    name: "CreateVideo",
    component: CreateVideo,
  },

  {
    path: "/CreateService",
    name: "CreateService",
    component: CreateService,
  },

  {
    path: "/CreateBlog",
    name: "CreateBlog",
    component: CreateBlog,
  },

  {
    path: "/ReplyQuestion",
    name: "ReplyQuestion",
    component: ReplyQuestion,
  },

  {
    path: "/registration/:id",
    name: "registration",
    component: registration,
  },

  {
    path: "/registrationTwo",
    name: "registrationTwo",
    component: registrationTwo,
  },

  {
    path: "/shareProfile",
    name: "shareProfile",
    component: shareProfile,
  },

  {
    path: "/CreateProfile",
    name: "CreateProfile",
    component: CreateProfile,
  },

  {
    path: "/CreateTicket",
    name: "CreateTicket",
    component: CreateTicket,
  },

  {
    path: "/Ticket:id",
    name: "Ticket",
    component: Ticket,
  },

  {
    path: "/signIn",
    name: "signIn",
    component: signIn,
  },

  {
    path: "/createAccount",
    name: "createAccount",
    component: createAccount,
  },

  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: forgetPassword,
  },

  {
    path: "/resetPassword",
    name: "resetPassword",
    component: resetPassword,
  },

  {
    path: "/UpdateProfile",
    name: "createUserProfile",
    component: createUserProfile,
  },


  {
    path: "/UpdateProfileContinue",
    name: "createUserProfile1",
    component: createUserProfile1,
  },

  {
    path: "/BeMarketer",
    name: "createUserProfile2",
    component: createUserProfile2,
  },

  {
    path: "/createUserProfile3",
    name: "createUserProfile3",
    component: createUserProfile3,
  },

  {
    path: "/createUserProfile4",
    name: "createUserProfile4",
    component: createUserProfile4,
  },


  {
    path: "/videos/:id",
    name: "VideoItem",
    component: VideoItem,
  },


  {
    path: "/add",
    name: "add",
    component: add,
  },

  // {
  //   path: "/ArabiPodcast",
  //   name: "podcast",
  //   component: podcast,
  // },

  {
    path: "/Podcasts/:id",
    name: "PodcastItem",
    component: PodcastItem,
  },

  {
    path: "/RSS",
    name: "RSS",
    component: RSS,
  },

  {
    path: "/addPodcast",
    name: "addPodcast",
    component: addPodcast,
  },

  {
    path: "/Cart",
    name: "Cart",
    component: Cart,
  },

  {
    path: "/EditService/:mention",
    name: "EditService",
    component: EditService,
  },

  {
    path: "/EditBlog/:slug",
    name: "EditBlog",
    component: EditBlog,
  },
// /blog/${item.mention}/${item.slug}
  {
    path: "/EidtVideo/:id",
    name: "EidtVideo",
    component: EidtVideo,
  },
  ,

  {
    path: "/EditPodcast/:id",
    name: "EditPodcast",
    component: EditPodcast,
  },


  {
    path: "/blog/:mention",
    name: "blogUser",
    component: blogUser,
  },

  {
    path: "/tool/:id",
    name: "tool",
    component: tool,
  },

  {
    path: "/notification/:id",
    name: "notification",
    component: notification,
  },

  {
    path: "/wellcomeMarketer",
    name: "wellcomeMarketer",
    component: wellcomeMarketer,
  },

  {
    path: "/editProfile",
    name: "editProfile",
    component: editProfile,
  },

  {
    path: "/editPassword",
    name: "editPassword",
    component: editPassword,
  },

  {
    path: "/Purchases",
    name: "Purchases",
    component: Purchases,
  },

  {
    path: "/aboutUs",
    name: "aboutUs",
    component: aboutUs,
  },


  {
    path: "/commonQuestions",
    name: "commonQuestions",
    component: commonQuestions,
  },


  
  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    component: privacyPolicy,
  },


  
  {
    path: "/refundPolicy",
    name: "refundPolicy",
    component: refundPolicy,
  },


  
  {
    path: "/UsagePolicy",
    name: "UsagePolicy",
    component: UsagePolicy,
  },

  // http://dashboard.arabicreators.com/api/home_search?title=asdasd
  
  {
    path: "/SellingPolicy",
    name: "SellingPolicy",
    component: SellingPolicy,
  },


  {
    path: "/rights_guarantee",
    name: "rights_guarantee",
    component: rights_guarantee,
  },

  {
    path: "/HomeSearch/:id",
    name: "HomeSearch",
    component: HomeSearch,
  },

  {
    path: "/HowItsWork",
    name: "HowItsWork",
    component: HowItsWork,
  },

  {
    path: "/allNotifications",
    name: "allNotifications",
    component: allNotifications,
  },

  {
    path: "/chat",
    component: chatIndex,
    children: [
      {
        path: "/chat",
        name: "chat",
        component: chat,
      },
      {
        path: "/chat/:mentionUser",
        name: "chatChannel",
        component: chatChannel,
      }
    ]
  },
  
  
  

  // {
  //   path: '/:catchAll(.*)*',
  //   name: "PageNotFound",
  //   component: PageNotFound,
  // },













];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
