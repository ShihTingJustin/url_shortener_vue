<template>
  <div>
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
    </div>
    <router-link v-if="records.length" to="/" class="submit-btn btn px-5 mb-5"
      >Create another</router-link
    >
    <div v-if="!records.length" class="h6">
      <p class="p-5">Nothing records here.</p>
      <p class="p-5">
        Let's
        <router-link to="/" class="">create one !</router-link>
      </p>
    </div>
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
    };
  },
  created() {
    this.fetchRecords();
  },
  methods: {
    async fetchRecords() {
      try {
        const getToken = () => localStorage.getItem("token");
        if (!getToken()) return this.$router.push("/signin");
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: true,
        });
        const res = await apiHelper.get("/urls/all", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        this.records = res.data.data;
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        this.$store.commit("switchState", {
          status: "isComplete",
          boolean: false,
        });
      } catch (err) {
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        Toast.fire({
          icon: "warning",
          title: "Something wrong ...",
        });
        console.log(err);
      }
    },
    async afterDelete(recordId) {
      try {
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
          Swal.fire("Deleted!", "Your URL has been removed.", "success");
          await this.fetchRecords();
        } else return;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "isLoading"]),
  },
};
</script>