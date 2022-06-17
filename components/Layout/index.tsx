import styles from './Layout.module.scss'
import {Breadcrumb, Layout, Menu, Popconfirm} from 'antd'
import type {MenuProps} from 'antd';
import {
    LogoutOutlined, PieChartOutlined,
} from '@ant-design/icons'
import {useStore} from '../../store'
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import Link from 'next/link'

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
        {
            label: '站点管理', key: '/website', children: [
                {label: '站点用户列表', key: '/website/user'},
                {label: '画廊审核', key: '/website/gallery'},
                {label: '网站留言', key: '/website/message'},
            ]
        },
        {label: '主机监控', key: '/gameserver'},
    ];
    return menuItems.map((item: any) => {
        if (item.children) {
            return (
                <Menu.SubMenu title={item.label} icon={item.icon}>
                    {
                        item.children.map((child: any) => {
                            return (
                                <Menu.Item key={child.key}>
                                    <Link href={child.key}>{child.label}</Link>
                                </Menu.Item>
                            )
                        })}
                </Menu.SubMenu>
            )
        } else {
            return (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link href={item.key}>{item.label}</Link>
                </Menu.Item>
            )
        }
    });
}


export default function Layouts({children}: any) {
    const {pathname,push} = useRouter()
    const {userStore, channelStore} = useStore()

    useEffect(() => {
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    // 确定退出
    const onConfirm = () => {
        // 退出登录 删除token 跳回到登录
        userStore.loginOut()
        push('/login')
    }

    // 收缩侧边栏
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{height:'100vh'}}>
            <Header className={styles.header}>
                <div className={styles.logo}>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>
                        {userStore.userInfo.name}
                    </span>
                    <span className={styles.userLogout}>
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
                       className={styles.side}
                       >
                    <Menu defaultSelectedKeys={[pathname]}
                          selectedKeys={[pathname]}
                          mode="inline"
                          theme="dark"
                    >
                        {GetMenu()}
                    </Menu>
                </Sider>
                <Layout className={styles.layoutContent}>
                    {/* 二级路由出口 */}
                    <Breadcrumb style={{marginBottom: '16px'}}>
                        {
                            pathname.split("/").map((item, index) => {
                                return (
                                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                    {children}
                </Layout>
            </Layout>
        </Layout>
    )
}
