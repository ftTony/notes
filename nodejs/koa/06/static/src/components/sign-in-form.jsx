import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import Request from './../utils/request'
import { signInApi, signInForm } from './../api/sign-in'

const FormItem = Form.Item;

class SignIn extends React.Component {
    async handleSubmit (e) {
        e.preventDefault()

        let values = await signInApi(values)
        if (values) {
            let result = await signInApi(values)
            if (result && result.success === true) {
                message.success('登录成功！')
                signInForm(values)
            } else if (result && result.message) {
                message.error(result.message)
            }
        } else {
            message.error('系统篆书，稍后再试！')
        }
    }

    getFormValues () {
        let that = this
        return new Promise((resolve, reject) => {
            that.props.form.validateFields((err, values) => {
                if (!err) {
                    resolve(values)
                } else {
                    reject(false)
                }
            })
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (<div></div>)
    }
}

const SignInForm = Form.create()(SignIn);
export default SignInForm