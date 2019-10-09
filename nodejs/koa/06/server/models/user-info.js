const dbUtils = require('./../utils/db-util')

const user = {
    /**
     * 数据库创建用户
     * @param {*} model 用户数据模型
     */
    async create (model) {
        let result = await dbUtils.insertData('user_info', model)
        return result
    },
    /**
     * 查找一个存在用户的数据
     * @param {*} options 查找条件参数
     */
    async getExistOne (options) {
        let _sql = `SELECT * from user_info where email='${options.email}' or name='${options.name}' limit 1`
        let result = await dbUtils.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },
    /**
     * 根据用户名和密码查找用户
     * @param {*} options 用户名密码对象
     */
    async getOneByUserNameAndPassword (options) {
        let _sql = `SELECT * from user_info where password='${options.password}' and name='${options.name}' limit 1`
        let result = await dbUtils.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },
    /**
     * 根据用户名查找用户信息
     * @param {*} userName userName用户账号名称
     */
    async getUserInfoByUserName (userName) {

        let result = await dbUtils.select('user_info', ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time'])
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }
}

module.exports = user