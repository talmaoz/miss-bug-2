
import logIn from '../cmps/log-in.cmp.js'
import signUp from '../cmps/sign-up.cmp.js'


export default {
    name: 'TheHomePage',
    template: `
    <section class="home-page">
        <h1>Cars HOME</h1>
        <log-in></log-in>
        <sign-up></sign-up>
    </section>
    `,
    components: {
        logIn,
        signUp
    }
    
}