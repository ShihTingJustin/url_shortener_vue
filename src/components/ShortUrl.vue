<template>
  <div class="data-wrap mt-2">
    <form
      action="/"
      method="POST"
      class="w-100 d-flex flex-column align-items-center"
    >
      <div class="text-left w-75">
        <div>Short URL<i class="copy-icon far fa-clone ml-3"></i></div>
        <input
          required
          type="url"
          name="url"
          placeholder="Please enter URL here"
          class="input-area w-100"
          :value="shortUrl"
        />
      </div>
      <div class="text-left w-75 mt-4">
        <div>Original URL<i class="copy-icon far fa-clone ml-3"></i></div>
        <input
          required
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
export default {
  name: "ShortUrl",
  props: {
    shortUrl: {
      type: String,
      require: true
    },
    originalUrl: {
      type: String,
      require: true
    },
  },
};
</script>