<template>
  <div class="container">
    <div class="bigtitle">
      <h2>Welcom VueRek</h2>
    </div>
    <div class="explore-area">
      <!--  -->
      <div v-for="lab in laboratories" class="laboratory" @click.prevent="">
        <div class="desc">
          <div>
            <h3>{{ lab.name }}</h3>
            <p>{{ lab.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@stores/userStore";
import { useWsStore } from "@stores/wsStore";
const userStore = useUserStore();

const workspaceList = ref([]);

const laborName = ref("");
const laborDesc = ref("");

// Dummy
const laboratories = ref([
  {
    name: "Three.js",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Parallax Scrolling",
    desc: "Parallax ScrollingParallax ScrollingParallax ScrollingParallax Scrolling",
  },
  {
    name: "Animation",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
]);

onMounted(() => {
  console.log("explore page", userStore.id.value);
  userStore.id.value && userStore.myWorkspace(userStore.id.value);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  //grid-template-rows: repeat(3, minmax(100px, auto));
  //background-color: rgba(11, 19, 43, 0.5);
}
.bigtitle {
  display: block;
  width: 100%;
  font-size: 3rem;
  text-align: left;
  font-weight: 800;
  h2 {
    font-size: 3.5rem;
    line-height: 1;
  }
}
.explore-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: scroll;
  align-items: flex-start;

  .laboratory {
    position: relative;
    width: 35rem;
    height: 23rem;
    overflow: hidden;
    border: 1px solid rgba(11, 19, 43, 0.5);
    border-radius: 10px;
    background: url("../assets/images/thumb1.jpg") center/cover no-repeat;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 1rem;

    .desc {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      color: #fff;
      font-weight: 500;

      div {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 1rem;
        color: #fff;
        overflow: hidden;
        h3 {
          font-size: 3rem;
        }
        p {
          font-size: 1.7rem;
          margin: 1rem;
        }
      }
    }
    &:hover {
      .desc {
        background-color: rgba(0, 0, 0, 0.308);
        transition: 0.5s;
        cursor: pointer;
      }
      border: 1px solid #13131370;
      box-shadow: 1px 0 20px 0 rgba(0, 0, 0, 0.3);
      transition: 0.5s;
    }
  }
}
</style>
