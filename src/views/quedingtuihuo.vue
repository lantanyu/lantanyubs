<template>
	<div id="quedingtuihuo" class="confirmOrder">
		<!-- 头部 -->
		<div class="confirmOrder-header">
		  <div class="header-content">
		    <p>
		      <i class="el-icon-s-order"></i>
		    </p>
		    <p>退货单详细</p>
		    <router-link to></router-link>
		  </div>
		</div>
		
		<div class="content">
			<div class="address" v-if="byuserid===user.userid&&orders.status===0">
				<p class="tilter">选择收货地址</p>
				
				<ul class="addresslist clearfix">
					<li v-for="(add,index) in address" :key="add.addressid" :class="add.addressid == section ? 'in-section' : ''"  @click="select(add.addressid)">
						<el-card class="box-card donghuan"  >
							<el-button style="float: right; padding: 3px 0;color: #3A8EE6;font-size: 15px;" type="text" @click="upopen(add)">修改</el-button>
							<p >{{add.name}}</p>
							<p>{{add.phone}}</p>
							<p>{{add.province}}/{{add.city}}/{{add.region}}</p>
							<p>{{add.detailaddresss}}</p>
						</el-card>
					</li>
					
					<li @click="addopen" >
						<el-card class="add-card donghuan" >
							<i class="el-icon-circle-plus-outline"></i>
							<p>添加新地址</p>
						</el-card>
					</li>
				</ul>
						
			</div>
			
			<!-- 商品及优惠券 -->
			<div class="section-goods">
			  <p class="title">退货单</p>
			  <div class="goods-list">
			    <ul>
			      <li>
			        <span class="pro-name">订单号：{{orders.sn}}</span>
			        <span class="pro-price">{{orders.tijiaotime | dateFormat}}</span>
			        <span class="pro-status"></span>
			        <span class="pro-total">运费：{{orders.yunprice}}元</span>
			      </li>
			    </ul>
			  </div>
			</div>
			<!-- 商品及优惠券END -->
			
			<!-- 配送方式 -->
			<div class="section-shipment">
			  <p class="title">退货方式</p>
			  <p class="shipment" v-if="orders.methon==0">不包邮</p>
			  <p class="shipment" v-if="orders.methon==1">包邮</p>
			</div>
			
			<div class="section-shipment">
			  <p class="title">退货进度</p>
			  <p class="shipment" v-if="orders.status==0">等待卖家确定</p>
			  <p class="shipment" v-if="orders.status==1">等待发货</p>
			  <p class="shipment" v-if="orders.status==2">等待收货</p>
			   <p class="shipment" v-if="orders.status==3">退货完成</p>
			</div>
			<!-- 配送方式END -->
			
			<!-- 详细 -->
			<div class="section-invoice" v-if="orders.status!==0">
			  <p class="title">电话</p>
			  <p class="invoice">{{orders.phone}}</p>
			</div>
			
			<div class="section-invoice" v-if="orders.status!==0">
			  <p class="title">收货人</p>
			  <p class="invoice">{{orders.addressname}}</p>
			</div>
			
			<div class="section-invoice" v-if="orders.status!==0">
			  <p class="title">邮寄地址</p>
			  <p class="invoice">{{orders.province}}/{{orders.city}}/{{orders.region}}</p>
			</div>
			
			<div class="section-invoice" >
			  <p class="title">退货理由</p>
			  <p class="invoice">{{orders.tuihuotext}}</p>
			</div>
			
			
			<!-- 详细END -->
			
			<!-- 结算列表 -->
			<div class="section-count">
			  <div class="money-box">
			    <ul>
			     
			      <li class="total">
			        <span class="title">运费：</span>
			        <span class="value">
			          <span class="total-price">{{orders.yunprice}}</span>元
			        </span>
			      </li>
			    </ul>
			  </div>
			</div>
			<!-- 结算列表END -->
			
			<!-- 结算导航 -->
			<div class="section-bar">
			  <div class="btn">
				<el-button class="btn-base btn-primary" v-if="byuserid===user.userid&&orders.status===0" @click="yestuihuo">同意退货</el-button>
				<el-button class="btn-base btn-primary" v-if="byuserid===user.userid&&orders.status===2" @click="tuihuoqueding">同意收货</el-button>
				<el-button class="btn-base btn-primary" v-if="userid===user.userid&&orders.status===1" @click="getisfahuo">去发货</el-button>
				<el-button class="btn-base btn-jujue" v-if="byuserid===user.userid&&orders.status===0" @click="">拒绝退货</el-button>
			  </div>
			</div>
			<!-- 结算导航END -->
			
		</div>
		<fahuo :isfahuo="isfahuo" shibie="2" :orderid="byorderid" @setisfahuo="setisfahuo" @setstatus="setstatus"></fahuo>
		<myaddress :isaddress="isaddress" :adds="adds" @addaddress="addaddress" @setisaddress="setisaddress" ></myaddress>
		<!-- 头部END -->
	</div>
