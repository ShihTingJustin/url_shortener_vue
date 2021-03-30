<template>
  <div class="">
    <NavBar />
    <div class="container d-flex flex-column align-items-center">
      <Record
        v-if="records.length"
        :records="records"
        @after-delete="afterDelete"
        class="record-card"
      />
      <div>
        <loading :active.sync="isLoading"></loading>
      </div>
      <section v-if="!records.length" class="h6">
        <p class="p-5">Nothing records here.</p>
        <p class="p-5">
          Let's
          <router-link to="/" class="">create one !</router-link>
        </p>
      </section>
    </div>
    <router-link v-if="records.length" to="/" class="submit-btn btn w-50 mb-5"
      >Create another</router-link
    >
  </div>
</template>

<script>
import { apiHelper, Toast } from "../utils/helpers";
import Record from "./../components/Record";
import NavBar from "./../components/NavBar";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Manager",
  components: {
    Record,
    NavBar,
  },
  data() {
    return {
      records: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchRecords(this.currentUser.id);
  },
  methods: {
    async fetchRecords(userId) {
      try {
        this.isLoading = true;
        const getToken = () => localStorage.getItem("token");
        if (!getToken) return this.$router.push("/signin");

        const res = await apiHelper.get(`/urls/all/${userId}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.data.data.length) {
          this.records = res.data.data;
        }
        return (this.isLoading = false);
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
        console.log(recordId)
        const getToken = () => localStorage.getItem("token");
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
          await apiHelper.delete(`/urls/${recordId}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
          Swal.fire("Deleted!", "Your file has been removed.", "success");
          this.fetchRecords(this.currentUser.id);
        } else return;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>