const userInfoService = require('./../services/user-info')
const userCode = require('./../codes/user')

module.exports = {

    /**
     * 登录操作
     * @param {*} ctx 上下文对象
     */
    async signIn (ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }

        let userResult = await userInfoService.signIn(formData)

        if (userResult) {
            if (formData.userName === userResult.name) {
                result.success = true
            } else {
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            }
        } else {
            result.code = 'FAIL_USER_NO_EXIST'
            result.message = userCode.FAIL_USER_NO_EXIST
        }

        if (formData.source === 'form' && result.success === true) {
            let session = ctx.session
            session.userName = userResult.name
            session.userId = userResult.id

            ctx.redirect('/work')
        } else {
            ctx.body = result
        }
    },
    /**
     * 注册操作
     * @param {*} ctx 上下文对象
     */
    async signUp (ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null
        }

        let validateResult = userInfoService.validatorSignUp(formData)
    },
    /**
     * 获取用户信息
     * @param {*} ctx 上下文对象
     */
    async getLoginUserInfo (ctx) {

    },
    /**
     * 校验用户是否登录
     * @param {*} ctx 上下文对象
     */
    validateLogin (ctx) {
        let result = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN'
        }
        let session = ctx.session
        if (session && session.isLogin === true) {
            result.success = true
            result.message = ''
            result.code = ''
        }
        return result
    }
}