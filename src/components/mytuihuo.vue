<template>
	<div id="mytuihuo">
		<el-dialog title="退货" width="400px" center :visible.sync="istuihuos" @open="open" >
			<el-form
			:model="tuihuo"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				
				<el-form-item label="退货原因"  prop="tuihuotext">
					<el-input style="width: 260px;"
					  v-model="tuihuo.tuihuotext"
					  placeholder="请输入退货原因"
					></el-input>
				</el-form-item>
				<el-form-item label="是否包邮" prop="method">
				    <el-radio-group v-model="tuihuo.methon" >
				      <el-radio label="0">不包邮</el-radio>
				      <el-radio label="1">包邮</el-radio>
				    </el-radio-group>
				</el-form-item>
				<el-form-item label="邮价" prop="yunprice">
				    <el-input-number v-model="tuihuo.yunprice" style="width: 300px;"  controls-position="right" :min="0" :max="1000000"></el-input-number>
				</el-form-item>
			  <el-form-item>
				<el-button size="medium" type="primary" @click="gotuihuo" style="width:100%;">申请退货</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	name: "mytuihuo",
	props: ["istuihuo","orderid"],
	data () {
		let tuihuotextrule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入退货原因"));
			}
			const Rule = /^.{1,100}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-100之间,"));
			}
		};
		let methonrule = (rule, value, callback) => {
			if (value!=="0"&&value!=="1") {
				return callback(new Error("请选择方式"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		let yunpricerule = (rule, value, callback) => {
			if (value<0) {
				return callback(new Error("不能为负数"));
			}
			const Rule = /^[0-9]+(\.[0-9]{1,2})?$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("两位小数"));
			}
		};
		return {
			istuihuos: false,
			tuihuo: {
				orderid: '',
				tuihuotext: '',
				methon: '0',
				yunprice: 0
			},
			rules: {
				tuihuotext: [{ validator: tuihuotextrule , trigger: "blur" }],
				methon: [{ validator:methonrule , trigger: "change" }],
				yunprice: [{ validator:yunpricerule , trigger: "change" }],
			}
		}
	},
	watch: {
		istuihuo : function(val) {
			if(val) {
				this.istuihuos = val
			}
		},
		istuihuos: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.$emit("setistuihuo", val);
			}
		}
	},
	methods: {
		open () {
			
		},
		gotuihuo() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					this.tuihuo.orderid = this.orderid
					request({
							  method: 'post',
							  url: '/order/tuihuo',
							  headers: {'token': window.localStorage.getItem('token')},
							  data: this.tuihuo
							}).then(response => {
								if(response.data.code==200){
									this.notifySucceed(response.data.message);
									this.$emit("setstatus", 6);
									this.istuihuos =false
									
								}else {
									this.notifyError(response.data.message);
								}
							}).catch((error) => {
							  console.log(error)
							  this.notifyError("连接失败");
							})	
				
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