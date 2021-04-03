<template>
  <div class="index-input-wrapper">
    <form
      @submit.prevent.stop="handleSubmitButtonClick(originalUrl)"
      class="w-100 d-flex flex-column align-items-center"
    >
      <div class="w-75">
        <input
          v-model="originalUrl"
          required
          type="url"
          name="url"
          placeholder="Shorten your link"
          class="input-area w-100 text-center"
        />
      </div>
      <button
        :disabled="isLoading"
        type="submit"
        class="submit-btn index-submit-btn btn w-25 
        mt-md-5
        mb-3
        mb-md-4
        "
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
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      originalUrl: "",
    };
  },
  methods: {
    handleSubmitButtonClick(originalUrl) {
      this.$emit("after-submit", originalUrl);
    },
  },
};
</script>

<style>
.input-area {
  border: none;
  border-bottom: 1px solid #ececec;
  outline: none;
  background: transparent;
  border-radius: 0;
  letter-spacing: 1px;
  font-size: x-small;
}

.valid-input-area {
  border: none;
  outline: none;
}

.input-area,
.logo a,
.logo a:hover,
.valid-input-area,
.valid-input-area:focus,
.m-description {
  color: #2e2e2e;
}

@media (max-width: 576px) {
  .index-input-wrapper {
    margin-top: 70px;
  }

  .input-area {
    letter-spacing: 1px;
    font-size: 0.5rem;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .index-input-wrapper {
    margin-top: 125px;
  }

  .input-area {
    letter-spacing: 1px;
    font-size: 0.5rem;
    margin-bottom: 30px;
  }
}

@media (min-width: 769px) {
  .index-input-wrapper {
    margin-top: 125px;
  }

  .input-area {
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
}
</style>