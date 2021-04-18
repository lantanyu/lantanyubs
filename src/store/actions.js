import {ADD_TODO} from './mutations-type.js'
import axios from 'axios'
import {request} from '../myaxios/request.js'
import Vue from 'vue'
// import {myrq} from '../main.js'
export default {
  setUser ({ commit }, data) {
    commit('setUser', data);
  },
  setShowLogin ({ commit }, data) {
    commit('setShowLogin', data);
  },
  setisRegister({ commit }, data) {
	commit('setisRegister', data);
  },
  setisfabu({ commit }, data) {
  	commit('setisfabu', data);
  },
  
  suoyeupproducts({commit},{yie}) {
	  let i = yie-1
	  // let urls = 'http://127.0.0.1:7003/product/getproductbyalluser/'+i
   //  axios({
   //    method: 'get',
   //    //url: 'http://192.168.58.133:1111/product/denru',
   //    url: urls,
   //    headers: {'token': window.localStorage.getItem('token')},
   //  }).then(response => {
   //    const sproducts = response.data.data
   //    commit('suoyeupproducts',{sproducts})
   //  }).catch((error) => {
   //    console.log(error)
   //    alert('连接失败')
   //  })
	
	let urls = '/product/all/getproductbyalluser/'+i
	request({
	  method: 'get',
	  //url: 'http://192.168.58.133:1111/product/denru',
	  url: urls,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
	  const sproducts = response.data.data
	  commit('suoyeupproducts',{sproducts})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
  },
  productbyid({commit},{productid}) {
	  let urls = '/product/all/getproductxxbyid/'+productid
	  request({
	    method: 'get',
	    url: urls,
	    headers: {'token': window.localStorage.getItem('token')},
	  }).then(response => {
		if(response.data.data!=null) {
			const products = response.data.data
			commit('productbyid',{products})
		}
	  }).catch((error) => {
	    console.log(error)
	    Vue.prototype.notifyError("连接失败")
	  })
  },
login ({commit},{username,password}) {
	let urls = '/user/all/denru'
	request({
	  method: 'post',
	  url: urls,
	  data: {username,password},
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		if(response.data.code==200) {
			window.localStorage.setItem('token', response.data.data.token)
			let user = JSON.stringify(response.data.data);
			window.localStorage.setItem("user", user);
			Vue.prototype.notifySucceed("登入成功")
			response.data.data.icon ='http://127.0.0.1:7003/img/'+response.data.data.icon
			commit('login', {users:response.data.data,data:false});
		} else if (response.data.code==400) {
			Vue.prototype.notifyError("密码错误")
		}else {
			Vue.prototype.notifyError("登入失败2")
		}
	}).catch((error) => {
	  console.log(error)
	 Vue.prototype.notifyError("连接失败")
	})
},
zhuche ({commit},{username,password}) {
	let urls = '/user/all/zhuche'
	request({
	  method: 'post',
	  url: urls,
	  data: {username,password},
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		if(response.data.code==402) {
			Vue.prototype.notifyError("存在用户名")
		} else if (response.data.code==200) {
			Vue.prototype.notifySucceed("注册成功")
			commit('setisRegister', false);
		}else {
			Vue.prototype.notifyError("注册失败")
		}
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
},
getproductbysearch ({commit},{search,yie}) {
	let i = yie-1
	let urls = '/product/all/getproductbyname/'+search+'/'+i
	request({
	  method: 'get',
	  url: urls,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		const sproducts = response.data.data
		commit('productsbyname',{sproducts})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
},
getproductbyfenlei ({commit},{fenlei2id,yie}) {
	request({
	  method: 'get',
	  url: `/product/all/getproductbyfenlei2/${fenlei2id}/${yie}`,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		const sproducts = response.data.data.list
		const total = response.data.data.total
		commit('productsbyname2',{sproducts,total})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
},
productsbyall({commit},{yie}) {
	let i = yie-1
	let urls = '/product/all/getproductbyalluser/'+i
	request({
	  method: 'get',
	  url: urls,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
	  const sproducts = response.data.data
	  commit('productsbyname',{sproducts})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
},
settotalsbyname({commit}) {
	commit('settotalsbyname')
},
getproductbymy({commit},{yie}){
	let i = yie-1
	let urls = '/product/getproduct/'+i
	let urls2 ='/user/getcount'
	request({
	  method: 'get',
	  url: urls,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
	  const sproducts = response.data.data
	  commit('productsbymy',{sproducts})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
	request({
	  method: 'get',
	  url: urls2,
	  headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
	  const count = response.data.data
	  commit('getcount',{count})
	}).catch((error) => {
	  console.log(error)
	  Vue.prototype.notifyError("连接失败")
	})
},
creatcomment({commit},{comment}) {
	request({
		method: 'post',
		url: `/product/creatcomment`,
		data: comment,
		headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		if(response.data.code==200){
			const comment2 = response.data.data
			commit('creatcomment',{comment: comment2})
			Vue.prototype.notifySucceed(response.data.message)
		}else {
			Vue.prototype.notifyError(response.data.message)
		}
	}).catch((error) => {
		console.log(error)
		Vue.prototype.notifyError("连接失败")
	})
},
creatbycomment({commit},{comment,bycomment}) {
	request({
		method: 'post',
		url: `/product/creatbycomment`,
		data: bycomment,
		headers: {'token': window.localStorage.getItem('token')},
	}).then(response => {
		if(response.data.code==200){
			const bycomment2 = response.data.data
			commit('creatbycomment',{comment:comment,bycomment: bycomment2})
			Vue.prototype.notifySucceed(response.data.message)
		}else {
			Vue.prototype.notifyError(response.data.message)
		}
	}).catch((error) => {
		console.log(error)
		Vue.prototype.notifyError("连接失败")
	})
}
}
