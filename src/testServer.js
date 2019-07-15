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
export function getlist() {
    return request({
        method: 'Post',
        url: '/public/template/get'
    })
}

export function beginrecord(template_file) {
    console.log(template_file);
    return request({
        method: 'Post',
        url: '/public/record/begin',
        params: {
            template_file: template_file
        }
    })
}