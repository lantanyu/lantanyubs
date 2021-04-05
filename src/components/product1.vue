<template>
	<div class="coler">
		<div class="divgl">
			<h2 >商品</h2>
			<!-- <el-row  :gutter="2" type="flex" justify="space-between"style="margin-left: 12%;margin-right: 12%;margin-top: 2vh;">
			  <el-col :span="5" v-for="(o, index) in 5" :key="o" :offset="0">
				<el-card :body-style="{ padding: '0px' }" style="width: 14vw;" class="donghuan" shadow="hover">
				  <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" class="image" lazy>
				  </el-image>
				  <div style="padding: 14px;">
					<span class="zhiti">好吃的汉堡小米789</span>
					<div class="bottom clearfix">
						<div><span class="zhiti" style="color: #ff382a;">$500</span></div>
					 <el-avatar ><img src="../assets/2143db4f65dab332f8806f5c4aa59cc1.jpg" class="image"></el-avatar>
					 <span class="zhiti2">赖泰余</span>
					</div>
				  </div>
				</el-card>
			  </el-col>
			</el-row> -->
			<div v-if="sproducts.length==0" style="height: 100px;font-family:'Helvetica Neue';font-size: 20px;font-weight: 300; color: #333333; margin-top: 20px;">未搜到商品，请重新查看 </div>
			<ul class="listdiv" >
				<li v-for="(product, index) in sproducts" :key="index" >
					<router-link :to="{ path: '/details', query: {productid: product.productid} }">
						<el-card :body-style="{ padding: '0px' }" class="donghuan card"   shadow="hover">
							<el-image :src="product.pic[0]" class="image" lazy></el-image>
							<div style="padding: 10px;">
								<span class="zhiti">{{product.productidname}}</span>
								<div class="bottom clearfix">
								<div><span class="zhiti" style="color: #ff382a;">${{product.price}}</span></div>
								<el-avatar style="margin-top: 2px;" ><img :src="product.usericon" class="image"></el-avatar>
								<span class="zhiti2">{{product.username}}</span>
								<el-tag class="type" size="mini" type="" effect="dark" v-if="product.method==0">不包邮</el-tag>
								<el-tag class="type" size="mini" type="" effect="dark" v-if="product.method==1">包邮</el-tag>
								<el-tag class="type" size="mini" type="" effect="dark" v-if="product.method==2">面交</el-tag>
								<el-tag class="type" size="mini" type="" effect="dark" v-if="product.method==3">自提</el-tag>
								<!-- <el-tag class="type" size="mini" type="info" effect="dark" v-if="product.productstatus!=0">锁定</el-tag> -->
								<el-tag class="type" size="mini" type="info" effect="dark" v-if="product.productstatus==1">订单中</el-tag>
								<el-tag class="type" size="mini" type="success" effect="dark" v-if="product.productstatus==2">已完成</el-tag>
								<div>
									<el-tag class="type" size="mini" type="info" effect="plain">发布时间:{{product.fabutime | dateFormat}}</el-tag>
								</div>
								</div>
							</div>
						</el-card>
					</router-link>
				</li>
			</ul>
			<div v-if="sproducts.length<6" style="height: 350px;"> </div>
		</div>
	</div>
</template>

<script>
	//import {mapState} from 'vuex'
	import axios from 'axios'
	export default {
		props: ["sproducts"],
		data () {
			return {
				totals : 0
			}
		},
		computed: {
			// ...mapState(['sproducts'])
		},
		// watch: {
		// 	sproducts: {
		// 	  deep: true,
		// 	  handler: function (value) {
		// 	    this.totals = this.sproducts[0].total
		// 	  }
		// 	}
		// },
		// mounted() {
		// 	this.$store.dispatch('suoyeupproducts',{yie: 1})
		// },
		// methods: {
		// 	handleCurrentChange(val) {
		// 		console.log(`当前页: ${val}`);
		// 		this.$store.dispatch('suoyeupproducts',{yie: val})
				
		// 	},
		// }
	}
</script>

<style>
.coler{
	margin-top: 1vh;
	background-color: #f1f1f1;
}
.coler .divgl {
	width: 1300px;
	margin-left: auto;
	margin-right: auto;
}
.bottom {
margin-top: 4px;
line-height: 3vh;
}
.type {
	margin-right: 1px;
	float: right;
}

.button {
padding: 0;

float: right;
}
.zhiti{
	font-family:"Helvetica Neue";
	font-weight: 900;
}
.zhiti2{
	font-family:"Helvetica Neue";
	font-size: 12px;
	font-weight: 600;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
} */

.clearfix:after {
  clear: both
}
.donghuan:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -15px, 0);
}
.listdiv{
	/* overflow: hidden; */
	margin-top: 1px;
}
.listdiv li {
	margin-top: 10px;
	float: left;
	margin-right: 13px;
	width: 247px;
}
.listdiv li .card {
	height: 350px;
}
.listdiv:after {
	content: '';
	display: block;
	clear: both;
}
.image {
width: 100%;
height: 200px;
display: block;
}
</style>
