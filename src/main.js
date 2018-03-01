import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// Cube-ui
import {
	Scroll,
	Slide,
	IndexList
} from 'cube-ui';
Vue.use(Scroll);
Vue.use(Slide);
Vue.use(IndexList);

// LocalStorage 封装
import { setLocalStorage, getLocalStorage } from './common/js/util.js';

// api
import api from './api/index';
Vue.use(api)


// 全局 axiosBaseURL
Vue.prototype.$BASE_URL = process.env.API_ROOT;


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

