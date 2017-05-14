<template>
    <div id="app">
    <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    created (){
    	localStorage.address = "未知";
    	this.axios.get("https://zhaoplus.com/api/ip").then(res=>{
    		if(res.data.content.address){
    			localStorage.address = res.data.content.address;
    		}
    	})
    }
}
</script>
<style lang="scss">
@import "./common/style/base.scss";
#app{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
