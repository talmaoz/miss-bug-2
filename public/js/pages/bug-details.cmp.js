import bugService from "../services/bug.service.js";

export default {
    name: 'bug-details',
    template: `
    <section class="bug-details" v-if="bug">
        <h1>Bug Details - {{bug.vendor}}</h1>
        {{bug}}
       
    </section>
    `,
    data() {
        return {
            bug: null
        }
    },
    created() {
        const {id} = this.$route.params
        bugService.getById(id)
            .then(bug => this.bug = bug)
    }
    
}