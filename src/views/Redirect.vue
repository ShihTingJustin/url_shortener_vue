<template>
  <div></div>
</template>

<script>
import { apiHelper } from "../utils/helpers";

export default {
  async created() {
    window.location.href = await this.redirectToOriginalUrl(this.$route.params);
  },
  methods: {
    async redirectToOriginalUrl(url) {
      const { data } = await apiHelper.get(`/${url.shortUrl}`);
      return data.data.originalUrl;
    },
  },
};
</script>