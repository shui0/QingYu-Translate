 <template>
   <view>
	 <!-- <h1>{{imghrefValue}}</h1> -->
	 <br>
	 <input type="text" v-model="imghrefValue" style="height: 20%;width: 80%;margin: auto;" placeholder="输入你的服务器ipv4地址" />
	 <br>
	 <button v-show="count" @click="startUpdata()">start</button>
	 <button v-show="!count" @click="stopUpdata()">stop</button>
	 <img :src="imghref" alt="translation" style='width: 100%;vertical-align: middle;'>
   </view>
 </template>

<script>
export default {
   data() {
     return {
		imghrefValue:``,
		imghref: `http://${this.imghrefValue}:8080/img/${this.imgname}`,
		imgname:'',
		count : true,
		itimer : 1,
     };
   },
   methods: {
     getServerData() {
		 var imghr = this.imghrefValue.replace(/[, ]/g,'')
		 console.log(imghr)
		uni.request({
		   url : `http://${imghr}:8080/api/img/getimgName`, 
		   success: (res) => {
			   if(res.data.status == 0){
					console.log(res.data.imgName)
					// var a = '   aaa   '
					// console.log(a.replace(/[, ]/g,''));
					this.imgname = res.data.imgName
					this.imghref = `http://${imghr}:8080/img/${res.data.imgName}`
		        }},
			fail: (res)=>{
					console.log('get失败');
				},
			timeout: 1000,
	   })
     },
	 startUpdata() {
	 	this.count = false;
	 	if(!this.count) {
	 		this.itimer = setInterval(() => {
				this.getServerData()
			},"1000")
	 	}
	 },
	 stopUpdata() {
		 this.count = true;
		 if(this.count) {
		 	clearInterval(this.itimer)
		 }
	 }
   }
 };
</script>
 
 <style scoped>
   /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
   .charts-box {
     width: 100%;
     height: 300px;
   }
 </style>