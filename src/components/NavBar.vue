<template>
  <nav class="navbar fixed-top bg-white">
    <div class="header-brand">
      <Logo class="" v-if="currentPage !== 'root'" />
    </div>
    <div class="header-right d-flex">
      <div v-if="isAuthenticated">
        <router-link
          to="manager"
          class="btn nav-btn font-weight-light px-1 px-md-3"
        >
          {{ currentUser.name }}
        </router-link>
        <div
          @click="signOut"
          class="btn nav-btn font-weight-light px-1 px-md-3 mr-n2"
        >
          Sign Out
        </div>
      </div>
      <div v-if="!isAuthenticated" class="mr-3">
        <router-link
          to="signin"
          class="btn nav-btn font-weight-light px-1 px-md-3"
        >
          Sign In
        </router-link>
      </div>
      <div
        v-if="!isAuthenticated"
        class="sign-up-btn-wrapper rounded-lg mr-n2 mr-md-2"
      >
        <router-link
          to="signup"
          class="btn nav-btn font-weight-light px-1 px-md-3"
        >
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
      this.$store.commit("switchState", {
        status: "isLoading",
        boolean: true,
      });
      this.$store.commit("removeAuthentication");
      this.$store.commit("switchState", {
        status: "isLoading",
        boolean: false,
      });
      this.$router.push("/");
      Toast.fire({
        icon: "success",
        title: "Sign out successfully",
      });
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "isLoading"]),
  },
};
</script>

<style>
.nav-btn {
  color: #aaaeb3;
  transition-duration: 0.5s;
}

.nav-btn:hover {
  color: #000000;
  transition-duration: 0.5s;
}

.sign-up-btn-wrapper {
  border: 1.5px solid #e2e2e2;
  transition-duration: 0.5s;
}

.sign-up-btn-wrapper:hover {
  border: 1.5px solid #000000;
  transition-duration: 0.5s;
}

@media (max-width: 576px) {
  .header-brand {
    height: 40px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .header-brand {
    height: 50px;
  }
}

@media (min-width: 769px) {
  .header-brand {
    height: 50px;
  }
}
</style>