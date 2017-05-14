<template>
	<transition name="slide-down">	
		<div class="login">
			<span class="login-about" @click="showAbout">关于</span>
			<h2 class="login-please">请输入您的名字</h2>
			<div class="login-input">
				<input type="text" class="login-input-txt" @keydown.enter="goChat()" v-model.trim="username">
			</div>
			<div class="login-shadow" v-if="isShowAbout"></div>
			<About v-if="isShowAbout"></About>
		</div>
	</transition>
</template>

<script>
	import About from "./about"
	export default {
		name: "login",
		data (){
			return {
				username: ""
			}
		},
		computed: {
			isShowAbout (){
				return this.$store.state.isShowAbout
			}
		},
		methods: {
			showAbout (){
				this.$store.commit("showAbout",true);
			},
			goChat (){
				if(!this.username){
					return;
				}
				this.$store.commit("changeName",this.username);
				localStorage.username = this.username;
				this.$router.push("chat");
			}
		},
		components: {
			About
		}
	}
</script>

<style lang="scss" scoped>
	$center: center;
	.slide-down-enter-active{
		transition:all .4s;
	}
	.slide-down-enter{
		transform:translateY(-500px);
	}
	.login {
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-item: center;
		position:absoult;
		top:0;
		bottom:0;
		left:0;
		right:0;
		width:100%;
		height:100%;
		background:skyblue;
		.login-about{
			position:absolute;
			right:1rem;
			top:1rem;
			color:#fff;
		}
		.login-please{
			color:#666;
			text-align:$center;
		}
		.login-input{
			text-align:$center;
		}
		.login-input-txt{
			text-align:$center;
			background:transparent;
			border-bottom:1px solid;
			padding:.5rem;
			font-size:1rem;
		}
		.login-shadow{
			position:fixed;
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
		}
	}
</style>