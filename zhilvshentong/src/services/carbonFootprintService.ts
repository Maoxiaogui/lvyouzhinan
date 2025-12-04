// 碳足迹计算服务
import { transportCarbonFactors, hotels } from './mockDataService'
import { TripOption } from './tripPlanningService'

// 定义类型
export interface CarbonFootprint {
  totalEmission: number
  breakdown: {
    transport: number
    accommodation: number
    activities: number
  }
  savings: number
  equivalent: string
  recommendations: string[]
}

export interface CarbonReductionTip {
  id: number
  title: string
  description: string
  carbonReduction: number
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
}

// 碳排放系数常量
const CARBON_FACTORS = {
  // 交通碳排放系数 (kg CO2e/km)
  transport: transportCarbonFactors,
  
  // 住宿碳排放系数 (kg CO2e/晚/星级)
  accommodation: 50,
  
  // 活动碳排放系数 (kg CO2e/次)
  activities: {
    attraction: 5,
    experience: 10,
    dining: 2
  }
}

// 碳足迹计算服务类
class CarbonFootprintService {
  // 计算行程碳足迹
  calculateCarbonFootprint(trip: TripOption): CarbonFootprint {
    let transportEmission = 0
    let accommodationEmission = 0
    let activitiesEmission = 0
    
    // 计算每天的碳排放
    trip.days.forEach(day => {
      day.activities.forEach(activity => {
        if (activity.type === 'attraction' || activity.type === 'experience') {
          // 计算景点/体验活动碳排放
          activitiesEmission += CARBON_FACTORS.activities[activity.type]
          
          // 计算交通碳排放
          if (activity.transport) {
            const factor = CARBON_FACTORS.transport[activity.transport as keyof typeof CARBON_FACTORS.transport] || 0.1
            const distance = activity.duration * 3 // 假设平均距离3km/小时
            transportEmission += factor * distance
          } else {
            // 默认交通方式
            transportEmission += 0.1 * 3 * activity.duration
          }
        }
      })
      
      // 每天住宿碳排放
      const hotel = hotels.find(h => h.star === 3) || hotels[0]
      accommodationEmission += hotel.carbonFactor || (CARBON_FACTORS.accommodation * 3)
    })
    
    // 计算总碳排放
    const totalEmission = transportEmission + accommodationEmission + activitiesEmission
    
    // 计算潜在节省
    const savings = this.calculatePotentialSavings(trip)
    
    // 生成碳中和等效描述
    const equivalent = this.generateEquivalentDescription(totalEmission)
    
    // 生成减排建议
    const recommendations = this.generateRecommendations(trip)
    
    return {
      totalEmission: Math.round(totalEmission * 100) / 100,
      breakdown: {
        transport: Math.round(transportEmission * 100) / 100,
        accommodation: Math.round(accommodationEmission * 100) / 100,
        activities: Math.round(activitiesEmission * 100) / 100
      },
      savings: Math.round(savings * 100) / 100,
      equivalent,
      recommendations
    }
  }
  
  // 计算潜在碳减排量
  private calculatePotentialSavings(trip: TripOption): number {
    let potentialSavings = 0
    
    // 计算交通减排潜力
    trip.days.forEach(day => {
      day.activities.forEach(activity => {
        if (activity.transport === 'privateCar' || activity.transport === 'taxi') {
          // 切换到公共交通可节省的碳排放
          const privateCarFactor = CARBON_FACTORS.transport.privateCar || 0.3
          const publicTransportFactor = CARBON_FACTORS.transport.bus || 0.1
          const distance = activity.duration * 3
          potentialSavings += (privateCarFactor - publicTransportFactor) * distance
        }
      })
    })
    
    // 计算住宿减排潜力（假设可以选择更环保的酒店）
    const luxuryHotelCarbon = 250
    const ecoHotelCarbon = 100
    potentialSavings += (luxuryHotelCarbon - ecoHotelCarbon) * trip.days.length
    
    return potentialSavings
  }
  
  // 生成碳中和等效描述
  private generateEquivalentDescription(carbonAmount: number): string {
    // 一棵树每年吸收约21.77kg CO2
    const treesPerYear = carbonAmount / 21.77
    
    // 一公里汽车排放约0.12kg CO2
    const carKilometers = carbonAmount / 0.12
    
    if (treesPerYear < 1) {
      return `相当于需要种植 ${Math.round(treesPerYear * 10) / 10} 棵树一年来抵消`
    } else {
      return `相当于需要种植 ${Math.round(treesPerYear)} 棵树一年来抵消，或驾驶 ${Math.round(carKilometers)} 公里汽车的排放量`
    }
  }
  
  // 生成减排建议
  private generateRecommendations(trip: TripOption): string[] {
    const recommendations: string[] = []
    
    // 检查是否有使用私家车
    const hasPrivateCar = trip.days.some(day => 
      day.activities.some(activity => activity.transport === 'privateCar')
    )
    
    // 检查行程天数
    const hasLongStay = trip.days.length > 5
    
    // 检查活动类型
    const hasManyPaidActivities = trip.days.reduce((count, day) => 
      count + day.activities.filter(a => a.type === 'experience' && a.price > 100).length, 0
    ) > trip.days.length
    
    // 添加个性化建议
    if (hasPrivateCar) {
      recommendations.push('选择公共交通工具或共享单车，减少交通碳排放')
    }
    
    if (hasLongStay) {
      recommendations.push('选择绿色认证酒店，自带洗漱用品，减少一次性用品消耗')
    }
    
    if (hasManyPaidActivities) {
      recommendations.push('参与一些免费的自然体验活动，如徒步、野餐等')
    }
    
    // 添加通用建议
    recommendations.push('携带可重复使用的水瓶，减少塑料垃圾')
    recommendations.push('选择当季当地食材，减少食物运输碳排放')
    recommendations.push('支持环保认证的旅游景点和活动')
    
    return recommendations.slice(0, 5)
  }
  
  // 获取碳减排小贴士
  getCarbonReductionTips(): CarbonReductionTip[] {
    return [
      {
        id: 1,
        title: '使用公共交通',
        description: '优先选择地铁、公交车等公共交通工具，减少私家车使用',
        carbonReduction: 30,
        difficulty: 'easy',
        icon: '🚌'
      },
      {
        id: 2,
        title: '选择绿色酒店',
        description: '入住获得环保认证的酒店，支持可持续旅游',
        carbonReduction: 25,
        difficulty: 'medium',
        icon: '🏨'
      },
      {
        id: 3,
        title: '减少一次性用品',
        description: '自带洗漱用品、购物袋和水杯，拒绝使用一次性物品',
        carbonReduction: 10,
        difficulty: 'easy',
        icon: '♻️'
      },
      {
        id: 4,
        title: '选择本地美食',
        description: '品尝当地特色美食，减少食物运输带来的碳排放',
        carbonReduction: 15,
        difficulty: 'medium',
        icon: '🍜'
      },
      {
        id: 5,
        title: '参与碳补偿项目',
        description: '通过正规渠道购买碳补偿，抵消旅行产生的碳排放',
        carbonReduction: 100,
        difficulty: 'hard',
        icon: '🌳'
      }
    ]
  }
  
  // 比较不同行程方案的碳足迹
  compareCarbonFootprints(trips: TripOption[]): CarbonFootprint[] {
    return trips.map(trip => this.calculateCarbonFootprint(trip))
  }
}

export default new CarbonFootprintService()