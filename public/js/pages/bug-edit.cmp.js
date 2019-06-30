import bugService from "../services/bug.service.js";

export default {
    name: 'bug-edit',
    template: `
    <section class="bug-edit">
        <h1>Bug Edit</h1>
        <form @submit.prevent="saveBug">
            <input v-model="bug.vendor" type="text" placeholder="Bug Vendor" autofocus>
            <button>Save</button>
        </form>
    </section>
    `,
    data() {
        return {
            bug: { vendor: '' }
        }
    },
    created() {
        const {id} = this.$route.params;
        if (id) {
            bugService.getById(id)
                .then(bug => this.bug = bug)
        }
    },
    methods: {
        saveBug() {
            bugService.save(this.bug)
            .then(bug => {
                console.log('Saved Bug:', bug);
                this.$router.push('/bugApp');
            })
        }
    }
}