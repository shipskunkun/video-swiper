export default{
  ready_show: false,
  preview_add: "",
  upload_add: "",
  current_step: 1,
  link: "",
  set_downlink(link) {
    this.link = link;
  },
  set_preview(add){
     this.ready_show = true;
     this.preview_add = add;
  },
  set_upload(add){
    this.ready_show = true;
    this.upload_add = add;
  },
  set_current_step(step){
    console.log("set_current_step", step);
    this.current_step = step;
  }
}