<template>
  <div class="d-flex justify-content-center py-5">
    <div
      class="mt-5 d-flex flex-column align-items-center justify-content-center w-75"
    >
      <Logo />
      <div class="signin-wrapper">
        <form @submit.prevent.stop="afterSubmit">
          <div class="text-center mb-4">
            <h1 class="h5 mb-3 font-weight-light">Sign In</h1>
          </div>
          <div class="form-label-group text-left mb-4">
            <label for="email" class="font-weight-light">email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="form-control mx-auto"
              placeholder="email"
              autocomplete="username"
              required
              autofocus
            />
          </div>

          <div class="form-label-group text-left mb-5">
            <label for="password" class="font-weight-light">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="current-password"
              required
            />
          </div>
          <SubmitBtn />
          <div class="text-center mt-5">
            <p>Don't have an account ?
              <router-link to="/signup" class="text-secondary ml-1"
                >Sign Up</router-link
              >
            </p>
          </div>
          <div>
            <loading :active.sync="isLoading"></loading>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./../components/Logo";
import SubmitBtn from "./../components/SubmitBtn";
import authorizationAPI from "./../apis/authorization.js";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "SignIn",
  components: {
    Logo,
    SubmitBtn,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async afterSubmit() {
      try {
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: true,
        });
        if (!this.email || !this.password) {
          this.$store.commit("switchState", {
            status: "isLoading",
            boolean: false,
          });
          Toast.fire({
            icon: "warning",
            title: "Please fill in both email and password",
          });
          return;
        }
        const res = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });
        const { data } = res;
        if (data.status !== "success") throw new Error(data.message);
        localStorage.setItem("token", data.token);
        this.$store.commit("setCurrentUser", data.user);
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        this.$router.push("/");
        Toast.fire({
          icon: "success",
          title: "Sign in successfully",
        });
      } catch (err) {
        console.log(err);
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "Invalid email or password ",
        });
      }
    },
  },
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>

<style>
.signin-wrapper {
  margin-top: 80px;
  width: 100%;
  max-width: 400px;
}
</style>