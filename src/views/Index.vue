<template>
  <section class="border">
    <div class="text-center d-flex flex-column">
      <div class="manager d-flex justify-content-end">
        <router-link
          to="/manager"
          class="manager-icon fas fa-list mt-3 mr-3"
        ></router-link>
      </div>
      <div class="logo mt-3">
        <router-link to="/"
          >URL SHORTENER<i class="fas fa-link fa-lg ml-2"></i
        ></router-link>
      </div>
      <IndexInput 
      v-if="!isComplete"
      :is-proccessing="isProcessing"
      @after-submit="afterSubmit"
      />
      <ShortUrl v-else />
    </div>
  </section>
</template>

<script>
import { apiHelper, Toast } from "../utils/helpers";
import IndexInput from "./../components/IndexInput"
import ShortUrl from "./../components/ShortUrl"

export default {
  name: "Index",
  components: {
    IndexInput,
    ShortUrl
  },
  data() {
    return {
      isProcessing: false,
      isComplete: false,
    };
  },
  methods: {
    async afterSubmit(originalUrl) {
      try {
        this.isProcessing = true;
        await apiHelper.post("/urls", {
          originalUrl
        });
        
        Toast.fire({
          icon: "success",
          title: "Success",
        });
        return (this.isComplete = true);
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "Please enter valid URL",
        });
        console.log(err);
      }
    },
  },
};
</script>