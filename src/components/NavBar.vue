<template>
  <nav class="navbar h-100">
    <div class="header-left">
      <Logo v-if="currentPage !== 'root'" class="mx-auto my-n3" />
    </div>
    <div class="header-right d-flex">
      <div v-if="isAuthenticated">
        <router-link to="manager" class="btn nav-btn font-weight-light px-3">
          {{ currentUser.name }}
        </router-link>
        <div @click="signOut" class="btn nav-btn font-weight-light px-3">
          Sign Out
        </div>
      </div>
      <div v-if="!isAuthenticated" class="mr-3">
        <router-link to="signin" class="btn nav-btn font-weight-light px-3">
          Sign In
        </router-link>
      </div>
      <div
        v-if="!isAuthenticated"
        class="sign-up-btn-wrapper  rounded-lg mr-2"
      >
        <router-link to="signup" class="btn nav-btn font-weight-light px-3">
          Sign Up
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Logo from "../components/Logo";

export default {
  name: "NavBar",
  components: {
    Logo,
  },
  data() {
    return {
      currentPage: this.$route.name,
    };
  },
  methods: {
    signOut() {
      this.$store.commit("removeAuthentication");
      this.$router.push("/");
      Toast.fire({
        icon: "success",
        title: "Sign out successfully",
      });
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>