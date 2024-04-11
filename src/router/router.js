import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PostsPage from "@/pages/PostsPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageStore from "@/pages/PostsPageStore.vue";

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/posts',
        component: PostsPage,
    },
    {
        path: '/posts/:id',
        component: PostPage,
    },
    {
        path: '/posts-store',
        component: PostPageStore,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;