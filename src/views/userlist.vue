<template>
	<div id="userlist">
		<div class="confirmOrder-header">
		  <div class="header-content">
		    <p>
		      <i class="el-icon-user-solid"></i>
		    </p>
		    <p v-if="$route.query.select==1">我的关注</p>
			<p v-if="$route.query.select==2">我的粉丝</p>
		  </div>
		</div>
		<ul class="uls clearfix" :class="userlists.length<7 ? 'chang':''">
			<li class="clearfix" v-for="(user, index) in userlists" :key="user.userid">
				<router-link :to="{path: '/you', query: {userid: user.userid}}">
				<el-avatar style="float: left;" :size="60"  fit="fill" :src="'http://127.0.0.1:7003/img/'+user.icon"  >没头像</el-avatar>
				<div class="divtext">
					<p>{{user.name}}</p>
				</div>
				</router-link>
				<el-button  @click="delectcount($event,user.userid)">已关注</el-button>
			</li>
			
		</ul>
		<div style="background-color: #fafafa; width: 1300px; margin: 0 auto;" class="clearfix">
			<div class="duan" style="text-align: center;">
				<el-pagination background layout="prev, pager, next" :page-size="30" :total="total" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		
		
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	activated() {
		if (this.$route.query.userid != undefined&&this.$route.query.select != undefined) {
			this.getcountuser(1,this.$route.query.userid,this.$route.query.select)
			return;
		}
	},
	data() {
		return {
			userlists: [],
			total: 0,
		}
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.getcountuser(val,this.$route.query.userid,this.$route.query.select)
		},
		getcountuser(yie,userid,select) {
			if(select==1) {
				request({
					  method: 'get',
					  url: `/user/getcountcuser3/${yie}/0/${userid}`,
					  headers: {'token': window.localStorage.getItem('token')},
					}).then(response => {
						console.log(response.data.code)
						if(response.data.code==200){
							response.data.data.list
							this.userlists = response.data.data.list
							
							this.total = response.data.data.total
						}else {
							this.notifyError(response.data.message);
						}
					}).catch((error) => {
					  console.log(error)
					  this.notifyError("连接失败");
					})	
				return
			}
			if(select==2) {
				request({
					  method: 'get',
					  url: `/user/getfancuser/${yie}/0/${userid}`,
					  headers: {'token': window.localStorage.getItem('token')},
					}).then(response => {
						console.log(response.data.code)
						if(response.data.code==200){
							response.data.data.list
							this.userlists = response.data.data.list
							this.total = response.data.data.total
						}else {
							this.notifyError(response.data.message);
						}
					}).catch((error) => {
					  console.log(error)
					  this.notifyError("连接失败");
					})	
				return
			}
			
			
		},
		delectcount(event,byuserid) {
			// window.open("http://www.baidu.com")
			request({
				  method: 'post',
				  url: `/user/concern/${byuserid}`,
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
			
		}
		
		
	},
}
</script>

<style>
#userlist {
/* 	width: 1300px;
	margin: 0 auto;
	height: 600px;
	background-color: #fafafa; */
}
/* 头部CSS */
#userlist .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
}
#userlist .confirmOrder-header .header-content {
  width: 1300px;
  margin: 0 auto;
  height: 80px;
}
#userlist .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
#userlist .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

#userlist .uls {
	width: 1300px;
	margin: 0 auto;
	background-color: #fafafa;
}
#userlist .uls li {
	margin: auto 10px;
	height: 60px;
	line-height: 60px;
	background-color: white;
	border-bottom: 1px solid #e0e0e0;
	padding-top: 8px;
	padding-bottom: 8px;
}
#userlist .uls li:first-child {
	margin-top: 15px;
}
#userlist .uls li .el-avatar>img {
	width: 100%;
}
#userlist .uls li .divtext {
	float: left;
	height: 60px;
	width: 1110px;
}
#userlist .uls li .divtext p {
	margin-left: 15px;
	font-size: 16px;
	font-weight: 600;
	color: #212121;
}
#userlist .uls li .el-button {
	/* margin-top: 12px; */
}
#userlist .el-avatar--large {
	float: left;
	/* width: 60px !important;
	height: 60px !important;
	line-height: 60px !important; */
}
#userlist .chang {
	height: 600px;
}
#userlist .duan {
	margin-top: 15px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
</style>
