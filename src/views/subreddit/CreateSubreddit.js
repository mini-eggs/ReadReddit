import Subreddit from './Subreddit.vue'
export function createSubreddit (Obj) {
    return {
        render (h) {
            return h(Subreddit, { props: { Obj }})
        }
    }
}
