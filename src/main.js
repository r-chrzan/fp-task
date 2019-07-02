// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import moment from 'moment'
import TweenLite from 'gsap/TweenLite'
import 'gsap/CSSPlugin'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
});

Vue.use(VueResource);

Vue.http.options.root = 'https://www.future-processing.pl/blog/wp-json';

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})