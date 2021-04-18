<template>
	<div >
		<product1 :sproducts="productsbyname"></product1>
		
		<div style="background-color: #f1f1f1;" class="clearfix">
			<div id="yie" style="text-align: center;">
				<el-pagination background layout="prev, pager, next" :page-size="10" :total="totalsbyname" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import product1 from '../components/product1.vue'
import {mapState} from 'vuex'
export default {
	components: {
		product1
	},
	computed: {
		...mapState(['totalsbyname','productsbyname'])
	},
	data () {
		return {
			search: '',
			fenleiid: -1,
		}
	},
	activated () {
		if (Object.keys(this.$route.query).length == 0) {
			this.fenleiid = 0
			this.$store.dispatch('settotalsbyname')
			this.$store.dispatch('productsbyall',{yie: 1})
			this.search =''
			return;
		}
		if (this.$route.query.fenleiid != undefined) {
			this.search =''
			this.fenleiid = this.$route.query.fenleiid
			this.$store.dispatch('settotalsbyname')
			this.$store.dispatch('getproductbyfenlei',{fenlei2id:this.fenleiid,yie: 1})
			return;
		}
		if (this.$route.query.search != undefined) {
			console.log("a")
			this.search=this.$route.query.search
			this.fenleiid = -1
		}
		
	},
	watch: {
		$route: function(val) {
			  if (val.path == "/about") {
					if (val.query.search != undefined) {
						console.log("b")
						this.search = val.query.search;
						this.fenleiid =-1
					}
			  }
		},
		search: function(val) {
			if(val!="") {
			this.$store.dispatch('settotalsbyname')
			this.$store.dispatch('getproductbysearch',{search:val,yie:1})
			}
		}
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			if(this.search!="") {
				let search = this.search
				this.$store.dispatch('getproductbysearch',{search,yie:val})
				return
			}else if(this.fenleiid==0) {
				this.$store.dispatch('productsbyall',{yie: val})
			}else if(this.fenleiid!=0&&this.fenleiid!=-1) {
				this.$store.dispatch('getproductbyfenlei',{fenlei2id:this.fenleiid,yie: val})
			}
		}	
	}
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
</style>
