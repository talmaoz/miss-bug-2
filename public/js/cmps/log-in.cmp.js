

import userService from '../services/user.service.js'

export default {
    template: `
        <section class="log-in">
            <form @submit.prevent="login">
                <input type="text" v-model="user.userName" placeholder="Your username">
                <input type="password" v-model="user.pass" placeholder="Your password">
                <button>Login</button>
            </form>
        </section>
    
    `,
    data(){
        return {
            user: {userName: '', pass: ''}
        }
    },
    methods: {
        login() {
            console.log('Login', this.user)
            userService.login(this.user)
                .then(user => {
                    this.$router.push('/bugApp')
                })
        }
    }


}