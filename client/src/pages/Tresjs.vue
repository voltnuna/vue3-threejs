<template>
  <div id="app2">
    <div ref="container" class="canvas-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!container.value) return;
  // 씬, 카메라, 렌더러 설정
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // 큐브 메쉬 생성
  const geometry = new BoxGeometry(10, 10, 10);
  const material = new MeshBasicMaterial({ color: 0xffffff });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 30;

  // 애니메이션 루프
  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();

  // 윈도우 리사이즈 대응
  window.addEventListener("resize", () => {
    if (!container.value) return;
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  });
});
</script>
<style lang="scss" scoped>
#app2 {
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
