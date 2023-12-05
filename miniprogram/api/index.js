import { request } from "../utils/request";  //导入我们封装的请求方法。

//首页请求接口
export const indexreq = (params) => {     //接收页面调用传递过来的参数
  return request({   //调用请求方法
    url: "/api/history/today",   //传入请求地址
    method: "GET",               //传入请求方法
    data: params                 //这里的参数来自于页面调用时，传过来的参数  
  })
}
