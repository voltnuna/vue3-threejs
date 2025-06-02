<template>
  <div class="listitem">
    <div class="thumbnail">
      <img
        src="https://i.ytimg.com/vi/73mRQwX2SGA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAxeVUmKxNH0KyqOHyH8VD1c-o3ow"
        alt=""
      />
    </div>
    <div class="detail">
      <div class="detail-profileImg">
        <img src="" alt="profile image" />
      </div>
      <div>
        <p class="detail-vdtitle">여호와는 나의 목자시니</p>
        <span class="detail-author">햅삐다비</span>
        <span class="detail-views">조회수 {{ views }}회</span>
        <span class="detail-posted">{{ posted }}전</span>
      </div>
      <div>
        <button type="button">메뉴</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const views = ref(0);
const posted = ref(0);
</script>

<style lang="scss" scoped>
.listitem {
  width: calc(100% / 3);
  height: 23rem;
  margin: 1rem;
  background-color: antiquewhite;
  border-radius: 1.5rem;
  display: block;
  overflow: hidden;
}
.thumbnail {
  display: block;
  width: 100%;
  height: auto;
  img {
    max-width: 100%;
    height: auto;
  }
}
.detail {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
