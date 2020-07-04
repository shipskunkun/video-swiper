import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    preview_add: "",
    upload_add: "",
    current_step: 0,
    link: "",
    current_index: 0,
    current_video: {},
    error_massage: ""
  },
  mutations: {
    set_error(state, error) {
      state.error_massage = error;
    },
    set_video(state, video){
      state.current_video = video;
    },
    set_index(state, index){
      state.current_index = index;
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
