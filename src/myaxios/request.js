import axios from 'axios'
import store from '../store/index.js'
import Vue from 'vue'
import router from '../router/index.js'



export function request(config) {
	const instance = axios.create({
		//baseURL:'http://192.168.58.133:1111'
		baseURL:'http://127.0.0.1:7101'
	})
	
	instance.interceptors.request.use(
	config => {
		//window.localStorage.setItem('token', 'shiyan')
		let path = config.url
		let zhenzhe = /\/all/
		if(!zhenzhe.test(path)) { 
			if(config.headers.token==null&&config.headers.token==undefined) {
				Vue.prototype.notifyError("未登入")
				store.dispatch('setShowLogin',true)
				return 
			}
		}
		return config
	},
	error => {
	  // 跳转error页面
	  //router.push({ path: "/error" })
	  return Promise.reject(error)
	}
	)
	
	instance.interceptors.response.use(
	  res => {
	    return res;
	  },
	  error => {
		if (error.response.status == "406") {
		  // Vue.prototype.notifyError("登入过期请重新登入");
		  // store.dispatch("setShowLogin", true);
		  let username =''
		  let password =''
		  if (localStorage.getItem("user")) {
		  	let user = JSON.parse(localStorage.getItem("user"))
		  	username = user.username
		  	password = user.password
		  	
		  }else {
			Vue.prototype.notifyError("登入过期请重新登入");
			store.dispatch("setShowLogin", true);
		  	return	
		  }
		  return request({
		    method: 'post',
		    url: '/user/all/denru',
		    data: {username,password},
		    headers: {'token': window.localStorage.getItem('token')},
		  }).then(response => {
		  	if(response.data.code==200) {
		  		window.localStorage.setItem('token', response.data.data.token)
		  		let user = JSON.stringify(response.data.data);
		  		window.localStorage.setItem("user", user);
		  		Vue.prototype.notifySucceed("------实验-----")
				console.log(window.localStorage.getItem('token'))
		  		response.data.data.icon ='http://127.0.0.1:7003/img/'+response.data.data.icon
		  		store.commit('login', {users:response.data.data,data:false});
				error.response.config.headers.token = window.localStorage.getItem('token')
				return instance.request(error.response.config)
		  	} else if (response.data.code==400) {
				store.commit('login', {users:'',data:true});
				window.localStorage.setItem("user", "")
				window.localStorage.setItem('token',"")
				router.push({ path: "/home" })
				Vue.prototype.notifyError("登入过期请重新登入");
				return
		  	}
		  }).catch((error) => {
		    console.log(error)
		   Vue.prototype.notifyError("连接失败")
		  })
		}
	    return Promise.reject(error);
	  }
	);
	
	return instance(config)
}