<template>
  <nav class="navbar">
    <div class="header-left">
      <Logo v-if="currentPage !== 'root'" class="m-auto" />
    </div>
    <div class="header-right d-flex">
      <div v-if="currentUser" class="">
        <router-link to="manager" class="btn nav-btn font-weight-light px-3">
          {{ currentUser.name }}
        </router-link>
      </div>
      <div v-if="currentUser" class="">
        <router-link to="signin" class="btn nav-btn font-weight-light px-3">
          Sign Out
        </router-link>
      </div>
      <div v-else-if="!currentUser" class="mr-3">
        <router-link to="signin" class="btn nav-btn font-weight-light px-3">
          Sign In
        </router-link>
      </div>
      <div v-else class="sign-up-btn-wrapper border rounded-lg mr-2">
        <router-link to="signup" class="btn nav-btn font-weight-light px-3">
          Sign Up
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import Logo from "../components/Logo";

export default {
  name: "NavBar",
  components: {
    Logo,
  },
  data() {
    return {
      currentPage: this.$route.name
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>