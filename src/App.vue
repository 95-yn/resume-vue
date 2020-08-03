<template>
  <div id="app">
    aaa
    <!-- <img alt="Vue logo" @click="sendError" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-link to="/">主页</router-link>
    <router-link to="/home">主页</router-link>
    <router-link to="/profile">管理页</router-link> -->
    {{test}}
    <div>{{message}}</div>
    <input type="text" :value="message" @input="message = $event.target.value" name="" id="">
    <div class="main" @click="sendError"> dccccccccddd</div>
    <div class="flex"></div>
    <router-view />
  </div>
</template>

<script>
// import func from '../vue-temp/vue-editor-bridge';

export default {
  name: "App",
  data() {
      return {
        message: '',
        test: {
          a: 1
        }
      }
    },
    
    methods: {  
        aaa(){
          console.log(arguments);
        },
        sendError() {
      this.test.b = 2323;
      console.log(this.test);
      // this.$forceUpdate();  
        }
    },
    
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
