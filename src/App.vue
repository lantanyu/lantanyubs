<template>
	<el-container id="app" >
		<!-- 顶部导航栏 -->
		<div class="topbar">
		  <div class="nav clearfix">
		    <ul>
		      <li v-if="!this.$store.getters.getUser">
		        <el-button type="text" @click="login">登录</el-button>
		        <span class="sep">|</span>
		        <el-button type="text" @click="zhuche">注册</el-button>
		      </li>
		      <li v-else>
		        欢迎
		        <el-popover placement="top" width="180" v-model="visible">
		          <p>确定退出登录吗？</p>
		          <div style="text-align: right; margin: 10px 0 0">
		            <el-button size="mini" type="text" @click="visible=false" >取消</el-button>
		            <el-button type="primary" size="mini" @click="tuichu" >确定</el-button>
		          </div>
		          <el-button type="text" slot="reference">{{this.$store.getters.getUser.name}}</el-button>
		        </el-popover>
		      </li>
		      <li>
		        <router-link to="/order">我的订单</router-link>
		      </li>
		      <li>
		        <el-button type="text" @click="fabu">发布商品</el-button>
		      </li>
		    </ul>
		  </div>
		</div>
		<!-- 顶部导航栏END -->
		<el-header class='shiyan' >
			<el-menu
			:default-active="activeIndex" 
			router
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#ffffff"
			text-color="#474747"
			active-text-color="#ff6700">
			   <el-menu-item index="/home"><i class="el-icon-menu"></i>首页</el-menu-item>
			   <el-menu-item index="/fenlei"><i class="el-icon-guide"></i>分类</el-menu-item>
			   <el-menu-item index="/about"><i class="el-icon-goods"></i>商品</el-menu-item>
			   <el-menu-item index="/my"><i class="el-icon-s-custom"></i>我的</el-menu-item>
			   <div class="so">
			     <el-input v-model="search" placeholder="请输入搜索内容" >
			       <el-button slot="append" @click="bysearch" icon="el-icon-search" ></el-button>
			     </el-input>
			   </div>
			</el-menu>
		</el-header>
		<el-main style="padding: 0;" >
			<!-- 登录模块 -->
			<mylogin></mylogin>
			<!-- 注册模块 -->
			<register></register>
			<!-- 发布模块 -->
			<fabuproduct></fabuproduct>
			<keep-alive>
				<router-view />
			</keep-alive>
		</el-main>
		<el-footer style="padding: 0;">
			<div class="footer">
			  <div class="ng-promise-box">
			    <div class="ng-promise">
			      <p class="text">
			        <a class="icon1" href="javascript:;">大量的二手货物</a>
			        <a class="icon2" href="javascript:;">系统的安全保证</a>
			        <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
			      </p>
			    </div>
			  </div>
			  <div class="github">
			    <a href="https://github.com/lantanyu/lantanyubs" target="_blank">
			      <div class="github-but"></div>
			    </a>
			  </div>
			  <div class="mod_help">
			    <p>
			      <router-link to="/">首页</router-link>
			      <span>|</span>
			      <router-link to="/">全部商品</router-link>
			      <span>|</span>
			      <router-link to="/">关于我们</router-link>
			    </p>
			    <p class="coty">201735020417赖泰余 &copy; 2020-2021</p>
			  </div>
			</div>
		</el-footer>
		<!-- <el-button @click="shiyan">ssss</el-button> -->
	</el-container>
 
</template>

<script>
import mylogin from './components/mylogin.vue'
import register from './components/register.vue'
import fabuproduct from './components/fubuproduct.vue'
import {mapState} from 'vuex'
export default {
	components: {
		mylogin,
		register,
		fabuproduct
	},
	computed: {
		 ...mapState(['user'])
	},
	created() {
	  // 获取浏览器localStorage，判断用户是否已经登录
		if (localStorage.getItem("user")) {
			let user = JSON.parse(localStorage.getItem("user"))
			window.localStorage.setItem('token', user.token)
			user.icon ='http://127.0.0.1:7003/img/'+user.icon
			this.$store.commit('login', {users:user,data:false})
			// let username = user.username
			// let password = user.password
			//this.$store.dispatch('login',{username,password})
		}
	},
	mounted() {
	  this.activeIndex = this.$route.path;
	},
	beforeUpdate() {
		this.activeIndex = this.$route.path;
	},
	data() {
	  return {
		activeIndex: "",
		visible: false ,// 是否退出登录
		search: ''
	  };
	},
	methods: {
	  handleSelect(index) {
	  },
	  login() {
	    // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
	   this.$store.dispatch('setShowLogin',true)
	  },
	  tuichu() {
		this.visible = false;
		// 清空本地登录信息
		window.localStorage.setItem("user", "");
		window.localStorage.setItem('token',"")
		// 清空vuex登录信息
		this.$store.dispatch('setUser',"")
		this.$router.push({ path: "/home" });
		this.notifySucceed("成功退出登录");
	  },
	  zhuche() {
		this.$store.dispatch('setisRegister',true) 
	  },
	  fabu() {
		if(this.user!=""){
			this.$store.dispatch('setisfabu',true)
		}
		else{
			this.notifyError("请先登入");
			this.$store.dispatch('setShowLogin',true)
		}  
	  },
	  bysearch () {
		  if (this.search != "") {
		    // 跳转到全部商品页面,并传递搜索条件
		    this.$router.push({ path: "/about", query: { search: this.search } });
		    this.search = "";
		  }
	  },
	  shiyan() {
		  window.localStorage.setItem('token', 'shiyan')
		  console.log(window.localStorage.getItem('token'))
	  }
	  
	}
}
</script>

<style>
.daxiao{
	padding-left: 8%;
	padding-right: 8%;
}
.coler{
	background-color: #f1f1f1;
}
.shiyan{
	padding: 0!important;
}
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 550px;
  padding: 20px 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  margin-left: auto;
  margin-right: auto;
  width: 1300px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 1vw;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
/* .el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
} */
.shiyan .el-menu-demo {
	width: 1300px;
	margin-left: auto;
	margin-right: auto;
}
.shiyan .so {
	width: 300px;
	margin-top: 10px;
	margin-left: auto;
	/* margin-right: 250px; */
}
/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}
.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/imgs/us-icon.png") no-repeat left 0;
}
.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}
.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("./assets/imgs/github.png") no-repeat;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
  
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
/* 底栏容器CSS END */
</style>
