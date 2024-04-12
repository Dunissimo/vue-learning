import axios from "axios";
import {onMounted, ref, watch} from "vue";

export const usePosts = (limit) => {
    const posts = ref([]);
    const totalPages = ref(0);
    const isLoading = ref(true);

    const fetching = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });

            totalPages.value = Math.ceil(res.headers['x-total-count'] / limit);
            posts.value = res.data;
        } catch(e) {
            isLoading.value = false;
            alert('Error! ' + e.message);
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(fetching);

    return {
        posts, isLoading, totalPages
    }
}