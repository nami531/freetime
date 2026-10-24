<script setup>
import {ApiController} from "../controller/index.js";
</script>

<template>
  <div
      v-if="ApiController.loadingState.activeRequests > 0"
      class="pointer-events-none fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black/20"
  >
    <div
        class="h-9 w-9 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600"
    ></div>
    <p>Cargando...</p>
  </div>
</template>