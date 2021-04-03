<template>
  <router-link
    class="logo-link-wrapper 
    d-flex justify-content-center
    px-2 py-2
    px-md-3 py-md-3 my-n1
    "
    to="/"
  >
    <div
      @click="backToIndexPage()"
      class="logo-wrapper d-flex justify-content-center"
    >
      <div class="logo-text">URL SHORTENER</div>
      <i class="fas fa-link fa-lg ml-1 ml-md-2 mt-1"></i>
    </div>
  </router-link>
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

<style>
.logo-link-wrapper:hover {
  text-decoration: none;
}

.logo-text {
  color: #2c3e50;
  transition-duration: 0.3s;
}

.logo-link-wrapper:hover .logo-text {
  font-weight: bolder;
  transition-duration: 0.3s;
}

.logo-link-wrapper {
  background-color: transparent;
  margin-bottom: 5rem;
}

.logo-text {
  letter-spacing: 1.5px;
}

.logo-wrapper i {
  color: #7d9ec0;
  transition-duration: 0.5s;
}

.logo-link-wrapper:hover .fa-link {
  color: #5a728a;
  transition-duration: 0.5s;
  /* box-shadow:  0 0px 30px rgb(194, 194, 194); */
}

@media (max-width: 576px) {

}

@media (min-width: 577px) and (max-width: 768px) {

}

@media (min-width: 769px) {

}
</style>