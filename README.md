# Futuristic Portfolio Template

A modern, interactive portfolio template built with React, Material-UI, and Framer Motion. Features a cyberpunk-inspired design with smooth animations and interactive elements.

![Portfolio Preview](preview.png)

## ✨ Features

- 🎨 Modern, futuristic design with cyberpunk aesthetics
- 🌟 Interactive elements and smooth animations using Framer Motion
- 💫 Custom cursor with hover effects
- 🌐 Animated particle background
- 🎭 3D card flips and hover effects
- 📱 Fully responsive design
- 🎯 Animated skill bars and timeline
- 🔍 Filterable project showcase
- 📝 Interactive contact form
- 🌈 Glassmorphism effects

## 🚀 Technologies Used

- React
- Material-UI (MUI)
- Framer Motion
- React Router DOM
- React Intersection Observer

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-template.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Customization

### 1. Personal Information
- Edit `src/sections/Hero.jsx` to update your name and title
- Modify the about text in `src/sections/About.jsx`
- Update your skills and experience in the About section

### 2. Projects
- Add your projects in `src/sections/Projects.jsx`
- Update project images, descriptions, and links
- Customize project categories and filters

### 3. Contact Information
- Update social links in `src/sections/Contact.jsx`
- Customize the contact form submission logic
- Add your email and social media profiles

### 4. Styling
- Main theme colors can be modified in `src/App.jsx`
- Global styles are in `src/styles/globals.css`
- Component-specific styles are within their respective files

## 🎨 Theme Customization

The template uses a cyberpunk-inspired color scheme:
- Primary: `#00f5ff` (Cyber blue)
- Secondary: `#ff0099` (Neon pink)
- Background: `#050714` (Deep space black)

To change the color scheme, edit the theme object in `src/App.jsx`:

```javascript
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#00f5ff', // Change primary color
    },
    secondary: {
      main: '#ff0099', // Change secondary color
    },
    // ...
  },
});
```

## 📱 Responsive Design

The template is fully responsive and optimized for:
- Desktop (1200px+)
- Laptop (1024px)
- Tablet (768px)
- Mobile (480px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Particle background inspired by [VincentGarreau/particles.js](https://github.com/VincentGarreau/particles.js/)
- 3D card effects inspired by various CodePen examples
- Icons from Material-UI Icons

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:
- Email: your.email@example.com
- Twitter: [@yourusername](https://twitter.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

Made with ❤️ by [Your Name]
