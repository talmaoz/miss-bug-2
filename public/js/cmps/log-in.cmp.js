

import userService from '../services/user.service.js'

export default {
    template: `
        <section class="log-in">
            <form @submit.prevent="login">
                <input type="text" v-model="user.name" placeholder="Your name">
                <input type="password" v-model="user.pass" placeholder="Your password">
                <button>Login</button>
            </form>
        </section>
    
    `,
    data(){
        return {
            user: {name: '', pass: ''}
        }
    },
    methods: {
        login() {
            console.log('Logged in: ', this.user)
            userService.login(this.user)
                .then(user => {
                    this.$router.push('/bugApp')
                })
        }
    }
}
