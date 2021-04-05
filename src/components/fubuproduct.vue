<template>
	<div id="fubuproduct">
	  <el-dialog title="发布商品" width="800px" center :visible.sync="isfabus" @open="open">
	    <el-form
		  :model="product"
		  ref="ruleForm"
		  :rules="rules"
	      status-icon
	      class="demo-ruleForm"
	    >
		  <el-form-item label="商品名字" prop="productidname">
			<el-input style="width: 200px;" v-model="product.productidname" prefix-icon="el-icon-user-solid"
			  placeholder="商品名字"
			></el-input>
		  </el-form-item>
	      <el-form-item label="商品描述" prop="text">
	        <el-input
			  type="textarea"
			  maxlength="450"
	          placeholder="二手商品描述"
			  v-model="product.text"
	        ></el-input>
	      </el-form-item>
		  <el-form-item label="商品分类" prop="fenlei2id">
		    <el-cascader
		          size="large"
		          :options="fenlei1"
		          v-model="product.fenlei2id"
		          @change="handleChangecity">
		    </el-cascader>
		  </el-form-item>
	      <el-form-item label="发布地区" prop="city">
	        <el-cascader
	              size="large"
	              :options="options"
	              v-model="product.city"
	              @change="handleChange">
	        </el-cascader>
	      </el-form-item>
		  <el-form-item label="交易方式" prop="method">
		      <el-radio-group v-model="product.method" >
		        <el-radio label="0">不包邮</el-radio>
		        <el-radio label="1">包邮</el-radio>
				<el-radio label="2">自提</el-radio>
				<el-radio label="3">面交</el-radio>
		      </el-radio-group>
		  </el-form-item>
		  <el-form-item label="价格" prop="price" >
		      <el-input-number v-model="product.price" controls-position="right" :min="0" :max="1000000"></el-input-number>
		  </el-form-item>
		  <el-form-item label="邮费" prop="baoyouprice" >
		      <el-input-number v-model="product.baoyouprice" controls-position="right" :min="0" :max="10000"></el-input-number>
		  </el-form-item>
		  <el-upload
		    ref="upload"
		    multiple
		    :limit="5"
		    action="http:xxx/uploads"
		    list-type="picture-card"
		    :on-preview="handlePictureCardPreview"
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
		  <br/>
		  
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">发布商品</el-button>
		  
	    </el-form>
	  </el-dialog>
	</div>
</template>

