import { createApp } from 'vue';
import App from './App.vue';
import ui from '@/components/UI'
import router from "@/router/router";

const app = createApp(App);

ui.forEach((component) => {
    app.component(component.name, component);
});

app.use(router).mount('#app');
