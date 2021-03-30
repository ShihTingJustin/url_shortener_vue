<template>
  <div>
    <NavBar />
    <section class="border rounded-lg">
      <div class="text-center d-flex flex-column">
        <div @click="reoladIndexPage()" class="mt-4">
          <Logo />
        </div>
        <IndexInput
          v-if="!isComplete"
          :is-proccessing="isProcessing"
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
      isProcessing: false,
      isComplete: false,
      shortUrl: "",
      originalUrl: "",
      domain: process.env.VUE_APP_DOMAIN,
      isLoading: false,
    };
  },
  methods: {
    async afterSubmit(originalUrl) {
      try {
        this.isLoading = true;
        this.isProcessing = true;
        const res = await apiHelper.post("/urls", {
          originalUrl,
        });
        this.shortUrl = this.domain + res.data.data.shortUrl;
        this.originalUrl = res.data.data.originalUrl;
        Toast.fire({
          icon: "success",
          title: "Success",
        });
        this.isComplete = true;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "Please enter valid URL",
        });
        console.log(err);
      }
    },
    reoladIndexPage() {
      this.$router.go();
      this.isProcessing = false;
      this.isComplete = false;
    },
  },
};
</script>