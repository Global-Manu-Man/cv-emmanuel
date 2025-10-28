# Contributing to Emmanuel Sandoval Portfolio

First off, thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members
- ❌ Don't use inappropriate language or imagery
- ❌ Don't engage in trolling or insulting comments
- ❌ Don't harass others publicly or privately

---

## 💡 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates.

**When submitting a bug report, include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information
- Any relevant error messages

**Example Bug Report:**
```markdown
**Title:** Contact form not submitting on Safari 14

**Description:**
The contact form doesn't submit when using Safari 14 on macOS Big Sur.

**Steps to Reproduce:**
1. Open website in Safari 14
2. Fill out the contact form
3. Click "Submit"
4. Nothing happens

**Expected:** Form should submit and show success message
**Actual:** Form doesn't submit, no feedback

**Browser:** Safari 14.0
**OS:** macOS Big Sur 11.6
```

### Suggesting Enhancements ✨

Enhancement suggestions are tracked as GitHub issues.

**When suggesting an enhancement, include:**
- A clear and descriptive title
- Detailed description of the proposed feature
- Why this enhancement would be useful
- Examples of how it would work
- Mockups or examples if applicable

### Code Contributions 💻

1. **Find an issue to work on** or create a new one
2. **Comment on the issue** to let others know you're working on it
3. **Fork the repository** and create a new branch
4. **Make your changes** following our style guidelines
5. **Test thoroughly** in multiple browsers
6. **Submit a pull request** with a clear description

---

## 🛠️ Development Process

### Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cv-emmanuel.git
   cd cv-emmanuel
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Edit HTML, CSS, or JavaScript files
   - Test in multiple browsers
   - Ensure responsive design works

5. **Test your changes**
   ```bash
   # Open in browser or use a local server
   python -m http.server 8000
   # or
   npx http-server
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

---

## 🎨 Style Guidelines

### HTML Guidelines

```html
<!-- ✅ Good: Semantic HTML with proper indentation -->
<section class="services" id="services">
    <div class="container">
        <h2 class="section-title">Services</h2>
        <p class="section-subtitle">Description here</p>
    </div>
</section>

<!-- ❌ Bad: Non-semantic with poor formatting -->
<div class="services" id="services"><div class="container"><h2>Services</h2></div></div>
```

**Rules:**
- Use semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, etc.)
- Proper indentation (4 spaces)
- Include `alt` attributes for images
- Use meaningful class names
- Add comments for complex sections

### CSS Guidelines

```css
/* ✅ Good: Well-organized with comments */
/* ==================== SERVICES SECTION ==================== */

.services {
    padding: 4rem 0;
    background: var(--light-bg);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

/* ❌ Bad: Poorly organized, no comments */
.services{padding:4rem 0;background:#fff;}
.services-grid{display:grid;gap:2rem;}
```

**Rules:**
- Use CSS variables for colors and common values
- Group related styles together
- Add section comments
- Use meaningful class names (BEM methodology preferred)
- Mobile-first responsive design
- Proper indentation (4 spaces)
- One selector per line for multiple selectors

### JavaScript Guidelines

```javascript
// ✅ Good: Clean, commented, ES6+
/**
 * Initializes the projects carousel
 * @returns {void}
 */
function initProjectsCarousel() {
    const carouselElement = document.getElementById('projectsCarousel');
    
    if (!carouselElement) {
        console.error('Carousel element not found');
        return;
    }
    
    const slider = new KeenSlider('#projectsCarousel', {
        loop: true,
        slides: { perView: 1, spacing: 24 }
    });
}

// ❌ Bad: No comments, unclear names, old syntax
function init(){
var a=document.getElementById('projectsCarousel');
if(!a)return;
var b=new KeenSlider('#projectsCarousel',{loop:true});
}
```

**Rules:**
- Use ES6+ syntax (const/let, arrow functions, etc.)
- Add JSDoc comments for functions
- Use meaningful variable names
- Handle errors gracefully
- Add console logs for debugging (remove before PR)
- Use event delegation when possible
- Avoid global variables
- Proper indentation (4 spaces)

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(contact): add form validation"

# Bug fix
git commit -m "fix(carousel): resolve navigation button alignment"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(css): improve responsive layout for tablets"

# Refactor
git commit -m "refactor(js): optimize scroll animation performance"
```

### Good Commit Messages

✅ **Good:**
```
feat(services): add hover effects to service cards

- Added smooth transition on hover
- Implemented elevation animation
- Improved visual feedback
```

❌ **Bad:**
```
updated stuff
```

```
fixed bug
```

```
changes
```

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test in both light and dark modes
- [ ] Ensure no console errors
- [ ] Update documentation if needed
- [ ] Follow the style guidelines
- [ ] Write meaningful commit messages

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots (if applicable)
Add screenshots to show the changes

## Testing
Describe how you tested the changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have tested in multiple browsers
- [ ] I have tested responsive design
- [ ] I have updated the documentation
- [ ] My commits follow the commit guidelines
```

### Review Process

1. **Automated checks** will run (if configured)
2. **Maintainers will review** your code
3. **Address feedback** if any changes are requested
4. **Once approved**, your PR will be merged

### After Your PR is Merged

1. **Delete your branch** (optional)
   ```bash
   git branch -d feature/your-feature-name
   ```

2. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

3. **Celebrate!** 🎉 You've contributed to the project!

---

## 🏆 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- A special CONTRIBUTORS.md file

---

## 📞 Questions?

If you have questions, feel free to:
- Open an issue with the `question` label
- Reach out via email: sandoval.morales.emmanuel@gmail.com
- Connect on LinkedIn: [emmanuel-sandoval-global](https://www.linkedin.com/in/emmanuel-sandoval-global)

---

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! ❤️

---

**Happy Coding!** 💻✨
