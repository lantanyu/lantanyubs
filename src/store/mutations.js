import {ADD_TODO} from './mutations-type.js'
export default {
  setUser (state, data) {
    state.user = data;
  },
  setShowLogin (state, data) {
    state.showLogin = data;
  },
  setisRegister (state, data) {
	  state.isRegister = data
  },
  setisfabu (state, data) {
	  state.isfabu = data
  },
  setisfabugenxin (state, data) {
	  state.isfabugenxin = data
  },
  suoyeupproducts (state, {sproducts}) {
	sproducts.forEach(product => {
		product.usericon = 'http://127.0.0.1:7003/img/'+product.usericon
		let arrstr = product.pic.split(';')
		let arrstr2 = []
		arrstr.forEach(str => {
			if(str!=='') {
				str = 'http://127.0.0.1:7003/img/'+str
				arrstr2.push(str)
			}
		})
		product.pic = arrstr2 
	})
	state.sproducts = sproducts
	if(sproducts.length>0){
		state.totals = sproducts[0].total
	}else {
		state.totals = 0
	}
	
  },
  productsbyname (state, {sproducts}) {
  	sproducts.forEach(product => {
  		product.usericon = 'http://127.0.0.1:7003/img/'+product.usericon
  		let arrstr = product.pic.split(';')
  		let arrstr2 = []
  		arrstr.forEach(str => {
  			if(str!=='') {
  				str = 'http://127.0.0.1:7003/img/'+str
  				arrstr2.push(str)
  			}
  		})
  		product.pic = arrstr2 
  	})
  	state.productsbyname = sproducts
  	if(sproducts.length>0){
  		state.totalsbyname = sproducts[0].total
  	}else {
		state.totalsbyname = 0
	}
  	
  },
  productsbyname2 (state, {sproducts,total}) {
  	sproducts.forEach(product => {
  		product.usericon = 'http://127.0.0.1:7003/img/'+product.usericon
  		let arrstr = product.pic.split(';')
  		let arrstr2 = []
  		arrstr.forEach(str => {
  			if(str!=='') {
  				str = 'http://127.0.0.1:7003/img/'+str
  				arrstr2.push(str)
  			}
  		})
  		product.pic = arrstr2 
  	})
  	state.productsbyname = sproducts
  	if(sproducts.length>0){
  		state.totalsbyname = total
  	}else {
  		state.totalsbyname = 0
  	}
  	
  },
  
productbyid (state, {products}) {
	let arrstr = products.pic.split(';')
	let arrstr2 = []
	arrstr.forEach(str => {
		if(str!=='') {
			str = 'http://127.0.0.1:7003/img/'+str
			arrstr2.push(str)
		}
	})
	products.pic = arrstr2
	// if(products.usericon!=null){
	// 	products.usericon = 'http://127.0.0.1:7003/img/'+products.usericon
	// }
	// products.comments.forEach(comment => {
	// 	if(comment.icon!=null){
	// 	  comment.icon = 'http://127.0.0.1:7003/img/'+comment.icon
	// 	}
	// 	comment.bycomments.forEach(bycomment => {
	// 	  if(comment.icon!=null){
	// 		  bycomment.icon = 'http://127.0.0.1:7003/img/'+bycomment.icon
	// 	  }
	// 	})
	// })  
  
  state.products = products
},
login (state,{users,data}) {
	state.user = users;
    state.showLogin = data;
},
settotals (state) {
	state.totals =0
},
settotalsbyname (state) {
	state.totalsbyname =0
},
productsbymy (state,{sproducts}) {
	sproducts.forEach(product => {
		product.usericon = 'http://127.0.0.1:7003/img/'+product.usericon
		let arrstr = product.pic.split(';')
		let arrstr2 = []
		arrstr.forEach(str => {
			if(str!=='') {
				str = 'http://127.0.0.1:7003/img/'+str
				arrstr2.push(str)
			}
		})
		product.pic = arrstr2 
	})
	state.productsbymy = sproducts
	if(sproducts.length>0){
		state.totalsbymy = sproducts[0].total
	}else {
		state.totalsbymy = 0
	}
	
},
getcount(state,{count}) {
	state.count = count
},
creatcomment(state,{comment}) {
	state.products.comments.push(comment)
},
creatbycomment(state,{comment,bycomment}) {
	comment.bycomments.push(bycomment)
}
}
