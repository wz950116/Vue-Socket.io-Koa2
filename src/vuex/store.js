import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//放置初始状态 app启动时候的全局初始值
		isShowAbout: false,
		username: "",
		//随机在20张图片中生成头像
		headUrl: `http://omratag7g.bkt.clouddn.com/icon-avatar${Math.floor(Math.random()*21)}.svg`
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