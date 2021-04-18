<template>
	<div id ="you" class="clearfix">
		<div class="header clearfix">
			<div class="image">
				<img :src="'http://127.0.0.1:7003/img/'+user.icon" width="100%" height="100%"  />
			</div>
			<p>{{user.name}}<i class="el-icon-male" v-if="user.gender==0" style="color: #3A8EE6;"></i><i class="el-icon-female" v-if="user.gender==1" style="color: #ff4385;"></i></p>
			<div class="xinxi">
				<el-button type="success" @click="getuserlist(1)">关注数：{{count[0]}}</el-button>
				<el-button type="danger"  @click="getuserlist(2)">粉丝数：{{count[1]}}</el-button>
				<el-button v-if="true" type="info" @click="delectcount($event,user.userid)">关注</el-button>
			</div>
			<div style="margin-top: 30px;">
			<el-button style="margin-left: 1px;"  type="info">信用分：{{user.xingyongfen}}</el-button>
			<el-button  style="margin-left: 1px;" type="info">地区：{{user.city}}</el-button>
			</div>
		</div>
		
	<product1 :sproducts="products"></product1>
	
	<div style="background-color: #f1f1f1;" class="clearfix">
		<div id="yie" style="text-align: center;">
			<el-pagination background layout="prev, pager, next" :page-size="10" :total="total" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
		
	</div>
</template>

<script>
import product1 from '../components/product1.vue'
import {request} from '../myaxios/request.js'
import {mapState} from 'vuex'
export default {
	components: {
		product1,
	},
	activated() {
		if (this.$route.query.userid != undefined) {
			const userid = this.$route.query.userid
			request({
				  method: 'get',
				  url: `/user/all/userbyid/${userid}`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					console.log(response.data.code)
					if(response.data.code==200){
						this.user = response.data.data
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
			request({
				  method: 'get',
				  url: `/user/all/getcountid/${userid}`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					console.log(response.data.code)
					if(response.data.code==200){
						this.count = response.data.data
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
			this.getproduct(userid,1)
			
			return;
		}
	},
	mounted() {
		//this.$store.dispatch('getproductbymy',{yie:1}) 
	},
	methods: {
		handleCurrentChange(val) {
			this.getproduct(this.$route.query.userid,val)
		},
		getproduct(userid,yie) {
			yie = yie-1
			request({
				  method: 'get',
				  url: `/product/all/getproductbyid/${yie}/${userid}`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					console.log(response.data.code)
					if(response.data.code==200){
						this.products = response.data.data
						this.products.forEach(product => {
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
						if(this.products.length>0){
							this.total = this.products[0].total
						}else {
							this.total = 0
						}
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
		},
		delectcount(event,byuserid) {
			// window.open("http://www.baidu.com")
			request({
				  method: 'post',
				  url: `/user//concern/${byuserid}`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==201){
						this.notifySucceed(response.data.message)
						event.target.innerText = '未关注'
					}else if(response.data.code==200) {
						this.notifySucceed(response.data.message)
						event.target.innerText = '已关注'
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
			return
			
		},
		getuserlist(val) {
			this.$router.push({ path: "/userlist" ,query: { userid: this.user.userid,select: val}});
		}
	},
	data() {
		return {
			user: {icon: "null"},
			count: ['加载中','加载中'],
			products:[],
			total: 0
		}
	}
	
}	
</script>

<style>
#you{
	margin: 3px auto;
	width: 1300px;
	background-color: #f1f1f1;
}
#you .header {
	margin: 10px auto;
	width: 1200px;
	background-color: #fffeea;
	height: 300px;
}
#you .header .image {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	margin-top: 30px;
}
#you .header p {
	margin-top: 10px;
	text-align: center;
	font-family:"Helvetica Neue";
	font-weight: 900;
	font-size: 25px;
}
#you .header .xinxi {
	margin-top: 10px;
	text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
</style>
