import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'umi'

const { Header, Content, Footer } = Layout;

const MyLayout = (porps:any)=>{
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                <Menu.Item key="0">
                    <Link to='/'>主页</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to='/subA'>规则1</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/subB'>规则2</Link>
                </Menu.Item>
            </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Link to='/subA'>规则1</Link>    
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/subB'>规则2</Link>    
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                {porps.children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default MyLayout;