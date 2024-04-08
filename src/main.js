import { createApp } from 'vue';
import App from './App.vue';
import ui from '@/components/UI'

const app = createApp(App);

ui.forEach((component) => {
    app.component(component.name, component);
});

app.mount('#app');
