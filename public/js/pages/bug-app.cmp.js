import bugService from "../services/bug.service.js";
import userService from "../services/user.service.js";

export default {
    name: 'bug-app',
    template: `
    <section class="bug-app">
        <h1>Bugs App</h1>
        <router-link to="/bugApp/edit">Add Bug</router-link>
        <input type="text" v-model="filterBy.txt" @input="filterBugs" />
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Vendor</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bug in bugs">
                    <td>{{bug.id}}</td>
                    <td>{{bug.vendor}}</td>
                    <td>
                        <router-link :to="'/bugApp/'+bug.id">Details</router-link> |
                        <router-link :to="'/bugApp/edit/'+bug.id">Edit</router-link>
                        <button @click="removeBug(bug.id)">x</button>
                    </td>
                </tr>
            </tbody>
            <button @click="changePage(1)">Next</button>
            <button @click="changePage(-1)">Prev</button>
        </table>
    </section>
    `,
    data() {
        return {
            bugs: [],
            filterBy: { txt: '', page: 1 }
        }
    },
    created() {
        if (!userService.getLoggedinUser()) this.$router.push('/')
        this.loadBugs();
    },
    methods: {
        loadBugs() {
            bugService.query(this.filterBy)
                .then(bugs => this.bugs = bugs)
        },
        removeBug(bugId) {
            bugService.remove(bugId)
                .then(res => {
                    console.log('DELETE SUCCESFULY');
                    const idx = this.bugs.findIndex(bug => bug.id === bugId)
                    this.bugs.splice(idx, 1)
                    // swal()
                }).
                catch(err => {
                    console.log('Could not delete');
                })
        },
        filterBugs() {
            this.loadBugs();
        },
        changePage(diff) {
            this.filterBy.page += diff;
            this.loadBugs();
        }
    }

}