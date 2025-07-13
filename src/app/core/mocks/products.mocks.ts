// core/mocks/products.mocks.ts
export const productsMocks = {
    searchPlaceholder: ['ძიება...', 'Search...', 'Поиск...'],
    noResults: ['პროდუქტი ვერ მოიძებნა', 'No products found', 'Товар не найден'],
    categories: [
        {
            id: 'dairy',
            name: ['რძის პროდუქტები', 'Dairy', 'Молочные продукты'],
            icon: 'dairy.jpg'
        },
        {
            id: 'meat',
            name: ['ხორცი', 'Meat', 'Мясо'],
            icon: 'meat.jpg'
        },
        {
            id: 'bakery',
            name: ['ცომეული', 'Bakery', 'Выпечка'],
            icon: 'bakery.jpg'
        },
        {
            id: 'beverages',
            name: ['სასმელები', 'Beverages', 'Напитки'],
            icon: 'beverages.jpg'
        },
        {
            id: 'fruits',
            name: ['ხილი', 'Fruits', 'Фрукты'],
            icon: 'fruits.jpg'
        },
        {
            id: 'vegetables',
            name: ['ბოსტნეული', 'Vegetables', 'Овощи'],
            icon: 'vegetables.jpg'
        },
        {
            id: 'snacks',
            name: ['სნექები', 'Snacks', 'Закуски'],
            icon: 'snacks.jpg'
        },
        {
            id: 'frozen',
            name: ['გაყინული', 'Frozen', 'Замороженные'],
            icon: 'frozen.jpg'
        },
        {
            id: 'cleaning',
            name: ['საყოფაცხოვრებო', 'Cleaning', 'Бытовая химия'],
            icon: 'cleaning.jpg'
        },
        {
            id: 'alcohol',
            name: ['ალკოჰოლი', 'Alcohol', 'Алкоголь'],
            icon: 'alcohol.jpg'
        },
        {
            id: 'health',
            name: ['ჯანმრთელობა', 'Health', 'Здоровье'],
            icon: 'health.jpg'
        }
    ],
    products: [
        {
            id: 2,
            name: ['რძე', 'Milk', 'Молоко'],
            image: 'milk.jpg',
            category: 'dairy',
            description: [
                'ახალი ძროხის რძე 3.2% ცხიმიანობით, მდიდარია კალციუმით',
                'Fresh cow milk with 3.2% fat, rich in calcium',
                'Свежее коровье молоко 3.2% жирности, богатое кальцием'
            ],
            prices: [
                { market: 'Spar', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Magniti', price: 2.48, discount: 0, history: [2.48, 2.40, 2.50] },
                { market: 'Carrefour', price: 2.62, discount: 0.10, history: [2.62, 2.60, 2.65] },
                { market: 'Nikora', price: 2.58, discount: 0, history: [2.58, 2.55, 2.60] },
                { market: 'Agrohub', price: 2.45, discount: 0, history: [2.45, 2.40, 2.50] },
                { market: '2nabiji', price: 2.50, discount: 0.05, history: [2.50, 2.45, 2.55] },
                { market: 'Zgapari', price: 2.60, discount: 0, history: [2.60, 2.55, 2.65] }
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
        {
            id: 4,
            name: ['იოგურტი', 'Yogurt', 'Йогурт'],
            image: 'yogurt.jpg',
            category: 'dairy',
            description: [
                'ბიო იოგურტი, უშაქრო, მდიდარი პრობიოტიკებით',
                'Bio yogurt, sugar-free, rich in probiotics',
                'Био йогурт, без сахара, богат пробиотиками'
            ],
            prices: [
                { market: 'Carrefour', price: 1.85, discount: 0, history: [1.85, 1.80, 1.90] },
                { market: 'Nikora', price: 1.90, discount: 0, history: [1.90, 1.85, 1.95] },
                { market: '2nabiji', price: 1.75, discount: 0, history: [1.75, 1.70, 1.80] },
                { market: 'Zgapari', price: 1.88, discount: 0.05, history: [1.88, 1.85, 1.90] }
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
                'ნატურალური კარაქი 82% ცხიმიანობით, საუკეთესო საცხობად',
                'Natural butter with 82% fat, best for baking',
                'Натуральное масло 82% жирности, отлично подходит для выпечки'
            ],
            prices: [
                { market: 'Spar', price: 3.25, discount: 0, history: [3.25, 3.20, 3.30] },
                { market: 'Magniti', price: 3.18, discount: 0, history: [3.18, 3.15, 3.20] },
                { market: 'Agrohub', price: 3.10, discount: 0, history: [3.10, 3.05, 3.15] },
                { market: 'Carrefour', price: 3.30, discount: 0.10, history: [3.30, 3.25, 3.35] }
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
                'ქართული მაწონი, ტრადიციული ფერმენტირებული რძის პროდუქტი',
                'Georgian Matsoni, traditional fermented milk product',
                'Грузинский мацони, традиционный кисломолочный продукт'
            ],
            prices: [
                { market: 'Magniti', price: 1.55, discount: 0, history: [1.55, 1.50, 1.60] },
                { market: 'Nikora', price: 1.60, discount: 0, history: [1.60, 1.55, 1.65] },
                { market: 'Agrohub', price: 1.48, discount: 0, history: [1.48, 1.45, 1.50] },
                { market: '2nabiji', price: 1.52, discount: 0, history: [1.52, 1.48, 1.55] }
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
                'იმერული ახალი ყველი, იდეალური ხაჭაპურისთვის',
                'Fresh Imeruli cheese, ideal for Khachapuri',
                'Свежий имеретинский сыр, идеален для хачапури'
            ],
            prices: [
                { market: 'Agrohub', price: 5.10, discount: 0.10, history: [5.10, 5.00, 5.20] },
                { market: 'Spar', price: 5.20, discount: 0, history: [5.20, 5.15, 5.25] },
                { market: 'Magniti', price: 5.05, discount: 0, history: [5.05, 5.00, 5.10] },
                { market: 'Carrefour', price: 5.25, discount: 0, history: [5.25, 5.20, 5.30] }
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
                'ახალი საქონლის ხორცი, უცხიმო და ნაზი',
                'Fresh beef, lean and tender',
                'Свежая говядина, постная и нежная'
            ],
            prices: [
                { market: 'Spar', price: 8.60, discount: 0, history: [8.60, 8.50, 8.70] },
                { market: 'Magniti', price: 8.55, discount: 0, history: [8.55, 8.50, 8.60] },
                { market: 'Agrohub', price: 8.40, discount: 0.05, history: [8.40, 8.35, 8.45] },
                { market: 'Carrefour', price: 8.70, discount: 0, history: [8.70, 8.65, 8.75] }
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
                'ახალი ღორის ხორცი, იდეალურია წვნიანებისთვის',
                'Fresh pork, ideal for stews',
                'Свежая свинина, идеальна для супов'
            ],
            prices: [
                { market: 'Magniti', price: 7.85, discount: 0, history: [7.85, 7.80, 7.90] },
                { market: 'Nikora', price: 7.90, discount: 0, history: [7.90, 7.85, 7.95] },
                { market: '2nabiji', price: 7.75, discount: 0, history: [7.75, 7.70, 7.80] }
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
                'ახალი ქათმის ფილე, მაღალი ცილის შემცველობით',
                'Fresh chicken fillet, high in protein',
                'Свежее куриное филе, с высоким содержанием белка'
            ],
            prices: [
                { market: 'Carrefour', price: 6.25, discount: 0.20, history: [6.25, 6.20, 6.30] },
                { market: 'Spar', price: 6.30, discount: 0, history: [6.30, 6.25, 6.35] },
                { market: 'Magniti', price: 6.18, discount: 0, history: [6.18, 6.15, 6.20] },
                { market: 'Agrohub', price: 6.10, discount: 0, history: [6.10, 6.05, 6.15] }
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
                'სასადილო ძეხვი, სწრაფი საუზმისთვის',
                'Breakfast sausage, for a quick breakfast',
                'Завтрачная колбаса, для быстрого завтрака'
            ],
            prices: [
                { market: 'Nikora', price: 5.55, discount: 0, history: [5.55, 5.50, 5.60] },
                { market: 'Carrefour', price: 5.60, discount: 0, history: [5.60, 5.55, 5.65] },
                { market: '2nabiji', price: 5.48, discount: 0, history: [5.48, 5.45, 5.50] }
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
                'ახალი ქათმის ბარკალი, ადვილად მოსამზადებელი',
                'Fresh chicken drumstick, easy to cook',
                'Свежая куриная ножка, легко готовить'
            ],
            prices: [
                { market: 'Spar', price: 5.85, discount: 0, history: [5.85, 5.80, 5.90] },
                { market: 'Magniti', price: 5.78, discount: 0, history: [5.78, 5.75, 5.80] },
                { market: 'Agrohub', price: 5.70, discount: 0, history: [5.70, 5.65, 5.75] },
                { market: 'Zgapari', price: 5.90, discount: 0.05, history: [5.90, 5.85, 5.95] }
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
                'ფრანგული კრუასანი, ნაზი და ხრაშუნა',
                'French croissant, soft and crispy',
                'Французский круассан, нежный и хрустящий'
            ],
            prices: [
                { market: 'Carrefour', price: 1.55, discount: 0, history: [1.55, 1.50, 1.60] },
                { market: 'Nikora', price: 1.60, discount: 0, history: [1.60, 1.55, 1.65] },
                { market: 'Spar', price: 1.52, discount: 0, history: [1.52, 1.48, 1.55] }
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
                'ფრანგული ბაგეტი, იდეალური სენდვიჩებისთვის',
                'French baguette, ideal for sandwiches',
                'Французский багет, идеален для бутербродов'
            ],
            prices: [
                { market: 'Spar', price: 1.35, discount: 0, history: [1.35, 1.30, 1.40] },
                { market: 'Magniti', price: 1.28, discount: 0, history: [1.28, 1.25, 1.30] },
                { market: 'Agrohub', price: 1.20, discount: 0, history: [1.20, 1.18, 1.25] }
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
                'ტკბილი ბისკვიტი, ჩაისთან ერთად',
                'Sweet biscuit, perfect with tea',
                'Сладкий бисквит, к чаю'
            ],
            prices: [
                { market: 'Magniti', price: 0.95, discount: 0, history: [0.95, 0.90, 1.00] },
                { market: 'Carrefour', price: 1.00, discount: 0, history: [1.00, 0.95, 1.05] },
                { market: 'Nikora', price: 1.02, discount: 0.05, history: [1.02, 1.00, 1.05] }
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
                'ტკბილი ფუნთუშა, ჯემით ან შოკოლადით',
                'Sweet bun, with jam or chocolate',
                'Сладкая булочка, с джемом или шоколадом'
            ],
            prices: [
                { market: 'Nikora', price: 1.15, discount: 0, history: [1.15, 1.10, 1.20] },
                { market: '2nabiji', price: 1.10, discount: 0, history: [1.10, 1.05, 1.15] },
                { market: 'Zgapari', price: 1.18, discount: 0, history: [1.18, 1.15, 1.20] }
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
                'შოკოლადის კექსი, ნაზი და ჰაეროვანი',
                'Chocolate cupcake, tender and airy',
                'Шоколадный кекс, нежный и воздушный'
            ],
            prices: [
                { market: 'Carrefour', price: 1.75, discount: 0, history: [1.75, 1.70, 1.80] },
                { market: 'Magniti', price: 1.70, discount: 0.05, history: [1.70, 1.65, 1.75] },
                { market: 'Agrohub', price: 1.65, discount: 0, history: [1.65, 1.60, 1.70] },
                { market: 'Spar', price: 1.72, discount: 0, history: [1.72, 1.70, 1.75] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусно'], date: '2023-07-14' }
            ],
            nutrition: { calories: 390, protein: 5, carbs: 60, fat: 15 }
        },
        {
            id: 19,
            name: ['კოლა', 'Cola', 'Кола'],
            image: 'cola.jpg',
            category: 'beverages',
            description: [
                'გაზიანი სასმელი, გამაგრილებელი',
                'Carbonated drink, refreshing',
                'Газированный напиток, освежающий'
            ],
            prices: [
                { market: 'Magniti', price: 1.25, discount: 0, history: [1.25, 1.20, 1.30] },
                { market: 'Carrefour', price: 1.30, discount: 0, history: [1.30, 1.25, 1.35] },
                { market: 'Nikora', price: 1.28, discount: 0, history: [1.28, 1.25, 1.30] },
                { market: '2nabiji', price: 1.22, discount: 0, history: [1.22, 1.20, 1.25] }
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
                'ქართული ლიმონათი, ტრადიციული გემოთი',
                'Georgian lemonade, with a traditional taste',
                'Грузинский лимонад, с традиционным вкусом'
            ],
            prices: [
                { market: 'Carrefour', price: 1.55, discount: 0, history: [1.55, 1.50, 1.60] },
                { market: 'Spar', price: 1.58, discount: 0, history: [1.58, 1.55, 1.60] },
                { market: 'Magniti', price: 1.50, discount: 0, history: [1.50, 1.45, 1.55] },
                { market: 'Zgapari', price: 1.60, discount: 0.05, history: [1.60, 1.55, 1.65] }
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
                'დაფქული ყავა, ძლიერი არომატით',
                'Ground coffee, with a strong aroma',
                'Молотый кофе, с сильным ароматом'
            ],
            prices: [
                { market: 'Nikora', price: 3.55, discount: 0, history: [3.55, 3.50, 3.60] },
                { market: 'Agrohub', price: 3.48, discount: 0, history: [3.48, 3.45, 3.50] },
                { market: '2nabiji', price: 3.50, discount: 0, history: [3.50, 3.45, 3.55] }
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
                'შავი ჩაი, კლასიკური გემო',
                'Black tea, classic taste',
                'Чёрный чай, классический вкус'
            ],
            prices: [
                { market: 'Agrohub', price: 2.85, discount: 0, history: [2.85, 2.80, 2.90] },
                { market: 'Spar', price: 2.90, discount: 0, history: [2.90, 2.85, 2.95] },
                { market: 'Magniti', price: 2.80, discount: 0, history: [2.80, 2.75, 2.85] },
                { market: 'Carrefour', price: 2.92, discount: 0, history: [2.92, 2.90, 2.95] }
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
                'წითელი ვაშლი, ტკბილი და წვნიანი',
                'Red apple, sweet and juicy',
                'Красное яблоко, сладкое и сочное'
            ],
            prices: [
                { market: 'Spar', price: 1.85, discount: 0, history: [1.85, 1.80, 1.90] },
                { market: 'Magniti', price: 1.78, discount: 0, history: [1.78, 1.75, 1.80] },
                { market: 'Carrefour', price: 1.90, discount: 0, history: [1.90, 1.85, 1.95] },
                { market: 'Nikora', price: 1.88, discount: 0, history: [1.88, 1.85, 1.90] }
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
                'სასარგებლო ბანანი, ენერგიის წყარო',
                'Healthy banana, a source of energy',
                'Полезный банан, источник энергии'
            ],
            prices: [
                { market: 'Magniti', price: 2.25, discount: 0, history: [2.25, 2.20, 2.30] },
                { market: 'Carrefour', price: 2.30, discount: 0, history: [2.30, 2.25, 2.35] },
                { market: 'Nikora', price: 2.28, discount: 0.05, history: [2.28, 2.25, 2.30] },
                { market: '2nabiji', price: 2.20, discount: 0, history: [2.20, 2.15, 2.25] }
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
                'სასარგებლო ფორთოხალი, მდიდარი C ვიტამინით',
                'Healthy orange, rich in Vitamin C',
                'Полезный апельсин, богатый витамином С'
            ],
            prices: [
                { market: 'Carrefour', price: 2.05, discount: 0, history: [2.05, 2.00, 2.10] },
                { market: 'Spar', price: 2.08, discount: 0, history: [2.08, 2.05, 2.10] },
                { market: 'Agrohub', price: 1.98, discount: 0, history: [1.98, 1.95, 2.00] },
                { market: 'Zgapari', price: 2.10, discount: 0.05, history: [2.10, 2.05, 2.15] }
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
                'სასარგებლო მსხალი, წვნიანი და არომატული',
                'Healthy pear, juicy and aromatic',
                'Полезная груша, сочная и ароматная'
            ],
            prices: [
                { market: 'Nikora', price: 2.15, discount: 0, history: [2.15, 2.10, 2.20] },
                { market: '2nabiji', price: 2.10, discount: 0, history: [2.10, 2.05, 2.15] },
                { market: 'Spar', price: 2.12, discount: 0, history: [2.12, 2.10, 2.15] }
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
                'სასარგებლო კივი, მჟავე-ტკბილი გემოთი',
                'Healthy kiwi, with a sweet and sour taste',
                'Полезное киви, с кисло-сладким вкусом'
            ],
            prices: [
                { market: 'Agrohub', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Magniti', price: 2.48, discount: 0, history: [2.48, 2.45, 2.50] },
                { market: 'Carrefour', price: 2.60, discount: 0, history: [2.60, 2.55, 2.65] },
                { market: 'Zgapari', price: 2.52, discount: 0.05, history: [2.52, 2.50, 2.55] }
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
                'თეთრი ყურძენი, ტკბილი და წვნიანი მტევნები',
                'White grapes, sweet and juicy clusters',
                'Белый виноград, сладкие и сочные грозди'
            ],
            prices: [
                { market: 'Spar', price: 3.05, discount: 0, history: [3.05, 3.00, 3.10] },
                { market: 'Carrefour', price: 3.10, discount: 0, history: [3.10, 3.05, 3.15] },
                { market: 'Nikora', price: 3.08, discount: 0.05, history: [3.08, 3.05, 3.10] }
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
                'სასარგებლო ატამი, არომატული და რბილი',
                'Healthy peach, aromatic and soft',
                'Полезный персик, ароматный и мягкий'
            ],
            prices: [
                { market: 'Magniti', price: 2.85, discount: 0, history: [2.85, 2.80, 2.90] },
                { market: 'Agrohub', price: 2.78, discount: 0, history: [2.78, 2.75, 2.80] },
                { market: '2nabiji', price: 2.80, discount: 0, history: [2.80, 2.75, 2.85] }
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
                'ბუნებრივი მინერალური წყალი, სუფთა და გამაგრილებელი',
                'Natural mineral water, pure and refreshing',
                'Природная минеральная вода, чистая и освежающая'
            ],
            prices: [
                { market: 'Spar', price: 0.85, discount: 0, history: [0.85, 0.80, 0.90] },
                { market: 'Magniti', price: 0.78, discount: 0, history: [0.78, 0.75, 0.80] },
                { market: 'Carrefour', price: 0.90, discount: 0, history: [0.90, 0.85, 0.95] },
                { market: 'Nikora', price: 0.88, discount: 0, history: [0.88, 0.85, 0.90] },
                { market: 'Agrohub', price: 0.92, discount: 0, history: [0.92, 0.90, 0.95] },
                { market: '2nabiji', price: 0.80, discount: 0, history: [0.80, 0.75, 0.85] },
                { market: 'Zgapari', price: 0.89, discount: 0, history: [0.89, 0.85, 0.90] }
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
        },
        {
            id: 31,
            name: ['კარტოფილი', 'Potato', 'Картофель'],
            image: 'potato.jpg',
            category: 'vegetables',
            description: [
                'ახალი კარტოფილი, იდეალური შემწვარი და მოხარშული',
                'Fresh potatoes, ideal for frying and boiling',
                'Свежий картофель, идеален для жарки и варки'
            ],
            prices: [
                { market: 'Spar', price: 1.55, discount: 0, history: [1.55, 1.50, 1.60] },
                { market: 'Magniti', price: 1.48, discount: 0, history: [1.48, 1.40, 1.50] },
                { market: 'Carrefour', price: 1.60, discount: 0, history: [1.60, 1.55, 1.65] },
                { market: 'Agrohub', price: 1.50, discount: 0.05, history: [1.50, 1.45, 1.55] }
            ],
            reviews: [
                {
                    user: 'ნინო',
                    rating: 4,
                    comment: ['კარგი ხარისხი', 'Good quality', 'Хорошее качество'],
                    date: '2023-07-27'
                }
            ],
            nutrition: {
                calories: 77,
                protein: 2,
                carbs: 17,
                fat: 0.1
            }
        },
        {
            id: 32,
            name: ['სტაფილო', 'Carrot', 'Морковь'],
            image: 'carrot.jpg',
            category: 'vegetables',
            description: [
                'ახალი სტაფილო, ტკბილი და ხრაშუნა',
                'Fresh carrots, sweet and crunchy',
                'Свежая морковь, сладкая и хрустящая'
            ],
            prices: [
                { market: 'Carrefour', price: 1.25, discount: 0, history: [1.25, 1.20, 1.30] },
                { market: 'Nikora', price: 1.30, discount: 0, history: [1.30, 1.25, 1.35] },
                { market: '2nabiji', price: 1.22, discount: 0, history: [1.22, 1.20, 1.25] }
            ],
            reviews: [
                {
                    user: 'გიორგი',
                    rating: 5,
                    comment: ['ტკბილი', 'Sweet', 'Сладкая'],
                    date: '2023-07-28'
                }
            ],
            nutrition: {
                calories: 41,
                protein: 0.9,
                carbs: 10,
                fat: 0.2
            }
        },
        {
            id: 33,
            name: ['პომიდორი', 'Tomato', 'Помидор'],
            image: 'tomato.jpg',
            category: 'vegetables',
            description: [
                'ახალი პომიდორი, წვნიანი და არომატული',
                'Fresh tomatoes, juicy and aromatic',
                'Свежие помидоры, сочные и ароматные'
            ],
            prices: [
                { market: 'Nikora', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Spar', price: 2.60, discount: 0, history: [2.60, 2.55, 2.65] },
                { market: 'Magniti', price: 2.48, discount: 0, history: [2.48, 2.40, 2.50] },
                { market: 'Agrohub', price: 2.40, discount: 0.05, history: [2.40, 2.35, 2.45] }
            ],
            reviews: [
                {
                    user: 'მარიამი',
                    rating: 4,
                    comment: ['გემრიელი', 'Tasty', 'Вкусные'],
                    date: '2023-07-29'
                }
            ],
            nutrition: {
                calories: 18,
                protein: 0.9,
                carbs: 3.9,
                fat: 0.2
            }
        },
        {
            id: 34,
            name: ['კომბოსტო', 'Cabbage', 'Капуста'],
            image: 'cabbage.jpg',
            category: 'vegetables',
            description: [
                'ახალი კომბოსტო, ჯანსაღი სალათებისთვის',
                'Fresh cabbage, healthy for salads',
                'Свежая капуста, полезна для салатов'
            ],
            prices: [
                { market: 'Agrohub', price: 1.85, discount: 0, history: [1.85, 1.80, 1.90] },
                { market: 'Carrefour', price: 1.90, discount: 0, history: [1.90, 1.85, 1.95] },
                { market: '2nabiji', price: 1.78, discount: 0, history: [1.78, 1.75, 1.80] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['სასარგებლო', 'Healthy', 'Полезная'], date: '2023-07-30' }
            ],
            nutrition: { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1 }
        },
        {
            id: 35,
            name: ['კიტრი', 'Cucumber', 'Огурец'],
            image: 'cucumber.jpg',
            category: 'vegetables',
            description: [
                'ახალი კიტრი, გამაგრილებელი და ხრაშუნა',
                'Fresh cucumber, refreshing and crunchy',
                'Свежий огурец, освежающий и хрустящий'
            ],
            prices: [
                { market: 'Spar', price: 1.75, discount: 0, history: [1.75, 1.70, 1.80] },
                { market: 'Magniti', price: 1.68, discount: 0, history: [1.68, 1.65, 1.70] },
                { market: 'Nikora', price: 1.70, discount: 0.05, history: [1.70, 1.65, 1.75] },
                { market: 'Zgapari', price: 1.72, discount: 0, history: [1.72, 1.70, 1.75] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 5, comment: ['ახალი', 'Fresh', 'Свежие'], date: '2023-07-31' }
            ],
            nutrition: { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 }
        },
        {
            id: 36,
            name: ['ჩიფსი', 'Chips', 'Чипсы'],
            image: 'chips.jpg',
            category: 'snacks',
            description: [
                'ქართული ჩიფსი, საყვარელი საღამოებისთვის',
                'Georgian chips, for favorite evenings',
                'Грузинские чипсы, для любимых вечеров'
            ],
            prices: [
                { market: 'Magniti', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Carrefour', price: 2.60, discount: 0, history: [2.60, 2.55, 2.65] },
                { market: '2nabiji', price: 2.48, discount: 0.05, history: [2.48, 2.45, 2.50] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 3, comment: ['ტკბილი', 'Salty', 'Солёные'], date: '2023-08-01' }
            ],
            nutrition: { calories: 536, protein: 7, carbs: 53, fat: 34 }
        },
        {
            id: 37,
            name: ['თხილი', 'Nuts', 'Орехи'],
            image: 'nuts.jpg',
            category: 'snacks',
            description: [
                'არაქისი, ჯანსაღი და გემრიელი',
                'Peanuts, healthy and tasty',
                'Арахис, полезный и вкусный'
            ],
            prices: [
                { market: 'Carrefour', price: 3.25, discount: 0, history: [3.25, 3.20, 3.30] },
                { market: 'Agrohub', price: 3.18, discount: 0, history: [3.18, 3.15, 3.20] },
                { market: 'Zgapari', price: 3.30, discount: 0, history: [3.30, 3.25, 3.35] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['გემრიელი', 'Tasty', 'Вкусные'], date: '2023-08-02' }
            ],
            nutrition: { calories: 567, protein: 26, carbs: 16, fat: 49 }
        },
        {
            id: 38,
            name: ['შოკოლადი', 'Chocolate', 'Шоколад'],
            image: 'chocolate.jpg',
            category: 'snacks',
            description: [
                'რძიანი შოკოლადი, ტკბილი სიამოვნება',
                'Milk chocolate, a sweet pleasure',
                'Молочный шоколад, сладкое удовольствие'
            ],
            prices: [
                { market: 'Nikora', price: 2.85, discount: 0, history: [2.85, 2.80, 2.90] },
                { market: 'Spar', price: 2.90, discount: 0, history: [2.90, 2.85, 2.95] },
                { market: 'Magniti', price: 2.78, discount: 0.05, history: [2.78, 2.75, 2.80] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['გემრიელი', 'Delicious', 'Вкусный'], date: '2023-08-03' }
            ],
            nutrition: { calories: 546, protein: 7.7, carbs: 59, fat: 31 }
        },
        {
            id: 39,
            name: ['ფისთა', 'Pistachios', 'Фисташки'],
            image: 'pistachios.jpg',
            category: 'snacks',
            description: [
                'მარილიანი ფისთა, იდეალური ლუდთან ერთად',
                'Salted pistachios, ideal with beer',
                'Соленые фисташки, идеально к пиву'
            ],
            prices: [
                { market: 'Agrohub', price: 5.55, discount: 0, history: [5.55, 5.50, 5.60] },
                { market: 'Carrefour', price: 5.60, discount: 0, history: [5.60, 5.55, 5.65] },
                { market: '2nabiji', price: 5.48, discount: 0.05, history: [5.48, 5.45, 5.50] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-04' }
            ],
            nutrition: { calories: 562, protein: 20, carbs: 28, fat: 45 }
        },
        {
            id: 40,
            name: ['პოპკორნი', 'Popcorn', 'Попкорн'],
            image: 'popcorn.jpg',
            category: 'snacks',
            description: [
                'მარილიანი პოპკორნი, კინოსთვის',
                'Salted popcorn, for the movies',
                'Соленый попкорн, для кино'
            ],
            prices: [
                { market: 'Spar', price: 1.95, discount: 0, history: [1.95, 1.90, 2.00] },
                { market: 'Magniti', price: 1.88, discount: 0, history: [1.88, 1.85, 1.90] },
                { market: 'Nikora', price: 1.92, discount: 0.05, history: [1.92, 1.90, 1.95] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['მსუბუქი', 'Light', 'Лёгкий'], date: '2023-08-05' }
            ],
            nutrition: { calories: 375, protein: 12, carbs: 78, fat: 4 }
        },

        {
            id: 42,
            name: ['გაყინული ბოსტნეული', 'Frozen Vegetables', 'Замороженные овощи'],
            image: 'frozen_vegetables.jpg',
            category: 'frozen',
            description: [
                'გაყინული ბროკოლი, ადვილად მოსამზადებელი',
                'Frozen broccoli, easy to prepare',
                'Замороженная брокколи, легко готовить'
            ],
            prices: [
                { market: 'Carrefour', price: 2.85, discount: 0, history: [2.85, 2.80, 2.90] },
                { market: 'Agrohub', price: 2.78, discount: 0, history: [2.78, 2.75, 2.80] },
                { market: '2nabiji', price: 2.80, discount: 0.05, history: [2.80, 2.75, 2.85] }
            ],
            reviews: [
                { user: 'ნინო', rating: 4, comment: ['სასარგებლო', 'Healthy', 'Полезные'], date: '2023-08-07' }
            ],
            nutrition: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 }
        },
        {
            id: 43,
            name: ['გაყინული პიცა', 'Frozen Pizza', 'Замороженная пицца'],
            image: 'frozen_pizza.jpg',
            category: 'frozen',
            description: [
                'გაყინული მარგარიტა, სწრაფი სადილისთვის',
                'Frozen Margherita pizza, for a quick dinner',
                'Замороженная пицца Маргарита, для быстрого ужина'
            ],
            prices: [
                { market: 'Nikora', price: 6.55, discount: 0, history: [6.55, 6.50, 6.60] },
                { market: 'Spar', price: 6.60, discount: 0, history: [6.60, 6.55, 6.65] },
                { market: 'Magniti', price: 6.48, discount: 0.05, history: [6.48, 6.45, 6.50] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 4, comment: ['კარგი', 'Good', 'Хорошая'], date: '2023-08-08' }
            ],
            nutrition: { calories: 268, protein: 11, carbs: 33, fat: 10 }
        },
        {
            id: 44,
            name: ['გაყინული კრევეტი', 'Frozen Shrimp', 'Замороженные креветки'],
            image: 'frozen_shrimp.jpg',
            category: 'frozen',
            description: [
                'გაყინული წითელი კრევეტი, ზღვის პროდუქტების მოყვარულთათვის',
                'Frozen red shrimp, for seafood lovers',
                'Замороженные красные креветки, для любителей морепродуктов'
            ],
            prices: [
                { market: 'Agrohub', price: 12.55, discount: 0, history: [12.55, 12.50, 12.60] },
                { market: 'Carrefour', price: 12.60, discount: 0, history: [12.60, 12.55, 12.65] },
                { market: 'Zgapari', price: 12.48, discount: 0.05, history: [12.48, 12.45, 12.50] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['საუკეთესო', 'Best', 'Лучшие'], date: '2023-08-09' }
            ],
            nutrition: { calories: 99, protein: 24, carbs: 0, fat: 0.3 }
        },
        {
            id: 45,
            name: ['გაყინული ბერკოტები', 'Frozen Dumplings', 'Замороженные пельмени'],
            image: 'frozen_dumplings.jpg',
            category: 'frozen',
            description: [
                'გაყინული ქართული ხინკალი, ტრადიციული გემო',
                'Frozen Georgian khinkali, traditional taste',
                'Замороженные грузинские хინкали, традиционный вкус'
            ],
            prices: [
                { market: 'Spar', price: 8.55, discount: 0, history: [8.55, 8.50, 8.60] },
                { market: 'Magniti', price: 8.48, discount: 0, history: [8.48, 8.45, 8.50] },
                { market: 'Nikora', price: 8.50, discount: 0.05, history: [8.50, 8.45, 8.55] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-10' }
            ],
            nutrition: { calories: 275, protein: 12, carbs: 30, fat: 12 }
        },
        {
            id: 46,
            name: ['სარეცხი საშუალება', 'Laundry Detergent', 'Стиральный порошок'],
            image: 'detergent.jpg',
            category: 'cleaning',
            description: [
                'სარეცხი საშუალება 2 კგ, ეფექტური ყველა ტიპის ქსოვილისთვის',
                'Laundry detergent 2kg, effective for all fabric types',
                'Стиральный порошок 2кг, эффективен для всех типов тканей'
            ],
            prices: [
                { market: 'Magniti', price: 7.55, discount: 0, history: [7.55, 7.50, 7.60] },
                { market: 'Carrefour', price: 7.60, discount: 0, history: [7.60, 7.55, 7.65] },
                { market: 'Nikora', price: 7.58, discount: 0, history: [7.58, 7.55, 7.60] },
                { market: 'Agrohub', price: 7.48, discount: 0.05, history: [7.48, 7.45, 7.50] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 4, comment: ['კარგი', 'Good', 'Хороший'], date: '2023-08-11' }
            ],
            nutrition: {calories: 10, protein: 0, carbs: 2, fat: 0}
        },
        {
            id: 47,
            name: ['საჭურველი საშუალება', 'Dish Soap', 'Средство для мытья посуды'],
            image: 'dish_soap.jpg',
            category: 'cleaning',
            description: [
                'საჭურველი საშუალება 500მლ, ცხიმის წინააღმდეგ',
                'Dish soap 500ml, powerful against grease',
                'Средство для мытья посуды 500мл, мощное против жира'
            ],
            prices: [
                { market: 'Carrefour', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Spar', price: 2.58, discount: 0, history: [2.58, 2.55, 2.60] },
                { market: 'Magniti', price: 2.48, discount: 0.05, history: [2.48, 2.45, 2.50] },
                { market: '2nabiji', price: 2.50, discount: 0, history: [2.50, 2.45, 2.55] }
            ],
            reviews: [
                { user: 'ნინო', rating: 5, comment: ['კარგი', 'Good', 'Хорошее'], date: '2023-08-12' }
            ],
            nutrition: {calories: 5, protein: 0, carbs: 1, fat: 0}
        },
        {
            id: 48,
            name: ['საპონი', 'Soap', 'Мыло'],
            image: 'soap.jpg',
            category: 'cleaning',
            description: [
                'სახელური საპონი, ნაზი კანისთვის',
                'Hand soap, gentle on skin',
                'Ручное мыло, нежное для кожи'
            ],
            prices: [
                { market: 'Nikora', price: 1.25, discount: 0, history: [1.25, 1.20, 1.30] },
                { market: 'Carrefour', price: 1.30, discount: 0, history: [1.30, 1.25, 1.35] },
                { market: 'Agrohub', price: 1.22, discount: 0.05, history: [1.22, 1.20, 1.25] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 4, comment: ['სასიამოვნო', 'Nice', 'Приятное'], date: '2023-08-13' }
            ],
            nutrition: {calories: 2, protein: 0, carbs: 0, fat: 0}
        },
        {
            id: 49,
            name: ['სარეცხი ბლოკი', 'Washing Block', 'Стиральный кубик'],
            image: 'washing_block.jpg',
            category: 'cleaning',
            description: [
                'სარეცხი ბლოკი 3 ცალი, მარტივი გამოყენებისთვის',
                'Washing blocks 3pcs, easy to use',
                'Стиральные кубики 3шт, просты в использовании'
            ],
            prices: [
                { market: 'Agrohub', price: 3.55, discount: 0, history: [3.55, 3.50, 3.60] },
                { market: 'Spar', price: 3.60, discount: 0, history: [3.60, 3.55, 3.65] },
                { market: 'Magniti', price: 3.48, discount: 0.05, history: [3.48, 3.45, 3.50] },
                { market: 'Zgapari', price: 3.52, discount: 0, history: [3.52, 3.50, 3.55] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-14' }
            ],
            nutrition: {calories: 8, protein: 0, carbs: 2, fat: 0}
        },
        {
            id: 50,
            name: ['ლუდი', 'Beer', 'Пиво'],
            image: 'beer.jpg',
            category: 'alcohol',
            description: [
                'ქართული ლუდი, მსუბუქი და გამაგრილებელი',
                'Georgian beer, light and refreshing',
                'Грузинское пиво, легкое и освежающее'
            ],
            prices: [
                { market: 'Carrefour', price: 2.55, discount: 0, history: [2.55, 2.50, 2.60] },
                { market: 'Magniti', price: 2.48, discount: 0.05, history: [2.48, 2.45, 2.50] },
                { market: 'Nikora', price: 2.50, discount: 0, history: [2.50, 2.45, 2.55] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['კარგი', 'Good', 'Хорошее'], date: '2023-08-15' }
            ],
            nutrition: { calories: 43, protein: 0.5, carbs: 3.5, fat: 0 }
        },
    
        {
            id: 52,
            name: ['არაყი', 'Vodka', 'Водка'],
            image: 'vodka.jpg',
            category: 'alcohol',
            description: [
                'რუსული არაყი, კლასიკური',
                'Russian vodka, classic',
                'Русская водка, классическая'
            ],
            prices: [
                { market: 'Nikora', price: 15.00, discount: 0, history: [15.00, 14.90, 15.10] },
                { market: 'Magniti', price: 14.80, discount: 0, history: [14.80, 14.70, 14.90] },
                { market: '2nabiji', price: 14.90, discount: 0.05, history: [14.90, 14.85, 14.95] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 4, comment: ['კარგი', 'Good', 'Хорошая'], date: '2023-08-17' }
            ],
            nutrition: { calories: 231, protein: 0, carbs: 0, fat: 0 }
        },
        {
            id: 53,
            name: ['ვისკი', 'Whiskey', 'Виски'],
            image: 'whiskey.jpg',
            category: 'alcohol',
            description: [
                'შოტლანდიური ვისკი, 12 წლის დაძველებით',
                'Scotch whisky, 12 years aged',
                'Шотландский виски, 12 лет выдержки'
            ],
            prices: [
                { market: 'Spar', price: 25.00, discount: 0, history: [25.00, 24.80, 25.20] },
                { market: 'Carrefour', price: 25.50, discount: 0, history: [25.50, 25.30, 25.70] },
                { market: 'Agrohub', price: 24.80, discount: 0.05, history: [24.80, 24.70, 24.90] }
            ],
            reviews: [
                { user: 'თამარი', rating: 5, comment: ['საუკეთესო', 'Best', 'Лучший'], date: '2023-08-18' }
            ],
            nutrition: { calories: 250, protein: 0, carbs: 0, fat: 0 }
        },
        {
            id: 54,
            name: ['კონიაკი', 'Brandy', 'Коньяк'],
            image: 'brandy.jpg',
            category: 'alcohol',
            description: [
                'ფრანგული კონიაკი, 5 წლის დაძველებით',
                'French brandy, 5 years aged',
                'Французский коньяк, 5 лет выдержки'
            ],
            prices: [
                { market: 'Magniti', price: 20.00, discount: 0, history: [20.00, 19.80, 20.20] },
                { market: 'Nikora', price: 20.50, discount: 0, history: [20.50, 20.30, 20.70] },
                { market: 'Zgapari', price: 19.90, discount: 0.05, history: [19.90, 19.80, 20.00] }
            ],
            reviews: [
                { user: 'ლევანი', rating: 4, comment: ['კარგი', 'Good', 'Хороший'], date: '2023-08-19' }
            ],
            nutrition: { calories: 239, protein: 0, carbs: 0, fat: 0 }
        },
        {
            id: 55,
            name: ['ვიტამინი D', 'Vitamin D', 'Витамин D'],
            image: 'vitamin_d.jpg',
            category: 'health',
            description: [
                'ვიტამინი D ტაბლეტები, ძვლების ჯანმრთელობისთვის',
                'Vitamin D tablets, for bone health',
                'Таблетки витамина D, для здоровья костей'
            ],
            prices: [
                { market: 'Magniti', price: 8.50, discount: 0, history: [8.50, 8.60, 8.40] },
                { market: 'Carrefour', price: 8.60, discount: 0, history: [8.60, 8.55, 8.65] },
                { market: '2nabiji', price: 8.40, discount: 0.05, history: [8.40, 8.35, 8.45] }
            ],
            reviews: [
                { user: 'გიორგი', rating: 5, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-20' }
            ],
            nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 }
        },
        {
            id: 56,
            name: ['თევზის ზეთი', 'Fish Oil', 'Рыбий жир'],
            image: 'fish_oil.jpg',
            category: 'health',
            description: [
                'თევზის ზეთის კაფსულები, ომეგა-3-ით',
                'Fish oil capsules, with Omega-3',
                'Капсулы рыбьего жира, с Омега-3'
            ],
            prices: [
                { market: 'Agrohub', price: 12.00, discount: 0, history: [12.00, 11.90, 12.10] },
                { market: 'Spar', price: 12.10, discount: 0, history: [12.10, 12.05, 12.15] },
                { market: 'Magniti', price: 11.90, discount: 0.05, history: [11.90, 11.85, 11.95] }
            ],
            reviews: [
                { user: 'ნინო', rating: 4, comment: ['სასარგებლო', 'Healthy', 'Полезное'], date: '2023-08-21' }
            ],
            nutrition: { calories: 10, protein: 0.2, carbs: 0.1, fat: 1 }
        },
        {
            id: 57,
            name: ['მულტივიტამინები', 'Multivitamins', 'Мультивитамины'],
            image: 'multivitamins.jpg',
            category: 'health',
            description: [
                'მულტივიტამინები, ყოველდღიური ჯანმრთელობისთვის',
                'Multivitamins, for daily health',
                'Мультивитамины, для ежедневного здоровья'
            ],
            prices: [
                { market: 'Nikora', price: 9.50, discount: 0, history: [9.50, 9.40, 9.60] },
                { market: 'Carrefour', price: 9.60, discount: 0, history: [9.60, 9.55, 9.65] },
                { market: 'Zgapari', price: 9.40, discount: 0.05, history: [9.40, 9.35, 9.45] }
            ],
            reviews: [
                { user: 'მარიამი', rating: 5, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-22' }
            ],
            nutrition: { calories: 8, protein: 0.1, carbs: 1, fat: 0 }
        },
        {
            id: 58,
            name: ['პროტეინი', 'Protein', 'Протеин'],
            image: 'protein.jpg',
            category: 'health',
            description: [
                'პროტეინის ფხვნილი, კუნთების ზრდისთვის',
                'Protein powder, for muscle growth',
                'Протеиновый порошок, для роста мышц'
            ],
            prices: [
                { market: '2nabiji', price: 20.00, discount: 0, history: [20.00, 19.80, 20.20] },
                { market: 'Agrohub', price: 19.80, discount: 0, history: [19.80, 19.70, 19.90] },
                { market: 'Spar', price: 20.10, discount: 0.05, history: [20.10, 20.00, 20.20] }
            ],
            reviews: [
                { user: 'თამარი', rating: 4, comment: ['კარგი', 'Good', 'Хорошие'], date: '2023-08-23' }
            ],
            nutrition: { calories: 120, protein: 24, carbs: 3, fat: 2 }
        },
        {
            id: 59,
            name: ['ვიტამინი C', 'Vitamin C', 'Витамин C'],
            image: 'vitamin_c.jpg',
            category: 'health',
            description: [
                'ვიტამინი C ტაბლეტები, იმუნიტეტის გასაძლიერებლად',
                'Vitamin C tablets, to boost immunity',
                'Таблетки витамина C, для укрепления иммунитета'
            ],
            prices: [
                { market: 'Agrohub', price: 5.55, discount: 0, history: [5.55, 5.50, 5.60] },
                { market: 'Magniti', price: 5.48, discount: 0, history: [5.48, 5.45, 5.50] },
                { market: 'Carrefour', price: 5.60, discount: 0, history: [5.60, 5.55, 5.65] }
            ],
            reviews: [
                {
                    user: 'თამარი',
                    rating: 4,
                    comment: ['კარგი', 'Good', 'Хорошие'],
                    date: '2023-08-24'
                }
            ],
            nutrition: { calories: 2, protein: 0, carbs: 0.5, fat: 0 }
        },
        {
            id: 60,
            name: ['კალციუმი', 'Calcium', 'Кальций'],
            image: 'calcium.jpg',
            category: 'health',
            description: [
                'კალციუმის ტაბლეტები, ძლიერი ძვლებისთვის',
                'Calcium tablets, for strong bones',
                'Таблетки кальция, для крепких костей'
            ],
            prices: [
                { market: 'Spar', price: 7.55, discount: 0, history: [7.55, 7.50, 7.60] },
                { market: 'Magniti', price: 7.48, discount: 0, history: [7.48, 7.45, 7.50] },
                { market: 'Nikora', price: 7.60, discount: 0, history: [7.60, 7.55, 7.65] },
                { market: 'Zgapari', price: 7.50, discount: 0.05, history: [7.50, 7.45, 7.55] }
            ],
            reviews: [
                {
                    user: 'ლევანი',
                    rating: 4,
                    comment: ['კარგი', 'Good', 'Хорошие'],
                    date: '2023-08-25'
                }
            ],
            nutrition: { calories: 3, protein: 0, carbs: 1, fat: 0 }
        },
        {
            id: 61,
            name: ['თეთრი პური', 'White Bread', 'Белый хлеб'],
            image: 'white_bread.jpg',
            category: 'bakery',
            description: ['ტრადიციული თეთრი პური', 'Traditional white bread', 'Традиционный белый хлеб'],
            prices: [{ market: 'Spar', price: 1.10, discount: 0, history: [1.10] }],
            reviews: [{ user: 'ანა', rating: 5, comment: ['ყოველთვის გემრიელი', 'Always delicious', 'Всегда вкусно'], date: '2024-01-10' }],
            nutrition: { calories: 260, protein: 8, carbs: 50, fat: 2 }
        },
        {
            id: 62,
            name: ['ჭვავის პური', 'Rye Bread', 'Ржаной хлеб'],
            image: 'rye_bread.jpg',
            category: 'bakery',
            description: ['ჯანსაღი ჭვავის პური', 'Healthy rye bread', 'Полезный ржаной хлеб'],
            prices: [{ market: 'Magniti', price: 1.50, discount: 0, history: [1.50] }],
            reviews: [{ user: 'დავითი', rating: 4, comment: ['კარგი არჩევანი', 'Good choice', 'Хороший выбор'], date: '2024-02-01' }],
            nutrition: { calories: 250, protein: 7, carbs: 48, fat: 2.5 }
        },
        {
            id: 65,
            name: ['ქადა', 'Kada', 'Када'],
            image: 'kada.jpg',
            category: 'bakery',
            description: ['ტრადიციული ქართული ქადა', 'Traditional Georgian Kada', 'Традиционная грузинская када'],
            prices: [{ market: 'Spar', price: 2.00, discount: 0, history: [2.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['ნამდვილი ქართული გემო', 'Real Georgian taste', 'Настоящий грузинский вкус'], date: '2024-05-20' }],
            nutrition: { calories: 350, protein: 7, carbs: 60, fat: 10 }
        },
        {
            id: 66,
            name: ['ნაზუქი', 'Nazuqi', 'Назуки'],
            image: 'nazuqi.jpg',
            category: 'bakery',
            description: ['ტკბილი ნაზუქი', 'Sweet Nazuqi', 'Сладкое назуки'],
            prices: [{ market: 'Magniti', price: 1.60, discount: 0, history: [1.60] }],
            reviews: [{ user: 'სოფო', rating: 4, comment: ['ძალიან მომეწონა', 'I liked it very much', 'Очень понравилось'], date: '2024-06-08' }],
            nutrition: { calories: 320, protein: 6, carbs: 58, fat: 8 }
        },
        {
            id: 67,
            name: ['ლავაში', 'Lavash', 'Лаваш'],
            image: 'lavash.jpg',
            category: 'bakery',
            description: ['თხელი ლავაში', 'Thin Lavash', 'Тонкий лаваш'],
            prices: [{ market: 'Nikora', price: 0.90, discount: 0, history: [0.90] }],
            reviews: [{ user: 'ალექსანდრე', rating: 5, comment: ['საუკეთესო შაურმისთვის', 'Best for shawarma', 'Лучший для шаурмы'], date: '2024-07-15' }],
            nutrition: { calories: 280, protein: 9, carbs: 55, fat: 1 }
        },
        {
            id: 68,
            name: ['მაფინი', 'Muffin', 'Маффин'],
            image: 'muffin.jpg',
            category: 'bakery',
            description: ['შოკოლადის მაფინი', 'Chocolate muffin', 'Шоколадный маффин'],
            prices: [{ market: 'Carrefour', price: 1.70, discount: 0, history: [1.70] }],
            reviews: [{ user: 'მარიამი', rating: 4, comment: ['ტკბილი და ნაზი', 'Sweet and tender', 'Сладкий и нежный'], date: '2024-08-22' }],
            nutrition: { calories: 400, protein: 5, carbs: 45, fat: 20 }
        },
        {
            id: 70,
            name: ['კეფირი', 'Kefir', 'Кефир'],
            image: 'kefir.jpg',
            category: 'dairy',
            description: ['ნატურალური კეფირი', 'Natural kefir', 'Натуральный кефир'],
            prices: [{ market: 'Carrefour', price: 2.10, discount: 0, history: [2.10] }],
            reviews: [{ user: 'თამარი', rating: 4, comment: ['ძალიან სასარგებლო', 'Very healthy', 'Очень полезно'], date: '2024-10-10' }],
            nutrition: { calories: 50, protein: 3, carbs: 4, fat: 2.5 }
        },
        {
            id: 71,
            name: ['არაჟანი', 'Sour Cream', 'Сметана'],
            image: 'sour_cream.jpg',
            category: 'dairy',
            description: ['ახალი არაჟანი 20%', 'Fresh sour cream 20%', 'Свежая сметана 20%'],
            prices: [{ market: 'Spar', price: 2.80, discount: 0, history: [2.80] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['არაჩვეულებრივი ხარისხი', 'Excellent quality', 'Отличное качество'], date: '2024-11-18' }],
            nutrition: { calories: 196, protein: 2.5, carbs: 3, fat: 20 }
        },
        {
            id: 72,
            name: ['ხაჭო', 'Cottage Cheese', 'Творог'],
            image: 'cottage_cheese.jpg',
            category: 'dairy',
            description: ['უცხიმო ხაჭო', 'Fat-free cottage cheese', 'Обезжиренный творог'],
            prices: [{ market: 'Magniti', price: 3.50, discount: 0, history: [3.50] }],
            reviews: [{ user: 'ანა', rating: 4, comment: ['კარგია დიეტისთვის', 'Good for diet', 'Хорошо для диеты'], date: '2024-12-01' }],
            nutrition: { calories: 82, protein: 11, carbs: 3, fat: 0.5 }
        },
        {
            id: 73,
            name: ['რიაჟენკა', 'Ryazhenka', 'Ряженка'],
            image: 'ryazhenka.jpg',
            category: 'dairy',
            description: ['ნატურალური რიაჟენკა', 'Natural Ryazhenka', 'Натуральная ряженка'],
            prices: [{ market: 'Nikora', price: 1.90, discount: 0, history: [1.90] }],
            reviews: [{ user: 'დავითი', rating: 5, comment: ['საყვარელი სასმელი', 'Favorite drink', 'Любимый напиток'], date: '2025-01-05' }],
            nutrition: { calories: 80, protein: 3, carbs: 4.7, fat: 4 }
        },
        {
            id: 74,
            name: ['მოცარელა', 'Mozzarella', 'Моцарелла'],
            image: 'mozzarella.jpg',
            category: 'dairy',
            description: ['იტალიური მოცარელა', 'Italian Mozzarella', 'Итальянская моцарелла'],
            prices: [{ market: 'Carrefour', price: 6.00, discount: 0, history: [6.00] }],
            reviews: [{ user: 'ელენე', rating: 4, comment: ['პიცისთვის იდეალური', 'Perfect for pizza', 'Идеально для пиццы'], date: '2025-02-14' }],
            nutrition: { calories: 300, protein: 22, carbs: 2.2, fat: 22 }
        },

        {
            id: 78,
            name: ['ცხვრის ხორცი', 'Lamb', 'Баранина'],
            image: 'lamb.jpg',
            category: 'meat',
            description: ['ახალი ცხვრის ხორცი', 'Fresh lamb', 'Свежая баранина'],
            prices: [{ market: 'Carrefour', price: 30.00, discount: 0, history: [30.00] }],
            reviews: [{ user: 'ალექსანდრე', rating: 4, comment: ['სამწვადედ კარგია', 'Good for skewers', 'Хорошо для шашлыка'], date: '2024-04-30' }],
            nutrition: { calories: 294, protein: 25, carbs: 0, fat: 21 }
        },
        {
            id: 80,
            name: ['ძეხვი', 'Salami', 'Колбаса'],
            image: 'salami.jpg',
            category: 'meat',
            description: ['შებოლილი ძეხვი', 'Smoked salami', 'Копченая колбаса'],
            prices: [{ market: 'Magniti', price: 15.00, discount: 0, history: [15.00] }],
            reviews: [{ user: 'ლევანი', rating: 5, comment: ['ძალიან გემრიელია', 'Very tasty', 'Очень вкусно'], date: '2024-06-10' }],
            nutrition: { calories: 400, protein: 15, carbs: 5, fat: 35 }
        },
        {
            id: 81,
            name: ['ფარში', 'Minced Meat', 'Фарш'],
            image: 'minced_meat.jpg',
            category: 'meat',
            description: ['საქონლის ფარში', 'Minced beef', 'Говяжий фарш'],
            prices: [{ market: 'Nikora', price: 10.00, discount: 0, history: [10.00] }],
            reviews: [{ user: 'თამარი', rating: 4, comment: ['ხინკლისთვის ვიყიდე', 'Bought for khinkali', 'Купила для хинкали'], date: '2024-07-20' }],
            nutrition: { calories: 200, protein: 18, carbs: 0, fat: 14 }
        },
        {
            id: 82,
            name: ['ბეკონი', 'Bacon', 'Бекон'],
            image: 'bacon.jpg',
            category: 'meat',
            description: ['შებოლილი ბეკონი', 'Smoked bacon', 'Копченый бекон'],
            prices: [{ market: 'Carrefour', price: 16.00, discount: 0, history: [16.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['საუზმისთვის საუკეთესო', 'Best for breakfast', 'Лучший для завтрака'], date: '2024-08-01' }],
            nutrition: { calories: 541, protein: 37, carbs: 0, fat: 42 }
        },
        {
            id: 83,
            name: ['ინდაურის ხორცი', 'Turkey Meat', 'Мясо индейки'],
            image: 'turkey_meat.jpg',
            category: 'meat',
            description: ['ინდაურის ფილე', 'Turkey fillet', 'Филе индейки'],
            prices: [{ market: 'Spar', price: 14.00, discount: 0, history: [14.00] }],
            reviews: [{ user: 'ანა', rating: 4, comment: ['დიეტური პროდუქტი', 'Dietary product', 'Диетический продукт'], date: '2024-09-10' }],
            nutrition: { calories: 135, protein: 29, carbs: 0, fat: 1.5 }
        },
        {
            id: 84,
            name: ['კურდღლის ხორცი', 'Rabbit Meat', 'Мясо кролика'],
            image: 'rabbit_meat.jpg',
            category: 'meat',
            description: ['ახალი კურდღლის ხორცი', 'Fresh rabbit meat', 'Свежее мясо кролика'],
            prices: [{ market: 'Magniti', price: 28.00, discount: 0, history: [28.00] }],
            reviews: [{ user: 'დავითი', rating: 5, comment: ['უგემრიელესი', 'Delicious', 'Очень вкусно'], date: '2024-10-15' }],
            nutrition: { calories: 173, protein: 33, carbs: 0, fat: 4 }
        },
        {
            id: 86,
            name: ['ფორთოხლის წვენი', 'Orange Juice', 'Апельсиновый сок'],
            image: 'orange_juice.jpg',
            category: 'beverages',
            description: ['ნატურალური ფორთოხლის წვენი', 'Natural orange juice', 'Натуральный апельсиновый сок'],
            prices: [{ market: 'Magniti', price: 3.00, discount: 0, history: [3.00] }],
            reviews: [{ user: 'ნინო', rating: 4, comment: ['ახალი გემო', 'Fresh taste', 'Свежий вкус'], date: '2024-02-20' }],
            nutrition: { calories: 45, protein: 0.7, carbs: 10.6, fat: 0.2 }
        },
    
        {
            id: 89,
            name: ['მწვანე ჩაი', 'Green Tea', 'Зеленый чай'],
            image: 'green_tea.jpg',
            category: 'beverages',
            description: ['ჯანსაღი მწვანე ჩაი', 'Healthy green tea', 'Полезный зеленый чай'],
            prices: [{ market: 'Spar', price: 4.00, discount: 0, history: [4.00] }],
            reviews: [{ user: 'ალექსანდრე', rating: 4, comment: ['ძალიან სასიამოვნო', 'Very pleasant', 'Очень приятно'], date: '2024-05-12' }],
            nutrition: { calories: 1, protein: 0.2, carbs: 0.3, fat: 0 }
        },
        {
            id: 91,
            name: ['ვაშლის წვენი', 'Apple Juice', 'Яблочный сок'],
            image: 'apple_juice.jpg',
            category: 'beverages',
            description: ['ნატურალური ვაშლის წვენი', 'Natural apple juice', 'Натуральный яблочный сок'],
            prices: [{ market: 'Nikora', price: 2.50, discount: 0, history: [2.50] }],
            reviews: [{ user: 'ლევანი', rating: 4, comment: ['ბავშვებს უყვართ', 'Kids love it', 'Детям нравится'], date: '2024-07-25' }],
            nutrition: { calories: 46, protein: 0.1, carbs: 11.3, fat: 0.1 }
        },
        {
            id: 92,
            name: ['პომიდვრის წვენი', 'Tomato Juice', 'Томатный сок'],
            image: 'tomato_juice.jpg',
            category: 'beverages',
            description: ['ახალი პომიდვრის წვენი', 'Fresh tomato juice', 'Свежий томатный сок'],
            prices: [{ market: 'Carrefour', price: 2.70, discount: 0, history: [2.70] }],
            reviews: [{ user: 'თამარი', rating: 3, comment: ['კარგია სუპისთვის', 'Good for soup', 'Хорошо для супа'], date: '2024-08-08' }],
            nutrition: { calories: 17, protein: 0.8, carbs: 3.5, fat: 0.1 }
        },
        {
            id: 93,
            name: ['ენერგეტიკული სასმელი', 'Energy Drink', 'Энергетический напиток'],
            image: 'energy_drink.jpg',
            category: 'beverages',
            description: ['ენერგეტიკული სასმელი', 'Energy drink', 'Энергетический напиток'],
            prices: [{ market: 'Spar', price: 3.50, discount: 0, history: [3.50] }],
            reviews: [{ user: 'გიორგი', rating: 4, comment: ['კარგად მოქმედებს', 'Works well', 'Хорошо действует'], date: '2024-09-01' }],
            nutrition: { calories: 45, protein: 0, carbs: 11, fat: 0 }
        },
        {
            id: 94,
            name: ['გაზიანი სასმელი', 'Sparkling Water', 'Газированная вода'],
            image: 'sparkling_water.jpg',
            category: 'beverages',
            description: ['გაზიანი წყალი', 'Carbonated water', 'Газированная вода'],
            prices: [{ market: 'Magniti', price: 1.20, discount: 0, history: [1.20] }],
            reviews: [{ user: 'ანა', rating: 5, comment: ['გამაგრილებელი', 'Refreshing', 'Освежающая'], date: '2024-10-20' }],
            nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
        },



        {
            id: 98,
            name: ['მანდარინი', 'Mandarin', 'Мандарин'],
            image: 'mandarin.jpg',
            category: 'fruits',
            description: ['ახალი მანდარინი', 'Fresh mandarin', 'Свежий мандарин'],
            prices: [{ market: 'Carrefour', price: 2.20, discount: 0, history: [2.20] }],
            reviews: [{ user: 'გიორგი', rating: 4, comment: ['საახალწლო ხილი', 'New Year fruit', 'Новогодний фрукт'], date: '2024-04-20' }],
            nutrition: { calories: 53, protein: 0.8, carbs: 13.3, fat: 0.3 }
        },
        {
            id: 101,
            name: ['ატამი', 'Peach', 'Персик'],
            image: 'peach.jpg',
            category: 'fruits',
            description: ['ახალი ატამი', 'Fresh peach', 'Свежий персик'],
            prices: [{ market: 'Nikora', price: 3.50, discount: 0, history: [3.50] }],
            reviews: [{ user: 'მარიამი', rating: 5, comment: ['ზაფხულის გემო', 'Taste of summer', 'Вкус лета'], date: '2024-07-01' }],
            nutrition: { calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3 }
        },
        {
            id: 102,
            name: ['ალუბალი', 'Cherry', 'Вишня'],
            image: 'cherry.jpg',
            category: 'fruits',
            description: ['წითელი ალუბალი', 'Red cherry', 'Красная вишня'],
            prices: [{ market: 'Carrefour', price: 6.00, discount: 0, history: [6.00] }],
            reviews: [{ user: 'ლევანი', rating: 4, comment: ['მურაბისთვის ვიყიდე', 'Bought for jam', 'Купила для варенья'], date: '2024-08-10' }],
            nutrition: { calories: 50, protein: 1, carbs: 12, fat: 0.3 }
        },
        {
            id: 103,
            name: ['მარწყვი', 'Strawberry', 'Клубника'],
            image: 'strawberry.jpg',
            category: 'fruits',
            description: ['ტკბილი მარწყვი', 'Sweet strawberry', 'Сладкая клубника'],
            prices: [{ market: 'Spar', price: 7.00, discount: 0, history: [7.00] }],
            reviews: [{ user: 'თამარი', rating: 5, comment: ['საუკეთესო კენკრა', 'Best berry', 'Лучшая ягода'], date: '2024-09-15' }],
            nutrition: { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 }
        },
        {
            id: 104,
            name: ['ანანასი', 'Pineapple', 'Ананас'],
            image: 'pineapple.jpg',
            category: 'fruits',
            description: ['ეგზოტიკური ანანასი', 'Exotic pineapple', 'Экзотический ананас'],
            prices: [{ market: 'Magniti', price: 8.00, discount: 0, history: [8.00] }],
            reviews: [{ user: 'გიორგი', rating: 4, comment: ['ახალი და წვნიანი', 'Fresh and juicy', 'Свежий и сочный'], date: '2024-10-01' }],
            nutrition: { calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1 }
        },

       
        {
            id: 108,
            name: ['ხახვი', 'Onion', 'Лук'],
            image: 'onion.jpg',
            category: 'vegetables',
            description: ['თეთრი ხახვი', 'White onion', 'Белый лук'],
            prices: [{ market: 'Carrefour', price: 1.00, discount: 0, history: [1.00] }],
            reviews: [{ user: 'ნინო', rating: 4, comment: ['კარგი ხარისხი', 'Good quality', 'Хорошее качество'], date: '2024-04-10' }],
            nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 }
        },
    
        {
            id: 110,
            name: ['ბულგარული წიწაკა', 'Bell Pepper', 'Болгарский перец'],
            image: 'bell_pepper.jpg',
            category: 'vegetables',
            description: ['წითელი ბულგარული წიწაკა', 'Red bell pepper', 'Красный болгарский перец'],
            prices: [{ market: 'Magniti', price: 3.00, discount: 0, history: [3.00] }],
            reviews: [{ user: 'სოფო', rating: 4, comment: ['ფერადი და გემრიელი', 'Colorful and tasty', 'Цветной и вкусный'], date: '2024-06-05' }],
            nutrition: { calories: 31, protein: 1, carbs: 6, fat: 0.3 }
        },
        {
            id: 111,
            name: ['ნიორი', 'Garlic', 'Чеснок'],
            image: 'garlic.jpg',
            category: 'vegetables',
            description: ['ახალი ნიორი', 'Fresh garlic', 'Свежий чеснок'],
            prices: [{ market: 'Nikora', price: 0.80, discount: 0, history: [0.80] }],
            reviews: [{ user: 'ალექსანდრე', rating: 5, comment: ['აუცილებელია სამზარეულოში', 'Essential in the kitchen', 'Необходим на кухне'], date: '2024-07-10' }],
            nutrition: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5 }
        },
        {
            id: 112,
            name: ['ბადრიჯანი', 'Eggplant', 'Баклажан'],
            image: 'eggplant.jpg',
            category: 'vegetables',
            description: ['შავი ბადრიჯანი', 'Black eggplant', 'Черный баклажан'],
            prices: [{ market: 'Carrefour', price: 2.50, discount: 0, history: [2.50] }],
            reviews: [{ user: 'მარიამი', rating: 4, comment: ['კარგია სატაცურისთვის', 'Good for adjapsandali', 'Хорошо для аджапсандали'], date: '2024-08-01' }],
            nutrition: { calories: 25, protein: 1, carbs: 5.9, fat: 0.2 }
        },
        {
            id: 113,
            name: ['სოკო', 'Mushroom', 'Гриб'],
            image: 'mushroom.jpg',
            category: 'vegetables',
            description: ['ახალი სოკო', 'Fresh mushroom', 'Свежий гриб'],
            prices: [{ market: 'Spar', price: 4.50, discount: 0, history: [4.50] }],
            reviews: [{ user: 'ლევანი', rating: 5, comment: ['გემრიელია შემწვარი', 'Tasty fried', 'Вкусно жарить'], date: '2024-09-05' }],
            nutrition: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 }
        },
        {
            id: 116,
            name: ['შოკოლადის ფილა', 'Chocolate Bar', 'Шоколадный батончик'],
            image: 'chocolate_bar.jpg',
            category: 'snacks',
            description: ['რძიანი შოკოლადი', 'Milk chocolate', 'Молочный шоколад'],
            prices: [{ market: 'Magniti', price: 1.50, discount: 0, history: [1.50] }],
            reviews: [{ user: 'ანა', rating: 5, comment: ['საყვარელი შოკოლადი', 'Favorite chocolate', 'Любимый шоколад'], date: '2024-02-10' }],
            nutrition: { calories: 535, protein: 8, carbs: 59, fat: 30 }
        },
        {
            id: 117,
            name: ['არაქისის კარაქი', 'Peanut Butter', 'Арахисовое масло'],
            image: 'peanut_butter.jpg',
            category: 'snacks',
            description: ['ნატურალური არაქისის კარაქი', 'Natural peanut butter', 'Натуральное арахисовое масло'],
            prices: [{ market: 'Nikora', price: 6.00, discount: 0, history: [6.00] }],
            reviews: [{ user: 'დავითი', rating: 4, comment: ['ჯანსაღი და გემრიელი', 'Healthy and tasty', 'Полезно и вкусно'], date: '2024-03-08' }],
            nutrition: { calories: 588, protein: 25, carbs: 20, fat: 50 }
        },
        {
            id: 118,
            name: ['ორცხობილა', 'Biscuits', 'Печенье'],
            image: 'biscuits.jpg',
            category: 'snacks',
            description: ['შოკოლადიანი ორცხობილა', 'Chocolate biscuits', 'Шоколадное печенье'],
            prices: [{ market: 'Carrefour', price: 2.50, discount: 0, history: [2.50] }],
            reviews: [{ user: 'ელენე', rating: 5, comment: ['ჩაისთვის საუკეთესო', 'Best for tea', 'Лучшее для чая'], date: '2024-04-18' }],
            nutrition: { calories: 450, protein: 5, carbs: 70, fat: 15 }
        },
        {
            id: 120,
            name: ['ხილიანი ბატონი', 'Fruit Bar', 'Фруктовый батончик'],
            image: 'fruit_bar.jpg',
            category: 'snacks',
            description: ['ჯანსაღი ხილიანი ბატონი', 'Healthy fruit bar', 'Полезный фруктовый батончик'],
            prices: [{ market: 'Magniti', price: 1.80, discount: 0, history: [1.80] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['სწრაფი საუზმე', 'Quick breakfast', 'Быстрый завтрак'], date: '2024-06-01' }],
            nutrition: { calories: 150, protein: 2, carbs: 30, fat: 3 }
        },
        {
            id: 121,
            name: ['მარმელადი', 'Marmalade', 'Мармелад'],
            image: 'marmalade.jpg',
            category: 'snacks',
            description: ['ტკბილი მარმელადი', 'Sweet marmalade', 'Сладкий мармелад'],
            prices: [{ market: 'Nikora', price: 3.00, discount: 0, history: [3.00] }],
            reviews: [{ user: 'სოფო', rating: 4, comment: ['ბავშვებს უყვართ', 'Kids love it', 'Детям нравится'], date: '2024-07-07' }],
            nutrition: { calories: 320, protein: 0, carbs: 80, fat: 0 }
        },
        {
            id: 122,
            name: ['ჟელე კანფეტი', 'Jelly Candy', 'Желейные конфеты'],
            image: 'jelly_candy.jpg',
            category: 'snacks',
            description: ['ხილის ჟელე კანფეტი', 'Fruit jelly candy', 'Фруктовые желейные конфеты'],
            prices: [{ market: 'Carrefour', price: 2.20, discount: 0, history: [2.20] }],
            reviews: [{ user: 'ალექსანდრე', rating: 3, comment: ['ძალიან ტკბილია', 'Too sweet', 'Очень сладкий'], date: '2024-08-14' }],
            nutrition: { calories: 350, protein: 5, carbs: 85, fat: 0 }
        },
    
        {
            id: 124,
            name: ['მზესუმზირა', 'Sunflower Seeds', 'Семечки подсолнуха'],
            image: 'sunflower_seeds.jpg',
            category: 'snacks',
            description: ['მოხალული მზესუმზირა', 'Roasted sunflower seeds', 'Жареные семечки подсолнуха'],
            prices: [{ market: 'Magniti', price: 1.20, discount: 0, history: [1.20] }],
            reviews: [{ user: 'ლევანი', rating: 4, comment: ['გასართობი', 'Entertaining', 'Развлечение'], date: '2024-10-25' }],
            nutrition: { calories: 584, protein: 21, carbs: 20, fat: 51 }
        },
        {
            id: 126,
            name: ['გაყინული ხილი', 'Frozen Fruits', 'Замороженные фрукты'],
            image: 'frozen_fruits.jpg',
            category: 'frozen',
            description: ['შერეული გაყინული ხილი', 'Mixed frozen fruits', 'Смешанные замороженные фрукты'],
            prices: [{ market: 'Magniti', price: 5.00, discount: 0, history: [5.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['სმუზისთვის შეუცვლელი', 'Indispensable for smoothies', 'Незаменим для смузи'], date: '2024-02-25' }],
            nutrition: { calories: 60, protein: 1, carbs: 15, fat: 0.3 }
        },
        {
            id: 127,
            name: ['გაყინული ქათამი', 'Frozen Chicken', 'Замороженная курица'],
            image: 'frozen_chicken.jpg',
            category: 'frozen',
            description: ['მთლიანი გაყინული ქათამი', 'Whole frozen chicken', 'Целая замороженная курица'],
            prices: [{ market: 'Nikora', price: 9.00, discount: 0, history: [9.00] }],
            reviews: [{ user: 'ანა', rating: 3, comment: ['საშუალო ხარისხი', 'Average quality', 'Среднее качество'], date: '2024-03-10' }],
            nutrition: { calories: 239, protein: 27, carbs: 0, fat: 14 }
        },
        {
            id: 128,
            name: ['ნაყინი', 'Ice Cream', 'Мороженое'],
            image: 'ice_cream.jpg',
            category: 'frozen',
            description: ['ვანილის ნაყინი', 'Vanilla ice cream', 'Ванильное мороженое'],
            prices: [{ market: 'Carrefour', price: 3.50, discount: 0, history: [3.50] }],
            reviews: [{ user: 'დავითი', rating: 5, comment: ['საუკეთესო დესერტი', 'Best dessert', 'Лучший десерт'], date: '2024-04-02' }],
            nutrition: { calories: 207, protein: 3.5, carbs: 24, fat: 11 }
        },
    
        {
            id: 130,
            name: ['გაყინული კოტლეტი', 'Frozen Cutlets', 'Замороженные котлеты'],
            image: 'frozen_cutlets.jpg',
            category: 'frozen',
            description: ['ქათმის კოტლეტი', 'Chicken cutlets', 'Куриные котлеты'],
            prices: [{ market: 'Magniti', price: 6.50, discount: 0, history: [6.50] }],
            reviews: [{ user: 'ნინო', rating: 3, comment: ['კარგია, მაგრამ', 'Good, but...', 'Хорошо, но...'], date: '2024-06-16' }],
            nutrition: { calories: 250, protein: 15, carbs: 10, fat: 17 }
        },
        {
            id: 131,
            name: ['გაყინული ბლინები', 'Frozen Pancakes', 'Замороженные блины'],
            image: 'frozen_pancakes.jpg',
            category: 'frozen',
            description: ['ხაჭოს ბლინები', 'Cottage cheese pancakes', 'Блины с творогом'],
            prices: [{ market: 'Nikora', price: 5.00, discount: 0, history: [5.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['უგემრიელესი', 'Delicious', 'Очень вкусно'], date: '2024-07-22' }],
            nutrition: { calories: 200, protein: 8, carbs: 25, fat: 8 }
        },
    
        {
            id: 133,
            name: ['გაყინული თევზი', 'Frozen Fish', 'Замороженная рыба'],
            image: 'frozen_fish.jpg',
            category: 'frozen',
            description: ['გაყინული ორაგული', 'Frozen salmon', 'Замороженный лосось'],
            prices: [{ market: 'Spar', price: 15.00, discount: 0, history: [15.00] }],
            reviews: [{ user: 'ალექსანდრე', rating: 5, comment: ['მაღალი ხარისხის', 'High quality', 'Высокое качество'], date: '2024-09-11' }],
            nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13 }
        },
        {
            id: 134,
            name: ['გაყინული კენკრა', 'Frozen Berries', 'Замороженные ягоды'],
            image: 'frozen_berries.jpg',
            category: 'frozen',
            description: ['შერეული კენკრა', 'Mixed berries', 'Смешанные ягоды'],
            prices: [{ market: 'Magniti', price: 6.00, discount: 0, history: [6.00] }],
            reviews: [{ user: 'მარიამი', rating: 4, comment: ['ძალიან სასარგებლო', 'Very healthy', 'Очень полезно'], date: '2024-10-18' }],
            nutrition: { calories: 50, protein: 0.5, carbs: 12, fat: 0.2 }
        },
        {
            id: 135,
            name: ['სარეცხი ფხვნილი', 'Laundry Detergent', 'Стиральный порошок'],
            image: 'laundry_detergent.jpg',
            category: 'cleaning',
            description: ['ავტომატური სარეცხი ფხვნილი', 'Automatic laundry detergent', 'Стиральный порошок автомат'],
            prices: [{ market: 'Spar', price: 8.00, discount: 0, history: [8.00] }],
            reviews: [{ user: 'ლევანი', rating: 5, comment: ['კარგად აშორებს ლაქებს', 'Removes stains well', 'Хорошо удаляет пятна'], date: '2024-01-01' }],
            nutrition: null
        },
        {
            id: 136,
            name: ['ჭურჭლის სარეცხი სითხე', 'Dish Soap', 'Моющее средство для посуды'],
            image: 'dish_soap.jpg',
            category: 'cleaning',
            description: ['ლიმონის არომატით', 'Lemon scent', 'С ароматом лимона'],
            prices: [{ market: 'Magniti', price: 3.00, discount: 0, history: [3.00] }],
            reviews: [{ user: 'თამარი', rating: 4, comment: ['კარგად ქაფდება', 'Foams well', 'Хорошо пенится'], date: '2024-02-07' }],
            nutrition: null
        },
        {
            id: 137,
            name: ['იატაკის საწმენდი', 'Floor Cleaner', 'Средство для пола'],
            image: 'floor_cleaner.jpg',
            category: 'cleaning',
            description: ['ანტიბაქტერიული იატაკის საწმენდი', 'Antibacterial floor cleaner', 'Антибактериальное средство для пола'],
            prices: [{ market: 'Nikora', price: 4.50, discount: 0, history: [4.50] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['სუფთა იატაკი', 'Clean floor', 'Чистый пол'], date: '2024-03-14' }],
            nutrition: null
        },
        {
            id: 138,
            name: ['მინის საწმენდი', 'Glass Cleaner', 'Средство для стекол'],
            image: 'glass_cleaner.jpg',
            category: 'cleaning',
            description: ['მინის საწმენდი სპრეი', 'Glass cleaner spray', 'Спрей для стекол'],
            prices: [{ market: 'Carrefour', price: 2.80, discount: 0, history: [2.80] }],
            reviews: [{ user: 'ანა', rating: 4, comment: ['არ ტოვებს კვალს', 'Leaves no streaks', 'Не оставляет разводов'], date: '2024-04-22' }],
            nutrition: null
        },
        {
            id: 139,
            name: ['აბაზანის საწმენდი', 'Bathroom Cleaner', 'Средство для ванной'],
            image: 'bathroom_cleaner.jpg',
            category: 'cleaning',
            description: ['კირქვის საწმენდი', 'Limescale cleaner', 'Средство от известкового налета'],
            prices: [{ market: 'Spar', price: 5.00, discount: 0, history: [5.00] }],
            reviews: [{ user: 'დავითი', rating: 5, comment: ['აბაზანა ბრწყინავს', 'Bathroom shines', 'Ванная блестит'], date: '2024-05-30' }],
            nutrition: null
        },
        {
            id: 140,
            name: ['ტუალეტის საწმენდი', 'Toilet Cleaner', 'Средство для унитаза'],
            image: 'toilet_cleaner.jpg',
            category: 'cleaning',
            description: ['ძლიერი სადეზინფექციო საშუალება', 'Powerful disinfectant', 'Мощное дезинфицирующее средство'],
            prices: [{ market: 'Magniti', price: 3.50, discount: 0, history: [3.50] }],
            reviews: [{ user: 'ელენე', rating: 4, comment: ['კარგად ასუფთავებს', 'Cleans well', 'Хорошо чистит'], date: '2024-06-19' }],
            nutrition: null
        },
        {
            id: 141,
            name: ['ჰაერის გამწმენდი', 'Air Freshener', 'Освежитель воздуха'],
            image: 'air_freshener.jpg',
            category: 'cleaning',
            description: ['ყვავილების სურნელი', 'Flower scent', 'Цветочный аромат'],
            prices: [{ market: 'Nikora', price: 2.20, discount: 0, history: [2.20] }],
            reviews: [{ user: 'ნინო', rating: 5, comment: ['სასიამოვნო სურნელი', 'Pleasant scent', 'Приятный аромат'], date: '2024-07-28' }],
            nutrition: null
        },
        {
            id: 142,
            name: ['ხელთათმანები', 'Gloves', 'Перчатки'],
            image: 'gloves.jpg',
            category: 'cleaning',
            description: ['რეზინის ხელთათმანები', 'Rubber gloves', 'Резиновые перчатки'],
            prices: [{ market: 'Carrefour', price: 1.50, discount: 0, history: [1.50] }],
            reviews: [{ user: 'გიორგი', rating: 4, comment: ['კარგი ზომა', 'Good size', 'Хороший размер'], date: '2024-08-09' }],
            nutrition: null
        },
        {
            id: 143,
            name: ['ტილო', 'Cloth', 'Тряпка'],
            image: 'cloth.jpg',
            category: 'cleaning',
            description: ['მიკროფიბერის ტილო', 'Microfiber cloth', 'Тряпка из микрофибры'],
            prices: [{ market: 'Spar', price: 1.00, discount: 0, history: [1.00] }],
            reviews: [{ user: 'სოფო', rating: 5, comment: ['არ ტოვებს ნაკაწრებს', 'Leaves no scratches', 'Не оставляет царапин'], date: '2024-09-17' }],
            nutrition: null
        },
        {
            id: 144,
            name: ['ჯაგრისი', 'Brush', 'Щетка'],
            image: 'brush.jpg',
            category: 'cleaning',
            description: ['ტუალეტის ჯაგრისი', 'Toilet brush', 'Щетка для унитаза'],
            prices: [{ market: 'Magniti', price: 2.00, discount: 0, history: [2.00] }],
            reviews: [{ user: 'ალექსანდრე', rating: 3, comment: ['საშუალო გამძლეობა', 'Average durability', 'Средняя прочность'], date: '2024-10-24' }],
            nutrition: null
        },
        {
            id: 145,
            name: ['წითელი ღვინო', 'Red Wine', 'Красное вино'],
            image: 'red_wine.jpg',
            category: 'alcohol',
            description: ['ქართული საფერავი', 'Georgian Saperavi', 'Грузинское Саперави'],
            prices: [{ market: 'Spar', price: 15.00, discount: 0, history: [15.00] }],
            reviews: [{ user: 'მარიამი', rating: 5, comment: ['საუკეთესო ვახშამთან', 'Best with dinner', 'Лучшее к ужину'], date: '2024-01-08' }],
            nutrition: null
        },
        {
            id: 146,
            name: ['თეთრი ღვინო', 'White Wine', 'Белое вино'],
            image: 'white_wine.jpg',
            category: 'alcohol',
            description: ['ქართული რქაწითელი', 'Georgian Rkatsiteli', 'Грузинское Ркацители'],
            prices: [{ market: 'Magniti', price: 12.00, discount: 0, history: [12.00] }],
            reviews: [{ user: 'ლევანი', rating: 4, comment: ['კარგია თევზთან', 'Good with fish', 'Хорошо с рыбой'], date: '2024-02-04' }],
            nutrition: null
        },
        {
            id: 147,
            name: ['ლუდი', 'Beer', 'Пиво'],
            image: 'beer.jpg',
            category: 'alcohol',
            description: ['ქართული ლუდი', 'Georgian Beer', 'Грузинское пиво'],
            prices: [{ market: 'Nikora', price: 2.50, discount: 0, history: [2.50] }],
            reviews: [{ user: 'თამარი', rating: 3, comment: ['გამაგრილებელი', 'Refreshing', 'Освежающее'], date: '2024-03-01' }],
            nutrition: null
        },
    
        {
            id: 151,
            name: ['შამპანური', 'Champagne', 'Шампанское'],
            image: 'champagne.jpg',
            category: 'alcohol',
            description: ['ფრანგული შამპანური', 'French Champagne', 'Французское шампанское'],
            prices: [{ market: 'Nikora', price: 30.00, discount: 0, history: [30.00] }],
            reviews: [{ user: 'ელენე', rating: 4, comment: ['დღესასწაულისთვის', 'For celebration', 'Для праздника'], date: '2024-07-01' }],
            nutrition: null
        },
        {
            id: 152,
            name: ['ტეკილა', 'Tequila', 'Текила'],
            image: 'tequila.jpg',
            category: 'alcohol',
            description: ['მექსიკური ტეკილა', 'Mexican Tequila', 'Мексиканская текила'],
            prices: [{ market: 'Carrefour', price: 35.00, discount: 0, history: [35.00] }],
            reviews: [{ user: 'ნინო', rating: 3, comment: ['ლიმონით და მარილით', 'With lemon and salt', 'С лимоном и солью'], date: '2024-08-05' }],
            nutrition: null
        },
        {
            id: 153,
            name: ['ჯინი', 'Gin', 'Джин'],
            image: 'gin.jpg',
            category: 'alcohol',
            description: ['ინგლისური ჯინი', 'English Gin', 'Английский джин'],
            prices: [{ market: 'Spar', price: 28.00, discount: 0, history: [28.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['ტონიკთან ერთად', 'With tonic', 'С тоником'], date: '2024-09-10' }],
            nutrition: null
        },
        {
            id: 154,
            name: ['რომი', 'Rum', 'Ром'],
            image: 'rum.jpg',
            category: 'alcohol',
            description: ['კარიბის რომი', 'Caribbean Rum', 'Карибский ром'],
            prices: [{ market: 'Magniti', price: 25.00, discount: 0, history: [25.00] }],
            reviews: [{ user: 'სოფო', rating: 4, comment: ['კოკტეილებისთვის', 'For cocktails', 'Для коктейлей'], date: '2024-10-15' }],
            nutrition: null
        },
        {
            id: 155,
            name: ['ბანდაჟი', 'Bandage', 'Бинт'],
            image: 'bandage.jpg',
            category: 'health',
            description: ['სტერილური ბანდაჟი', 'Sterile bandage', 'Стерильный бинт'],
            prices: [{ market: 'Spar', price: 2.00, discount: 0, history: [2.00] }],
            reviews: [{ user: 'ალექსანდრე', rating: 5, comment: ['პირველადი დახმარებისთვის', 'For first aid', 'Для первой помощи'], date: '2024-01-02' }],
            nutrition: null
        },
        {
            id: 156,
            name: ['პირბადე', 'Face Mask', 'Маска для лица'],
            image: 'face_mask.jpg',
            category: 'health',
            description: ['ერთჯერადი პირბადე', 'Disposable face mask', 'Одноразовая маска для лица'],
            prices: [{ market: 'Magniti', price: 1.00, discount: 0, history: [1.00] }],
            reviews: [{ user: 'მარიამი', rating: 4, comment: ['ყოველდღიური გამოყენებისთვის', 'For daily use', 'Для ежедневного использования'], date: '2024-02-09' }],
            nutrition: null
        },
        {
            id: 157,
            name: ['ანტისეპტიკური ხსნარი', 'Antiseptic Solution', 'Антисептический раствор'],
            image: 'antiseptic_solution.jpg',
            category: 'health',
            description: ['ხელის ანტისეპტიკური ხსნარი', 'Hand antiseptic solution', 'Антисептический раствор для рук'],
            prices: [{ market: 'Nikora', price: 3.00, discount: 0, history: [3.00] }],
            reviews: [{ user: 'ლევანი', rating: 5, comment: ['აუცილებელია', 'Necessary', 'Необходимо'], date: '2024-03-16' }],
            nutrition: null
        },
        {
            id: 158,
            name: ['პლასტირი', 'Plaster', 'Пластырь'],
            image: 'plaster.jpg',
            category: 'health',
            description: ['წყალგამძლე პლასტირი', 'Waterproof plaster', 'Водостойкий пластырь'],
            prices: [{ market: 'Carrefour', price: 1.50, discount: 0, history: [1.50] }],
            reviews: [{ user: 'თამარი', rating: 4, comment: ['კარგად ეკრობა', 'Sticks well', 'Хорошо прилипает'], date: '2024-04-25' }],
            nutrition: null
        },
        {
            id: 159,
            name: ['ვიტამინები', 'Vitamins', 'Витамины'],
            image: 'vitamins.jpg',
            category: 'health',
            description: ['მულტივიტამინები', 'Multivitamins', 'Мультивитамины'],
            prices: [{ market: 'Spar', price: 10.00, discount: 0, history: [10.00] }],
            reviews: [{ user: 'გიორგი', rating: 5, comment: ['ენერგიისთვის', 'For energy', 'Для энергии'], date: '2024-05-01' }],
            nutrition: null
        },
        {
            id: 160,
            name: ['ტკივილგამაყუჩებელი', 'Painkiller', 'Обезболивающее'],
            image: 'painkiller.jpg',
            category: 'health',
            description: ['თავის ტკივილის საწინააღმდეგო', 'Headache relief', 'От головной боли'],
            prices: [{ market: 'Magniti', price: 4.00, discount: 0, history: [4.00] }],
            reviews: [{ user: 'ანა', rating: 4, comment: ['სწრაფად მოქმედებს', 'Acts quickly', 'Быстро действует'], date: '2024-06-06' }],
            nutrition: null
        },
        {
            id: 161,
            name: ['სიცხის დამწევი', 'Fever Reducer', 'Жаропонижающее'],
            image: 'fever_reducer.jpg',
            category: 'health',
            description: ['ბავშვთა სიცხის დამწევი', 'Children\'s fever reducer', 'Детское жаропонижающее'],
            prices: [{ market: 'Nikora', price: 5.00, discount: 0, history: [5.00] }],
            reviews: [{ user: 'დავითი', rating: 5, comment: ['უსაფრთხოა ბავშვებისთვის', 'Safe for children', 'Безопасно для детей'], date: '2024-07-13' }],
            nutrition: null
        },
        {
            id: 162,
            name: ['ხველის წამალი', 'Cough Medicine', 'Лекарство от кашля'],
            image: 'cough_medicine.jpg',
            category: 'health',
            description: ['მშრალი ხველის სიროფი', 'Dry cough syrup', 'Сироп от сухого кашля'],
            prices: [{ market: 'Carrefour', price: 6.00, discount: 0, history: [6.00] }],
            reviews: [{ user: 'ელენე', rating: 4, comment: ['შველის ხველას', 'Helps with cough', 'Помогает от кашля'], date: '2024-08-19' }],
            nutrition: null
        }
    ]
};