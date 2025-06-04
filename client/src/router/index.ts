import { createRouter, createWebHistory } from "vue-router";
import ExplorePage from "@pages/ExplorePage.vue";
import GuidePage from "@pages/GuidePage.vue";
import LoginPage from "@pages/LoginPage.vue";
import SignupPage from "@pages/SignupPage.vue";
import DmPage from "@/pages/DmPage.vue";
import ChannelPage from "@/pages/ChannelPage.vue";

/*
❗ MEMO: history의 세가지 옵션:
- createWebHistory: HTML5 History API 사용, 실제 서비스용 SPA, 깔끔한 URL ex)/about	
- createWebHashHistory: URL에 # 해시 사용, 서버 설정 없이 빠르게 개발할 때 ex) /#/about	
- createMemoryHistory: 브라우저 URL 사용 안 함, SSR(Server Side Rendering), 테스트 환경
*/

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: LoginPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },

    {
      path: "/signup",
      component: SignupPage,
    },
    {
      path: "/workspace",
      component: ExplorePage,
    },
    {
      path: "/workspace/dm",
      component: DmPage,
    },
    {
      path: "/workspace/channel",
      component: ChannelPage,
    },
    {
      path: "/guide",
      component: GuidePage,
    },
  ],
});

export default router;
