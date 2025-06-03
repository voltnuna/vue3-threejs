<template>
  <div class="listitem">
    <div class="thumbnail">
      <picture>
        <source media="(max-width: 480px)" srcset="" />
        <source media="(min-width: 768px)and (max-width:1023px)" srcset="" />
        <img src="" alt="labtop" />
      </picture>
    </div>
    <div class="detail">
      <div class="detail-profileImg">
        <img src="" alt="profile image" />
      </div>
      <div>
        <p class="detail-vdtitle">Title</p>
        <span class="detail-author">creator name | </span>
        <span class="detail-views">{{ views }} views | </span>
        <span class="detail-posted">{{ posted }} ago </span>
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
//1024까지는 3개, 768이하 2개, 480px 1개
.listitem {
  @include mobile {
    width: 100%;
  }
  @include tablet {
  }
}
.thumbnail {
}
.detail {
}
</style>
