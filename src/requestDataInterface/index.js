
/**
 * 产品详情模块--录入实名制信息以及评估报告相关接口
 * @author baiyongshi
 * **/

import axios from 'axios'

export const getList = params => {
    return axios.get("/static/json/more.json",{params}).then(res => res.data)
}




