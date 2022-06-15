import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Breadcrumb, Layout, Menu, Popconfirm} from 'antd'
import Router from 'next/router' // 新引入进来的
import type {MenuProps} from 'antd';
import {
    LogoutOutlined, PieChartOutlined,
} from '@ant-design/icons'
import {useStore} from '../store'
import React, {useEffect, useState} from 'react'

const {Header, Sider} = Layout

const GetMenu = (itemList: MenuProps['items'] | undefined = []) => {
    const menuItems: MenuProps['items'] = [
        {label: '控制台面板', key: '/', icon: <PieChartOutlined/>}, // 菜单项务必填写 key
        {
            label: 'MC服务器', key: '/mcserver', children: [
                {label: '服务器统计', key: '/mcserver'},
                {label: '玩家列表', key: '/mcserver/player'},
                {label: '卫星地图', key: '/mcserver/map'},
            ]
        },
        {label: '游戏服务器', key: '/gameserver'},
    ];
    return menuItems.map((item: any) => {
        if (item.children) {
            return (
                <Menu.SubMenu title={item.label} icon={item.icon}>
                    {
                        item.children.map((child: any) => {
                            return (
                                <Menu.Item key={child.key}>
                                    {/*<Link to={child.key}>{child.label}</Link>*/}
                                </Menu.Item>
                            )
                        })}
                </Menu.SubMenu>
            )
        } else {
            return (
                <Menu.Item key={item.key} icon={item.icon}>
                    {/*<Link to={item.key}>{item.label}</Link>*/}
                </Menu.Item>
            )
        }
    });
}

function MyApp({Component, pageProps}: AppProps) {
    const pathname = 'useLocation()'
    const {userStore, loginStore, channelStore} = useStore()
    useEffect(() => {
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    // 确定退出
    const onConfirm = () => {
        // 退出登录 删除token 跳回到登录
        loginStore.loginOut()

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
                    <Component {...pageProps} />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MyApp
