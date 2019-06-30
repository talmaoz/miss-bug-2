import bugService from "../services/bug.service.js";
import utilService from "../services/util.service.js";

export default {
    name: 'bug-details',
    template: `
    <section class="bug-details" v-if="bug">
        <h1>Bug Details</h1>
        <h3>ID: {{bug._id                       }}</h3>
        <h3>Creator: {{bug.creator.name         }}</h3>
        <h2>Title: {{bug.title                  }}</h2>
        <h3>Description: {{bug.description      }}</h3>
        <h3>Severity: {{bug.severity            }}</h3>
        <h3>Created At: {{getDate(bug.createdAt)}}</h3>
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
    },
    methods: {
        getDate(createdAt) {
            return utilService.getTime(createdAt)
        },
    },
}