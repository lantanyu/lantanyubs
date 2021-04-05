<template>
	<div id="myxinxi">
		<el-dialog title="修改信息" width="400px" center :visible.sync="ismyxinxi" @open="open">
			<el-form
			:model="xinxi"
			:rules="rules"
			status-icon
			ref="ruleForm"
			class="demo-ruleForm"
			>
				<el-form-item label="名字"  prop="name">
					<el-input style="width: 220px;"
					  placeholder="请输入名字"
					  v-model="xinxi.name"
					></el-input>
				</el-form-item>
				<el-form-item label="电话"  prop="phone">
					<el-input style="width: 220px;"
					  placeholder="请输入电话"
					  v-model="xinxi.phone"
					></el-input>
				</el-form-item>
				<el-form-item label="地区" prop="city">
					<el-cascader
					size="large"
					v-model="xinxi.city"
					:options="options"
					>
					</el-cascader>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-radio-group v-model="xinxi.gender" >
						<el-radio label="0">男</el-radio>
						<el-radio label="1">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-upload
				  ref="upload"
				  multiple
				  :limit="1"
				  action="http:xxx/uploads"
				  list-type="picture-card"
				  :on-remove="handleRemove"
				  :http-request="uploadFile"
				  :file-list="fileList"
				  accept=".jpg, .jpeg, .png, .gif"   
				  :on-change="beforeUpload"   
				  :on-exceed="exceed" 
				  :auto-upload="false">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			  <el-form-item>
				<el-button size="medium" type="primary"  @click="shangchuan" style="width:100%;">注册</el-button>
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
	name: "myxinxi",
	props: ["ismyxinxis"],
	data() {
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
		let genderrule = (rule, value, callback) => {
			if (value!=="0"&&value!=="1") {
				return callback(new Error("请选择性别"));
			}
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
		};
		let cityrule = (rule, value, callback) => {
			if (value.length==0) {
				return callback(new Error("请选择城市"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		
		return {
			options: regionData,
			ismyxinxi: false,
			fileData: '',
			fileList: [],
			dialogImageUrl: '',
			dialogVisible: false,
			xinxi: {
				name: '',
				phone: '',
				gender: '',
				city:[]
			},
			rules: {
			  name: [{ validator: namerule , trigger: "blur" }],
			  phone: [{ validator:phonerule , trigger: "blur" }],
			  gender: [{ validator: genderrule, trigger: "change" }],
			  city: [{ validator:cityrule , trigger: "change" }],
			 
			}
		}
	},
	computed: {
		 ...mapState(['user'])
	},
	watch: {
		ismyxinxis : function(val) {
			if(val) {
				this.ismyxinxi = val
			}
		},
		ismyxinxi: function(val) {
			if (!val) {
				this.fileList =[]
				this.$refs["ruleForm"].resetFields();
				this.$emit("setismyxinxi", val);
			}
		}
	},
	methods: {
		open () {
			this.xinxi.name = this.user.name
			this.xinxi.phone = this.user.phone
			this.xinxi.gender = this.user.gender+""
			let city = this.user.city.split('/')
			if(city.length==3){
				let citys = ['','','']
				citys[0] = TextToCode[city[0]].code
				citys[1] = TextToCode[city[0]][city[1]].code
				citys[2] = TextToCode[city[0]][city[1]][city[2]].code
				this.xinxi.city =citys
			}
			if(this.user.icon!="") {
				this.fileList.push({name:'xxx.jqg',url:this.user.icon})
			}
			
		},
		uploadFile (file) {
			this.fileData.append('file', file.file)
		},
		exceed(files, fileList){
			this.$message.error('最多上传1张图片哦！')
		},
		beforeUpload(file,fileList) {
			const isLt2M = file.size /1024/1024 < 2;
			if (!isLt2M) {
				fileList.pop()
				this.$message.error('上传图片大小不能超过 2MB!');
				return false
			}
			this.fileList = fileList;
		 },
		handleRemove (file, fileList) {
			this.fileList = fileList;
			console.log(file.url)
		},
		 handlePictureCardPreview (file) {
		 	this.dialogImageUrl = file.url
		 	this.dialogVisible = true
		 },
		 shangchuan () {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					if(this.fileList.length==0){
						this.notifyError("至少一张图片");
						return false;
					}else {
						this.fileData = new FormData()
						this.$refs.upload.submit()
						let city = CodeToText[this.xinxi.city[0]]+'/'+CodeToText[this.xinxi.city[1]]+'/'+CodeToText[this.xinxi.city[2]]
						let xinxis = {name: this.xinxi.name,phone: this.xinxi.phone,gender: this.xinxi.gender,city: city}
						let json = JSON.stringify(xinxis);
						console.log(json)
						this.fileData.append('json',json)
						request({
						  method: 'post',
						  url: '/user/userupdata',
						  headers: {'token': window.localStorage.getItem('token')},
						  data: this.fileData
						}).then(response => {
							console.log(response.data.code)
							if(response.data.code==200){
								this.notifySucceed("发布成功");
								this.user.name= this.xinxi.name
								this.user.phone=this.xinxi.phone
								this.user.gender=this.xinxi.gender
								if(response.data.data!=''){
									this.user.icon = 'http://127.0.0.1:7003/img/'+response.data.data
								}
								this.user.city = city
								this.$refs["ruleForm"].resetFields();
								this.fileList =[]
								this.ismyxinxi = false
								
							}else {
								this.notifyError(response.data.message);
							}
							this.fileList = []
						}).catch((error) => {
						  console.log(error)
						  alert('连接失败')
						})	
					}
				} else {
					return false;
				}
			})
		}
		
	}
}
</script>

<style>
</style>
