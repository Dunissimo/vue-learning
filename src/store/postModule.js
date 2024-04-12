import axios from "axios";

export const postModule = {
    namespaced: true,
    state: () => ({
        posts: [],
        isLoading: true,
        selectedSort: '',
        selectedType: 'pagination',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ],
        typeOptions: [
            {value: 'pagination', name: 'Пагинация'},
            {value: 'intersection', name: 'Бесконечная лента'},
        ],
        searchByTitle: '',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),

    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((a, b) => {
                return a[state.selectedSort]?.localeCompare(b[state.selectedSort]);
            });
        },
        sortedAndFiltered(state, getters) {
            console.log(getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchByTitle.toLowerCase())))
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchByTitle.toLowerCase()));
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, value) {
            state.isLoading = value;
        },
        setSelectedSort(state, value) {
            state.selectedSort = value;
        },
        setSelectedType(state, value) {
            state.selectedType = value;
        },
        setSearchByTitle(state, value) {
            state.searchByTitle = value;
        },
        setPage(state, value) {
            state.page = value;
        },
        setTotalPages(state, value) {
            state.totalPages = value;
        }
    },

    actions: {
        async fetchPosts({state, commit}) {
            state.posts = [];
            state.page = 1;

            try {
                commit('setLoading', true);

                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit));
                commit('setPosts', res.data)
            } catch (e) {
                commit('setLoading', false);
                alert('Error! ' + e.message);
            } finally {
                commit('setLoading', false);
            }
        },

        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1)

            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });

                commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...res.data]);
            } catch (e) {
                alert('Error! ' + e.message);
            }
        }
    },
}