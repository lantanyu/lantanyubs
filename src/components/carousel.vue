<template>
	<el-carousel :interval="4000" type="card" height="300px" style="margin-left: auto;margin-right: auto;width: 1300px;margin-top: 2vh;">
	    <el-carousel-item v-for="item in imagesBox" :key="item.id">
	            <img :src="item.idView" height="100%" width="100%">
	    </el-carousel-item>
	  </el-carousel>
</template>

<script>
export default {
	data(){
		
		return{
			imagesBox:[{id:0,idView:require("../assets/64905c5ededa41b56aef98c451c7703e.jpeg")},
				{id:1,idView:require("../assets/092fcbbb26740518309042ea451c43ac.jpeg")},
				{id:2,idView:require("../assets/64905c5ededa41b56aef98c451c7703e.jpeg")}],
			fiveNews: []
		}
	}
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>