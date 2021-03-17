<template>
  <div class="w-100 d-flex flex-column align-items-center">
    <div
      v-for="record in records"
      :key="record._id"
      class="data-wrap my-3 border w-100"
    >
      <div class="w-100 d-flex justify-content-end mb-n3">
        <div class="badge badge-pill click-counter-icon mt-2 mr-4">
          {{ record.click }}
        </div>
      </div>
      <div
        class="record-wrapper d-flex justify-content-center align-items-center w-100"
      >
        <div class="meta-data-wrapper ml-3 mr-4" style="width: 35%">
          <div class="preview-wrapper">
            <img :src="record.img" class="rounded" width="60%" />
            <div class="preview-info mt-2">
              <p class="preview-title">
                {{ record.title }}
              </p>
              <p class="preview-des">{{ record.description }}</p>
            </div>
          </div>
        </div>
        <div class="url-wrapper w-75 mr-4">
          <form>
            <div class="text-left">
              <div>
                Short URL
                <i
                  class="copy-icon copy-link far fa-clone ml-n3 pt-4 pl-4 pr-4"
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
            <div class="text-left mt-4">
              <div>
                Original URL
                <i
                  class="copy-icon copy-link far fa-clone ml-n3 pt-3 pl-4 pr-4"
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
          </form>
        </div>
      </div>
      <div class="w-100 text-right">
        <i
          class="delete-icon fas fa-times mt-n3 mr-1 pt-4 pl-4 pr-4 pb-2"
          @click="handleDeleteButtonClick(record._id)"
        ></i>
      </div>
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
      baseURL: "https://url-shortener-api-server.herokuapp.com/",
    };
  },
  mixins: [mixins],
  mounted() {
    this.initClipboard();
  },
  methods: {
    handleDeleteButtonClick(recordId) {
      this.$emit("after-delete", recordId);
      console.log("delete");
    },
  },
};
</script>