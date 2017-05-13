import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//放置初始状态 app启动时候的全局初始值
		isShowAbout: false,
		username: ""
	},
	mutations: {
		showAbout(state,msg){
			state.isShowAbout = msg;
		},
		changeName(state,msg){
			state.username = msg;
		}
	}
})

export default store