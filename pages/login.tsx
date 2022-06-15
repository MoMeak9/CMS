import type {NextPage} from 'next'
import {Card, Form, Input, Checkbox, Button, message} from 'antd'
import Router from 'next/router'
import {useStore} from '../store'

const Login: NextPage = ({}) => {
    const {loginStore} = useStore()

    async function onFinish(values: {
        mobile: string,
        code: string,
    }) {
        console.log(values)
        // values：放置的是所有表单项中用户输入的内容
        const {mobile, code} = values
        await loginStore.getToken({mobile, code})
        // 跳转首页
        await Router.replace('/')
        // 提示用户
        message.success('登录成功')
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
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号"/>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                len: 6,
                                message: '请输入6位密码',
                                validateTrigger: 'onBlur'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码"/>
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
