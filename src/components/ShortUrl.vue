<template>
  <div class="data-wrap mt-2">
    <form
      action="/"
      method="POST"
      class="w-100 d-flex flex-column align-items-center"
    >
      <div class="text-left w-75">
        <div>
          Short URL
          <i class="copy-icon copy-link far fa-clone ml-3"
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
          <i class="copy-icon copy-link far fa-clone ml-3"
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
import mixins from "../utils/mixins"

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
};
</script>