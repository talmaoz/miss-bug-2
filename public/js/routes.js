
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import bugApp from './pages/bug-app.cmp.js'
import bugDetails from './pages/bug-details.cmp.js'
import bugEdit from './pages/bug-edit.cmp.js'

const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/bugApp', component: bugApp },
    { path: '/bugApp/edit/:id?', component: bugEdit },
    { path: '/bugApp/:id', component: bugDetails },
]

const router = new VueRouter({
    routes 
})
export default router;