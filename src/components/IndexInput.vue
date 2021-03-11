<template>
  <div class="data-wrap mt-4">
    <form
      @submit.prevent.stop="handleSubmitButtonClick(originalUrl)"
      class="w-100 d-flex flex-column align-items-center"
    >
      <div style="height: 50px" class="w-75">
        <input
          v-model="originalUrl"
          required
          type="url"
          name="url"
          placeholder="Please enter URL here"
          class="input-area w-100 text-center"
        />
      </div>
      <button
        :disabled="isProcessing"
        type="submit"
        class="submit-btn btn w-25"
      >
        Shorten
      </button>
    </form>
  </div>
</template>

<script>

export default {
  name: "IndexInput",
  props: {
    isProcessing: {
      type: Boolean
    }
  },
  data() {
    return {
      originalUrl: ''
    }
  },
  methods: {
     handleSubmitButtonClick(originalUrl) {
      this.$emit('after-submit', originalUrl)
    },
  },
};
</script>