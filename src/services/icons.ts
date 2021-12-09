// import { axiosService } from '../utils/request';
import { axiosService } from 'axios-services'

export const getIconList = (): Promise<any> => {
    return axiosService.get('/api/icon/list')
}