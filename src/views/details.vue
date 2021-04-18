<template>
	<div id="details">
		<div class="page-header">
		  <div class="title ">
				<router-link :to="{path: '/you', query: {userid: products.userid}}">
					<el-avatar size="large" class="avater"><img :src="'http://127.0.0.1:7003/img/'+products.usericon" class="image"></el-avatar>
					<p>{{products.username}}</p>
				</router-link>
		  </div>
		  
		  <div class="main clearfix">
			  <div class="tupian">
					<el-carousel height="560px" >
						<el-carousel-item v-for="(pic,index) in products.pic" :key="index" >
						  <img style="height:560px;width: 100%;" :src="pic" />
						</el-carousel-item>
					</el-carousel>
					<div class="pinglun">
							<h1 class="pinluntilter">
								留言：
								<el-input style="width: 500px;" placeholder="请输入留言" v-model="text1" >
									<el-button @click="creatcomment"  slot="append" icon="el-icon-position" ></el-button>
								</el-input>
							</h1>
						<ul>
							<li v-for="(comment, index) in products.comments" :key="index" class="lis clearfix">
								<el-avatar size="large" class="avater2" ><img :src="'http://127.0.0.1:7003/img/'+comment.icon" class="image"></el-avatar>
								<div class="divfloat" >
									<div style="height: 40px;">
										<div class="pinlunname">{{comment.name}}</div>
										<div class="pingluntime">{{comment.time | dateFormat}}</div>
									</div>
									<p style="margin-top: 15px;">{{comment.text}}</p>
									<el-popover  placement="right" width="600" trigger="click" >
											<el-input placeholder="请输入留言" v-model="text2" >
												<el-button @click="creatbycomment1(comment)" slot="append" icon="el-icon-position" ></el-button>
											</el-input>
										<el-button type="primary" size="small"   style="margin-top: 15px; margin-bottom: 15px;" slot="reference">回复用户</el-button>
									</el-popover>
										
									
									<ul>
										<li v-for="(bycomment,index) in comment.bycomments" :key="index" class="clearfix">
											<el-avatar size="large" class="avater3" ><img :src="'http://127.0.0.1:7003/img/'+bycomment.icon" class="image"></el-avatar>
											<div class="divfloat2" >
												<div style="height: 40px;">
													<div class="pinlunname">{{bycomment.name}}</div>
													<div class="pingluntime">{{bycomment.time | dateFormat}}</div>
												</div>
												<p style="margin-top: 15px;">{{bycomment.text}}</p>
												<el-popover  placement="right" width="600" trigger="click" >
														<el-input placeholder="请输入留言" v-model="text3" >
															<el-button @click="creatbycomment2(comment,bycomment)" slot="append" icon="el-icon-position" ></el-button>
														</el-input>
													<el-button type="primary" size="small" style="margin-top: 15px; margin-bottom: 15px;" slot="reference">回复用户</el-button>
												</el-popover>
											</div>
										</li>
									</ul>
								</div>
							</li>
							
						</ul>
					</div>
			  </div>
			  
			  <div class="content">
				  <h1 class="name">{{products.productidname}}</h1>
				  <p class="intro">{{products.text}}</p>
				  <div class="price">
				    <span>{{products.price}}元</span>
				  
				  </div>
				  <div class="dizhi">
				    <span>{{products.city}}</span>
				  </div>
				  <div class="pro-list">
				    <span class="pro-name">邮费</span>
				    <span class="pro-price">
				      <span>{{products.baoyouprice}}元</span>
				      
				    </span>
				    <p class="price-sum">总计 : {{products.baoyouprice+products.price}}元</p>
				  </div>
				  <!-- 内容区底部按钮 -->
				  <div class="button">
				    <!-- <el-button class="shop-cart"  >创建订单</el-button>
				    <el-button class="like"  >修改商品</el-button> -->
					<el-button class="shop-cart" @click="order" v-if="user.userid!=products.userid&&products.productstatus==0" >创建订单</el-button>
					<el-button class="like" @click="xiugai" v-if="products.productstatus==0&&user.userid==products.userid&&user!=''" >修改商品</el-button>
				  </div>
			  </div>
		  </div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	computed: {
		 ...mapState(['products','user'])
	},
	methods: {
		xiugai() {
			this.$store.dispatch('setisfabu',true)
			this.$store.commit('setisfabugenxin',true)
		},
		order() {
			// this.$router.push({ path: "/goods", query: { search: this.search } });
			this.$router.push({ path: "/quedingorder"});
		},
		creatcomment() {
			if(this.user==""){
				this.notifyError("请先登入");
				this.$store.dispatch('setShowLogin',true)
				return
			}
			if(this.text1.length<=0){
				this.notifyError("至少一个字符")
				return
			}
			let comment = {productid:this.products.productid,text:this.text1}
			this.$store.dispatch('creatcomment',{comment:comment})
		},
		creatbycomment1(comment) {
			if(this.user==""){
				this.notifyError("请先登入");
				this.$store.dispatch('setShowLogin',true)
				return
			}
			if(this.text2.length<=0){
				this.notifyError("至少一个字符")
				return
			}
			let bycomment = {commentid:comment.commentid,text:this.text2,byuserid:comment.userid}
			this.$store.dispatch('creatbycomment',{comment:comment,bycomment:bycomment})
		},
		creatbycomment2(comment,bycomments) {
			if(this.user==""){
				this.notifyError("请先登入");
				this.$store.dispatch('setShowLogin',true)
				return
			}
			if(this.text3.length<=0){
				this.notifyError("至少一个字符")
				return
			}
			let bycomment = {commentid:comment.commentid,text:this.text3,byuserid:bycomments.userid}
			this.$store.dispatch('creatbycomment',{comment:comment,bycomment:bycomment})
		}
	},
	activated() {
		if (this.$route.query.productid != undefined) {
		  this.productid = this.$route.query.productid;
		  this.$store.dispatch('productbyid',{productid: this.productid})
		}
	},
	data() {
		return {
			productid: "",
			text1: '',
			text2: '',
			text3: ''
		}
	},
	// watch: {
	//   // 监听商品id的变化，请求后端获取商品数据
	//   productid: function(val) {
	//     this.$store.dispatch('productbyid',{productid: val})
	//   }
	// },
	
}
</script>

