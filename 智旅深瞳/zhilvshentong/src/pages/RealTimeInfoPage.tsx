import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Card, Select, Statistic, Progress, Timeline, Button, Avatar, List } from 'antd'
import { CloudOutlined, ClockCircleOutlined, CarOutlined, UserOutlined, AlertOutlined, MapOutlined, HeartOutlined, UmbrellaOutlined, WindOutlined, ThermometerOutlined } from '@ant-design/icons'
import { RealTimeInfoService } from '../services/realTimeInfoService'
import styles from './RealTimeInfoPage.module.css'

const { Content } = Layout
const { Option } = Select

const RealTimeInfoPage: React.FC = () => {
  const [infoService] = useState(new RealTimeInfoService())
  const [selectedScenicSpot, setSelectedScenicSpot] = useState('西湖')
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // 模拟的景点列表
  const scenicSpots = [
    { label: '西湖', value: '西湖' },
    { label: '灵隐寺', value: '灵隐寺' },
    { label: '千岛湖', value: '千岛湖' },
    { label: '宋城千古情', value: '宋城千古情' },
    { label: '西溪湿地', value: '西溪湿地' }
  ]

  useEffect(() => {
    fetchRealTimeData()
  }, [selectedScenicSpot])

  const fetchRealTimeData = async () => {
    try {
      setLoading(true)
      // 获取实时天气
      const weather = await infoService.getWeatherInfo(selectedScenicSpot)
      // 获取人流信息
      const crowd = await infoService.getCrowdInfo(selectedScenicSpot)
      // 获取交通信息
      const traffic = await infoService.getTrafficInfo(selectedScenicSpot)
      // 获取预警信息
      const alerts = await infoService.getAlerts(selectedScenicSpot)
      // 获取游客评价
      const reviews = await infoService.getRecentReviews(selectedScenicSpot)
      
      setRealTimeData({
        weather,
        crowd,
        traffic,
        alerts,
        reviews
      })
    } catch (error) {
      console.error('Failed to fetch real-time data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCrowdLevelColor = (level: number) => {
    if (level < 30) return '#52c41a'
    if (level < 60) return '#faad14'
    return '#f5222d'
  }

  const getCrowdLevelText = (level: number) => {
    if (level < 30) return '人流稀少'
    if (level < 60) return '人流适中'
    return '人流拥挤'
  }

  const getTrafficStatusColor = (status: string) => {
    switch (status) {
      case '畅通': return '#52c41a'
      case '缓行': return '#faad14'
      case '拥堵': return '#f5222d'
      default: return '#666'
    }
  }

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case '紧急': return '#f5222d'
      case '重要': return '#faad14'
      case '一般': return '#1890ff'
      default: return '#666'
    }
  }

  return (
    <Content className={styles.content}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>实时景区信息</h1>
          <div className={styles.scenicSelector}>
            <MapOutlined className={styles.mapIcon} />
            <Select 
              value={selectedScenicSpot}
              onChange={setSelectedScenicSpot}
              placeholder="选择景区"
              style={{ width: 200 }}
            >
              {scenicSpots.map(spot => (
                <Option key={spot.value} value={spot.value}>{spot.label}</Option>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>加载中...</div>
        ) : realTimeData ? (
          <>
            {/* 顶部概览卡片 */}
            <Row gutter={[16, 16]} className={styles.overviewRow}>
              {/* 天气卡片 */}
              <Col xs={24} md={12} lg={6}>
                <Card className={styles.weatherCard}>
                  <div className={styles.weatherContent}>
                    <div className={styles.weatherIconContainer}>
                      <CloudOutlined className={styles.weatherIcon} />
                    </div>
                    <div className={styles.weatherInfo}>
                      <Statistic 
                        title="当前天气" 
                        value={realTimeData.weather?.temperature || '--'} 
                        suffix="°C"
                        valueStyle={{ color: '#1890ff' }}
                      />
                      <div className={styles.weatherDetails}>
                        <span><UmbrellaOutlined /> {realTimeData.weather?.humidity || '--'}%</span>
                        <span><WindOutlined /> {realTimeData.weather?.windSpeed || '--'} km/h</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* 人流卡片 */}
              <Col xs={24} md={12} lg={6}>
                <Card className={styles.crowdCard}>
                  <Statistic 
                    title="实时人流" 
                    value={realTimeData.crowd?.currentCount || '--'} 
                    suffix="人"
                    valueStyle={{ color: getCrowdLevelColor(realTimeData.crowd?.crowdLevel || 0) }}
                  />
                  <Progress 
                    percent={realTimeData.crowd?.crowdLevel || 0} 
                    status="active" 
                    strokeColor={getCrowdLevelColor(realTimeData.crowd?.crowdLevel || 0)}
                    className={styles.progress}
                  />
                  <div className={styles.crowdStatus} style={{ color: getCrowdLevelColor(realTimeData.crowd?.crowdLevel || 0) }}>
                    {getCrowdLevelText(realTimeData.crowd?.crowdLevel || 0)}
                  </div>
                </Card>
              </Col>

              {/* 开放时间卡片 */}
              <Col xs={24} md={12} lg={6}>
                <Card className={styles.timeCard}>
                  <Statistic 
                    title="开放时间" 
                    value={realTimeData.crowd?.isOpen ? '开放中' : '已关闭'}
                    valueStyle={{ color: realTimeData.crowd?.isOpen ? '#52c41a' : '#f5222d' }}
                  />
                  <div className={styles.openHours}>
                    <ClockCircleOutlined className={styles.timeIcon} />
                    <span>{realTimeData.crowd?.openingHours || '--'}</span>
                  </div>
                </Card>
              </Col>

              {/* 交通状况卡片 */}
              <Col xs={24} md={12} lg={6}>
                <Card className={styles.trafficCard}>
                  <Statistic 
                    title="交通状况" 
                    value={realTimeData.traffic?.status || '--'}
                    valueStyle={{ color: getTrafficStatusColor(realTimeData.traffic?.status || '') }}
                  />
                  <div className={styles.trafficDetails}>
                    <CarOutlined className={styles.trafficIcon} />
                    <span>平均车速: {realTimeData.traffic?.averageSpeed || '--'} km/h</span>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 预警信息 */}
            {realTimeData.alerts && realTimeData.alerts.length > 0 && (
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Card className={styles.alertsCard}>
                    <div className={styles.cardHeader}>
                      <AlertOutlined className={styles.alertIcon} />
                      <h3 className={styles.cardTitle}>景区预警</h3>
                    </div>
                    <Timeline
                      items={realTimeData.alerts.map((alert: any, index: number) => ({
                        color: getAlertLevelColor(alert.level),
                        children: (
                          <div className={styles.alertItem}>
                            <span className="ant-timeline-item-label">{alert.time}</span>
                            <div>
                              <strong style={{ color: getAlertLevelColor(alert.level) }}>{alert.title}</strong>
                              <p>{alert.description}</p>
                            </div>
                          </div>
                        )
                      }))}
                    />
                  </Card>
                </Col>
              </Row>
            )}

            {/* 详细信息区域 */}
            <Row gutter={[16, 16]}>
              {/* 人流趋势 */}
              <Col xs={24} lg={12}>
                <Card className={styles.trendCard}>
                  <div className={styles.cardHeader}>
                    <UserOutlined className={styles.trendIcon} />
                    <h3 className={styles.cardTitle}>今日人流趋势</h3>
                  </div>
                  <div className={styles.trendChart}>
                    {realTimeData.crowd?.dailyTrend?.map((item: any, index: number) => (
                      <div key={index} className={styles.trendBar}>
                        <div 
                          className={styles.bar} 
                          style={{ height: `${item.value}%`, backgroundColor: getCrowdLevelColor(item.value) }}
                        />
                        <span className={styles.barLabel}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>

              {/* 游客评价 */}
              <Col xs={24} lg={12}>
                <Card className={styles.reviewsCard}>
                  <div className={styles.cardHeader}>
                    <HeartOutlined className={styles.reviewIcon} />
                    <h3 className={styles.cardTitle}>最新游客评价</h3>
                  </div>
                  <List
                    dataSource={realTimeData.reviews || []}
                    renderItem={review => (
                      <List.Item className={styles.reviewItem}>
                        <List.Item.Meta
                          avatar={<Avatar>{review.user.charAt(0)}</Avatar>}
                          title={review.user}
                          description={
                            <div>
                              <div className={styles.reviewRating}>
                                {'★'.repeat(review.rating).padEnd(5, '☆')}
                              </div>
                              <p className={styles.reviewContent}>{review.content}</p>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                  <Button type="text" className={styles.viewMoreButton}>查看更多</Button>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <div className={styles.emptyState}>暂无数据</div>
        )}
      </div>
    </Content>
  )
}

export default RealTimeInfoPage