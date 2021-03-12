<template>
  <div class="data-wrap mt-2 border w-100">
    <form
      action="/"
      method="POST"
      class="w-100 d-flex flex-column align-items-center my-3"
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
      <div class="text-left w-75 mt-4">
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
  </div>
</template>

<script>
import Clipboard from "clipboard";

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
  mounted() {
    this.initClipboard();
  },
  methods: {
    initClipboard() {
      const clipboard = new Clipboard(".copy-link");
      clipboard.on("success", () => {
        console.log("copy successfully");
      });
      clipboard.on("error", () => {
        console.log("copy fail");
      });
    },
  },
};
</script>