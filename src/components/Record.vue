<template>
  <div class="w-100 d-flex flex-column align-items-center">
    <div
      v-for="record in records"
      :key="record._id"
      class="data-wrap my-3 border w-100"
    >
      <div class="w-100 d-flex justify-content-end">
        <div class="badge badge-pill click-counter-icon mt-2 mr-4">
          <i class="fas fa-mouse-pointer mr-1"></i>{{ record.click }}
        </div>
      </div>
      <div
        class="record-wrapper d-flex justify-content-center align-items-center w-100"
      >
        <div class="meta-data-wrapper ml-3 mr-4">
          <div>
            <img
              :src="
                record.img ||
                'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'
              "
              class="meta-image rounded"
            />
          </div>
          <div class="preview-info mt-2">
            <p class="preview-title">
              {{ record.title }}
            </p>
            <p class="preview-des">{{ record.description }}</p>
          </div>
        </div>
        <div class="url-wrapper mr-4" style="width: 65%">
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
                :value="domain + record.shortUrl"
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
      <div class="w-100 d-flex justify-content-end align-items-center">
        <div class="badge badge-pill clock-icon">
          <i class="far fa-clock mr-1"></i>{{ record.createdAt | formatDate }}
        </div>
        <div>
          <i
            class="delete-icon fas fa-times mt-n3 mr-1 pt-4 pl-4 pr-4 pb-2"
            @click="handleDeleteButtonClick(record._id)"
          ></i>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import mixins from "../utils/mixins";
import moment from "moment";

export default {
  name: "Record",
  props: {
    initialRecords: {
      type: Array,
    },
  },
  data() {
    return {
      records: this.initialRecords,
      domain: process.env.VUE_APP_DOMAIN,
    };
  },
  filters: {
    formatDate: function (dataTime) {
      return moment(dataTime).format("YYYY/MM/DD HH:mm");
    },
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