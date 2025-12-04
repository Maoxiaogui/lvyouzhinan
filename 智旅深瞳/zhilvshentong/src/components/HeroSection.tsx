import React, { useEffect, useState } from 'react'
import { Button, Card, Input, DatePicker, Select, Row, Col, Typography } from 'antd'
import { SearchOutlined, CalendarOutlined, MapPinOutlined, UsersOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import styles from './HeroSection.module.css'
import type { RangePickerProps } from 'antd/es/date-picker'
import type { Dayjs } from 'dayjs'

const { Title, Paragraph } = Typography
const { Option } = Select

const HeroSection: React.FC = () => {
  const [searchFormVisible, setSearchFormVisible] = useState(false)
  const [destinations] = useState([
    { id: 1, name: '杭州西湖' },
    { id: 2, name: '千岛湖' },
    { id: 3, name: '灵隐寺' },
    { id: 4, name: '宋城千古情' },
    { id: 5, name: '西溪湿地' }
  ])

  useEffect(() => {
    // 页面加载时的动画效果
    const timer = setTimeout(() => {
      setSearchFormVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    // 搜索处理逻辑
    console.log('搜索行程')
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day')
  }

  return (
    <div className={styles.container}>
      {/* 背景图片层 */}
      <div className={styles.backgroundLayer}>
        <div className={styles.overlay}></div>
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="旅行风景" 
          className={styles.backgroundImage}
        />
      </div>
      
      {/* 内容层 */}
      <div className={styles.contentLayer}>
        <Row justify="space-between" align="middle">
          <Col xs={24} md={12} className={styles.textSection}>
            <div className={styles.titleContainer}>
              <Title level={1} className={styles.title}>
                <span className={styles.highlight}>智旅深瞳</span> - 开启您的
                <span className={styles.highlight}>AI旅行革命</span>
              </Title>
              <Paragraph className={styles.description}>
                突破传统旅行边界，以人工智能重塑您的探索之旅，让每一次出行都成为独一无二的精彩故事
              </Paragraph>
              <div className={styles.actionButtons}>
                <Button type="primary" size="large" className={styles.primaryButton}>
                  <Link to="/trip-planning" className={styles.buttonLink}>开始规划行程</Link>
                </Button>
                <Button size="large" className={styles.secondaryButton}>
                  了解更多
                </Button>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={11} className={styles.searchSection}>
            <Card 
              className={`${styles.searchCard} ${searchFormVisible ? styles.visible : ''}`}
              bordered={false}
              shadow="large"
            >
              <Title level={4} className={styles.searchTitle}>搜索您的旅行</Title>
              
              <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <MapPinOutlined className={styles.inputIcon} />
                  <Input 
                    placeholder="目的地" 
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.inputWrapper}>
                  <CalendarOutlined className={styles.inputIcon} />
                  <DatePicker.RangePicker 
                    className={styles.datePicker}
                    disabledDate={disabledDate}
                    placeholder={['开始日期', '结束日期']}
                  />
                </div>
                
                <div className={styles.inputWrapper}>
                  <UsersOutlined className={styles.inputIcon} />
                  <Select 
                    className={styles.select}
                    placeholder="选择人数"
                    defaultValue="2"
                  >
                    <Option value="1">1人</Option>
                    <Option value="2">2人</Option>
                    <Option value="3">3人</Option>
                    <Option value="4">4人</Option>
                    <Option value="5+">5人及以上</Option>
                  </Select>
                </div>
                
                <Button 
                  type="primary" 
                  className={styles.searchButton}
                  icon={<SearchOutlined />}
                  size="large"
                  onClick={handleSearch}
                >
                  开始搜索
                </Button>
              </div>
              
              <div className={styles.popularDestinations}>
                <div className={styles.popularTitle}>热门目的地：</div>
                <div className={styles.destinationTags}>
                  {destinations.map(dest => (
                    <span 
                      key={dest.id} 
                      className={styles.destinationTag}
                      onClick={() => console.log(`选择目的地: ${dest.name}`)}
                    >
                      {dest.name}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HeroSection