<style>
#details {
	width: 1300px;
	margin: 10px auto;
}
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1300px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 900;
  color: #212121;
  margin: 0 auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
#details .page-header .title .avater{
	float: left;
	margin-top: 14px;
}
#details .page-header .title .image {
width: 100%;
}
#details .page-header .title p {
 float: left;
 margin-left: 12px;
 color: #333333;
}
/* 头部end */
#details .main {
	
}
/* 评论和评论 */
#details .main .tupian {
	float: left;
	width: 645px;	
}
#details .main .tupian .pinluntilter {
	margin-top: 15px;
	margin-bottom: 15px;
	height: 30px;
	line-height: 30px;
	font-size: 30px;
	font-weight: 900;
	color: #212121;
}

#details .main .tupian .pinglun {
	width: 645px;
}
#details .main .tupian .pinglun ul .lis {
	background-color: #ffffff;
	margin-top: 5px;
	border-bottom: 1px solid #cccccc;
}
#details .main .tupian .pinglun ul li .avater2  {
	float: left;
}
#details .main .tupian .pinglun ul li .divfloat {
	float: left;
	margin-left: 10px;
	width: 590px;
	
}
.avater3  {
	float: left;
}
.divfloat2 {
	float: left;
	margin-left: 10px;
	width: 540px;
	
}
.pinlunname{
	height: 20px;
	 line-height: 20px;
	 font-size: medium; 
	 font-weight: 700;
}
.pingluntime {
	height: 20px;
	line-height: 
	20px;font-size: smaller; 
	font-weight: 400; 
	color: #616161;
}
/* 评论 end*/

#details .main .content {
	float: left;
	margin-left: 5px;
	width: 650px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #676767;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
 /* border-bottom: 1px solid #e0e0e0; */
  padding: 25px 0 25px;
}
#details .main .content .dizhi {
  display: block;
  font-size: 18px;
  color: #81787c;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}


/* 头部CSS END */
</style>
