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
        method: 'Get',
        url: '/public/template/get'
    })
}
