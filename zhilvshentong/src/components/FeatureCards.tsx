import React from 'react'
import { Card, Row, Col, Typography, Icon } from 'antd'
import { Route, useLocation } from 'react-router-dom'
import { CalendarOutlined, ClockCircleOutlined, SmileOutlined, LeafOutlined, FireOutlined, CompassOutlined } from '@ant-design/icons'
import styles from './FeatureCards.module.css'

const { Title, Paragraph } = Typography

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  route?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, route }) => {
  return (
    <Card 
      className={styles.card}
      hoverable
      bordered={false}
      bodyStyle={{ padding: '24px' }}
    >
      <div className={styles.cardContent}>
        <div className={`${styles.iconContainer} ${styles[color]}`}>
          {icon}
        </div>
        <Title level={4} className={styles.cardTitle}>{title}</Title>
        <Paragraph className={styles.cardDescription}>{description}</Paragraph>
        {route && (
          <Route>
            {({ history }) => (
              <button 
                className={styles.learnMoreButton}
                onClick={() => history.push(route)}
              >
                了解更多 <CompassOutlined className={styles.arrowIcon} />
              </button>
            )}
          </Route>
        )}
      </div>
    </Card>
  )
}

const FeatureCards: React.FC = () => {
  const location = useLocation()
  
  const features = [
    {
      id: 1,
      icon: <CalendarOutlined />,
      title: '智能行程规划',
      description: '根据您的喜好和时间，智能生成个性化行程方案，灵活调整，一键优化。',
      color: 'blue',
      route: '/trip-planning'
    },
    {
      id: 2,
      icon: <ClockCircleOutlined />,
      title: '实时信息聚合',
      description: '提供景区人流、天气、交通等实时信息，让您的旅行更加便捷安全。',
      color: 'green',
      route: '/real-time-info'
    },
    {
      id: 3,
      icon: <SmileOutlined />,
      title: '文化体验推荐',
      description: '发现当地特色文化体验，深入了解目的地历史文化，感受不一样的旅行。',
      color: 'orange',
      route: '/cultural-experience'
    },
    {
      id: 4,
      icon: <LeafOutlined />,
      title: '碳足迹计算',
      description: '评估旅行碳足迹，提供环保出行建议，让您的旅行更加绿色可持续。',
      color: 'teal',
      route: '/carbon-footprint'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <Title level={2} className={styles.sectionTitle}>智能旅行新体验</Title>
        <Paragraph className={styles.sectionDescription}>
          智旅深瞳提供全方位的智能旅行服务，让您的每一次出行都充满智慧与乐趣
        </Paragraph>
      </div>
      
      <Row gutter={[24, 24]} className={styles.cardsContainer}>
        {features.map((feature) => (
          <Col xs={24} sm={12} lg={6} key={feature.id}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              route={feature.route}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default FeatureCards