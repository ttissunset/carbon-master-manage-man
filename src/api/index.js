import http from '@/utils/request'

// 获取所有案例数据
export const getAllCase = () => {
  // 返回的是promise对象
  return http.post('/case/page')
}

// 根据Id获取具体案例
export const getCaseById = (id) => {
  return http.get(`/case/getCaseById/${id}`)
}

// 添加案例
export const addCases = (params) => {
  return http.post('/case/add', params)
}

// 删除案例
export const deleteCaseById = (data) => {
  return http.delete(`/case/deleteById/${data}`)
}

//添加管理员
export const addAnAdmin = (params) => {
  return http.post('/admin/addAdmin', params)
}

// 停用管理员
export const banAdmin = (params) => {
  return http.put(`/admin/BanAdmin/${params}`)
}

//启用管理员
export const startAdmin = (params) => {
  return http.put(`/admin/StartAdmin/${params}`)
}

// 获取所有的admin
export const getAllUser = () => {
  return http.get('/admin/getUserList')
}

// 登出账号
export const logoutAdmin = () => {
  return http.get('/admin/logout')
}

// 登录账号
export const loginAdmin = (params) => {
  return http.post('/admin/login', params)
}

// 获取所有的套餐
export const getAllBook = () => {
  return http.get('/service/base-book/selectAll')
}

// 根据sid获取所有套餐
export const selectBookBySid = (params) => {
  return http.post(`/service/base-book/selectAllByServiceId/${params}`)
}

// 根据id获取套餐
export const selectBookById = (params) => {
  return http.post(`/service/base-book/selectById/${params}`)
}

// 联合id和sid获取套餐
export const selectBookByIds = (params) => {
  return http.post('/service/base-book/selectByIdAndSid', params)
}

// 根据ID删除套餐
export const deleteBookById = (params) => {
  return http.post(`/service/base-book/deleteById/${params}`)
}

// 根据ID添加套餐
export const addNewBook = (params) => {
  return http.post('/service/base-book/add', params)
}

// 更新套餐
export const updateBook = (params) => {
  return http.post('/service/base-book/update',params)
}

// 媒资模块查询
export const getFiles = (params) => {
  return http.post('/media/files', params)
}

// 禁用媒资
export const banMedia = (params) => {
  return http.put(`/media/forbidden/${params}`)
}

// 预览媒资
export const previewMedia = (params) => {
  return http.get(`/media/preview/${params}`)
}

// 上传文件
export const courseFile = (params) => {
  return http.post('/media/upload/coursefile', params)
}

// 获取咨询列表
export const getPage = (params) => {
  return http.post('/Information/Information/getPage', params)
}

// 根据ID获取资讯
export const getInformationById = (params) => {
  return http.post('/Information/Information/getInformationById', params)
}

// 修改资讯
export const updateInformation = (params) => {
  return http.put('/Information/Information/updateBackground', params)
}

// 删除资讯
export const deleteInformation = (params) => {
  return http.delete(`/Information/Information/getInformationById/${params}`)
}

// 添加资讯
export const addInformation = (params) => {
  return http.post('/Information/Information/insertInformation', params)
}

// 按id查找应用
export const idSelect = (params) => {
  return http.get(`/service/base-application/selectById/${params}`)
}

// 按sid查找应用
export const sidSelect = (params) => {
  return http.get(`/service/base-application/selectListBySid/${params}`)
}

// 添加应用
export const addApplications = (params) => {
  return http.post('/service/base-application/add', params)
}

// 删除应用
export const deleteApplication = (params) => {
  return http.post(`/service/base-application/deleteById/${params}`)
}

// 更新应用
export const updateApplication = (params) => {
  return http.post('/service/base-application/update', params)
}

// get所有Base
export const getAllBase = () => {
  return http.get('/service/base/base/getAll')
}

// 添加Base
export const addBases = (params) => {
  return http.post('/service/base/base/insert', params)
}

// 更新Base
export const updateBases = (params) => {
  return http.post('/service/base/base/updateById', params)
}

// id删除Base
export const deleteBaseId = (params) => {
  return http.get(`/service/base/base/deleteById/${params}`)
}

// id获取Base
export const getBaseId = (params) => {
  return http.get(`/service/base/BG/getById/${params}`)
}

// id获取company
export const getCompanyById = (params) => {
  return http.get(`/service/company/BG/selectById/${params}`)
}

// cid和sid获取company
export const getCompanyByIds = (params) => {
  return http.get('/service/company/selectByCidAndSid/', params)
}

// 添加function
export const addFunction = (params) => {
  return http.post('/service/base-function/add', params)
}

// 按id查询function
export const getFunctionById = (params) => {
  return http.get(`/service/base-function/selectById/${params}`)
}

// 按sid查询function
export const getFunctionBySid = (params) => {
  return http.get(`/service/base-function/selectListBySid/${params}`)
}

// 更新function
export const updateFunction = (params) => {
  return http.post('/service/base-function/update', params)
}

// 删除function
export const deleteFunctionById = (params) => {
  return http.get(`/service/base-function/deleteById/${params}`)
}

// application/json, text/plain, */*
// 服务媒资绑定
export const serviceMediaBind = (data) => {
  return http.post('/servie/media/bindCaseMedias', data)
}

// 删除服务媒资绑定
export const deleteServiceMedia = (params) => {
  return http.delete(`/service/media/deleteById/${params}`)
}

// 获取服务媒资列表
export const getServiceMedia = (params) => {
  return http.post('/service/media/getCaseMediaList', params)
}

// 案例媒资绑定
export const caseMediaBind = (params) => {
  return http.post('/CaseMedia/bindCaseMedia', params)
}

// 删除案例媒资绑定
export const deleteCaseMedia = (params) => {
  return http.delete(`/CaseMedia/deleteById/${params}`)
}

// 获取案例媒资列表
export const getCaseMedia = (params) => {
  return http.post('/CaseMedia/getCaseMediaList', params)
}

// 获取所有应用场景
export const allApplication = () => {
  return http.get('/service/base-application/getBaseApplicationList')
}

// 获取所有交易信息
export const allCompany = () => {
  return http.get('/service/company/getCompanyList')
}

//获取所有的function
export const allFunction = () => {
  return http.get('/service/base-function/getBaseFunctionList')
}
