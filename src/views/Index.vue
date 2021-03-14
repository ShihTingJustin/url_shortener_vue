<template>
  <section class="border">
    <div class="text-center d-flex flex-column">
      <div class="manager d-flex justify-content-end">
        <router-link
          to="/manager"
          class="manager-icon fas fa-list mt-3 mr-3"
        ></router-link>
      </div>
      <div @click="init" class="logo mt-1 mx-auto">
        <div class="p-3">URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i
        ></div>
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
</template>

<script>
import { apiHelper, Toast } from "../utils/helpers";
import IndexInput from "./../components/IndexInput";
import ShortUrl from "./../components/ShortUrl";

export default {
  name: "Index",
  components: {
    IndexInput,
    ShortUrl,
  },
  data() {
    return {
      isProcessing: false,
      isComplete: false,
      shortUrl: "",
      originalUrl: "",
      baseUrl: "https://url-shortener-api-server.herokuapp.com/",
      isLoading: false
    };
  },
  methods: {
    async afterSubmit(originalUrl) {
      try {
        this.isLoading = true
        this.isProcessing = true;
        const res = await apiHelper.post("/urls", {
          originalUrl,
        });
        console.log(res)
        this.shortUrl = this.baseUrl + res.data.data.shortUrl;
        this.originalUrl = res.data.data.originalUrl;
        Toast.fire({
          icon: "success",
          title: "Success",
        });
        this.isComplete = true
        this.isLoading = false
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "Please enter valid URL",
        });
        console.log(err);
      }
    },
    init() {
      this.isProcessing = false
      this.isComplete = false
    }
  },
};
</script>