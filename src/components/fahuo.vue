<template>
	<div id="fahuo">
		<el-dialog title="发货" width="400px" center :visible.sync="isfahuos" @open="open" >
			<el-form
			:model="fahuo"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="快递公司"  prop="kuidi">
					<el-input style="width: 260px;"
					  v-model="fahuo.kuidi"
					  placeholder="请输入快递公司"
					></el-input>
				</el-form-item>
				<el-form-item label="快递编号"  prop="kuidihao">
					<el-input style="width: 260px;"
					  v-model="fahuo.kuidihao"
					  placeholder="请输入快递编号"
					></el-input>
				</el-form-item>
			  <el-form-item>
				<el-button size="medium" type="primary" @click="gofahuo" style="width:100%;">确定发货</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	name: "fahuo",
	props: ["isfahuo","orderid","shibie"],
	data () {
		let namerule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入快递公司"));
			}
			const Rule = /^.{1,20}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-20之间,"));
			}
		};
		let phonerule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入快递编号"));
			}
			const Rule = /^.{1,20}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-20之间,"));
			}
		};
		return {
			isfahuos: false,
			fahuo: {
				kuidi: '',
				kuidihao: '',
			},
			rules: {
				kuidi: [{ validator: namerule , trigger: "blur" }],
				kuidihao: [{ validator:phonerule , trigger: "blur" }],
			}
		}
	},
	watch: {
		isfahuo : function(val) {
			if(val) {
				this.isfahuos = val
			}
		},
		isfahuos: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.$emit("setisfahuo", val);
			}
		}
	},
	methods: {
		open () {
			
		},
		gofahuo() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					if(this.shibie==="1"){
						let fahuos = {orderid:this.orderid,kuidi: this.fahuo.kuidi,kuidihao: this.fahuo.kuidihao}
						request({
						  method: 'post',
						  url: '/order/fahuo',
						  headers: {'token': window.localStorage.getItem('token')},
						  data: fahuos
						}).then(response => {
							if(response.data.code==200){
								this.notifySucceed(response.data.message);
								this.$emit("setstatus", 2);
								this.isfahuos =false
								
							}else {
								this.notifyError(response.data.message);
							}
						}).catch((error) => {
						  console.log(error)
						  this.notifyError("连接失败");
						})	
						return
					}
					if(this.shibie==="2"){
						let fahuos = {byorderid:this.orderid,kuidi: this.fahuo.kuidi,kuidihao: this.fahuo.kuidihao}
						request({
						  method: 'post',
						  url: '/order/tuihuofahuo',
						  headers: {'token': window.localStorage.getItem('token')},
						  data: fahuos
						}).then(response => {
							if(response.data.code==200){
								this.notifySucceed(response.data.message);
								this.$emit("setstatus", 2);
								this.isfahuos =false
								
							}else {
								this.notifyError(response.data.message);
							}
						}).catch((error) => {
						  console.log(error)
						  this.notifyError("连接失败");
						})	
						return
					}
					
				}
				else {
					return false;
				}
			})
		}
	},

}
</script>

<style>
</style>
