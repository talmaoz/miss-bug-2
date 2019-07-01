

import userService from '../services/user.service.js'

export default {
    template: `
        <section class="sign-up">
            <form @submit.prevent="signup">
                <input type="text" v-model="user.name" placeholder="Your name">
                <input type="password" v-model="user.pass" placeholder="Your password">
                <input type="password" v-model="user.repass" placeholder="Your password again">
                <button>Signup</button>
            </form>
        </section>
    
    `,
    data(){
        return {
            user: {name: '', pass: '', repass: ''}
        }
    },
    methods: {
        signup() {
            if (this.user.pass !== this.user.repass) return;
            delete this.user.repass
            userService.signup(this.user)
                .then(user => {
                    this.$router.push('/bugApp')
                })
        }
    }


}