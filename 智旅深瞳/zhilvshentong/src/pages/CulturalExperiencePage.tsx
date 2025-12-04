import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Col, Tabs, Rate, Tag, Empty, Spin } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined, MapPinOutlined, ClockCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Experience, ExperienceReview } from '../services/culturalExperienceService';
import CulturalExperienceService from '../services/culturalExperienceService';
import './CulturalExperiencePage.module.css';

const { Search } = Input;
const { TabPane } = Tabs;

const CulturalExperiencePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [reviews, setReviews] = useState<ExperienceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabKey, setActiveTabKey] = useState('1');
  
  const experienceService = new CulturalExperienceService();

  // 加载文化体验数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // 获取所有体验项目
        const expData = await experienceService.getAllExperiences();
        setExperiences(expData);
        setFilteredExperiences(expData);
        
        // 如果有体验项目，加载第一个的详情和评价
        if (expData.length > 0) {
          setSelectedExperience(expData[0]);
          const reviewData = await experienceService.getExperienceReviews(expData[0].id);
          setReviews(reviewData);
        }
      } catch (error) {
        console.error('加载文化体验数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredExperiences(experiences);
      return;
    }
    
    const filtered = experiences.filter(exp => 
      exp.title.toLowerCase().includes(value.toLowerCase()) ||
      exp.location.toLowerCase().includes(value.toLowerCase()) ||
      exp.description.toLowerCase().includes(value.toLowerCase()) ||
      exp.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExperiences(filtered);
  };

  // 选择体验项目
  const handleSelectExperience = async (experience: Experience) => {
    setSelectedExperience(experience);
    try {
      const reviewData = await experienceService.getExperienceReviews(experience.id);
      setReviews(reviewData);
      setActiveTabKey('1');
    } catch (error) {
      console.error('加载体验评价失败:', error);
    }
  };

  // 获取类别标签颜色
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '传统工艺':
        return 'blue';
      case '美食品鉴':
        return 'red';
      case '民俗活动':
        return 'orange';
      case '历史文化':
        return 'purple';
      case '自然探索':
        return 'green';
      default:
        return 'default';
    }
  };

  // 渲染体验项目卡片
  const renderExperienceCard = (experience: Experience) => {
    return (
      <Card
        key={experience.id}
        hoverable
        className={`experience-card ${selectedExperience?.id === experience.id ? 'selected' : ''}`}
        cover={<div className="card-cover" style={{ backgroundImage: `url(${experience.imageUrl})` }} />}
        onClick={() => handleSelectExperience(experience)}
      >
        <div className="card-content">
          <h3 className="experience-title">{experience.title}</h3>
          <div className="experience-meta">
            <div className="meta-item">
              <MapPinOutlined className="meta-icon" />
              <span>{experience.location}</span>
            </div>
            <div className="meta-item">
              <ClockCircleOutlined className="meta-icon" />
              <span>{experience.duration}</span>
            </div>
          </div>
          <div className="experience-category">
            <Tag color={getCategoryColor(experience.category)}>{experience.category}</Tag>
          </div>
          <div className="experience-footer">
            <div className="price">¥{experience.price}</div>
            <div className="rating">
              <Rate disabled defaultValue={experience.rating} count={5} size="small" />
              <span className="rating-text">({experience.reviewCount})</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // 渲染详情面板
  const renderDetailPanel = () => {
    if (!selectedExperience) {
      return (
        <div className="no-selection">
          <Empty description="请选择一个文化体验" />
        </div>
      );
    }

    return (
      <div className="detail-panel">
        <div className="detail-header">
          <h2>{selectedExperience.title}</h2>
          <div className="detail-meta">
            <div className="meta-item">
              <MapPinOutlined className="meta-icon" />
              <span>{selectedExperience.location}</span>
            </div>
            <div className="meta-item">
              <CalendarOutlined className="meta-icon" />
              <span>可预约日期: {selectedExperience.availableDates.join(', ')}</span>
            </div>
            <div className="meta-item">
              <UserOutlined className="meta-icon" />
              <span>最少人数: {selectedExperience.minParticipants}人</span>
            </div>
          </div>
          <div className="detail-rating">
            <Rate disabled defaultValue={selectedExperience.rating} count={5} />
            <span className="rating-text">{selectedExperience.rating} ({selectedExperience.reviewCount}条评价)</span>
          </div>
          <div className="detail-tags">
            <Tag color={getCategoryColor(selectedExperience.category)}>{selectedExperience.category}</Tag>
            {selectedExperience.isPopular && <Tag color="red">热门</Tag>}
            {selectedExperience.isRecommended && <Tag color="green">推荐</Tag>}
          </div>
        </div>
        
        <div className="detail-image" style={{ backgroundImage: `url(${selectedExperience.imageUrl})` }} />
        
        <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} className="detail-tabs">
          <TabPane tab="体验详情" key="1">
            <div className="detail-description">
              <h3>体验介绍</h3>
              <p>{selectedExperience.description}</p>
            </div>
            <div className="detail-highlights">
              <h3>体验亮点</h3>
              <ul>
                {selectedExperience.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="detail-inclusion">
              <h3>包含内容</h3>
              <ul>
                {selectedExperience.inclusion.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </TabPane>
          <TabPane tab="游客评价" key="2">
            <div className="reviews-section">
              {loading ? (
                <Spin size="large" />
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="review-item" key={review.id}>
                    <div className="review-header">
                      <div className="review-user">
                        <UserOutlined className="user-icon" />
                        <span>{review.userName}</span>
                      </div>
                      <Rate disabled defaultValue={review.rating} count={5} size="small" />
                    </div>
                    <div className="review-date">{review.date}</div>
                    <p className="review-content">{review.content}</p>
                  </div>
                ))
              ) : (
                <Empty description="暂无评价" />
              )}
            </div>
          </TabPane>
          <TabPane tab="预订须知" key="3">
            <div className="booking-info">
              <h3>预订信息</h3>
              <div className="info-item">
                <h4>价格</h4>
                <p>¥{selectedExperience.price} / 人</p>
              </div>
              <div className="info-item">
                <h4>时长</h4>
                <p>{selectedExperience.duration}</p>
              </div>
              <div className="info-item">
                <h4>提前预订时间</h4>
                <p>{selectedExperience.bookingAdvanceTime}</p>
              </div>
              <div className="info-item">
                <h4>取消政策</h4>
                <p>{selectedExperience.cancellationPolicy}</p>
              </div>
              <div className="info-item">
                <h4>注意事项</h4>
                <ul>
                  {selectedExperience.notices.map((notice, index) => (
                    <li key={index}>{notice}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabPane>
        </Tabs>
        
        <div className="booking-action">
          <Button type="primary" size="large">
            立即预订
          </Button>
          <Button size="large" className="inquiry-btn">
            咨询详情
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="cultural-experience-page">
      <div className="page-header">
        <h1>文化体验</h1>
        <p>探索当地特色文化，感受不一样的旅行体验</p>
      </div>
      
      <div className="search-bar">
        <Search
          placeholder="搜索体验项目"
          allowClear
          enterButton="搜索"
          size="large"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
      
      <div className="content-container">
        <div className="experiences-grid">
          <h2>推荐体验</h2>
          {loading ? (
            <Spin size="large" className="loading-spinner" />
          ) : filteredExperiences.length > 0 ? (
            <Row gutter={[16, 16]}>
              {filteredExperiences.map((experience) => (
                <Col xs={24} sm={12} md={8} lg={6} key={experience.id}>
                  {renderExperienceCard(experience)}
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description={`没有找到与"${searchTerm}"相关的体验`} />
          )}
        </div>
        
        <div className="experience-detail">
          <h2>体验详情</h2>
          {renderDetailPanel()}
        </div>
      </div>
    </div>
  );
};

export default CulturalExperiencePage;