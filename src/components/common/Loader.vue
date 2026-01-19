<template>
  <div class="loader-wrapper">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0; /* top:0 right:0 bottom:0 left:0 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6); /* optional overlay */
  z-index: 9999;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #1c1c1c;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
