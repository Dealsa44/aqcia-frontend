// core/mocks/footer.mocks.ts
export const footerMocks = {
  sections: [
    {
      title: ['ჩვენ შესახებ', 'About Us', 'О нас'],
      links: [
        { text: ['ისტორია', 'History', 'История'], path: 'about/history' },
        { text: ['გუნდი', 'Team', 'Команда'], path: 'about/team' }
      ]
    },
    {
      title: ['კონტაქტი', 'Contact', 'Контакт'],
      links: [
        { text: ['ელ. ფოსტა', 'Email', 'Почта'], path: 'contact/email' },
        { text: ['ტელეფონი', 'Phone', 'Телефон'], path: 'contact/phone' }
      ]
    }
  ],
  socialSectionTitle: ['სოციალური ქსელი', 'Social Media', 'Социальные сети'],
  social: [
    { icon: 'facebook', path: '#' },
    { icon: 'instagram', path: '#' },
    { icon: 'twitter', path: '#' }
  ],
  copyright: ['© 2025 GroceryCompare. ყველა უფლება დაცულია.', 
              '© 2025 GroceryCompare. All rights reserved.', 
              '© 2025 GroceryCompare. Все права защищены.']
};