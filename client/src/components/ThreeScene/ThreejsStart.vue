<template>
  <div></div>
</template>

<!-- 
### 장면 만들기
## 3D 경험을 만들려면 4가지 핵심 요소가 필요합니다.
1.카메라와 물체를 함께 담을 수 있는 장면입니다 . _ Scene
2.DOM에 장면을 렌더링하는 렌더러 입니다 . _ WebGLRenderer
3.카메라​ _ PerspectiveCamera
4.객체 _ BoxGeometry, Mesh, MeshBasicMaterial
-->

<script setup lang="ts">
import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";
</script>

<style scoped lang="scss"></style>
