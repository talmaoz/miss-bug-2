import userService from "../services/user.service.js";
import eventBus, {USER_LOGIN} from '../eventBus.js'


export default {
    template: `
        <header>
        <h1>Miss Bug</h1>
        <div v-if="user">
            {{user.name}}
            <button @click="logout">Logout</button>
        </div>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/bugApp">Bugs App</router-link>
        
        </nav>
        
        </header>
    `,
    data() {
        return {
            user: userService.getLoggedinUser()
        }
    },
    created() {
        eventBus.$on(USER_LOGIN, this.reloadUser)
    },
    methods: {
        logout() {
            userService.logout().then(()=>{
                this.reloadUser();
                this.$router.push('/')
            })
            
        },
        reloadUser() {
            console.log('this.user (app-header) = ', this.user)
            this.user = userService.getLoggedinUser();
        }
    }



}