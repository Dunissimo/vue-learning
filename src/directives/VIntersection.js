export default {
    name: 'intersection',
    mounted(el, binding) {
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && binding.value.page < binding.value.totalPages) {
                binding.value.func();
            }
        };

        el._obs = new IntersectionObserver(callback, options);
        el._obs.observe(el);
    },
    unmounted(el) {
        el?._obs?.unobserve(el);
    }
}