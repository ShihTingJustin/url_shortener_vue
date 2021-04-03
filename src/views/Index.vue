<template>
  <div>
    <NavBar />
    <section class="border rounded-lg">
      <div class="text-center d-flex flex-column">
        <div class="d-flex justify-content-center index-logo">
          <Logo />
        </div>
        <IndexInput
          v-if="!isComplete"
          :is-loading="isLoading"
          :is-complete="isComplete"
          @after-submit="afterSubmit"
        />
        <ShortUrl v-else :short-url="shortUrl" :original-url="originalUrl" />
      </div>
      <div>
        <loading :active.sync="isLoading"></loading>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { apiHelper, Toast } from "../utils/helpers";
import IndexInput from "./../components/IndexInput";
import ShortUrl from "./../components/ShortUrl";
import NavBar from "./../components/NavBar";
import Logo from "./../components/Logo";

export default {
  name: "Index",
  components: {
    IndexInput,
    ShortUrl,
    NavBar,
    Logo,
  },
  data() {
    return {
      shortUrl: "",
      originalUrl: "",
      domain: process.env.VUE_APP_DOMAIN,
    };
  },
  methods: {
    async afterSubmit(originalUrl) {
      try {
        if (!this.$store.state.isAuthenticated)
          return this.$router.push("/signin");

        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: true,
        });
        const getToken = () => localStorage.getItem("token");
        const res = await apiHelper.post(
          "/urls",
          { originalUrl },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        this.shortUrl = this.domain + res.data.data.shortUrl;
        this.originalUrl = res.data.data.originalUrl;
        Toast.fire({
          icon: "success",
          title: "Success",
        });
        this.$store.commit("switchState", {
          status: "isComplete",
          boolean: true,
        });
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
      } catch (err) {
        this.$store.commit("switchState", {
          status: "isLoading",
          boolean: false,
        });
        this.$store.commit("switchState", {
          status: "isComplete",
          boolean: false,
        });
        Toast.fire({
          icon: "warning",
          title: "Please enter valid URL",
        });
        console.log(err);
      }
    },
  },
  computed: {
    ...mapState(["isAuthenticated", "isLoading", "isComplete"]),
  },
};
</script>

<style>
section {
  position: absolute;
  top: 50%;
  left: 50%;
  display: table;
}

@media (max-width: 576px) {
  .index-logo {
    margin-top: 20px;
  }

  section {
    width: 350px;
    height: 100px;
    margin: -180px 0 0 -175px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .index-logo {
    margin-top: 35px;
  }

  section {
    width: 600px;
    height: 350px;
    margin: -180px 0 0 -300px;
  }
}

@media (min-width: 769px) {
  .index-logo {
    margin-top: 35px;
  }

  section {
    width: 600px;
    height: 350px;
    margin: -180px 0 0 -300px;
  }
}
</style>