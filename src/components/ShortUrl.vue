<template>
  <div class="data-wrap mt-5 mb-3">
    <form
      action="/"
      method="POST"
      class="w-100 d-flex flex-column align-items-center"
    >
      <div class="text-left w-75">
        <div>
          Short URL
          <i
            class="copy-icon copy-link far fa-clone ml-3"
            data-clipboard-target="#short-url"
          ></i>
        </div>
        <input
          required
          id="short-url"
          type="url"
          name="url"
          placeholder="Please enter URL here"
          class="input-area w-100"
          :value="shortUrl"
        />
      </div>
      <div class="text-left w-75 mt-4 mt-sm-3 mt-md-5">
        <div>
          Original URL
          <i
            class="copy-icon copy-link far fa-clone ml-3"
            data-clipboard-target="#original-url"
          ></i>
        </div>
        <input
          required
          id="original-url"
          type="url"
          name="url"
          placeholder="Please enter URL here"
          class="input-area w-100"
          :value="originalUrl"
        />
      </div>
    </form>
    <div class="mt-3">
      <div @click="backToIndexPage()" class="submit-btn btn mr-3"
        >Create another</div>
      <router-link to="/manager" class="submit-btn btn ml-3"
        >Short URL Manager</router-link
      >
    </div>
  </div>
</template>

<script>
import mixins from "../utils/mixins";

export default {
  name: "ShortUrl",
  props: {
    shortUrl: {
      type: String,
      require: true,
    },
    originalUrl: {
      type: String,
      require: true,
    },
  },
  mixins: [mixins],
  mounted() {
    this.initClipboard();
  },
  methods: {
    backToIndexPage() {
      this.$store.commit("switchState", {
        status: "isComplete",
        boolean: false,
      });
    },
  },
};
</script>