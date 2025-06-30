// core/mocks/navbar.mocks.ts
export const navbarMocks = {
  logo: ['GroceryCompare', 'GroceryCompare', 'GroceryCompare'],
  items: [
    { 
      titles: ['მთავარი', 'Home', 'Главная'],
      path: 'home'
    },
    { 
      titles: ['მარკეტები', 'Markets', 'Магазины'],
      path: 'markets'
    },
    { 
      titles: ['ძიება', 'Search', 'Поиск'],
      path: 'search'
    },
    { 
      titles: ['შესვლა', 'Login', 'Войти'],
      path: 'login'
    }
  ],
  languages: [
    { code: 'ka', name: ['ქართული', 'Georgian', 'Грузинский'] },
    { code: 'en', name: ['English', 'English', 'Английский'] },
    { code: 'ru', name: ['Русский', 'Russian', 'Русский'] }
  ],
  cities: [
    { name: ['თბილისი', 'Tbilisi', 'Тбилиси'] },
    { name: ['ბათუმი', 'Batumi', 'Батуми'] },
    { name: ['ქუთაისი', 'Kutaisi', 'Кутаиси'] }
  ],
  cart: {
    icon: 'shopping-cart',
    title: ['კალათა', 'Cart', 'Корзина']
  }
};