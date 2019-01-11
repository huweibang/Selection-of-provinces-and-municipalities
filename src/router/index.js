import Vue from 'vue'
import Router from 'vue-router'

//门店加盟
import storeJoin from '@/pages/store-join';

Vue.use(Router)

//刷新页面赋值store
// if (sessionStorage.getItem('userInfo')) {  
//     let result = sessionStorage.getItem('userInfo');
//     store.commit('USER_TOKEN', JSON.parse(result));  
// }

const router =  new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'storeJoin',
            component: storeJoin
        }
    ]
})


// const whiteList = ['/'];  //设置不需要登录的白名单页面
// router.beforeEach((to, from, next) => {

//     if (whiteList.indexOf(to.path) > -1) {
//         next();
//     } else {
//         if(sessionStorage.userInfo){
//             let result = JSON.parse(sessionStorage.userInfo);
//             if (!result.token && to.path !== '/') {
//                 next({ path: '/' });
//             } else {
//                 next();
//             }
//         }else{
//             next({ path: '/' });
//         }
        
//     }
// })


export default router;