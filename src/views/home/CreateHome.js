import Page from './Home.vue'
export function createPage (wordpressObj) {
    return {
        render (h) {
            return h(Page, { props: { wordpressObj }})
        }
    }
}
