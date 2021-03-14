<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="logo w-100 text-center">
      <a href="/">URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i></a>
    </div>
    <Record :records="records" />
    <a
      href="/"
      class="submit-btn btn w-50"
      style="text-decoration: none; color: #ececec"
      >Create another</a
    >
  </div>
</template>

<script>
import { apiHelper, Toast } from "../utils/helpers";
import Record from "./../components/Record";

export default {
  name: "Manager",
  components: {
    Record,
  },
  data() {
    return {
      records: [],
    };
  },
  created() {
    this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      try {
        const res = await apiHelper.get("/urls/all");
        this.records = res.data.data;
      } catch (err) {
        Toast.fire({
          icon: "warning",
          title: "Something wrong ...",
        });
        console.log(err)
      }
    },
  },
};
</script>