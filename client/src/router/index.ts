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

//❗ MEMO: routes등록시엔 path에 param이 포함되는 것을 우선적으로 등록
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
      path: "/workspaces",
      name: "ExplorePage",
      component: ExplorePage,
      beforeEnter: async (to, from, next) => {
        console.log("Router");
        next({ path: "/workspaces/general" });
      },
    },
    {
      path: "/workspaces/dm/",
      name: "Dm",
      component: DmPage,
    },
    {
      path: "/workspaces/:workspace/channel/:channel",
      name: "Channel",
      component: ChannelPage,
    },
    {
      path: "/workspaces/:id",
      name: "Workspace",
      component: WorkspacePage,
      beforeEnter: async (to, from, next) => {
        const wsId = to.params?.id; // 1. params으로 workspace의 id를 확인한다.
        if (wsId === "0") {
          // 2. wsId 값이 없을 경우, ExplorePage으로 이동한다.
          console.log("@Router: wsId값이...", wsId);
          next({ path: "/workspaces/general" });
        }
        next(); // 3. wsId의 값이 있을 경우, 해당 WorkSpace에 진입한다.
      },
    },

    {
      path: "/workspaces/general",
      name: "GeneralPage",
      component: ExplorePage,
    },

    {
      path: "/guide",
      component: GuidePage,
    },
  ],
});

export default router;
