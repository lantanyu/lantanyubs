<template>
	<div id="fenlei" class="clearfix">
		<div class="daohan">
			<el-menu :class="fenlei2.length<11 ? 'changdu':''"
		      :default-active="select"
			  @select="handleSelect"
		      class="el-menu-vertical-demo"
			  active-text-color="#ff6700"
		    >
		      
			  <el-menu-item v-for="fenlei1 in fenlei" :key="fenlei1.fenlei1id" :index="fenlei1.fenlei1id+''">{{fenlei1.name}}</el-menu-item>
			  
		      
			</el-menu>
		</div>
		<div class="fenlei2" :class="fenlei2.length<11 ? 'changdu':''">
			<ul class="clearfix">
			  <li v-for="fen in fenlei2" :key="fen.fenlei2id" >
			    <router-link :to="{ path: '/about' ,query: { fenleiid: fen.fenlei2id }}">
			      <img :src="'http://127.0.0.1:7003/img/'+fen.icon" alt />
			      <h2>{{fen.name}}</h2>
			    </router-link>
			  </li>
			  
			  
			</ul>
		</div>
		
	</div>
</template>
 
<script>
import {request} from '../myaxios/request.js'
export default {
	data () {
		return {
			select: "0",
			fenlei: [],
			fenlei2:[]
		}
	},
	mounted() {
		this.getfenlei()
	},
	methods: {
		getfenlei() {
			request({
				  method: 'get',
				  url: `/product/all/getfenlei1`,
				  headers: {'token': window.localStorage.getItem('token')},
				}).then(response => {
					if(response.data.code==200){
						this.fenlei = response.data.data
						if(this.fenlei.length>0) {
							this.select=this.fenlei[0].fenlei1id+''
						}
					}else {
						this.notifyError(response.data.message);
					}
				}).catch((error) => {
				  console.log(error)
				  this.notifyError("连接失败");
				})	
		},
		handleSelect(index) {
			this.fenlei.forEach(fen =>{
				if(fen.fenlei1id==index){
					this.fenlei2 = fen.fenlei2s
					return
				}
			})
		}
	},
	watch: {
		select: function(val) {
			this.fenlei.forEach(fen =>{
				if(fen.fenlei1id==val){
					this.fenlei2 = fen.fenlei2s
					return
				}
			})
		}
	}
}
</script>

<style>
#fenlei {
	width: 1300px;
	margin: 0 auto;
}
#fenlei .changdu {
	height: 600px;
}
#fenlei .daohan {
	/* margin-top: 20px; */
	width: 200px;
	float: left;
}
#fenlei .fenlei2 {
	width: 1090px;
	margin-left: 10px;
	margin-top: 10px;
	float: left;
}
.fenlei2 ul li {
  z-index: 1;
  float: left;
  width: 200px;
  height: 180px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.fenlei2 ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.fenlei2 ul li img {
  display: block;
  width: 160px;
  height: 160px;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.fenlei2 ul li h2 {
  margin: 7px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
</style>
