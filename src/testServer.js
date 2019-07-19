import {request} from './request'

// export default testServer ={
//     getList(params){
//         return request({
//             methods: 'Get',
//             url:'/public/template/get',
//             params:params
//         })
//     }
// }

var ws;
var heartCheck;

export function upload(path) {
    return request({
        method: 'Post',
        url: '/public/upload/begin',
        params: {
            path: path
        }
    })
}

export function getWebsocket() {
    if(ws) {
        return ws;
    }
    else {
        ws = new WebSocket('ws://meeting-front.hunterslab.cn/station/');
        heartCheck = {
            timeout: 30000,//30s
            timeoutObj: null,
            reset: function(){
                clearInterval(this.timeoutObj);
                this.start();
            },
            start: function(){
                this.timeoutObj = setInterval(function(){
                    if(ws.readyState==1){
                        ws.send("HeartBeat");
                    }
                }, this.timeout)
            }
        };
        ws.onopen = function(){
            console.log('onopen');
            heartCheck.start();
        };
        return ws;
    }
}

export function getlist() {
    return request({
        method: 'Post',
        url: '/public/template/get'
    })
}

export function beginrecord(template_file) {
    return request({
        method: 'Post',
        url: '/public/record/begin',
        params: {
            template_file: template_file
        }
    })
}