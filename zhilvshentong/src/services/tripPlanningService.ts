// 智能行程规划服务
import { attractions, hotels } from './mockDataService';

// 定义类型
export interface Activity {
  id: number;
  name: string;
  type: 'attraction' | 'restaurant' | 'experience' | 'accommodation';
  location: string;
  duration: number;
  price?: number;
  rating?: number;
  transport?: string;
}

export interface DayPlan {
  date: string;
  activities: Activity[];
  accommodation?: { id: number; name: string };
  totalDistance: number;
  totalDuration: number;
  totalCost: number;
}

export interface TripOption {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: DayPlan[];
  totalDistance: number;
  totalDuration: number;
  totalCost: number;
  carbonFootprint?: number;
}

// 旅行偏好类型
export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
  budget: 'low' | 'medium' | 'high';
  travelStyle: 'relaxed' | 'active' | 'cultural' | 'adventurous';
  accommodationType: 'hotel' | 'hostel' | 'apartment' | 'homestay';
  transportPreferences: string[];
}

// 智能行程规划服务类
class TripPlanningService {
  // 生成行程建议
  async generateTripOptions(preferences: TripPreferences): Promise<TripOption[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 计算行程天数
    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // 生成3个不同的行程选项
    const tripOptions = Array.from({ length: 3 }, (_, index) => 
      this.createTripOption(preferences, days, index + 1)
    );

    return tripOptions;
  }

  // 创建单个行程选项
  private createTripOption(preferences: TripPreferences, days: number, optionIndex: number): TripOption {
    const optionId = `trip_${Date.now()}_${optionIndex}`;
    const { destination, startDate, endDate, interests, budget, travelStyle } = preferences;
    
    // 根据预算调整价格
    const budgetMultiplier = budget === 'low' ? 0.7 : budget === 'medium' ? 1 : 1.5;

    // 生成每日计划
    const dayPlans: DayPlan[] = [];
    let totalDistance = 0;
    let totalDuration = 0;
    let totalCost = 0;

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];

      // 生成当天的活动
      const activities = this.generateDailyActivities(interests, travelStyle, budgetMultiplier);
      
      // 选择住宿
      const accommodation = hotels[Math.floor(Math.random() * hotels.length)];
      
      // 计算当天的统计数据
      const dayDistance = activities.length * 5; // 假设每个活动之间平均距离5公里
      const dayDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
      const dayCost = activities.reduce((sum, activity) => sum + (activity.price || 0), 0) + (accommodation.price * budgetMultiplier);

      // 添加到统计数据
      totalDistance += dayDistance;
      totalDuration += dayDuration;
      totalCost += dayCost;

      // 创建当天计划
      dayPlans.push({
        date: dateString,
        activities,
        accommodation: { id: accommodation.id, name: accommodation.name },
        totalDistance: dayDistance,
        totalDuration: dayDuration,
        totalCost: dayCost
      });
    }

    return {
      id: optionId,
      title: `${destination}${optionIndex === 1 ? '经典' : optionIndex === 2 ? '深度' : '轻奢'}之旅`,
      destination,
      startDate,
      endDate,
      days: dayPlans,
      totalDistance,
      totalDuration,
      totalCost: Math.round(totalCost)
    };
  }

  // 生成每日活动
  private generateDailyActivities(interests: string[], travelStyle: string, budgetMultiplier: number): Activity[] {
    // 根据旅行风格调整活动数量
    const activityCount = travelStyle === 'relaxed' ? 2 : travelStyle === 'active' ? 4 : 3;
    
    // 从景点中随机选择活动
    const selectedActivities: Activity[] = [];
    const availableAttractions = [...attractions];

    for (let i = 0; i < activityCount; i++) {
      if (availableAttractions.length === 0) break;

      // 随机选择一个景点
      const randomIndex = Math.floor(Math.random() * availableAttractions.length);
      const attraction = availableAttractions.splice(randomIndex, 1)[0];

      // 创建活动
      const activity: Activity = {
        id: attraction.id,
        name: attraction.name,
        type: 'attraction',
        location: attraction.location,
        duration: travelStyle === 'relaxed' ? 3 : 2,
        price: Math.round((attraction.admissionFee || 0) * budgetMultiplier),
        rating: attraction.rating,
        transport: ['bus', 'privateCar', 'bike'][Math.floor(Math.random() * 3)]
      };

      selectedActivities.push(activity);
    }

    return selectedActivities;
  }

  // 优化行程路线
  async optimizeTripRoute(trip: TripOption): Promise<TripOption> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 这里应该实现实际的路线优化算法
    // 简单起见，我们只是返回原行程，并更新一些统计数据
    const optimizedTrip = {
      ...trip,
      id: `optimized_${trip.id}`,
      totalDistance: Math.round(trip.totalDistance * 0.9), // 假设优化后距离减少10%
      totalDuration: Math.round(trip.totalDuration * 0.95) // 假设优化后时间减少5%
    };

    return optimizedTrip;
  }

  // 保存行程计划
  async saveTripPlan(trip: TripOption): Promise<{ success: boolean; message: string }> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // 这里应该实现实际的保存逻辑
      // 简单起见，我们只是将行程保存到localStorage
      const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
      savedTrips.push(trip);
      localStorage.setItem('savedTrips', JSON.stringify(savedTrips));

      return { success: true, message: '行程保存成功' };
    } catch (error) {
      console.error('保存行程失败:', error);
      return { success: false, message: '行程保存失败' };
    }
  }

  // 获取用户保存的行程计划
  async getUserTripPlans(): Promise<TripOption[]> {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      // 从localStorage获取保存的行程
      const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
      return savedTrips;
    } catch (error) {
      console.error('获取行程失败:', error);
      return [];
    }
  }
}

export default new TripPlanningService();
