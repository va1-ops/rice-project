import { createRouter,createWebHistory } from 'vue-router'

const routes=[
    {path:'/', component:() => import('@/views/HomePage.vue')},
    {path:'/login', component:() => import('@/views/LoginPage.vue')},
    {path:'/about', component:() => import('@/components/Navbar-Top.vue')},
    {path:'/get', component:() => import('@/views/GetPage.vue')},
    {path:'/mangement', component:() => import('@/views/MangementPage.vue')},
    {path:'/getsee', component:() => import('@/views/GetSeePage.vue')},
    {path:'/help', component:() => import('@/views/HelpPage.vue')}
]

export default createRouter({
    history:createWebHistory(),
    routes
})

