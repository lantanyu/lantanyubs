<template>
	<div class="order">
		<!-- 我的订单头部 -->
		<div class="order-header">
		  <div class="order-header-content">
		    <p>
		      <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
		      我的订单
		    </p>
		  </div>
		</div>
		<div style="width: 1300px; margin: 0 auto;">
			<el-tabs v-model="activeName" @tab-click="handleClick" >
				<el-tab-pane label="购买订单" name="1" >购买订单</el-tab-pane>
				<el-tab-pane label="出售订单" name="2">出售订单</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 我的订单头部END -->
		<!-- 我的订单主要内容 -->
		<div class="order-content" v-if="order.length>0">
		  <div class="content" v-for="or in order" :key="or.orderid" >
		    <ul>
		      <!-- 我的订单表头 -->
		      <li class="order-info">
		        <div class="order-id">订单编号: {{or.sn}}</div>
				<el-button type="primary" size="mini"  @click="orderid=or.orderid;isck=true" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;">冲突申请</el-button>
				<el-popover  placement="right" width="700" trigger="click" >
					<el-table :data="ck" stripe style="width: 100%" height="30vh">
						<el-table-column prop="ckid" width="100" label="申请ID"></el-table-column>
						<el-table-column prop="text" width="300" label="原因"></el-table-column>
						<el-table-column label="情况">
							<template slot-scope="scope" >
								<el-tag size="mini" type="info" effect="dark" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="scope.row.cx===0">正常</el-tag>
								<el-tag size="mini" type="info" effect="dark" v-if="scope.row.cx===1">取消</el-tag>
							</template>
						</el-table-column>
						<el-table-column  label="状态">
							<template slot-scope="scope" >
								<el-tag size="mini" type="info" effect="dark" v-if="scope.row.status===0">待解决</el-tag>
								<el-tag size="mini" type="info" effect="warning" v-if="scope.row.status===1">拒绝请求</el-tag>
								<el-tag size="mini" type="info" effect="success" v-if="scope.row.status===2">已解决</el-tag>
							</template>
						</el-table-column>
						<el-table-column fixed="right" width="100px" label="操作" >
							<template slot-scope="scope">
								<el-button type="text" size="small"v-if="scope.row.cx===0&&scope.row.status===0" @click="updateck(scope.row,1)">取消申请</el-button>
						    </template>
						</el-table-column>
					</el-table>
					<div  style="text-align: center; margin-top: 10px;">
						<el-pagination  background small  layout="prev, pager, next" :page-size="5" :total="total2" @current-change="handleCurrentChange2">
						</el-pagination>
					</div>
					<el-button type="primary" size="mini"  @click="orderids=or.orderid" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;" slot="reference">详细申请</el-button>
				</el-popover>
				<el-popover  placement="right" width="1000" trigger="click" >
					<el-form label-position="left" inline class="popover-from">
						<el-form-item label="订单ID">
							<span>{{ or.orderid }}</span>
						</el-form-item>
						<el-form-item label="商品ID">
							<span>{{ or.productid }}</span>
						</el-form-item>
						<el-form-item label="买家ID">
							<span>{{ or.userid }}</span>
						</el-form-item>
						<el-form-item label="订单编号">
							<span>{{ or.sn }}</span>
						</el-form-item>
						<el-form-item label="邮价">
							<span>{{ or.baoyouprice }}</span>
						</el-form-item>
						<el-form-item label="价格">
							<span>{{ or.price }}</span>
						</el-form-item>
						<el-form-item label="商品名">
							<span>{{ or.productname }}</span>
						</el-form-item>
						<el-form-item label="交易方式">
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.method==0" size="mini" >不包邮</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.method==1" size="mini" >包邮</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.method==2" size="mini" >面交</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.method==3" size="mini" >自提</el-button>
						</el-form-item>
						<el-form-item label="订单状态">
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==0" size="mini" >待付款</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==1" size="mini" >待发货</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==2" size="mini" >待收货</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==3" size="mini" >待确定</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==4" size="mini" >交易关闭</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==5" size="mini" >交易完成</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==6" size="mini" >退货详细</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.status==7" size="mini" >转入人工</el-button>
						</el-form-item>
						<el-form-item label="收货人">
							<span>{{ or.addressname }}</span>
						</el-form-item>
						<el-form-item label="省">
							<span>{{ or.province }}</span>
						</el-form-item>
						<el-form-item label="市">
							<span>{{ or.city }}</span>
						</el-form-item>
						<el-form-item label="区">
							<span>{{ or.region }}</span>
						</el-form-item>
						<el-form-item label="详细地址">
							<span>{{ or.detailaddresss }}</span>
						</el-form-item>
						<el-form-item label="电话">
							<span>{{ or.phone }}</span>
						</el-form-item>
						<el-form-item label="添加时间">
							<span>{{ or.tijiaotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="支付时间">
							<span>{{ or.zhifutime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="发货时间">
							<span>{{ or.fahuotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="收货时间">
							<span>{{ or.sohuotime | dateFormat }}</span>
						</el-form-item>
						<el-form-item label="删除状态">
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.delectstatus==0" size="mini" >已删除</el-button>
							<el-button type="primary" style="background-color:#ff6700; border-color: #ff6700;color: #fff;" v-if="or.delectstatus==1" size="mini" >正常</el-button>
						</el-form-item>
						<el-form-item label="快递号">
							<span>{{ or.kuidihao }}</span>
						</el-form-item>
						<el-form-item label="卖家ID">
							<span>{{ or.byuserid }}</span>
						</el-form-item>
						<el-form-item label="快递公司">
							<span>{{ or.kuidi }}</span>
						</el-form-item>
					</el-form>
					<el-button type="info" size="mini"  @click="" style="margin-left: 5px; margin-top: 15px; float: right;" slot="reference">订单详细</el-button>
				</el-popover>
				
		        <div class="order-time">订单时间:{{or.tijiaotime | dateFormat}} </div>
		      </li>
		      <li class="header">
		        <div class="pro-img"></div>
		        <div class="pro-name">商品名称</div>
		        <div class="pro-price">单价</div>
		        <div class="pro-num">邮费</div>
		        <div class="pro-total">小计</div>
		      </li>
		      <!-- 我的订单表头END -->
		
		      <!-- 订单列表 -->
		      <li class="product-list" >
		        <div class="pro-img">
		          <router-link :to="{ path: '/details', query: {productid:or.productid} }">
		            <img :src="or.producticon[0]" />
		          </router-link>
		        </div>
		        <div class="pro-name">
		          <router-link
		            :to="{ path: '/details', query: {productid:or.productid} }"
		          >{{or.productname}}</router-link>
		        </div>
		        <div class="pro-price">{{or.price}}元</div>
		        <div class="pro-num">{{or.baoyouprice}}</div>
		        <div class="pro-total pro-total-in">{{or.price+or.baoyouprice}}元</div>
		      </li>
		    </ul>
		    <div class="order-bar">
		      <div class="order-bar-left">
		        <span class="order-total">
		          <span class="order-total-num" v-if="or.status===0">待付款</span>
				  <span class="order-total-num" v-if="or.status===1&&or.method!==2&&or.method!==3">待发货</span>
				  <span class="order-total-num" v-if="or.status===1&&or.method!==0&&or.method!==1">待交易</span>
				  <span class="order-total-num" v-if="or.status===2">待收货</span>
				  <span class="order-total-num" v-if="or.status===4">支付超时</span>
				  <span class="order-total-num" v-if="or.status===5">交易完成</span>
				  <span class="order-total-num" v-if="or.status===6">交易退货</span>
				  <span class="order-total-num" v-if="or.status===7">转入人工</span>
		        </span>
				<el-button type="primary" size="mini" v-if="or.status===0&&user.userid===or.userid" @click="zhifu(or)" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;">去支付</el-button>
				<el-button type="primary" size="mini" v-if="or.status===1&&user.userid===or.byuserid&&or.method!==2&&or.method!==3" @click="getisfahuo(or)" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;width: 85px;">去发货</el-button>
				<el-button type="primary" size="mini" v-if="or.status===2&&user.userid===or.userid" @click="getistuihuo(or)" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;">申请退货</el-button>
				<el-button type="primary" size="mini" v-if="or.status===2&&user.userid===or.userid||or.status===1&&user.userid===or.userid&&or.method!==0&&or.method!==1" @click="queding(or)" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;">确定收货</el-button>
				<el-button type="primary" size="mini" v-if="or.status===6" @click="tuihuoxx(or)" style="margin-left: 5px; background-color:#ff6700; border-color: #ff6700;color: #fff;">退货详细</el-button>
		      </div>
		      <div class="order-bar-right">
		        <span>
		          <span class="total-price-title">合计：</span>
		          <span class="total-price">{{or.price+or.baoyouprice}}元</span>
		        </span>
		      </div>
		      <!-- 订单列表END -->
		    </div>
		  </div>
		  <div style="margin-top:-40px;"></div>
		</div>
		<!-- 我的订单主要内容END -->
		
		<!-- 订单为空的时候显示的内容 -->
		<div v-else class="order-empty">
		  <div class="empty">
		    <h2>您的订单还是空的！</h2>
		    <p>快去购物吧！</p>
		  </div>
		</div>
		<!-- 订单为空的时候显示的内容END -->
		<fahuo :isfahuo="isfahuo" shibie="1" :orderid="orderid" @setisfahuo="setisfahuo" @setstatus="setstatus"></fahuo>
		<mytuihuo :istuihuo="istuihuo" :orderid="orderid" @setistuihuo="setistuihuo" @setstatus="setstatus" ></mytuihuo>
		<ck :isck="isck" :orderid="orderid" @setisck="setisck"></ck>
		<div  style="text-align: center; margin-top: 10px;">
			<el-pagination  background  layout="prev, pager, next" :page-size="5" :total="total" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
	
	
</template>

<script>
import {request} from '../myaxios/request.js'
import fahuo from '../components/fahuo.vue'
import mytuihuo from '../components/mytuihuo.vue'
import ck from '../components/ck.vue'
import {mapState} from 'vuex'
export default {
	components: {
		fahuo,
		mytuihuo,
		ck
	},
	activated() {
		if (Object.keys(this.$route.query).length == 0) {
		  this.activeName ="1"
		}else {
			if(this.activeName =="1"){
				this.total = 0
				this.getorderlist(1,5,1)
			}else {
				this.activeName ="1"
			}
		}
	},
	computed: {
		...mapState(['user'])
	},
    data() {
		return {
			activeName: '0',
			order: [],
			ck:[],
			ors: "",
			isfahuo: false,
			istuihuo: false,
			isck: false,
			orderid: "",
			orderids: 0,
			total: 0,
			total2: 0,
		};
    },
    methods: {
		handleCurrentChange(val) {
			this.getorderlist(val,5,this.activeName)
		},
		handleCurrentChange2(val) {
			this.getcklist(val,5)
		},
		getorderlist(yie,pianyi,ifs) {
			request({
			  method: 'get',
			  url: `/order/getorder/${yie}/${pianyi}/${ifs}`,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.order = response.data.data.list
					this.total = response.data.data.total
					if(this.order.length>0){
						this.order.forEach(or => {
							let arrstr = or.producticon.split(';')
							let arrstr2 = []
							arrstr.forEach(str => {
								if(str!=='') {
									str = 'http://127.0.0.1:7003/img/'+str
									arrstr2.push(str)
								}
							})
							or.producticon = arrstr2
						})
					}
					
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
			  console.log(error)
			  this.notifyError("连接失败");
			})
		},
		getcklist(yie,pianyi) {
			request({
				method: 'post',
				url: `/order/getcklist/${yie}/${pianyi}`,
				data: {orderid: this.orderids,userid:this.user.userid},
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.ck = response.data.data.list
					this.total2 = response.data.data.total
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		},
		updateck(ck,cx) {
			request({
				method: 'post',
				url: `/order/updateck`,
				data:{ckid:ck.ckid,cx:cx},
				headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					this.notifySucceed(response.data.message)
					ck.cx = cx
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
				console.log(error)
				this.notifyError("连接失败");
			})
		},
		handleClick(tab, event) {
        console.log(tab, event);
		},
		zhifu(order) {
			let urls = '/order/zhifu/'+order.orderid
			request({
			  method: 'post',
			  url: urls,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					order.status=1
					this.notifySucceed(response.data.message)
					
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
			  console.log(error)
			  this.notifyError("连接失败");
			})
		},
		getisfahuo(order) {
			this.isfahuo =true
			this.orderid = order.orderid
			this.ors = order
		},
		getistuihuo(order) {
			this.istuihuo =true
			this.orderid = order.orderid
			this.ors = order
		},
		setisfahuo(val) {
			this.isfahuo =val
		},
		setistuihuo(val) {
			this.istuihuo = val
		},
		setisck(val){
			this.isck = val
		},
		setstatus(val) {
			this.ors.status = val
		},
		queding(order) {
			let urls = '/order/queding/'+order.orderid
			request({
			  method: 'post',
			  url: urls,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
				if(response.data.code==200){
					order.status=5
					this.notifySucceed(response.data.message)
					
				}else {
					this.notifyError(response.data.message);
				}
			}).catch((error) => {
			  console.log(error)
			  this.notifyError("连接失败");
			})
		},
		tuihuoxx(order) {
			this.$router.push({ path: "/quedingtuihuo", query: { orderid: order.orderid }})
		}
    },
	watch: {
		activeName: function(val) {
			if(val=="0"){
				return
			}
			this.total = 0
			this.getorderlist(1,5,val)
			
		},
		orderids: function(val) {
			this.total2 = 0
			this.getcklist(1,5)
		}
	}
}
</script>

<style>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {
  width: 1300px;
  margin: 0 auto;
}
.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.el-tabs__item.is-active{
    color:#ff6700 !important;
}

.order .el-tabs__active-bar{
	background-color:#ff6700 !important;
}

.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  margin-top: 30px;
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ff6700;
}
.order .content ul .order-info .order-id {
  float: left;
  color: #ff6700;
}
.order .content ul .order-info .order-time {
  float: right;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 380px;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #ff6700;
}
.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}
.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}
.order .content ul .pro-total-in {
  color: #ff6700;
}
.popover-from {
	font-size: 0;
}
.popover-from label {
	width: 90px;
	color: #99a9bf;
}
.popover-from .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 43%;
}
.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
.order .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff6700;
    color: #FFF;
}
</style>
