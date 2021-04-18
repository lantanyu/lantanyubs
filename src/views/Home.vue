<template>
  <div >
	<carousel></carousel>
	<product1 :sproducts="sproducts"></product1>
	<div style="background-color: #f1f1f1;" class="clearfix">
		<div id="yie" style="text-align: center;margin-top: 3vh;">
			<el-pagination background layout="prev, pager, next" :page-size="10" :total="totals" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import carousel from '../components/carousel.vue'
import product1 from '../components/product1.vue'
import {mapState} from 'vuex'
export default {
	components: {
		carousel,
		product1,
	},
	mounted () {
		this.$store.dispatch('suoyeupproducts',{yie: 1})
	},
	activated() {
		//this.$store.dispatch('suoyeupproducts',{yie: 1})
	},
	data() {
		return {
		}
	},
	computed: {
		...mapState(['totals','sproducts'])
	},
	// watch: {
	// 	totals: {
	// 		deep: true,
	// 		handler: function(value) {
	// 			this.total = value
	// 		}
	// 	}
	// },
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.$store.dispatch('suoyeupproducts',{yie: val})
		}	
	},

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
