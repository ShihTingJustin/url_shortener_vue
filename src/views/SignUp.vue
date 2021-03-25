<template>
  <div class="d-flex justify-content-center py-5 w-100 h-100">
    <div
      class="mt-5 d-flex flex-column align-items-center justify-content-center w-75"
    >
      <Logo />
      <div class="container w-50">
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
            <label for="password-check" class="font-weight-light">Password Check</label>
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
          <div class="text-center mt-4">
            <p>
              <router-link to="/signin" class="text-secondary">
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
    handleSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordCheck: this.passwordCheck,
      };
      console.log("handleSubmit", JSON.stringify(data));
    },
  },
};
</script>