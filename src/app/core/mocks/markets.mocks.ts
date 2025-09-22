// core/mocks/markets.mocks.ts
export const marketsMocks = {
  title: ['მარკეტები', 'Markets', 'Магазины'],
  subtitle: [
    'აღმოაჩინეთ ყველა სასურსათო მაღაზია თქვენს ქალაქში',
    'Discover all grocery stores in your city',
    'Откройте для себя все продуктовые магазины в вашем городе'
  ],
  searchPlaceholder: ['მოძებნეთ მარკეტი...', 'Search for a market...', 'Искать магазин...'],
  noResultsMessage: ['მარკეტი ვერ მოიძებნა', 'No markets found', 'Магазины не найдены'],
  filters: {
    city: ['ქალაქი', 'City', 'Город'],
    rating: ['რეიტინგი', 'Rating', 'Рейтинг']
  },
  stores: [
    {
      name: ['Spar', 'Spar', 'Spar'],
      image: 'spar.png',
      rating: 4.5,
      delivery: true,
      locations: 16,
      address: ['Business Average 12', 'Business Average 12', 'Business Average 12']
    },
    {
      name: ['Magniti', 'Magniti', 'Magniti'],
      image: 'magniti.png',
      rating: 4.2,
      delivery: true,
      locations: 14,
      address: ['Patent Avenue 5', 'Patent Avenue 5', 'Patent Avenue 5']
    },
    {
      name: ['Nikora', 'Nikora', 'Никора'],
      image: 'nikora.png',
      rating: 4.0,
      delivery: false,
      locations: 12,
      address: ['Vista-Pitravels 45', 'Vista-Pitravels 45', 'Vista-Pitravels 45']
    },
    {
      name: ['Carrefour', 'Carrefour', 'Карфур'],
      image: 'carrefour.png',
      rating: 4.3,
      delivery: true,
      locations: 8,
      address: ['City Mall', 'City Mall', 'Сити Молл']
    },
    {
      name: ['Agrohub', 'Agrohub', 'Агрохаб'],
      image: 'agrohub.png',
      rating: 3.8,
      delivery: false,
      locations: 5,
      address: ['Farmers Street 3', 'Farmers Street 3', 'Фермерская улица 3']
    },
    {
      name: ['2nabiji', '2nabiji', '2набижи'],
      image: '2nabiji.png',
      rating: 3.5,
      delivery: true,
      locations: 7,
      address: ['Downtown 22', 'Downtown 22', 'Центр 22']
    },
    {
      name: ['Zgapari', 'Zgapari', 'Згапари'],
      image: 'zgapari.jpg',
      rating: 4.1,
      delivery: false,
      locations: 9,
      address: ['Old Town 7', 'Old Town 7', 'Старый город 7']
    }
  ],
  labels: {
    delivery: ['მიტანა', 'Delivery', 'Доставка'],
    locations: ['ლოკაცია', 'locations', 'локаций'],
    viewStore: ['ნახეთ მაღაზია', 'View Store', 'Посмотреть магазин']
  },
  cities: [
    ['თბილისი', 'Tbilisi', 'Тбилиси'],
    ['ბათუმი', 'Batumi', 'Батуми'],
    ['ქუთაისი', 'Kutaisi', 'Кутаиси']
  ]
};