import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd'
import { UserOutlined, BellOutlined, SearchOutlined, MenuOutlined, XOutlined } from '@ant-design/icons'
import styles from './HeaderBar.module.css'

const { Header } = Layout
const { Item, SubMenu } = Menu

const HeaderBar: React.FC = () => {
  const location = useLocation()
  const [current, setCurrent] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // 根据当前路径设置选中的菜单项
    const path = location.pathname
    if (path === '/') setCurrent('home')
    else if (path.includes('/trip-planning')) setCurrent('trip-planning')
    else if (path.includes('/real-time-info')) setCurrent('real-time-info')
    else if (path.includes('/cultural-experience')) setCurrent('cultural-experience')
    else if (path.includes('/carbon-footprint')) setCurrent('carbon-footprint')
    else if (path.includes('/user-profile')) setCurrent('user-profile')
  }, [location.pathname])

  const handleMenuClick = (e: any) => {
    setCurrent(e.key)
    setMobileMenuOpen(false)
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/user-profile">个人中心</Link>
      </Menu.Item>
      <Menu.Item key="trips">我的行程</Menu.Item>
      <Menu.Item key="settings">设置</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  const notificationMenu = (
    <Menu>
      <Menu.Item key="1">
        <div>
          <div className={styles.notificationTitle}>西湖景区人流预警</div>
          <div className={styles.notificationTime}>5分钟前</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div>
          <div className={styles.notificationTitle}>您的行程已生成</div>
          <div className={styles.notificationTime}>30分钟前</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div>
          <div className={styles.notificationTitle}>体验活动预订成功</div>
          <div className={styles.notificationTime}>2小时前</div>
        </div>
      </Menu.Item>
      <Menu.Item key="viewAll">查看全部</Menu.Item>
    </Menu>
  )

  return (
    <Header className={styles.header}>
      <div className={styles.container}>
        {/* Logo和标题 */}
        <div className={styles.logo}>
          <Link to="/">
            <h1 className={styles.title}>智旅深瞳</h1>
            <span className={styles.subtitle}>智能旅游指南平台</span>
          </Link>
        </div>

        {/* 桌面端菜单 */}
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          onClick={handleMenuClick}
          className={styles.menu}
          theme="light"
        >
          <Item key="home">
            <Link to="/">首页</Link>
          </Item>
          <Item key="trip-planning">
            <Link to="/trip-planning">智能行程</Link>
          </Item>
          <Item key="real-time-info">
            <Link to="/real-time-info">实时信息</Link>
          </Item>
          <Item key="cultural-experience">
            <Link to="/cultural-experience">文化体验</Link>
          </Item>
          <Item key="carbon-footprint">
            <Link to="/carbon-footprint">碳足迹</Link>
          </Item>
        </Menu>

        {/* 用户区域 */}
        <div className={styles.userArea}>
          <div className={styles.searchButton}>
            <Button type="text" icon={<SearchOutlined />} size="large" />
          </div>
          
          <Dropdown overlay={notificationMenu} placement="bottomRight">
            <Badge count={notifications} showZero>
              <Button type="text" icon={<BellOutlined />} size="large" className={styles.bellButton} />
            </Badge>
          </Dropdown>

          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className={styles.userButton}>
              <Avatar icon={<UserOutlined />} size="large" />
            </div>
          </Dropdown>
        </div>

        {/* 移动端菜单按钮 */}
        <div className={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <Button type="text" icon={<XOutlined />} size="large" />
          ) : (
            <Button type="text" icon={<MenuOutlined />} size="large" />
          )}
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          onClick={handleMenuClick}
          className={styles.mobileMenu}
          theme="light"
        >
          <Item key="home">
            <Link to="/">首页</Link>
          </Item>
          <Item key="trip-planning">
            <Link to="/trip-planning">智能行程</Link>
          </Item>
          <Item key="real-time-info">
            <Link to="/real-time-info">实时信息</Link>
          </Item>
          <Item key="cultural-experience">
            <Link to="/cultural-experience">文化体验</Link>
          </Item>
          <Item key="carbon-footprint">
            <Link to="/carbon-footprint">碳足迹</Link>
          </Item>
          <Item key="user-profile">
            <Link to="/user-profile">个人中心</Link>
          </Item>
        </Menu>
      )}
    </Header>
  )
}

export default HeaderBar