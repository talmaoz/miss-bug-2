
import myRouter from './routes.js'

import appHeader from './cmps/app-header.cmp.js'

new Vue({
    el: '#app',
    template: `
        <section>
            <app-header></app-header>
            
            <router-view></router-view>
        </section>
    `,
    router: myRouter,
    components: {
        appHeader
    }

})
