# FreshCart E-Commerce Platform

A modern, professional e-commerce platform built with React, Vite, and Tailwind CSS. This application provides a complete online shopping experience with user authentication, product management, cart functionality, and responsive design.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Secure login/register system with JWT tokens
- **Product Management**: Browse products with categories and brands
- **Shopping Cart**: Add/remove items with real-time updates
- **Product Details**: Detailed product information with ratings
- **Responsive Design**: Mobile-first approach for all devices
- **Search & Filter**: Advanced product filtering capabilities
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: Formik with Yup validation
- **UI Components**: Flowbite React
- **Icons**: FontAwesome
- **Carousel**: React Slick
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freshcart-ecommerce.git
   cd freshcart-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Main layout wrapper
│   ├── Navbar/         # Navigation component
│   ├── Home/           # Home page component
│   ├── Product/        # Product listing
│   ├── Cart/           # Shopping cart
│   └── ...
├── context/            # React Context providers
│   ├── AuthContextProvider.jsx
│   └── CartContextProvider.jsx
├── assets/             # Static assets
│   └── images/         # Image files
└── main.jsx           # Application entry point
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules
- `postcss.config.js` - PostCSS configuration

## 🎨 Customization

### Colors
The project uses CSS custom properties for consistent theming:
```css
:root {
  --main-color: #0aad0a;
  --light-color: #f0f3f2;
  --shadow: rgba(145,158,171,.2) 0px 2px 4px -1px;
  --rating-color: #ffc908;
}
```

### Fonts
The application uses 'Encode Sans Expanded' as the primary font family.

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- Responsive navigation
- Adaptive product grids
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🔒 Security Features

- JWT token-based authentication
- Protected routes for authenticated users
- Secure API communication
- Input validation with Yup schemas

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Flowbite React](https://flowbite-react.com/) - UI components for React

## 📞 Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

**Built with ❤️ using React and Vite**
"# ecommerce" 
