import {createRouter, createWebHashHistory} from "vue-router";

const routes = [{
    path: '/',
    name: 'Index',
    component: import('./view/index.vue'),
}]

export default createRouter({
    routes,
    history: createWebHashHistory(),
})