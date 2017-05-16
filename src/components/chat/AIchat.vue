<template>
	<div>
		<input @keyup.enter="send" v-model.trim="inputContent" placeholder="与智能机器人聊些啥">
        <button @click="send" style="width:3rem;height:1rem;background:#fff;">发送</button>
        <div class="out"></div>
	</div>
</template>

<script>
	export default {
		name: 'chatting',
		data() {
			return {
				msgs: localStorage.msgs_ai && JSON.parse(localStorage.msgs_ai) || [],
				inputContent: '',
				oContent: {}
			}
		},
		methods: {
			send() {
				console.log(this.inputContent);
				if (this.inputContent === '') {
					return;
				} else {
					this.msgs.push({
						date: this.moment().format('MM-DD HH:mm:ss'),
						loc: localStorage.addr,
						from: `${localStorage.name}`,
						content: this.inputContent,
						self: true,
						avatarUrl: this.avatarUrl
					});

					this.axios.get(`https://zhaoplus.com/api/AI?search=${this.inputContent}&userid=${localStorage.name+localStorage.addr}&loc=${localStorage.addr}`)
						.then(result => {
							this.msgs.push({
								date: this.moment().format('MM-DD HH:mm:ss'),
								from: '智能机器人',
								content: result.data.result.text,
								self: false,
								avatarUrl: 'http://omratag7g.bkt.clouddn.com/icon-ai.svg'
							});
							document.querySelector(".out").innerHTML = result.data.result.text;
						})
					this.inputContent = '';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>