import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/login"
import Chat from "@/components/chat/chat"
import AIChat from "@/components/chat/AIChat"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/login",
			component: Login
		},
		{
			path: "/chat",
			component: Chat
		},
		{
			path: "/AIchat",
			component: AIChat
		}
	]
})
