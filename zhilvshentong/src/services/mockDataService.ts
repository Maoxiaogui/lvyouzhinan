// 模拟数据服务
// 提供应用所需的所有模拟数据

// 交通碳排放系数 (kg CO2e/km)
export const transportCarbonFactors = {
  plane: 0.252,
  train: 0.041,
  bus: 0.105,
  privateCar: 0.177,
  bike: 0,
  walk: 0
};

// 酒店数据
export const hotels = [
  {
    id: 1,
    name: '豪华度假酒店',
    rating: 5,
    price: 800,
    location: '杭州西湖',
    ecoCertified: true,
    description: '位于西湖畔的豪华酒店，提供优质的服务和设施'
  },
  {
    id: 2,
    name: '精品民宿',
    rating: 4,
    price: 400,
    location: '杭州西湖',
    ecoCertified: false,
    description: '充满艺术气息的精品民宿，距离西湖仅5分钟步行路程'
  },
  {
    id: 3,
    name: '商务酒店',
    rating: 3,
    price: 250,
    location: '杭州市中心',
    ecoCertified: true,
    description: '位于杭州市中心的商务酒店，交通便利'
  },
  {
    id: 4,
    name: '经济型酒店',
    rating: 2,
    price: 120,
    location: '杭州市区',
    ecoCertified: false,
    description: '价格实惠的经济型酒店，适合预算旅行'
  }
];

// 文化体验数据
export const experiences = [
  {
    id: 1,
    title: '西湖文化之旅',
    location: '杭州西湖',
    price: 200,
    duration: 3,
    category: '文化',
    tags: ['西湖', '文化', '历史'],
    description: '探索西湖的历史文化，了解西湖十景的故事',
    imageUrl: '/images/experience_1.jpg',
    availableDates: ['2025-12-05', '2025-12-06', '2025-12-07'],
    maxParticipants: 15
  },
  {
    id: 2,
    title: '龙井茶采摘体验',
    location: '杭州龙井村',
    price: 300,
    duration: 4,
    category: '体验',
    tags: ['茶叶', '体验', '传统工艺'],
    description: '亲自体验采摘龙井茶的乐趣，了解龙井茶的制作过程',
    imageUrl: '/images/experience_2.jpg',
    availableDates: ['2025-12-08', '2025-12-09', '2025-12-10'],
    maxParticipants: 10
  },
  {
    id: 3,
    title: '宋城千古情演出',
    location: '杭州宋城',
    price: 320,
    duration: 2,
    category: '表演',
    tags: ['演出', '历史', '文化'],
    description: '欣赏大型实景演出《宋城千古情》，感受宋代文化的魅力',
    imageUrl: '/images/experience_3.jpg',
    availableDates: ['2025-12-05', '2025-12-06', '2025-12-07', '2025-12-08', '2025-12-09'],
    maxParticipants: 50
  },
  {
    id: 4,
    title: '丝绸制作工艺体验',
    location: '杭州丝绸博物馆',
    price: 180,
    duration: 3,
    category: '工艺',
    tags: ['丝绸', '工艺', '传统'],
    description: '了解中国丝绸的历史和制作工艺，亲手体验丝绸织造',
    imageUrl: '/images/experience_4.jpg',
    availableDates: ['2025-12-06', '2025-12-07', '2025-12-13', '2025-12-14'],
    maxParticipants: 8
  },
  {
    id: 5,
    title: '运河文化夜游',
    location: '杭州大运河',
    price: 150,
    duration: 2,
    category: '夜游',
    tags: ['运河', '夜景', '文化'],
    description: '乘坐游船夜游大运河，欣赏两岸的灯光秀和历史建筑',
    imageUrl: '/images/experience_5.jpg',
    availableDates: ['2025-12-05', '2025-12-06', '2025-12-07', '2025-12-08', '2025-12-09', '2025-12-10', '2025-12-11'],
    maxParticipants: 30
  }
];

// 景点数据
export const attractions = [
  {
    id: 1,
    name: '西湖',
    location: '杭州',
    category: '自然景观',
    description: '中国著名的风景名胜区，世界文化遗产',
    rating: 4.8,
    imageUrl: '/images/attraction_1.jpg',
    openingHours: '00:00-24:00',
    admissionFee: 0
  },
  {
    id: 2,
    name: '灵隐寺',
    location: '杭州',
    category: '宗教文化',
    description: '中国佛教古刹，有着悠久的历史和深厚的文化底蕴',
    rating: 4.7,
    imageUrl: '/images/attraction_2.jpg',
    openingHours: '07:00-18:00',
    admissionFee: 45
  },
  {
    id: 3,
    name: '千岛湖',
    location: '杭州淳安',
    category: '自然景观',
    description: '国家5A级旅游景区，以其清澈的湖水和众多的岛屿而闻名',
    rating: 4.6,
    imageUrl: '/images/attraction_3.jpg',
    openingHours: '08:00-17:00',
    admissionFee: 130
  },
  {
    id: 4,
    name: '宋城',
    location: '杭州',
    category: '主题公园',
    description: '大型宋代文化主题公园，再现了宋代的都市风貌',
    rating: 4.5,
    imageUrl: '/images/attraction_4.jpg',
    openingHours: '09:00-21:00',
    admissionFee: 310
  },
  {
    id: 5,
    name: '雷峰塔',
    location: '杭州',
    category: '历史建筑',
    description: '西湖十景之一，有着美丽的传说故事',
    rating: 4.4,
    imageUrl: '/images/attraction_5.jpg',
    openingHours: '08:00-20:30',
    admissionFee: 40
  }
];

// 实时信息数据
export const realTimeData = {
  weather: {
    temperature: 15,
    humidity: 70,
    windSpeed: 3,
    weatherType: '多云',
    forecast: [
      { date: '2025-12-05', weather: '晴', high: 18, low: 10 },
      { date: '2025-12-06', weather: '多云', high: 16, low: 9 },
      { date: '2025-12-07', weather: '小雨', high: 14, low: 8 }
    ]
  },
  crowdLevel: {
    '西湖': '中等',
    '灵隐寺': '高',
    '千岛湖': '低',
    '宋城': '中等',
    '雷峰塔': '高'
  },
  traffic: {
    '西湖景区': '拥堵',
    '灵隐寺': '繁忙',
    '千岛湖': '畅通',
    '宋城': '繁忙',
    '雷峰塔': '拥堵'
  },
  airQuality: {
    aqi: 75,
    level: '良',
    pm25: 45,
    pm10: 68
  }
};
