<template>
	<transition name="opacity">
		<div class="chat">
			
		</div>
	</transition>
</template>

<script>
	export default {
		name: "chat"
	}
</script>

<style lang="scss" scoped>
	.opacity-enter-active,.opacity-leave-active{
		transition: all .6s;
	}
	.opacity-enter,.opacity-leave-active{
		opacity:0;
	}
	.chat{
		width:100%;
		height:100%;
		background:gray;
	}
</style>