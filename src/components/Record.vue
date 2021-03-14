<template>
  <div class="w-100 d-flex flex-column align-items-center">
    <div
      v-for="record in records"
      :key="record._id"
      class="data-wrap my-3 border w-100"
    >
      <form
        action="/"
        method="POST"
        class="w-100 d-flex flex-column align-items-center mt-3"
      >
        <div class="w-100 d-flex justify-content-end">
          <div class="badge badge-pill click-counter-icon mr-3">
            {{ record.click }}
          </div>
        </div>
        <div class="text-left w-75">
          <div>
            Short URL
            <i
              class="copy-icon copy-link far fa-clone ml-3"
              :data-clipboard-target="'#short-url-' + record._id"
            ></i>
          </div>
          <input
            required
            :id="'short-url-' + record._id"
            type="url"
            name="url"
            placeholder="Please enter URL here"
            class="input-area w-100"
            :value="baseURL + record.shortUrl"
          />
        </div>
        <div class="text-left w-75 mt-4">
          <div>
            Original URL
            <i
              class="copy-icon copy-link far fa-clone ml-3"
              :data-clipboard-target="'#original-url-' + record._id"
            ></i>
          </div>
          <input
            required
            :id="'original-url-' + record._id"
            type="url"
            name="url"
            placeholder="Please enter URL here"
            class="input-area w-100"
            :value="record.originalUrl"
          />
        </div>
        <div 
        class="w-100 text-right"
        @click="handleDeleteButtonClick(record._id)">
          <i class="delete-icon fas fa-times mr-2 p-3"></i>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import mixins from "../utils/mixins";

export default {
  name: "Record",
  props: {
    records: {
      type: Array,
    },
  },
  data() {
    return {
      baseURL: "https://url-shortener-api-server.herokuapp.com/api",
    };
  },
  mixins: [mixins],
  mounted() {
    this.initClipboard();
  },
  methods: {
    handleDeleteButtonClick(recordId) {
      this.$emit("after-delete", recordId);
    },
  },
};
</script>