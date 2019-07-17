import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    preview_add: "",
    upload_add: "",
    current_step: 1,
    link: "",
    real_index: 0
  },
  mutations: {
    set_real_index(state, index){
      state.real_index = index;
    },
  	set_step(state, step){
  		state.current_step = step;
  	},
    set_downlink(state, link){
        state.link = link;
    },
    set_preview(state, add){
        state.preview_add = add;
    },
    set_upload(state, add){
        state.upload_add = add;
    }
  }
})
