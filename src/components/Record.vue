<template>
  <div id="Record" class="w-100">
    <transition-group name="list-complete" tag="div" class="w-100">
      <div
        v-for="record in records"
        :key="record._id"
        class="record-wrapper data-wrap my-3 border list-complete-item mx-auto"
      >
        <div class="d-flex justify-content-end">
          <div class="badge badge-pill click-counter-icon mt-2 mr-4">
            <i class="fas fa-mouse-pointer mr-1"></i>{{ record.click }}
          </div>
        </div>
        <div
          class="record-info-wrapper d-flex justify-content-center align-items-center"
        >
          <div
            class="meta-data-wrapper ml-3 mr-4 d-flex flex-column align-items-center justify-content-center"
          >
            <div class="meta-image-wrapper">
              <img
                :src="
                  record.img ||
                  'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'
                "
                class="meta-image rounded"
              />
            </div>
            <div class="preview-info mt-2">
              <p class="preview-title text-center">
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
        <div class="d-flex justify-content-end align-items-center">
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
    </transition-group>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
import mixins from "../utils/mixins";
import moment from "moment";

export default {
  name: "Record",
  props: {
    records: {
      type: Array,
    },
  },
  data() {
    return {
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

<style>
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(500px);
}
.copy-icon {
  color: #82a5c7;
  cursor: pointer;
  transition-duration: 0.5s;
}

.copy-icon:hover {
  color: #5a728a;
  text-decoration: transparent;
  transition-duration: 0.5s;
}

.delete-icon {
  color: #e2eaf1;
  cursor: pointer;
  transition-duration: 0.5s;
}

.delete-icon:hover {
  color: #82a5c7;
  transition-duration: 0.5s;
}

.click-counter-icon {
  background-color: #82a5c7;
  color: #ffffff;
}

.clock-icon {
  /* background-color: #a6acb1; */
  color: #82a5c7;
}

.preview-title {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.preview-des {
  font-size: 0.5rem;
  line-height: 0.9rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.meta-data-wrapper {
  width: 35%;
}

.record-info-wrapper {
  height: 100%;
}

.meta-image {
  max-width: 100%;
  max-height: 100%;
  display: block; 
  margin: auto;
}

@media (max-width: 576px) {
  .record-info-wrapper {
    max-height: 200px;
    max-width: 100%;
  }

  .meta-image-wrapper {
    width: 125px;
    height: 70px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .record-info-wrapper {
    max-height: 250px;
    max-width: 100%;
  }

  .meta-image-wrapper {
    width: 140px;
    height: 90px;
  }
}

@media (min-width: 769px) {
  .record-info-wrapper {
    max-height: 330px;
    max-width: 100%;
  }

  .meta-image-wrapper {
    width: 160px;
    height: 120px;
  }

  .preview-des {
    font-size: 0.9rem;
    line-height: 1rem;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}
</style>