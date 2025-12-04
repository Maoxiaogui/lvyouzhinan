import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Card, Form, Input, DatePicker, Select, Button, Slider, Switch, Upload, message } from 'antd'
import { CalendarOutlined, MapPinOutlined, UsersOutlined, ClockCircleOutlined, HeartOutlined, DownloadOutlined, ShareAltOutlined, PlusOutlined, MinusOutlined, SaveOutlined, EnvironmentOutlined, ShoppingOutlined, CoffeeOutlined, HomeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { TripPlanningService } from '../services/tripPlanningService'
import styles from './TripPlanningPage.module.css'

const { Content } = Layout
const { Option } = Select
const { RangePicker } = DatePicker

const TripPlanningPage: React.FC = () => {
  const [form] = Form.useForm()
  const [tripService] = useState(new TripPlanningService())
  const [generatedTrips, setGeneratedTrips] = useState<any[]>([])
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeDay, setActiveDay] = useState(1)

  // 模拟的兴趣点数据
  const interests = [
    { label: '自然风光', value: 'nature', icon: <EnvironmentOutlined /> },
    { label: '历史文化', value: 'culture', icon: <HeartOutlined /> },
    { label: '美食购物', value: 'shopping', icon: <ShoppingOutlined /> },
    { label: '休闲娱乐', value: 'entertainment', icon: <CoffeeOutlined /> },
    { label: '住宿体验', value: 'accommodation', icon: <HomeOutlined /> }
  ]

  // 模拟的交通方式
  const transportModes = [
    { label: '自驾', value: 'driving' },
    { label: '公共交通', value: 'public' },
    { label: '步行', value: 'walking' },
    { label: '共享单车', value: 'bicycle' }
  ]

  const handleGenerateTrip = async () => {
    try {
      const values = await form.validateFields()
      setIsGenerating(true)
      
      // 准备用户偏好数据
      const preferences = {
        destination: values.destination,
        startDate: values.date?.[0]?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
        endDate: values.date?.[1]?.format('YYYY-MM-DD') || dayjs().add(3, 'day').format('YYYY-MM-DD'),
        travelers: parseInt(values.travelers || '2'),
        interests: values.interests || [],
        transportMode: values.transportMode || 'public',
        budget: values.budget || 'medium',
        pace: values.pace || 'medium',
        isCarbonFriendly: values.carbonFriendly || false
      }

      // 生成行程选项
      const trips = await tripService.generateTripOptions(preferences)
      setGeneratedTrips(trips)
      setSelectedTrip(trips[0])
      message.success('行程生成成功！')
    } catch (error) {
      message.error('行程生成失败，请检查输入信息')
      console.error('Trip generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveTrip = async () => {
    if (!selectedTrip) return
    try {
      await tripService.saveTrip(selectedTrip)
      message.success('行程已保存！')
    } catch (error) {
      message.error('保存失败，请重试')
    }
  }

  const handleDownloadTrip = () => {
    message.info('行程下载功能开发中...')
  }

  const handleShareTrip = () => {
    message.info('行程分享功能开发中...')
  }

  const renderTripDay = (day: any) => {
    return (
      <div key={day.day} className={styles.dayContent}>
        <h3 className={styles.dayTitle}>第{day.day}天</h3>
        {day.activities.map((activity: any, index: number) => (
          <div key={index} className={styles.activityItem}>
            <div className={styles.activityTime}>{activity.time}</div>
            <div className={styles.activityInfo}>
              <div className={styles.activityName}>{activity.name}</div>
              <div className={styles.activityDescription}>{activity.description}</div>
              <div className={styles.activityTags}>
                {activity.tags?.map((tag: string, tagIndex: number) => (
                  <span key={tagIndex} className={styles.activityTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Content className={styles.content}>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          {/* 左侧表单区域 */}
          <Col xs={24} lg={8}>
            <Card className={styles.formCard}>
              <h2 className={styles.pageTitle}>智能行程规划</h2>
              <Form form={form} layout="vertical" className={styles.form}>
                <Form.Item 
                  name="destination" 
                  label="目的地" 
                  rules={[{ required: true, message: '请输入目的地' }]}
                >
                  <Input placeholder="输入城市或景点名称" prefix={<MapPinOutlined />} />
                </Form.Item>

                <Form.Item 
                  name="date" 
                  label="旅行日期" 
                  rules={[{ required: true, message: '请选择旅行日期' }]}
                >
                  <RangePicker className={styles.datePicker} placeholder={['开始日期', '结束日期']} />
                </Form.Item>

                <Form.Item 
                  name="travelers" 
                  label="旅行人数" 
                >
                  <Select placeholder="选择人数">
                    <Option value="1">1人</Option>
                    <Option value="2">2人</Option>
                    <Option value="3">3人</Option>
                    <Option value="4">4人</Option>
                    <Option value="5+">5人及以上</Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="interests" 
                  label="兴趣偏好" 
                >
                  <Select mode="multiple" placeholder="选择您感兴趣的内容" className={styles.interestsSelect}>
                    {interests.map(interest => (
                      <Option key={interest.value} value={interest.value}>
                        <span style={{ marginRight: '8px' }}>{interest.icon}</span>
                        {interest.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="transportMode" 
                  label="交通方式" 
                >
                  <Select placeholder="选择主要交通方式">
                    {transportModes.map(mode => (
                      <Option key={mode.value} value={mode.value}>{mode.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="budget" 
                  label="预算级别" 
                >
                  <Select placeholder="选择预算级别">
                    <Option value="low">经济</Option>
                    <Option value="medium">舒适</Option>
                    <Option value="high">豪华</Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="pace" 
                  label="行程节奏" 
                  tooltip="轻松：每天较少景点，留有休息时间；适中：平衡景点和休息；紧凑：每天较多景点"
                >
                  <Slider 
                    marks={{
                      0: '轻松',
                      50: '适中',
                      100: '紧凑'
                    }}
                    defaultValue={50}
                    onChange={(value) => form.setFieldValue('pace', value < 30 ? 'slow' : value < 70 ? 'medium' : 'fast')}
                  />
                </Form.Item>

                <Form.Item 
                  name="carbonFriendly" 
                  valuePropName="checked"
                  className={styles.switchFormItem}
                >
                  <Switch checkedChildren="环保模式" unCheckedChildren="标准模式" />
                  <span className={styles.switchLabel}>启用环保行程规划</span>
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    size="large" 
                    className={styles.generateButton}
                    onClick={handleGenerateTrip}
                    loading={isGenerating}
                    icon={<CalendarOutlined />}
                  >
                    {isGenerating ? '生成中...' : '生成智能行程'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* 右侧行程预览区域 */}
          <Col xs={24} lg={16}>
            {selectedTrip ? (
              <Card className={styles.tripPreviewCard}>
                <div className={styles.tripHeader}>
                  <div>
                    <h2 className={styles.tripTitle}>{selectedTrip.title}</h2>
                    <div className={styles.tripMeta}>
                      <span className={styles.metaItem}><CalendarOutlined /> {selectedTrip.days.length}天行程</span>
                      <span className={styles.metaItem}><UsersOutlined /> {selectedTrip.travelers}人</span>
                      <span className={styles.metaItem}><ClockCircleOutlined /> {selectedTrip.pace}</span>
                      {selectedTrip.isCarbonFriendly && (
                        <span className={styles.carbonBadge}>低碳出行</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.tripActions}>
                    <Button icon={<SaveOutlined />} onClick={handleSaveTrip}>保存</Button>
                    <Button icon={<DownloadOutlined />} onClick={handleDownloadTrip}>下载</Button>
                    <Button icon={<ShareAltOutlined />} onClick={handleShareTrip}>分享</Button>
                  </div>
                </div>

                {/* 行程日期切换栏 */}
                <div className={styles.dayTabs}>
                  {selectedTrip.days.map((day: any) => (
                    <Button
                      key={day.day}
                      className={`${styles.dayTab} ${activeDay === day.day ? styles.activeDayTab : ''}`}
                      onClick={() => setActiveDay(day.day)}
                    >
                      第{day.day}天
                    </Button>
                  ))}
                </div>

                {/* 行程内容 */}
                <div className={styles.tripContent}>
                  {selectedTrip.days
                    .filter((day: any) => day.day === activeDay)
                    .map(renderTripDay)}
                </div>

                {/* 行程优化建议 */}
                <div className={styles.optimizationSection}>
                  <h3>行程优化建议</h3>
                  <ul className={styles.optimizationList}>
                    {selectedTrip.optimizationSuggestions?.map((suggestion: string, index: number) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ) : (
              <Card className={styles.emptyStateCard}>
                <div className={styles.emptyState}>
                  <CalendarOutlined className={styles.emptyIcon} />
                  <h3>还没有生成行程</h3>
                  <p>填写左侧表单并点击生成按钮，获取为您定制的智能行程</p>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </Content>
  )
}

export default TripPlanningPage