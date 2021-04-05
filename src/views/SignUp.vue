<template>
  <div class="d-flex justify-content-center py-5">
    <div
      class="mt-4 d-flex flex-column align-items-center justify-content-center w-75"
    >
      <Logo />
      <div class="signup-wrapper">
        <form class="w-100" @submit.prevent.stop="handleSubmit">
          <div class="text-center mb-4">
            <h1 class="h5 mb-3 font-weight-light">Sign Up</h1>
          </div>
          <div class="form-label-group mb-4 text-left">
            <label for="name" class="font-weight-light">Name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              class="form-control"
              placeholder="name"
              autocomplete="username"
              required
              autofocus
            />
          </div>
          <div class="form-label-group mb-4 text-left">
            <label for="email" class="font-weight-light">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="email"
              autocomplete="email"
              required
            />
          </div>
          <div class="form-label-group mb-4 text-left">
            <label for="password" class="font-weight-light">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="new-password"
              required
            />
          </div>
          <div class="form-label-group mb-5 text-left">
            <label for="password-check" class="font-weight-light"
              >Password Check</label
            >
            <input
              id="password-check"
              v-model="passwordCheck"
              name="passwordCheck"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="new-password"
              required
            />
          </div>
          <SubmitBtn />
          <div class="text-center mt-5">
            <p>Already have an account ?
              <router-link to="/signin" class="text-secondary ml-1">
                Sign In
              </router-link>
            </p>
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
  name: "SignUp",
  components: {
    Logo,
    SubmitBtn,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "Please fill in all fields",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "Password didn't match",
          });
          this.passwordCheck = "";
          return;
        }
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: true,
        });
        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: data.message,
        });
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        this.$router.push("/signin");
      } catch (error) {
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        Toast.fire({
          icon: "warning",
          title: `Sign up failed - ${error.message}`,
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
.signup-wrapper {
  margin-top: 70px;
  width: 100%;
  max-width: 400px;
}
</style>