import AppMessage from "./app-message.vue";
import AppButton from "./app-button.vue";
import Message from "./Message";

// 全局注册
export default {
  install(app) {
    app.component(AppButton.name, AppButton);
    app.component(AppMessage.name, AppMessage);
    app.config.globalProperties.$message = Message;
  },
};
