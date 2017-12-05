<template>
  <div>
    <ul>
      <!-- li -->
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "my-ul"
};
</script>

<style scoped>
ul {
  overflow: hidden;
}
</style>