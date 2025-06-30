<template>
  <div id="screen">
    <div ref="container" class="canvas-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";

const container = ref<HTMLDivElement | null>(null);
const scene = new Scene();
const camera = new PerspectiveCamera();
</script>
<style lang="scss" scoped>
#screen {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.canvas-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
