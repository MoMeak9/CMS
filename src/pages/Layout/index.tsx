import {Layout, Menu, Popconfirm} from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'
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

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('Option 3', '3', <ContainerOutlined/>),

    getItem('Navigation One', 'sub1', <MailOutlined/>, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined/>, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),

        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

const GeekLayout = () => {
    // const {pathname} = useLocation()
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
                    <Menu defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          mode="inline"
                          theme="dark"
                          items={items}
                    />
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
