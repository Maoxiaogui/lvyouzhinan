import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, message } from 'antd';
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import HeaderBar from './components/HeaderBar';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import TripPlanningPage from './pages/TripPlanningPage';
import RealTimeInfoPage from './pages/RealTimeInfoPage';
import CulturalExperiencePage from './pages/CulturalExperiencePage';
import './App.css';

const { Content, Footer } = Layout;

// 导航菜单项配置
const menuItems: MenuProps['items'] = [
  {
    key: '/',
    label: '首页',
  },
  {
    key: '/trip-planning',
    label: '行程规划',
  },
  {
    key: '/real-time-info',
    label: '实时信息',
  },
  {
    key: '/cultural-experience',
    label: '文化体验',
  },
];

const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/');
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化应用
  useEffect(() => {
    // 模拟初始化过程
    const initializeApp = async () => {
      try {
        // 加载模拟数据服务
        await import('./services/mockDataService');
        setIsInitialized(true);
        message.success('应用初始化成功');
      } catch (error) {
        console.error('应用初始化失败:', error);
        message.error('应用初始化失败，请刷新页面重试');
      }
    };

    initializeApp();
  }, []);

  // 切换菜单折叠状态
  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 处理路由变化
  const handleRouteChange = (path: string) => {
    setSelectedKey(path);
  };

  // 首页组件
  const HomePage: React.FC = () => {
    return (
      <>
        <HeroSection />
        <FeatureCards />
        <div className="intro-section">
          <div className="container">
            <h2>重新定义旅行体验的智能革命</h2>
            <p>智旅深瞳不仅是一个旅游助手，更是您探索世界的智能伙伴。我们融合尖端AI技术与深度旅行洞察，打破传统旅行的局限，让每一次出行都成为一场充满惊喜与发现的个性化冒险。</p>
            <div className="feature-grid">
              <div className="feature-item">
                <h3>智能规划</h3>
                <p>基于用户偏好智能生成最优行程方案，充分考虑时间、距离、兴趣等因素。</p>
              </div>
              <div className="feature-item">
                <h3>实时信息</h3>
                <p>提供景点实时天气、人流、交通等信息，帮助用户做出明智决策。</p>
              </div>
              <div className="feature-item">
                <h3>文化体验</h3>
                <p>推荐当地特色文化体验，深入了解目的地的历史和风土人情。</p>
              </div>
              <div className="feature-item">
                <h3>绿色出行</h3>
                <p>计算行程碳足迹，提供环保建议，助力可持续旅游。</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // 错误页面组件
  const ErrorPage: React.FC = () => {
    return (
      <div className="error-page">
        <h1>404</h1>
        <p>页面未找到</p>
        <Navigate to="/" replace />
      </div>
    );
  };

  // 加载中页面
  if (!isInitialized) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">加载中...</div>
      </div>
    );
  }

  return (
    <Router>
      <Layout className="main-layout">
        {/* 全局导航栏 */}
        <HeaderBar menuItems={menuItems} selectedKey={selectedKey} onRouteChange={handleRouteChange} />
        
        {/* 主要内容区域 */}
        <Content className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trip-planning" element={<TripPlanningPage />} />
            <Route path="/real-time-info" element={<RealTimeInfoPage />} />
            <Route path="/cultural-experience" element={<CulturalExperiencePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Content>
        
        {/* 页脚 */}
        <Footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>关于我们</h4>
                <p>智旅深瞳致力于通过AI技术革命，为旅行者打造个性化、智能化、环保的未来旅行体验。</p>
              </div>
              <div className="footer-section">
                <h4>联系我们</h4>
                <p>邮箱：support@zhilvshentong.com</p>
                <p>电话：400-888-8888</p>
              </div>
              <div className="footer-section">
                <h4>快速链接</h4>
                <ul>
                  <li><a href="/">首页</a></li>
                  <li><a href="/trip-planning">行程规划</a></li>
                  <li><a href="/real-time-info">实时信息</a></li>
                  <li><a href="/cultural-experience">文化体验</a></li>
                </ul>
              </div>
            </div>
            <div className="copyright">
              <p>&copy; 2024 智旅深瞳. 保留所有权利。</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;