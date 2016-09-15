import Subreddit from './Thread.vue'
export function createThread (Obj) {
    return {
        render (h) {
            return h(Subreddit, { props: { Obj }})
        }
    }
}