<script>
import {regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {request} from '../myaxios/request.js'
export default {
	data () {
		
		let productnamerule = (rule, value, callback) => {
		  if (!value) {
		    return callback(new Error("请输入商品名字"));
		  }
		  const Rule = /^.{5,40}$/;
		  if (Rule.test(value)) {
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		  } else {
		    return callback(new Error("长度5-40之间,"));
		  }
		};
		
		let textrule = (rule, value, callback) => {
			if (!value) {
				return callback(new Error("请输入描述"));
			}
			if(value.length>4){
				this.$refs.ruleForm.validateField("checkPass");
				return callback();
			}else {
				return callback(new Error("最少5个字"));
			}
		};
		
		let fenleirule = (rule, value, callback) => {
			if (value.length==0) {
				return callback(new Error("请选择分类"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		
		let cityrule = (rule, value, callback) => {
			if (value.length==0) {
			   return callback(new Error("请选择分类"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		
		let methodrule = (rule, value, callback) => {
			if (value!=="0"&&value!=="1"&&value!=="2"&&value!=="3") {
				return callback(new Error("请选择方式"));
			}
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		
		};
		
		let pricerule = (rule, value, callback) => {
		  if (value<=0) {
		    return callback(new Error("不能为零"));
		  }
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		 
		};
		
		let baoyoupricerule = (rule, value, callback) => {
		  if (value<0) {
		    return callback(new Error("出错"));
		  }
			this.$refs.ruleForm.validateField("checkPass");
			return callback();
		};
		
		
		return {
			fileData: '',
			fileList: [],
			delectpic:[], //要删除的图片
			tupian: '', //剩下的图片
			dialogImageUrl: '',
			dialogVisible: false,
			options: regionData,
			fenlei1: [],
			//{"fenlei2id":2,"productidname":"小米10","text":"通缩不去","method":0,"price":300.5,"baoyouprice":20,"city":"上海"}
			product: {
				productidname: "",
				text:'',
				fenlei2id: [],
				method: '',
				price: 0,
				baoyouprice: 0,
				city: []
			},
			rules: {
			  productidname: [{ validator: productnamerule , trigger: "blur" }],
			  text: [{ validator:textrule , trigger: "blur" }],
			  fenlei2id: [{ validator: fenleirule, trigger: "change" }],
			  city: [{ validator:cityrule , trigger: "change" }],
			  method: [{ validator: methodrule, trigger: "change" }],
			  price: [{ validator:pricerule , trigger: "blur" }],
			  baoyouprice: [{ validator: baoyoupricerule, trigger: "blur" }]
			}
		}
	},
	computed: {
		isfabus: {
			get() {
				return this.$store.getters.getisfabu;
			},
			set(val) {
				this.$store.dispatch('setisfabu',val) ;
				if(this.isfabugenxin){
				  this.$refs["ruleForm"].resetFields();
				  this.delectpic =[]
				  this.tupian =''
				  this.product.productidname=''
				  this.product.text=''
				  this.product.fenlei2id=[]
				  this.product.method=''
				  this.product.price =0
				  this.product.baoyouprice=0
				  this.product.city=[]
				  this.fileList =[]
				}
				this.$store.commit('setisfabugenxin',false)
			}
		},
		isfabugenxin: {
			get() {
			  return this.$store.getters.getisfabugenxin;
			}
		}
	},
	methods: {
		uploadFile (file) {
			this.fileData.append('files', file.file)
		},
		exceed(files, fileList){
			this.$message.error('最多上传5张图片哦！')
		},
		beforeUpload(file,fileList) {
			const isLt2M = file.size /1024/1024 < 2;
			console.log(file.size)
			if (!isLt2M) {
				fileList.pop()
				this.$message.error('上传图片大小不能超过 2MB!');
				return false
			}
			this.fileList = fileList;
		 },
		submit () {
			if(this.isfabugenxin){
				this.updataUpload()
			}else {
				this.submitUpload()
			}
		},
		updataUpload () {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					this.fileData = new FormData()
					this.$refs.upload.submit()
					let product = this.product
					let city = CodeToText[product.city[0]]+'/'+CodeToText[product.city[1]]+'/'+CodeToText[product.city[2]]
					let productst = this.$store.state.products
					let i =0
					let picbs = [] //备份
					productst.pic = productst.pic.filter(pics => {
						let ifs =0
						picbs.push(pics)
						this.delectpic.forEach(delect => {
							if(delect ==pics) {
								ifs =1
							}
						})
						if(ifs==1){
							return false
						}
						this.tupian =';'+pics.substr(26,41)
						return true
					})
					
					let products = {productid:productst.productid,productidname: product.productidname,text:product.text,pic:this.tupian,fenlei2id: product.fenlei2id[1],method: product.method,price: product.price,baoyouprice: product.baoyouprice,city: city}
					let json = JSON.stringify(products);
					this.fileData.append('json',json)
					request({
					  method: 'post',
					  url: '/product/updataproduct',
					  headers: {'token': window.localStorage.getItem('token')},
					  data: this.fileData
					}).then(response => {
						console.log(response.data.code)
						if(response.data.code==200){
							this.notifySucceed("发布成功");
							productst.productidname = product.productidname
							productst.text = product.text
							productst.fenleiid  = product.fenlei2id[1]
							productst.method = product.method
							productst.price = product.price
							productst.baoyouprice = product.baoyouprice
							let arrstr = response.data.data.split(';')
							let arrstr2 = []
							arrstr.forEach(str => {
								if(str!=='') {
									str = 'http://127.0.0.1:7003/img/'+str
									arrstr2.push(str)
								}
							})
							productst.pic = arrstr2
							this.$refs["ruleForm"].resetFields();
							this.fileList = []
							this.product.productidname=''
							this.product.text=''
							this.product.fenlei2id=[]
							this.product.method=''
							this.product.price =0
							this.product.baoyouprice=0
							this.product.city=[]
							this.delectpic =[]
							this.tupian =''
							this.$store.dispatch('setisfabu',false) ;
						}else {
							this.delectpic =[]
							this.tupian =''
							productst.pic = picbs
							this.notifyError(response.data.message);
						}
						this.fileList = []
					}).catch((error) => {
						this.delectpic =[]
						this.tupian =''
						productst.pic = picbs
						console.log(error)
						alert('连接失败')
					})	
				} else {
					return false;
				}
			});	
		},
		submitUpload () {
			this.$refs["ruleForm"].validate(valid => {
			  //如果通过校验开始注册
				if (valid) {
					
					if(this.fileList.length==0){
						this.notifyError("至少一张图片");
						return false;
					}else {
						const isLt5M = this.fileList.every(file => file.size / 1024 / 1024 < 10);
						if(!isLt5M) {
							this.notifyError("不超过10m大小");
							return false;
						}else {
							this.fileData = new FormData()
							this.$refs.upload.submit()
							let product = this.product
							let city = CodeToText[product.city[0]]+'/'+CodeToText[product.city[1]]+'/'+CodeToText[product.city[2]]
							let products = {productidname: product.productidname,text:product.text,fenlei2id: product.fenlei2id[1],method: product.method,price: product.price,baoyouprice: product.baoyouprice,city: city}
							let json = JSON.stringify(products);
							this.fileData.append('username', '001')
							this.fileData.append('json',json)
							request({
							  method: 'post',
							  url: '/product/creatproduct',
							  headers: {'token': window.localStorage.getItem('token')},
							  data: this.fileData
							}).then(response => {
								console.log(response.data.code)
								if(response.data.code==200){
									this.notifySucceed("发布成功");
									this.fileList = []
									this.product.productidname=''
									this.product.text=''
									this.product.fenlei2id=[]
									this.product.method=''
									this.product.price =0
									this.product.baoyouprice=0
									this.product.city=[]
									this.$refs["ruleForm"].resetFields();
									this.$store.dispatch('setisfabu',false) ;
								}else {
									this.notifyError(response.data.message);
								}
								
							  this.fileList = []
							}).catch((error) => {
							  console.log(error)
							  alert('连接失败')
							})
						}
					}
				} else {
					return false;
				}
			});
		},
		handleRemove (file, fileList) {
			this.fileList = fileList;
			this.delectpic.push(file.url)
			console.log(file.url)
		},
		handlePictureCardPreview (file) {
			this.dialogImageUrl = file.url
			this.dialogVisible = true
		},
		handleChange (value) {
			console.log(CodeToText[value[0]])
			console.log(CodeToText[value[1]])
			console.log(CodeToText[value[2]])
		},
		handleChangecity (value) {
			console.log(value[0])
			console.log(value[1])
		},
		open () {
			let urls = '/product/all/getfenlei1'
			request({
			  method: 'get',
			  url: urls,
			  headers: {'token': window.localStorage.getItem('token')},
			}).then(response => {
			  const fenleis = response.data.data
			  let fenleis2 =[]
			  fenleis.forEach(fenlei1 => {
				  let children = []
				  let fenlei2s = fenlei1.fenlei2s
				  fenlei2s.forEach(fenlei2 =>{
						children.push({value:fenlei2.fenlei2id,label:fenlei2.name})	
				  })
				  fenleis2.push({value:fenlei1.fenlei1id,label:fenlei1.name,children:children})
			  })
			  this.fenlei1 = fenleis2
			}).catch((error) => {
			  console.log(error)
			  alert('连接失败')
			})
			if(this.isfabugenxin) {
				//{productidname: product.productidname,text:product.text,fenlei2id: product.fenlei2id[1],method: product.method,price: product.price,baoyouprice: product.baoyouprice,city: city}
				let products = this.$store.state.products
				this.product.productidname=products.productidname
				this.product.text=products.text
				this.product.fenlei2id=[]
				this.product.method=products.method+''
				this.product.price =products.price
				this.product.baoyouprice=products.baoyouprice
				let i =0
				let city = products.city.split('/')
				let citys = ['','','']
				citys[0] = TextToCode[city[0]].code
				citys[1] = TextToCode[city[0]][city[1]].code
				citys[2] = TextToCode[city[0]][city[1]][city[2]].code
				this.product.city=citys
				products.pic.forEach(pics => {
					this.fileList.push({name:i+'jqg',url:pics})
				})
			}
		}
	},
	
}
</script>

<style>
</style>
