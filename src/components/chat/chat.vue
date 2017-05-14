<template>
	<transition name="slide-right">
		<div class="chat">
			<!-- 顶部 -->
			<div class="chat-title">
				<div :class="['chat-to-AI',isActive ? 'chat-to-AI-active' : 'chat-to-AI-unactive']" @click="$router.push('AIchat')">
				</div>
				<div class="chat-title-name">
					群聊
				</div>
				<div class="chat-to-home" @click="$router.push('login')">
				</div>
			</div>
			<!-- 聊天内容 -->
			<div class="chat-content">
				<div v-for="(item,inex) in msgs">
					<p class="chat-content-time">
						{{item.date}}
					</p>
					<div class="chat-content-info">
						<img :src="item.headUrl" alt="" class="chat-head">
						<span class="chat-location">[{{item.location}}]</span>
						<span class="chat-username">{{item.from}}</span>
					</div>
					<div>
						<span class="chat-content-txt">{{item.content}}</span>
					</div>
				</div>
			</div>
			<!-- 底部 -->
			<div class="chat-bottom">
				<div class="chat-emo">
					
				</div>
				<div class="chat-txt">
					<textarea type="text" class="chat-input" placeholder="左上角还有智能机器人哦" v-model.trim="msg">
					</textarea>
					<button class="chat-send" @click="send()">发送</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "chat",
		data (){
			return {
				isActive: false,
				msg: "",
				oContent: {},
      			oTextarea: {},
				//如果本地存在聊天记录则使用 否则赋值空数组
				msgs: localStorage.msgs_group && JSON.parse(localStorage.msgs_group) || [],
			}
		},
		//判断是否存在用户名
		beforeRouteEnter(to, from, next) {
    		if (!localStorage.username) {
    			next('/')
			}else{
    			next();
    		}
  		},
		watch: {
			msgs (msgs){
				//监听msgs变化 及时更新本地存储
				localStorage.msgs_group = JSON.stringify(msgs);
			}
		},
		mounted (){
			setInterval(()=>{this.isActive = !this.isActive},2000);
			this.oContent = document.querySelector(".chat-content");
			//动态设置聊天内容的高度
			this.oContent.style.height = document.body.offsetHeight-document.querySelector(".chat-title").offsetHeight-document.querySelector(".chat-bottom").offsetHeight+"px";
			this.oContent.scrollTop = this.oContent.scrollHeight;
			this.oTextarea = document.querySelector(".chat-input");
			// 发射事件 接受 事件名 发送数据 [回调] 三个参数
			socket.emit('online', this.$store.state.username);
			// 监听事件 接受 事件名 匿名函数（参数为接收数据）
			socket.on("online",(name)=>{
				if(!name){
					return;
				}
				// 上线提示
				let oOnline = document.createElement("div");
				oOnline.className = "online";
				oOnline.style = "text-align:center;";
				oOnline.innerText = name+"上线了";
				this.oContent.appendChild(oOnline);
				this.oContent.scrollTop = this.oContent.scrollHeight;
			});
			// 接受群聊消息
			socket.on("receiveGroupMsg",data=>{
				this.msgs.push(data);
				setTimeout(()=>this.oContent.scrollTop = this.oContent.scrollHeight,0);
			});
		},
		computed: {
			headUrl (){
				return this.$store.state.headUrl
			}
		},
		methods: {
			send (){
				if(!this.msg) return;
				this.msgs.push({
					date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
					location: localStorage.address,
					from: localStorage.username,
					content: this.msg,
					self: true,
					headUrl: this.headUrl
				});
				socket.emit("sendGroupMsg",{
					date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
					location: localStorage.address,
					from: localStorage.username,
					content: this.msg,
					self: true,
					headUrl: this.headUrl
				});
				this.msg = "";
				setTimeout(()=>this.oContent.scrollTop = this.oContent.scrollHeight,0);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slide-right-enter-active{
		transition: all .4s ease;
	}
	.slide-right-enter{
		transform: translateX(-375px);
		opacity: 0;
	}
	.online{
		text-align:center;
		color:#999;
	}
	.chat{
		width:100%;
		height:100%;
		background:#efefef;
		.chat-title{
			display:flex;
			justify-content:space-between;
			height:2rem;
			line-height:2rem;
			background:rgba(0,0,255,.7);
			.chat-to-AI,
			.chat-to-home{
				width:4rem;
			}
			.chat-to-AI-active{
				background:url("../../common/icons/icon-ai.svg") no-repeat left center;
				background-size:contain;
			}
			.chat-to-AI-unactive{
				background:url("../../common/icons/icon-ai2.svg") no-repeat left center;
				background-size:contain;
			}
			.chat-to-home{
				background:url("../../common/icons/icon-index.svg") no-repeat right center;
				background-size:contain;
			}
			.chat-title-name{
				width:6rem;
				text-align:center;
				color:#fff;
				background:url("../../common/icons/icon-group.svg") no-repeat left center;
				background-size:contain;
			}
		}
		.chat-content{
			overflow:auto;
			.chat-content-time{
				text-align:center;
				height:3rem;
				line-height:3rem;
				color:#999;
			}
			.chat-content-info{
				text-align:left;
				.chat-head{
					width:2rem;
					height:2rem;
					border-radius:50%;
					vertical-align:middle;
				}
				.chat-location{
					color:#999;
				}
			}
				.chat-content-txt{
					display:inline-block;
					min-width:14rem;
					background:#fff;
					border-radius:10px;
					margin:.5rem 1rem;
					padding:.5rem;
				}
		}
		.chat-bottom{
			display:flex;
			width:100%;
			height:2.5rem;
			background:#efefef;
			padding:1px 0;
			.chat-emo{
				width:10%;
				height:100%;
				background:url("../../common/icons/icon-emoji.svg") no-repeat center;
				background-size:auto 70%;
			}
			.chat-txt{
				display:flex;
				flex:1;
				height:100%;
			}
			.chat-input{
				padding:.5rem;
				resize:none;  /*去除默认样式*/
				width:80%;
				height:80%;
				border-radius:1rem;
				margin:.2rem;
			}
			.chat-send{
				flex:1;
				height:100%;
				background:yellow;
				cursor:pointer;
			}
		}
	}
</style>