<template>
	<div id="myaddress">
		<el-dialog title="地址" width="400px" center :visible.sync="isaddres" @open="open" >
			<el-form
			:model="address"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="收货人"  prop="name">
					<el-input style="width: 220px;"
					  v-model="address.name"
					  placeholder="请输入收货人"
					></el-input>
				</el-form-item>
				<el-form-item label="电话"  prop="phone">
					<el-input style="width: 220px;"
					  v-model="address.phone"
					  placeholder="请输入电话"
					></el-input>
				</el-form-item>
				<el-form-item label="地区" prop="citys">
					<el-cascader
					size="large"
					v-model="address.citys"
					:options="options"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="详细地址"  prop="detailaddresss">
					<el-input 
					  v-model="address.detailaddresss"
					  placeholder="请输入详细地址"
					></el-input>
				</el-form-item>
			  <el-form-item>
				<el-button size="medium" type="primary" @click="queding2"  style="width:100%;">确定</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import {regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {request} from '../myaxios/request.js'
import {mapState} from 'vuex'
export default {
	name: "myaddress",
	props: ["isaddress","adds"],
	data () {
		let namerule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入名字"));
			}
			const Rule = /^.{1,12}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度1-12之间,"));
			}
		};
		let phonerule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入电话号码"));
			}
			const Rule = /^\d{11}$/;
			if (Rule.test(value)) {
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			} else {
				return callback(new Error("长度为11位,"));
			}
		};
		let cityrule = (rule, value, callback) => {
			if (value.length==0) {
				return callback(new Error("请选择城市"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		let detailaddresssrule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入详细地址"));
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
			options: regionData,
			isaddres: false,
			address: {
				name: '',
				phone: '',
				citys: [],
				detailaddresss: ''
			},
			rules: {
				name: [{ validator: namerule , trigger: "blur" }],
				phone: [{ validator:phonerule , trigger: "blur" }],
				citys: [{ validator:cityrule , trigger: "change" }],
				detailaddresss: [{ validator:detailaddresssrule , trigger: "blur" }],
			}
		}
	},
	watch: {
		isaddress : function(val) {
			if(val) {
				this.isaddres = val
			}
		},
		isaddres: function(val) {
			if (!val) {
				this.$refs["ruleForm"].resetFields();
				this.address.name = ''
				this.address.phone = ''
				this.address.citys=[]
				this.address.detailaddresss =''
				this.$emit("setisaddress", val);
			}
		}
	},
	methods: {
		open () {
			if(!this.adds =='') {
				this.address.name = this.adds.name
				this.address.phone = this.adds.phone
				this.address.citys =[]
				this.address.citys.push(TextToCode[this.adds.province].code)
				this.address.citys.push(TextToCode[this.adds.province][this.adds.city].code)
				this.address.citys.push(TextToCode[this.adds.province][this.adds.city][this.adds.region].code)
				this.address.detailaddresss =this.adds.detailaddresss
			}
		},
		queding2() {
			if(this.adds==''){
				this.queding()
			}else {
				this.updata()
			}
		},
		queding() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					
					let addresssc = {name:this.address.name,phone:this.address.phone,province:CodeToText[this.address.citys[0]],city:CodeToText[this.address.citys[1]],region:CodeToText[this.address.citys[2]],detailaddresss:this.address.detailaddresss}
					request({
					  method: 'post',
					  url: '/user/addaddress',
					  headers: {'token': window.localStorage.getItem('token')},
					  data: addresssc
					}).then(response => {
						if(response.data.code==200){
							this.notifySucceed("发布成功");
							this.$emit("addaddress", response.data.data);
							this.isaddres = false
						}else {
							this.notifyError(response.data.message);
						}
					}).catch((error) => {
					  console.log(error)
					  alert('连接失败')
					})	
				}
				else {
					return false;
				}
			})
		},
		updata() {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					
					let addresssc = {addressid: this.adds.addressid,name:this.address.name,phone:this.address.phone,province:CodeToText[this.address.citys[0]],city:CodeToText[this.address.citys[1]],region:CodeToText[this.address.citys[2]],detailaddresss:this.address.detailaddresss}
					request({
					  method: 'post',
					  url: '/user/updataaddress',
					  headers: {'token': window.localStorage.getItem('token')},
					  data: addresssc
					}).then(response => {
						if(response.data.code==200){
							this.notifySucceed("发布成功");
							this.adds.name=this.address.name
							this.adds.phone=this.address.phone
							this.adds.province=CodeToText[this.address.citys[0]]
							this.adds.city=CodeToText[this.address.citys[1]]
							this.adds.region=CodeToText[this.address.citys[2]]
							this.adds.detailaddresss=this.address.detailaddresss
							this.isaddres = false
						}else {
							this.notifyError(response.data.message);
						}
					}).catch((error) => {
					  console.log(error)
					  alert('连接失败')
					})	
				}
				else {
					return false;
				}
			})
			
		}
	}
}
</script>

<style>
</style>
