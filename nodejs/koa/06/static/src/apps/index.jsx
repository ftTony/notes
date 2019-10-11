import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import HeadeNav from './../components/header-nav.jsx'
import FooterCommon from './../components/footer-common.jsx'

import 'antd/lib/layout/style/css'

const { Header, Content, Footer } = Layout

class App extends React.Component {
    render () {
        <Layout className='layout'>
            <HeadeNav />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 200 }}>
                    <p>index</p>
                </div>
            </Content>
            <FooterCommon />
        </Layout>
    }
}

export default App
