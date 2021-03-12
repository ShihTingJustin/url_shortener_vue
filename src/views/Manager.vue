<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="logo w-100 text-center">
      <a href="/">URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i></a>
    </div>
    <Record />
    <a
      href="/"
      class="submit-btn btn w-50"
      style="text-decoration: none; color: #ececec"
      >Create another</a
    >
  </div>
</template>

<script>
import Record from "./../components/Record";

export default {
  name: "Manager",
  components: {
    Record,
  },
  created() {

  },
  methods: {
    fetchRecords() {
      
    }
  }
};
</script>