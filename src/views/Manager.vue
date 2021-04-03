<template>
  <div class="manager-wrapper d-flex flex-column align-items-center">
    <NavBar />
    <div class="container d-flex flex-column align-items-center record-container">
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
    <div>
      <router-link v-if="records.length" to="/" class="submit-btn btn px-5"
        >Create another</router-link
      >
    </div>
    <div v-if="!records.length && isLoading === false" class="blank-page-text text-center my-auto">
      <p>Nothing here.</p>
      <p>
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

<style>
.manager-wrapper {
    height: 100%;
}
@media (max-width: 576px) {
  .record-container {
    margin-top: 50px;
  }

  .blank-page-text {
    font-size: 0.7rem;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .record-container {
    margin-top: 70px;
  }
  
  .blank-page-text {
    font-size: 1rem;
  }
}

@media (min-width: 769px) {
  .record-container {
    margin-top: 80px;
  }
  
  .blank-page-text {
    font-size: 1.3rem;
  }
}
</style>