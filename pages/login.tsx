import type {NextPage} from 'next'
import {Card, Form, Input, Checkbox, Button, message} from 'antd'
import Router from 'next/router'
import {useStore} from '../store'
import {login} from "../api/user";

const Login: NextPage = ({}) => {
    const {userStore} = useStore()

    async function onFinish(values: {
        user_email: string,
        user_password: string,
    }) {
        // values：放置的是所有表单项中用户输入的内容
        const {user_email, user_password} = values
        const {data} = await login({user_email, user_password})
        if (data.userBean.user_role === 1) {
            userStore.setToken(data.token)
            // 跳转首页
            await Router.replace('/')
            // 提示用户
            message.success('登录成功')
        } else {
            message.error('你不是管理员捏！')
        }
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo"
                     src="https://lwmc.net/_nuxt/img/logo.e536265.png"
                     alt=""/>
                {/* 登录表单 */}
                {/* 子项用到的触发事件 需要在Form中都声明一下才可以 */}
                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="user_email"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的邮箱',
                            },
                            {
                                pattern: /^.*@.*\..*$/,
                                message: '请输入正确的邮箱',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入邮箱"/>
                    </Form.Item>
                    <Form.Item
                        name="user_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入密码"/>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"

                    >
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
