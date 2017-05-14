<template>
	<transition name="opacity">
		<div class="about">
			<span @click="showAbout" class="about-close">关闭</span>
			<div class="about-content">
				<h2>Vue.js+Socket.io打造一个智能聊天室</h2>
				技术栈：
				Vue2(页面构建+数据驱动)
				Socket.io(实时通信)
				Vuex(不同组件状态共享)
				vue-router(路由)
				axios(发起http请求)
				SASS(SCSS)
				Express(上线版本是Koa2)
				Webpack(自动化构建)
				Moment.js(时间处理)
				ES6(贯穿全部)
				localStorage(HTML5)
				CSS3(动画及样式)
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		methods:{
			showAbout (){
				this.$store.commit("showAbout",false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.opacity-enter-active,.opacity-leave-active{
		transition: all 1s;
	}
	.opacity-enter,.opacity-leave-active{
		opacity:0;
	}
	.about{
		position:absolute;
		.about-close{
			position:absolute;
			right:.5rem;
			top:0;
			color:red;
			transition:all 3s;
		}
		.about-content{
			line-height:1.5rem;
			text-align:center;
			box-shadow:0 0 1rem rgba(0,0,255,0.5);
			overflow:auto;
			font-size:.5rem;
			background:#000;
			color:#fff;
		}
	}
</style>