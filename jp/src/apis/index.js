import request from '../util/request'
export const baseUrl = 'http://39.106.101.15:8088'

// 获取所有列表信息
export function getAll(params) {
    return request({
        url: baseUrl + '/jp/list',
        method: "get",
        params
    })
}
// 获取详情
export function getDetail(params) {
    return request({
        url: baseUrl + `/jp/detail/${params.id}`,
        method: 'get',
        params
    })
}
// 删除列表
export function del(data) {
    return request({
        url: baseUrl + '/jp/delete',
        method: "post",
        data
    })
}