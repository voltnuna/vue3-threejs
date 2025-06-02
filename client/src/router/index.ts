import { createRouter, createWebHistory } from "vue-router";
import ExplorePage from "@pages/ExplorePage.vue";
import GuidePage from "@pages/GuidePage.vue";
import LoginPage from "@pages/LoginPage.vue";
import SignupPage from "@pages/SignupPage.vue";
/*
MEMO: history의 세가지 옵션:
- createWebHistory: HTML5 History API 사용, 실제 서비스용 SPA, 깔끔한 URL ex)/about	
- createWebHashHistory: URL에 # 해시 사용, 서버 설정 없이 빠르게 개발할 때 ex) /#/about	
- createMemoryHistory: 브라우저 URL 사용 안 함, SSR(Server Side Rendering), 테스트 환경
*/

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: ExplorePage,
    },
    {
      path: "/guide",
      component: GuidePage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/signup",
      component: SignupPage,
    },
  ],
});
