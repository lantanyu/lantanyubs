<template>
	<div id ="my" class="clearfix">
		<div class="header clearfix">
			<div class="image">
				<img :src="user.icon" width="100%" height="100%"  />
			</div>
			<p>{{user.name}}<i class="el-icon-male" v-if="user.gender==0" style="color: #3A8EE6;"></i><i class="el-icon-female" v-if="user.gender==1" style="color: #ff4385;"></i></p>
			<div class="xinxi">
				<el-button type="success" @click="getuserlist(1)">关注数：{{count[0]}}</el-button>
				<el-button type="danger"  @click="getuserlist(2)">粉丝数：{{count[1]}}</el-button>
				<el-button v-if="false" type="info">关注</el-button>
			</div>
			<div style="margin-top: 30px;">
			<el-button style="margin-left: 1px;"  type="info">信用分：{{user.xingyongfen}}</el-button>
			<el-button  style="margin-left: 1px;" type="info">地区：{{user.city}}</el-button>
			<el-button  style="margin-left: 1px;" type="primary" @click="ismyxinxis = true" >修改信息</el-button>
			</div>
		</div>
		
	<product1 :sproducts="productsbymy"></product1>
	
	<div style="background-color: #f1f1f1;" class="clearfix">
		<div id="yie" style="text-align: center;">
			<el-pagination background layout="prev, pager, next" :page-size="6" :total="totalsbymy" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
	
	<myxinxi :ismyxinxis="ismyxinxis" @setismyxinxi="setismyxinxi"></myxinxi>
		
	</div>
</template>

<script>
import myxinxi from '../components/myxinxi.vue'
import product1 from '../components/product1.vue'
import {mapState} from 'vuex'
export default {
	components: {
		product1,
		myxinxi
	},
	computed: {
		...mapState(['totalsbymy','productsbymy','user','count'])
	},
	mounted() {
		this.$store.dispatch('getproductbymy',{yie:1}) 
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.$store.dispatch('getproductbymy',{yie:val})
		},
		setismyxinxi(val) {
			this.ismyxinxis = val
		},
		getuserlist(val) {
			this.$router.push({ path: "/userlist" ,query: { userid: this.user.userid,select: val}});
		}
	},
	data() {
		return {
			ismyxinxis: false
		}
	}
	
}	
</script>

<style>
#my{
	margin: 3px auto;
	width: 1300px;
	background-color: #f1f1f1;
}
#my .header {
	margin: 10px auto;
	width: 1200px;
	background-color: #fffeea;
	height: 300px;
}
#my .header .image {
	width: 100px;
	height: 100px;
	margin: 0 auto;
	margin-top: 30px;
}
#my .header p {
	margin-top: 10px;
	text-align: center;
	font-family:"Helvetica Neue";
	font-weight: 900;
	font-size: 25px;
}
#my .header .xinxi {
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
