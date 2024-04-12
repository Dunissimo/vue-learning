import {computed, ref} from "vue";

export const useSortedAndFilteredPosts = (sortedPosts) => {
    const searchByTitle = ref('');

    const sortedAndFilteredPosts = computed(() => {
        return [...sortedPosts.value]
            .filter(post => post.title.toLowerCase().includes(searchByTitle.value.toLowerCase()));
    });

    return {
        sortedAndFilteredPosts, searchByTitle
    }
}