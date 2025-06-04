import { createRouter, createWebHistory } from "vue-router";
import ExplorePage from "@pages/ExplorePage.vue";
import GuidePage from "@pages/GuidePage.vue";
import LoginPage from "@pages/LoginPage.vue";
import SignupPage from "@pages/SignupPage.vue";
import DmPage from "@/pages/DmPage.vue";
import ChannelPage from "@/pages/ChannelPage.vue";
import WorkspacePage from "@/pages/WorkspacePage.vue";

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
      name: "Login",
      component: LoginPage,
    },

    {
      path: "/signup",
      name: "Signup",
      component: SignupPage,
    },
    {
      path: "/workspace/:id",
      name: "Workspace",
      component: WorkspacePage,
      beforeEnter: async (to, from, next) => {
        // 1. params으로 workspace의 id를 확인한다.
        const wsId = to.params?.id;

        // 2. postId의 값이 없을 경우, Home으로 이동한다.
        if (!wsId) {
          next({ name: "ExplorePage" });
        }
        // 3. postId의 값이 있을 경우, PostComponent에 진입한다.
        next();
      },
    },
    {
      path: "/workspace",
      name: "ExplorePage",
      component: ExplorePage,
    },
    {
      path: "/workspace/dm",
      name: "Dm",
      component: DmPage,
    },
    {
      path: "/workspace/channel",
      name: "Channel",
      component: ChannelPage,
    },
    {
      path: "/guide",
      component: GuidePage,
    },
  ],
});

export default router;
