<template>
	<div id="ck">
		<el-dialog title="冲突申请" width="400px" center :visible.sync="iscks" @open="open" >
			<el-form
			:model="ck"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="申请理由"  prop="text">
					<el-input style="width: 260px;"
					  v-model="ck.text"
					  placeholder="请输入分类名字"
					></el-input>
				</el-form-item>
				
			  <el-form-item>
				<el-button size="medium" type="primary" @click="create" style="width:100%;">确定申请</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {request} from '../myaxios/request.js'
export default {
	name: "ck",
	props: ["isck","orderid"],
	data () {
		let textrule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入理由"));
			}
			const Rule = /^.{1,50}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-50之间,"));
			}
		};
		
		return {
			iscks: false,
			ck: {
				orderid: '',
				text: '',
			},
			rules: {
				text: [{ validator: textrule , trigger: "blur" }],
			}
		}
	},
	watch: {
		isck : function(val) {
			if(val) {
				this.iscks = val
			}
		},
		iscks: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.ck = {orderid: '',text: '',userid: ''}
				this.$emit("setisck", val);
			}
		}
	},
	methods: {
		open () {
			this.ck.orderid = this.orderid
		},
		
		create() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					request({
						method: 'post',
						url: `/order/orderct`,
						data: this.ck,
						headers: {'token': window.localStorage.getItem('token')},
					}).then(response => {
						if(response.data.code==200){
							this.notifySucceed(response.data.message)
							this.iscks = false
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