import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)
Vue.config.productionTip = false
Vue.use(ElementUI);

// import axios from 'axios'

// export function myrq (config) {
// 	const instance = axios.create({
// 		baseURL:'http://127.0.0.1:7003'
// 	})
	
// 	instance.interceptors.request.use(
// 	config => {
// 		store.dispatch('setShowLogin',true)
// 		Vue.prototype.notifySucceed("aa")
// 		return config
// 	},
// 	error => {
// 	  // 跳转error页面
// 	  //router.push({ path: "/error" })
// 	  return Promise.reject(error)
// 	}
// 	)
// 	return instance(config)
// }

router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user;
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (loginUser=="") {
      // 没有登录，显示登录组件
      store.dispatch("setShowLogin", true);
      if (from.name == null) {
        //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
        next("/");
        return;
      }
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});

Vue.prototype.notifySucceed = function (msg) {
    this.$notify({
      title: "成功",
      message: msg,
      type: "success",
      offset: 100
    });
  };
Vue.prototype.notifyError = function (msg) {
    this.$notify.error({
      title: "错误",
      message: msg,
      offset: 100
    });
  };

Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
