import request from "./request";

//登陆
export  function Login(data){
    return request({
        method:'POST',
        url:'/user/login',
        data
    })
}

//获取用户信息
export  function userInfo(id){
    return request({
        method:'GET',
        url:'/user/info',
        params:{
            id:id
        }
    })
}
//获取主页视频简短信息
export  function userVideoInfo(page){
    return request({
        method:'GET',
        url:'/video/page',
        params:{
            pagination:page
        }
    })
}
//获取主页视频详细信息
export function videoInfo(id){
    return request({
        method:'GET',
        url:'/video',
        params:{
            id:id
        }
    })
}