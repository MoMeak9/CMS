import {Layout, Menu, Popconfirm} from 'antd'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import type {MenuProps} from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    LogoutOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons'
import './index.scss'
import {useStore} from '../../store'
import React, {useEffect, useState} from 'react'

type MenuItem = Required<MenuProps>['items'][number];

const {Header, Sider} = Layout

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const GetMenu = (itemList: any[] | undefined = []) => {
    const menuItems: MenuProps['items'] = [
        {label: '控制台面板', key: '/'}, // 菜单项务必填写 key
        {label: 'MC服务器', key: '/mcserver'},
    ];
    return menuItems.map((item: any) => {
        return <Menu.Item key={item.key}></Menu.Item>
    });
}

const GeekLayout = () => {

    const {pathname} = useLocation()
    const {userStore, loginStore, channelStore} = useStore()
    useEffect(() => {
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    // 确定退出
    const navigate = useNavigate()
    const onConfirm = () => {
        // 退出登录 删除token 跳回到登录
        loginStore.loginOut()
        navigate('/login')
    }

    // 收缩侧边栏
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout>
            <Header className="header">
                <div className="logo">
                </div>
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
            <Popconfirm
                onConfirm={onConfirm}
                title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200}
                       className="site-layout-background"
                       collapsible={true}>
                    <Menu defaultSelectedKeys={[pathname]}
                          selectedKeys={[pathname]}
                          mode="inline"
                          theme="dark"
                    >
                        {GetMenu()}
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    {/* 二级路由出口 */}
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)
