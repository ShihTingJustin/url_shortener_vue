<template>
  <div @click="backToIndexPage()" class="logo p-3 px-4">
    <router-link class="logo-text" to="/"
      >URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "Logo",
  methods: {
    backToIndexPage() {
      this.$store.commit("switchState", {
        status: "isComplete",
        boolean: false,
      });
    },
  },
};
</script>