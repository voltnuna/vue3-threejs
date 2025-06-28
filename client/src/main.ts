import { createApp, markRaw } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import piniaPersist from "pinia-plugin-persistedstate";
import Tres from "@tresjs/core";

//createApp(App).mount('#app')

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

pinia.use(({ store }) => {
  store.$router = markRaw(router);
  // ✅ store 안에서 router 쓰고 싶을 경우만
  //pinia store 개체 안에서 router 개체 사용할 수 있게 하는 설정
  //pinia 에서 라우터 상태 관찰 안하도록 하는 설정. 라우터는 자체적으로 상태관리 하기 때문에 불필요한 오버헤드 줄이는 용도
});
app.use(pinia);
app.use(router);
app.use(Tres);
app.mount("#app");
