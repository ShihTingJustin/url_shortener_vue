<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="logo w-100 text-center">
      <!--note: add Navbar -->
      <router-link to="/"
        >URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i
      ></router-link>
    </div>
    <Record :records="records" />
    <router-link
      to="/"
      class="submit-btn btn w-50 mb-5"
      >Create another</router-link
    >
    <div>
      <loading :active.sync="isLoading"></loading>
    </div>
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
      isLoading: false,
    };
  },
  created() {
    this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      try {
        this.isLoading = true;
        const res = await apiHelper.get("/urls/all");
        this.records = res.data.data;
        this.isLoading = false;
      } catch (err) {
        Toast.fire({
          icon: "warning",
          title: "Something wrong ...",
        });
        console.log(err);
      }
    },
  },
};
</script>