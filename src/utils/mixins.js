import Clipboard from "clipboard";
import { Toast } from "./helpers";

export default {
  methods: {
    initClipboard() {
      const clipboard = new Clipboard(".copy-link");
      clipboard.on("success", () => {
        Toast.fire({
          icon: "success",
          title: "Copied!",
        });
        console.log("copy successfully");
      });
      clipboard.on("error", () => {
        Toast.fire({
          icon: "warning",
          title: "Something wrong ...",
        });
        console.log("copy fail");
      });
    },
  }
}