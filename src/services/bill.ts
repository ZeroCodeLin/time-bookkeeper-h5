import { axiosService } from 'axios-services'

export const createBill = (params: any): Promise<any> => {
    return axiosService.postByJson('/api/bill/add', params)
}
export const getBillList = (params: any): Promise<any> => {
    return axiosService.get('/api/bill/list', params)
}