</template>

<script>
import myaddress from '../components/myaddress.vue'
import {mapState} from 'vuex'
import {request} from '../myaxios/request.js'
import fahuo from '../components/fahuo.vue'
export default {
	components: {
		myaddress,
		fahuo
	},
	computed: {
		...mapState(['products','user'])
	},
	activated() {
		if (Object.keys(this.$route.query).length == 0) {
		  this.$router.push({ path: "/home"})
		  return;
		}
		if (this.$route.query.orderid != undefined) {
			const orderid = this.$route.query.orderid;
			let urls = '/order/getbyorder/'+orderid
			request({
				method: 'get',
				url: urls,
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.orders = response.data.data
					this.byuserid = this.orders.order.byuserid
					this.userid = this.orders.order.userid
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		  
		}
		this.section =""
		request({
		  method: 'get',
		  url: '/user/getaddress',
		  headers: {'token': window.localStorage.getItem('token')},
		}).then(response => {
			if(response.data.code==200){
				if(response.data.data.length>0){
					this.address = response.data.data
				}
			}else {
				this.notifyError(response.data.message);
			}
		}).catch((error) => {
		  console.log(error)
		  this.notifyError("连接失败");
		})
		
	},
	data () {
		return {
			isaddress: false,
			address: [],
			section: "",
			adds: '',
			orders: '',
			byorderid: "",
			byuserid: "",
			userid: "",
			isfahuo: false,
		}
	},
	methods: {
		addopen() {
			this.adds = ''
			this.isaddress = true
		},
		upopen(val) {
			this.adds = val
			this.isaddress = true
		},
		addaddress( val) {
			this.address.unshift(val)
		},
		setisaddress(val) {
			this.isaddress = val
		},
		select(val) {
			this.section = val
		},
		
		getisfahuo() {
			this.isfahuo =true
			this.byorderid = this.orders.byorderid
		},
		setisfahuo(val) {
			this.isfahuo =val
		},
		setstatus(val) {
			this.orders.status = val
		},
		
		yestuihuo (){
			if(this.section=="") {
				this.notifyError("请先选择地址");
				return
			}
			let urls = '/order/yestuihuo/'+this.section+'/'+this.orders.byorderid
			request({
			  method: 'post',
			  url: urls,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.notifySucceed(response.data.message);
					this.orders.status = 1
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
			  console.log(error)
			 this.notifyError("连接失败");
			})	
			
		},
		tuihuoqueding() {
			let urls = '/order/tuihuoqueding/'+this.orders.byorderid
			request({
			  method: 'post',
			  url: urls,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.notifySucceed(response.data.message);
					this.orders.status = 3
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
			  console.log(error)
			 this.notifyError("连接失败");
			})	
		}
	}
}

</script>

<style>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1300px;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}

.confirmOrder .content {
  width: 1300px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}
.confirmOrder .content .address {
	width: 1200px;
	margin: 0 auto;
}
.confirmOrder .content .address .tilter {
	color: #333;
	font-size: 18px;
	font-weight: 500;
	line-height: 20px;
	margin-bottom: 20px;
}
/* 卡片开始 */

.addresslist {
	
}
.addresslist li:first-child {
	/* float: left;
	border: 1px solid #ff6700;
	margin-top: 0px; */
}
.in-section {
  border: 1px solid #ff6700;
}
.addresslist li {
	margin-top: 10px;
	float: left;
	margin-left: 10px;
}
.donghuan:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -5px, 0);
}
.box-card {
	width: 250px;
	height: 220px;
	padding-top: 2px;
	padding-left: 5px;
}
.add-card {
	width: 250px;
	height: 220px;
	padding-top: 2px;
	padding-left: 5px;
	text-align: center;
	line-height: 30px;
}
.add-card i {
	font-size: 30px;
	padding-top: 50px;
	text-align: center;
}

.box-card p {
	color: #565154;
	margin-top: 10px;
}
/* 卡片结束 */

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 250px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  /* border: 1px solid #b0b0b0; */
  /* font-size: 14px; */
  /* line-height: 38px; */
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
.confirmOrder .content .section-bar .btn .btn-jujue {
  background: #797f7c;
  border-color: #797f7c;
  color: #fff;
}
/* 结算导航CSS */

</style>
