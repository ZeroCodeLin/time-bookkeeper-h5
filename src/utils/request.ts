import axios from 'axios'
import { HelpUtils } from './utils';

interface PlainObject {
    [key: string]: any;
}

class AxiosService {
    constructor() {
    };
    methodMap = {
        post: 'post',
        postjson: 'post',
        patch: 'patch',
        patchjson: 'patch',
        put: 'put',
        putjson: 'put',
        file: 'post',
        get: 'get',
        delete: 'delete',
        options: 'options',
        head: 'head',
    }
    filter = {
        filterCode: function (result: any, type: any) {
            if (type === 'head') {
                // head请求，服务器响应时不会返回消息体
                return true;
            }
            return result && Number(result.code) >= 200 && Number(result.code) < 300;
        },
        filterHttpError: function (error: any, type: any) {
        },
    }

    doRequest(requestUrl: string, requestParams: PlainObject, type: string, requestConfig: PlainObject) {
        const than: any = this;
        let params = {};
        if (HelpUtils.isEmpty(requestParams)) {
            params = {};
        } else {
            params = requestParams;
        }

        var ajaxHeaders = {
            'X-Requested-With': 'XMLHttpRequest',
        };

        var p = new Promise(function (resolve, reject) {
            var method = than.methodMap[type];
            var optionSource = {};

            var options = {
                ...requestConfig,
                method: method,
                url: requestUrl,
                data: {},
                params: {},
            };
            switch (type) {
                case 'put':
                case 'patch':
                case 'post':
                    options.data = than.setHttpParams(params);
                    break;
                case 'patchjson':
                case 'postjson':
                case 'putjson':
                    options.data = params;
                    break;
                case 'get':
                case 'delete':
                case 'options':
                case 'head':
                    options.params = params;
                    break;
                default:
                    break;
            }

            var beforeRequest = (requestConfig && requestConfig.beforeRequest) ||
                than.beforeRequest;
            if (beforeRequest) {
                options = beforeRequest(options) || {};
            }
            axios(options)
                .then(function (response) {
                    //   this.pageLoaderHide(pageLoaderId, options);
                    var result = response.data;
                    if (than.filter.filterCode(result, type)) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                })
                .catch(function (error) {

                    than.filter.filterHttpError(error, type);
                    var newError = {
                        code: error && error.status,
                        errorType: 'http',
                        message: error && error.message,
                        originError: error,
                    };
                    reject(newError);
                });
        });
        return p;
    };

    /**
     * post
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
    */
    post(url: string, params?: PlainObject, requestConfig?: any): Promise<any> {
        return this.doRequest(url, params, 'postjson', requestConfig);
    };
    /**
     * post request payload
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    postByJson(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'postjson', requestConfig);
    };
    /**
     * patch
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    patch(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'patch', requestConfig);
    };
    /**
     * patch equest payload
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    patchByJson(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'patchjson', requestConfig);
    };
    /**
     * put
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    put(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'put', requestConfig);
    };
    /**
     * put request payload
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    putByJson(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'putjson', requestConfig);
    };
    /**
     * upload file 支持IE10以上浏览器
     * @param url 请求路径
     * @param params 请求参数对象，其中必须有一个字段为上传对象，如 file:nativeFile
     * @param requestConfig 请求配置项
     */
    upload(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'file', requestConfig);
    };
    /**
     * get
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    get(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'get', requestConfig);
    };
    /**
     * delete
     * @param url 请求路径
     * @param params 请求参数，没有可以传null
     * @param requestConfig 请求配置项
     */
    delete(url: string, params?: PlainObject, requestConfig?: any) {
        return this.doRequest(url, params, 'delete', requestConfig);
    };
    setFilterCode(fn: any) {
        this.filter.filterCode = fn;
    };
}
export { AxiosService };
export const axiosService = new AxiosService();
export const axiosSource = axios;