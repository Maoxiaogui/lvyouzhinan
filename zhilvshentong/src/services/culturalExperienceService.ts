// 文化体验推荐服务
import { experiences } from './mockDataService'

// 定义类型
export interface Experience {
  id: number
  title: string
  location: string
  price: number
  duration: number
  tags: string[]
  description: string
  rating?: number
  reviews?: number
  imageUrl?: string
  availableDates?: string[]
  maxParticipants?: number
}

export interface ExperienceBooking {
  id: string
  experienceId: number
  userId: number
  date: string
  participants: number
  totalPrice: number
  status: 'confirmed' | 'pending' | 'cancelled'
  bookingTime: string
  contactInfo?: {
    name: string
    phone: string
    email: string
  }
}

export interface ExperienceReview {
  id: number
  experienceId: number
  userId: number
  userName: string
  rating: number
  comment: string
  date: string
  images?: string[]
}

// 文化体验推荐服务类
class CulturalExperienceService {
  // 获取推荐体验项目
  async getRecommendedExperiences(interests: string[], location?: string, limit: number = 10): Promise<Experience[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let filteredExperiences = [...experiences]
    
    // 按位置筛选
    if (location) {
      filteredExperiences = filteredExperiences.filter(exp => exp.location === location)
    }
    
    // 按兴趣标签排序（匹配度高的排在前面）
    filteredExperiences.sort((a, b) => {
      const aMatchCount = a.tags.filter(tag => interests.includes(tag)).length
      const bMatchCount = b.tags.filter(tag => interests.includes(tag)).length
      return bMatchCount - aMatchCount
    })
    
    // 随机生成评分和评论数
    const enrichedExperiences = filteredExperiences.map(exp => ({
      ...exp,
      rating: Math.random() * 2 + 3,
      reviews: Math.floor(Math.random() * 200) + 10,
      imageUrl: `/images/experience_${exp.id}.jpg`,
      availableDates: this.generateAvailableDates(),
      maxParticipants: Math.floor(Math.random() * 20) + 5
    }))
    
    return enrichedExperiences.slice(0, limit)
  }
  
  // 获取体验项目详情
  async getExperienceDetails(experienceId: number): Promise<Experience | null> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const experience = experiences.find(exp => exp.id === experienceId)
    
    if (!experience) {
      return null
    }
    
    return {
      ...experience,
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 500) + 50,
      imageUrl: `/images/experience_${experienceId}.jpg`,
      availableDates: this.generateAvailableDates(10),
      maxParticipants: 15
    }
  }
  
  // 搜索体验项目
  async searchExperiences(query: string, location?: string): Promise<Experience[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 700))
    
    let results = experiences.filter(exp => 
      exp.title.includes(query) || 
      exp.description.includes(query) ||
      exp.tags.some(tag => tag.includes(query))
    )
    
    if (location) {
      results = results.filter(exp => exp.location === location)
    }
    
    return results.map(exp => ({
      ...exp,
      rating: Math.random() * 2 + 3,
      reviews: Math.floor(Math.random() * 200) + 10
    }))
  }
  
  // 预订体验项目
  async bookExperience(bookingData: Omit<ExperienceBooking, 'id' | 'bookingTime' | 'status'>): Promise<ExperienceBooking> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟预订成功
    const newBooking: ExperienceBooking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      bookingTime: new Date().toISOString(),
      status: 'confirmed'
    }
    
    // 保存到localStorage
    const bookings = JSON.parse(localStorage.getItem('experienceBookings') || '[]')
    bookings.push(newBooking)
    localStorage.setItem('experienceBookings', JSON.stringify(bookings))
    
    return newBooking
  }
  
  // 获取用户预订记录
  async getUserBookings(userId: number): Promise<ExperienceBooking[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // 从localStorage获取
    const bookings = JSON.parse(localStorage.getItem('experienceBookings') || '[]')
    return bookings.filter((booking: ExperienceBooking) => booking.userId === userId)
  }
  
  // 获取体验项目评论
  async getExperienceReviews(experienceId: number): Promise<ExperienceReview[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 生成模拟评论
    const mockUsers = ['旅行者小明', '摄影师小红', '美食家小李', '文化爱好者小张', '背包客小王']
    const reviews: ExperienceReview[] = []
    
    for (let i = 0; i < 5; i++) {
      reviews.push({
        id: Date.now() + i,
        experienceId,
        userId: 1000 + i,
        userName: mockUsers[i],
        rating: 4 + Math.random() * 1,
        comment: this.generateMockComment(),
        date: new Date(Date.now() - i * 86400000 * Math.random() * 30).toISOString().split('T')[0]
      })
    }
    
    return reviews
  }
  
  // 提交体验项目评论
  async submitReview(review: Omit<ExperienceReview, 'id' | 'date'>): Promise<ExperienceReview> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newReview: ExperienceReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    
    // 保存到localStorage
    const reviews = JSON.parse(localStorage.getItem('experienceReviews') || '[]')
    reviews.push(newReview)
    localStorage.setItem('experienceReviews', JSON.stringify(reviews))
    
    return newReview
  }
  
  // 生成可用日期
  private generateAvailableDates(count: number = 7): string[] {
    const dates: string[] = []
    const today = new Date()
    
    for (let i = 1; i <= count; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i * Math.floor(Math.random() * 5) + 1)
      dates.push(date.toISOString().split('T')[0])
    }
    
    return dates.sort()
  }
  
  // 生成模拟评论
  private generateMockComment(): string {
    const comments = [
      '非常棒的体验！导游讲解很详细，学到了很多当地文化知识。',
      '活动安排得很合理，时间充裕但不拖沓。强烈推荐给文化爱好者！',
      '价格有点高，但体验确实物有所值。环境舒适，老师专业。',
      '整体不错，但人有点多，建议提前预约选择人少的时段。',
      '这是我旅行中最难忘的体验之一，回去后还会想念。'
    ]
    
    return comments[Math.floor(Math.random() * comments.length)]
  }
}

export default new CulturalExperienceService()