// core/mocks/products.mocks.ts
export const productsMocks = {
    searchPlaceholder: ['ძიება...', 'Search...', 'Поиск...'],
    noResults: ['პროდუქტი ვერ მოიძებნა', 'No products found', 'Товар не найден'],
    categories: [
        { 
            id: 'dairy', 
            name: ['რძის პროდუქტები', 'Dairy', 'Молочные продукты'],
            icon: 'dairy.png'
        },
        { 
            id: 'meat', 
            name: ['ხორცი', 'Meat', 'Мясо'],
            icon: 'meat.png'
        },
        { 
            id: 'bakery', 
            name: ['ცომეული', 'Bakery', 'Выпечка'],
            icon: 'bakery.png'
        },
        { 
            id: 'beverages', 
            name: ['სასმელები', 'Beverages', 'Напитки'],
            icon: 'beverages.png'
        },
        { 
            id: 'fruits', 
            name: ['ხილი', 'Fruits', 'Фрукты'],
            icon: 'fruits.png'
        }
    ],
    products: [
        {
            id: 1,
            name: ['პური', 'Bread', 'Хлеб'],
            image: 'bread.jpg',
            category: 'bakery',
            description: [
                'ახალი ხორბლის პური',
                'Fresh wheat bread',
                'Свежий пшеничный хлеб'
            ],
            prices: [
                { market: 'Spar', price: 1.20, discount: 0, history: [1.20, 1.25, 1.15] },
                { market: 'Magniti', price: 1.10, discount: 0.05, history: [1.10, 1.15, 1.05] },
                { market: 'Nikora', price: 1.30, discount: 0, history: [1.30, 1.35, 1.25] }
            ],
            reviews: [
                { 
                    user: 'გიორგი', 
                    rating: 4, 
                    comment: ['კარგი ხარისხი', 'Good quality', 'Хорошее качество'],
                    date: '2023-05-15'
                },
                { 
                    user: 'მარიამი', 
                    rating: 5, 
                    comment: ['ძალიან გემრიელი', 'Very tasty', 'Очень вкусный'],
                    date: '2023-06-20'
                }
            ],
            nutrition: {
                calories: 265,
                protein: 9,
                carbs: 49,
                fat: 3.2
            }
        },
        {
            id: 2,
            name: ['რძე', 'Milk', 'Молоко'],
            image: 'milk.jpg',
            category: 'dairy',
            description: [
                'ახალი ძროხის რძე 3.2%',
                'Fresh cow milk 3.2%',
                'Свежее коровье молоко 3.2%'
            ],
            prices: [
                { market: 'Spar', price: 2.50, discount: 0, history: [2.50, 2.55, 2.45] },
                { market: 'Magniti', price: 2.40, discount: 0, history: [2.40, 2.45, 2.35] },
                { market: 'Carrefour', price: 2.60, discount: 0.10, history: [2.60, 2.65, 2.55] }
            ],
            reviews: [
                { 
                    user: 'ნინო', 
                    rating: 4, 
                    comment: ['კარგია', 'Good', 'Хорошее'],
                    date: '2023-04-10'
                }
            ],
            nutrition: {
                calories: 60,
                protein: 3.2,
                carbs: 4.8,
                fat: 3.2
            }
        },
        // 3-30: 28 more products, 5 per category, with unique names and details
        {
            id: 3,
            name: ['ყველი', 'Cheese', 'Сыр'],
            image: 'cheese.jpg',
            category: 'dairy',
            description: [
                'ქართული სულგუნი',
                'Georgian Sulguni cheese',
                'Грузинский сулугуни'
            ],
            prices: [
                { market: 'Spar', price: 4.50, discount: 0.20, history: [4.50, 4.70, 4.30] },
                { market: 'Magniti', price: 4.40, discount: 0, history: [4.40, 4.60, 4.20] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['საუკეთესო', 'Best', 'Лучший'], date: '2023-05-10' }
            ],
            nutrition: { calories: 280, protein: 18, carbs: 2, fat: 22 }
        },
        {
            id: 4,
            name: ['იოგურტი', 'Yogurt', 'Йогурт'],
            image: 'yogurt.jpg',
            category: 'dairy',
            description: [
                'ბიო იოგურტი',
                'Bio yogurt',
                'Био йогурт'
            ],
            prices: [
                { market: 'Carrefour', price: 1.80, discount: 0, history: [1.80, 1.85, 1.75] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 4, comment: ['სასიამოვნო გემო', 'Nice taste', 'Приятный вкус'], date: '2023-06-01' }
            ],
            nutrition: { calories: 59, protein: 3.5, carbs: 5, fat: 2.5 }
        },
        {
            id: 5,
            name: ['კარაქი', 'Butter', 'Масло'],
            image: 'butter.jpg',
            category: 'dairy',
            description: [
                'ნატურალური კარაქი',
                'Natural butter',
                'Натуральное масло'
            ],
            prices: [
                { market: 'Spar', price: 3.20, discount: 0, history: [3.20, 3.25, 3.10] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['სუფთა', 'Pure', 'Чистое'], date: '2023-07-12' }
            ],
            nutrition: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 }
        },
        {
            id: 6,
            name: ['მაწონი', 'Matsoni', 'Мацони'],
            image: 'matsoni.jpg',
            category: 'dairy',
            description: [
                'ქართული მაწონი',
                'Georgian Matsoni',
                'Грузинский мацони'
            ],
            prices: [
                { market: 'Magniti', price: 1.50, discount: 0, history: [1.50, 1.55, 1.45] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['სასარგებლო', 'Healthy', 'Полезно'], date: '2023-05-22' }
            ],
            nutrition: { calories: 61, protein: 3.3, carbs: 4.7, fat: 3.2 }
        },
        {
            id: 7,
            name: ['ყველი იმერული', 'Imeruli Cheese', 'Имеретинский сыр'],
            image: 'imeruli_cheese.jpg',
            category: 'dairy',
            description: [
                'იმერული ახალი ყველი',
                'Fresh Imeruli cheese',
                'Свежий имеретинский сыр'
            ],
            prices: [
                { market: 'Agrohub', price: 5.00, discount: 0.10, history: [5.00, 5.10, 4.90] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-06-18' }
            ],
            nutrition: { calories: 260, protein: 17, carbs: 2, fat: 20 }
        },
        {
            id: 8,
            name: ['საქონლის ხორცი', 'Beef', 'Говядина'],
            image: 'beef.jpg',
            category: 'meat',
            description: [
                'ახალი საქონლის ხორცი',
                'Fresh beef',
                'Свежая говядина'
            ],
            prices: [
                { market: 'Spar', price: 8.50, discount: 0, history: [8.50, 8.60, 8.40] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 4, comment: ['კარგი', 'Good', 'Хорошо'], date: '2023-07-01' }
            ],
            nutrition: { calories: 250, protein: 26, carbs: 0, fat: 17 }
        },
        {
            id: 9,
            name: ['ღორის ხორცი', 'Pork', 'Свинина'],
            image: 'pork.jpg',
            category: 'meat',
            description: [
                'ახალი ღორის ხორცი',
                'Fresh pork',
                'Свежая свинина'
            ],
            prices: [
                { market: 'Magniti', price: 7.80, discount: 0, history: [7.80, 7.90, 7.70] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['სასარგებლო', 'Healthy', 'Полезно'], date: '2023-06-15' }
            ],
            nutrition: { calories: 270, protein: 25, carbs: 0, fat: 20 }
        },
        {
            id: 10,
            name: ['ქათმის ფილე', 'Chicken Fillet', 'Куриное филе'],
            image: 'chicken_fillet.jpg',
            category: 'meat',
            description: [
                'ახალი ქათმის ფილე',
                'Fresh chicken fillet',
                'Свежая куриная грудка'
            ],
            prices: [
                { market: 'Carrefour', price: 6.20, discount: 0.20, history: [6.20, 6.30, 6.10] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['სუფთა', 'Clean', 'Чистое'], date: '2023-07-10' }
            ],
            nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
        },
        {
            id: 11,
            name: ['ძეხვი', 'Sausage', 'Колбаса'],
            image: 'sausage.jpg',
            category: 'meat',
            description: [
                'სასადილო ძეხვი',
                'Breakfast sausage',
                'Завтрачная колбаса'
            ],
            prices: [
                { market: 'Nikora', price: 5.50, discount: 0, history: [5.50, 5.60, 5.40] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-06-25' }
            ],
            nutrition: { calories: 301, protein: 12, carbs: 2, fat: 27 }
        },
        {
            id: 12,
            name: ['ქათმის ბარკალი', 'Chicken Drumstick', 'Куриная ножка'],
            image: 'chicken_drumstick.jpg',
            category: 'meat',
            description: [
                'ახალი ქათმის ბარკალი',
                'Fresh chicken drumstick',
                'Свежая куриная ножка'
            ],
            prices: [
                { market: 'Spar', price: 5.80, discount: 0, history: [5.80, 5.90, 5.70] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['სასარგებლო', 'Healthy', 'Полезно'], date: '2023-07-08' }
            ],
            nutrition: { calories: 180, protein: 18, carbs: 0, fat: 12 }
        },
        {
            id: 13,
            name: ['კრუასანი', 'Croissant', 'Круассан'],
            image: 'croissant.jpg',
            category: 'bakery',
            description: [
                'ფრანგული კრუასანი',
                'French croissant',
                'Французский круассан'
            ],
            prices: [
                { market: 'Carrefour', price: 1.50, discount: 0, history: [1.50, 1.55, 1.45] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['ფაფუკი', 'Fluffy', 'Пышный'], date: '2023-06-30' }
            ],
            nutrition: { calories: 406, protein: 8, carbs: 45, fat: 21 }
        },
        {
            id: 14,
            name: ['ბაგეტი', 'Baguette', 'Багет'],
            image: 'baguette.jpg',
            category: 'bakery',
            description: [
                'ფრანგული ბაგეტი',
                'French baguette',
                'Французский багет'
            ],
            prices: [
                { market: 'Spar', price: 1.30, discount: 0, history: [1.30, 1.35, 1.25] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 4, comment: ['კარგი', 'Good', 'Хорошо'], date: '2023-07-03' }
            ],
            nutrition: { calories: 270, protein: 9, carbs: 56, fat: 0.5 }
        },
        {
            id: 15,
            name: ['ბისკვიტი', 'Biscuit', 'Бисквит'],
            image: 'biscuit.jpg',
            category: 'bakery',
            description: [
                'ტკბილი ბისკვიტი',
                'Sweet biscuit',
                'Сладкий бисквит'
            ],
            prices: [
                { market: 'Magniti', price: 0.90, discount: 0, history: [0.90, 0.95, 0.85] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-11' }
            ],
            nutrition: { calories: 430, protein: 6, carbs: 70, fat: 15 }
        },
        {
            id: 16,
            name: ['ფუნთუშა', 'Bun', 'Булочка'],
            image: 'bun.jpg',
            category: 'bakery',
            description: [
                'ტკბილი ფუნთუშა',
                'Sweet bun',
                'Сладкая булочка'
            ],
            prices: [
                { market: 'Nikora', price: 1.10, discount: 0, history: [1.10, 1.15, 1.05] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['ფაფუკი', 'Fluffy', 'Пышный'], date: '2023-07-13' }
            ],
            nutrition: { calories: 350, protein: 7, carbs: 60, fat: 10 }
        },
        {
            id: 17,
            name: ['კექსი', 'Cupcake', 'Кекс'],
            image: 'cupcake.jpg',
            category: 'bakery',
            description: [
                'შოკოლადის კექსი',
                'Chocolate cupcake',
                'Шоколадный кекс'
            ],
            prices: [
                { market: 'Carrefour', price: 1.70, discount: 0, history: [1.70, 1.75, 1.65] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-14' }
            ],
            nutrition: { calories: 390, protein: 5, carbs: 60, fat: 15 }
        },
        {
            id: 18,
            name: ['წვენი', 'Juice', 'Сок'],
            image: 'juice.jpg',
            category: 'beverages',
            description: [
                'ფორთოხლის წვენი',
                'Orange juice',
                'Апельсиновый сок'
            ],
            prices: [
                { market: 'Spar', price: 2.00, discount: 0, history: [2.00, 2.05, 1.95] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['სასარგებლო', 'Healthy', 'Полезно'], date: '2023-07-15' }
            ],
            nutrition: { calories: 45, protein: 0.7, carbs: 10, fat: 0.2 }
        },
        {
            id: 19,
            name: ['კოლა', 'Cola', 'Кола'],
            image: 'cola.jpg',
            category: 'beverages',
            description: [
                'გაზიანი სასმელი',
                'Carbonated drink',
                'Газированный напиток'
            ],
            prices: [
                { market: 'Magniti', price: 1.20, discount: 0, history: [1.20, 1.25, 1.15] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 3, comment: ['ტკბილი', 'Sweet', 'Сладко'], date: '2023-07-16' }
            ],
            nutrition: { calories: 42, protein: 0, carbs: 11, fat: 0 }
        },
        {
            id: 20,
            name: ['ლიმონათი', 'Lemonade', 'Лимонад'],
            image: 'lemonade.jpg',
            category: 'beverages',
            description: [
                'ქართული ლიმონათი',
                'Georgian lemonade',
                'Грузинский лимонад'
            ],
            prices: [
                { market: 'Carrefour', price: 1.50, discount: 0, history: [1.50, 1.55, 1.45] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 4, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-17' }
            ],
            nutrition: { calories: 38, protein: 0, carbs: 10, fat: 0 }
        },
        {
            id: 21,
            name: ['ყავა', 'Coffee', 'Кофе'],
            image: 'coffee.jpg',
            category: 'beverages',
            description: [
                'დაფქული ყავა',
                'Ground coffee',
                'Молотый кофе'
            ],
            prices: [
                { market: 'Nikora', price: 3.50, discount: 0, history: [3.50, 3.55, 3.45] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 5, comment: ['სურნელოვანი', 'Aromatic', 'Ароматный'], date: '2023-07-18' }
            ],
            nutrition: { calories: 2, protein: 0.3, carbs: 0, fat: 0 }
        },
        {
            id: 22,
            name: ['ჩაი', 'Tea', 'Чай'],
            image: 'tea.jpg',
            category: 'beverages',
            description: [
                'შავი ჩაი',
                'Black tea',
                'Чёрный чай'
            ],
            prices: [
                { market: 'Agrohub', price: 2.80, discount: 0, history: [2.80, 2.85, 2.75] }
            ],
            reviews: [
                { user: 'ნინო', rating: 4, comment: ['სასიამოვნო', 'Pleasant', 'Приятно'], date: '2023-07-19' }
            ],
            nutrition: { calories: 1, protein: 0, carbs: 0, fat: 0 }
        },
        {
            id: 23,
            name: ['ვაშლი', 'Apple', 'Яблоко'],
            image: 'apple.jpg',
            category: 'fruits',
            description: [
                'წითელი ვაშლი',
                'Red apple',
                'Красное яблоко'
            ],
            prices: [
                { market: 'Spar', price: 1.80, discount: 0, history: [1.80, 1.85, 1.75] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['სასარგებლო', 'Healthy', 'Полезно'], date: '2023-07-20' }
            ],
            nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 }
        },
        {
            id: 24,
            name: ['ბანანი', 'Banana', 'Банан'],
            image: 'banana.jpg',
            category: 'fruits',
            description: [
                'სასარგებლო ბანანი',
                'Healthy banana',
                'Полезный банан'
            ],
            prices: [
                { market: 'Magniti', price: 2.20, discount: 0, history: [2.20, 2.25, 2.15] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 4, comment: ['ტკბილი', 'Sweet', 'Сладко'], date: '2023-07-21' }
            ],
            nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 }
        },
        {
            id: 25,
            name: ['ფორთოხალი', 'Orange', 'Апельсин'],
            image: 'orange.jpg',
            category: 'fruits',
            description: [
                'სასარგებლო ფორთოხალი',
                'Healthy orange',
                'Полезный апельсин'
            ],
            prices: [
                { market: 'Carrefour', price: 2.00, discount: 0, history: [2.00, 2.05, 1.95] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-22' }
            ],
            nutrition: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 }
        },
        {
            id: 26,
            name: ['მსხალი', 'Pear', 'Груша'],
            image: 'pear.jpg',
            category: 'fruits',
            description: [
                'სასარგებლო მსხალი',
                'Healthy pear',
                'Полезная груша'
            ],
            prices: [
                { market: 'Nikora', price: 2.10, discount: 0, history: [2.10, 2.15, 2.05] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['სასიამოვნო', 'Pleasant', 'Приятно'], date: '2023-07-23' }
            ],
            nutrition: { calories: 57, protein: 0.4, carbs: 15, fat: 0.1 }
        },
        {
            id: 27,
            name: ['კივი', 'Kiwi', 'Киви'],
            image: 'kiwi.jpg',
            category: 'fruits',
            description: [
                'სასარგებლო კივი',
                'Healthy kiwi',
                'Полезное киви'
            ],
            prices: [
                { market: 'Agrohub', price: 2.50, discount: 0, history: [2.50, 2.55, 2.45] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-24' }
            ],
            nutrition: { calories: 41, protein: 0.8, carbs: 10, fat: 0.4 }
        },
        {
            id: 28,
            name: ['ყურძენი', 'Grapes', 'Виноград'],
            image: 'grapes.jpg',
            category: 'fruits',
            description: [
                'თეთრი ყურძენი',
                'White grapes',
                'Белый виноград'
            ],
            prices: [
                { market: 'Spar', price: 3.00, discount: 0, history: [3.00, 3.05, 2.95] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['ტკბილი', 'Sweet', 'Сладко'], date: '2023-07-25' }
            ],
            nutrition: { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 }
        },
        {
            id: 29,
            name: ['ატამი', 'Peach', 'Персик'],
            image: 'peach.jpg',
            category: 'fruits',
            description: [
                'სასარგებლო ატამი',
                'Healthy peach',
                'Полезный персик'
            ],
            prices: [
                { market: 'Magniti', price: 2.80, discount: 0, history: [2.80, 2.85, 2.75] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 5, comment: ['სასიამოვნო', 'Pleasant', 'Приятно'], date: '2023-07-26' }
            ],
            nutrition: { calories: 39, protein: 0.9, carbs: 10, fat: 0.3 }
        },
        {
            id: 30,
            name: ['წყალი', 'Water', 'Вода'],
            image: 'water.jpg',
            category: 'beverages',
            description: [
                'ბუნებრივი მინერალური წყალი',
                'Natural mineral water',
                'Природная минеральная вода'
            ],
            prices: [
                { market: 'Spar', price: 0.80, discount: 0, history: [0.80, 0.85, 0.75] },
                { market: 'Magniti', price: 0.75, discount: 0, history: [0.75, 0.80, 0.70] },
                { market: 'Agrohub', price: 0.90, discount: 0, history: [0.90, 0.95, 0.85] }
            ],
            reviews: [
                { 
                    user: 'ლევანი', 
                    rating: 5, 
                    comment: ['შესანიშნავი', 'Excellent', 'Отлично'],
                    date: '2023-07-05'
                }
            ],
            nutrition: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            }
        }
    ],
    cart: {
        title: ['კალათა', 'Cart', 'Корзина'],
        emptyMessage: ['კალათა ცარიელია', 'Cart is empty', 'Корзина пуста'],
        total: ['ჯამი', 'Total', 'Итого'],
        remove: ['წაშლა', 'Remove', 'Удалить'],
        checkout: ['გადახდა', 'Checkout', 'Оплатить']
    }
};