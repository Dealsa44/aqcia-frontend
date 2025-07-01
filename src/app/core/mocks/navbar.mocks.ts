// core/mocks/navbar.mocks.ts
export const navbarMocks = {
  logo: ['GroceryCompare', 'GroceryCompare', 'GroceryCompare'],
  items: [
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
      path: 'login',
      authState: 'loggedOut' // Add this to identify login state
    },
    { 
      titles: ['პროფილი', 'Profile', 'Профиль'],
      path: 'profile',
      authState: 'loggedIn' // Add this to identify logged in state
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