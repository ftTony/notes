const validator = require('validator')
const userModel = require('./../models/user-info')
const userCode = require('./../codes/user')

const user = {
    /**
     * 创建用户
     * @param {*} user 用户信息
     */
    async create (user) {
        let result = await userModel.create(user)
        return result
    },
    /**
     * 查找存在用户信息
     * @param {*} formData 查找的表单数据
     */
    async getExistOne (formData) {
        let resultData = await userModel.getExistOne({
            'email': formData.email,
            'name': formData.userName
        })
        return resultData
    },
    /**
     * 登录业务操作
     * @param {*} formData 登录表单
     */
    async signIn (formData) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'name': formData.userName
        })
        return resultData
    },

    /**
     * 根据用户名查找用户业务操作
     * @param {*} userName 用户名
     */
    async getUserInfoByUserName (userName) {
        let resultData = await userModel.getUserInfoByUserName(userName) || {}
        let userInfo = {
            email: resultData.email,
            userName: resultData.name,
            detailInfo: resultData.detail_info,
            createTime: resultData.create_time
        }
        return userInfo
    },

    /**
     * 检验用户注册数据
     * @param {*} userInfo 用户注册数据
     */
    validatorSignUp (userInfo) {
        let result = {
            success: false,
            message: ''
        }

        if (/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
            result.message = userCode.ERROR_USER_NAME
            return result
        }

        if (!validator.isEmail(userInfo.email)) {
            result.message = userCode.ERROR_EMAIL
            return result
        }

        if (!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = userCode.ERROR_PASSWORD
            return result
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            result.message = userCode.ERROR_PASSWORD_CONFORM
            return result
        }

        result.success = true
        return result
    }
}

module.exports = user