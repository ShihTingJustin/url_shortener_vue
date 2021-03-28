<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="logo w-100 text-center mt-4">
      <!--note: add Navbar -->
      <router-link to="/"
        >URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i
      ></router-link>
    </div>
    <Record
      :records="records"
      @after-delete="afterDelete"
      class="record-card"
    />
    <router-link to="/" class="submit-btn btn w-50 mb-5"
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
import Swal from "sweetalert2";

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
        const getToken = () => localStorage.getItem("token");
        const res = await apiHelper.get("/urls/all", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
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
    async afterDelete(recordId) {
      try {
        const res = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        });
        if (res.isConfirmed) {
          await apiHelper.delete(`/urls/${recordId}`);
          Swal.fire("Deleted!", "Your file has been removed.", "success");
          this.fetchRecords();
        } else return;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>