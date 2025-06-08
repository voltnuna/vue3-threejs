import axios from "axios";
import { ref } from "vue";

const userAuth = async () => {
  let auth = false;
  await axios
    .get("/api/users", { withCredentials: true })
    .then((res) => {
      if (typeof res.data === "boolean" && !res.data) {
        //로그인 안 된 경우
        localStorage.clear(); //브라우저 쿠키삭제
      } else {
        auth = true;
        return res.data;
      }
    })
    .catch((err) => {
      console.dir("@Main.ts 인증 오류:", err);
    });
};

const isAuth = () => {};
