# Deployment Guide

## Quick Start (Local Testing)

### Option 1: Python HTTP Server
```bash
# Navigate to project folder
cd d:\Projects\astro-kamal

# Start server (Python 3)
python -m http.server 8000

# Open browser to: http://localhost:8000
```

### Option 2: PHP Built-in Server
```bash
cd d:\Projects\astro-kamal
php -S localhost:8000

# Open browser to: http://localhost:8000
```

### Option 3: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Production Deployment

### Hosting Options

#### 1. **Shared Hosting** (Recommended for beginners)
Services: Hostinger, Bluehost, SiteGround, GoDaddy

**Steps:**
1. Purchase hosting plan with cPanel
2. Upload all files via FTP or cPanel File Manager
3. Point domain to hosting
4. Configure SSL certificate (free via Let's Encrypt)

**FTP Upload:**
```
Host: ftp.yourdomain.com
Username: your_username
Password: your_password
Port: 21

Upload all files to public_html/ or www/ folder
```

#### 2. **GitHub Pages** (Free Static Hosting)
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub
# Push to GitHub
git remote add origin https://github.com/yourusername/astro-kamal.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
# Site will be live at: https://yourusername.github.io/astro-kamal
```

#### 3. **Netlify** (Free with drag & drop)
1. Go to https://netlify.com
2. Sign up for free account
3. Drag and drop your project folder
4. Get instant URL
5. Configure custom domain (optional)

#### 4. **Vercel** (Free tier available)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd d:\Projects\astro-kamal
vercel

# Follow prompts
```

### Pre-Deployment Checklist

- [ ] Replace `Myself_photo.jpg` with actual professional photo
- [ ] Replace `ASTROLOGY_PAD.jpg` with credentials document
- [ ] Replace `assets/images/qr-code.svg` with actual payment QR code
- [ ] Update contact email in forms
- [ ] Configure form submission endpoint (PHP/Node.js backend)
- [ ] Test all forms locally
- [ ] Optimize images (compress JPG/PNG files)
- [ ] Add Google Analytics (optional)
- [ ] Add reCAPTCHA for spam prevention
- [ ] Test on mobile devices
- [ ] Configure SSL certificate
- [ ] Set up email forwarding for contact form

### Form Backend Setup

#### PHP Backend (contact-form.php)
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "your-email@example.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
```

Update `assets/js/main.js` to point to this file.

#### Node.js Backend (using Express & Nodemailer)
```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/submit-contact', async (req, res) => {
    // Configure email transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password'
        }
    });
    
    // Send email
    await transporter.sendMail({
        from: req.body.email,
        to: 'your-email@gmail.com',
        subject: 'New Contact Form',
        text: `Name: ${req.body.name}\nMessage: ${req.body.message}`
    });
    
    res.json({ success: true });
});

app.listen(3000);
```

### Performance Optimization

#### Image Optimization
```bash
# Install ImageMagick or use online tools
# Compress JPEG (quality 85%)
magick Myself_photo.jpg -quality 85 Myself_photo.jpg

# Compress PNG
pngquant Myself_photo.png --output Myself_photo.png
```

#### Minify CSS & JS (for production)
Use online tools:
- CSS: https://cssminifier.com/
- JS: https://javascript-minifier.com/

Or use build tools:
```bash
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o assets/css/style.min.css assets/css/style.css

# Minify JS
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

### Domain Configuration

#### Custom Domain Setup
1. Purchase domain from: GoDaddy, Namecheap, Google Domains
2. Point DNS to your hosting:
   ```
   Type    Name    Value
   A       @       YOUR_SERVER_IP
   CNAME   www     yourdomain.com
   ```
3. Wait for DNS propagation (up to 48 hours)

### SSL Certificate (HTTPS)

#### Free SSL with Let's Encrypt
Most hosting providers offer one-click SSL installation.

Manual installation:
```bash
# Using Certbot
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

### Maintenance

#### Regular Updates
- Keep WordPress/CMS updated (if using)
- Monitor form submissions
- Check broken links monthly
- Update testimonials regularly
- Backup website monthly

#### Analytics
Add Google Analytics:
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Troubleshooting

**Forms not working:**
- Check email configuration
- Verify SMTP settings
- Test with dummy data
- Check browser console for errors

**Images not loading:**
- Verify file paths are correct
- Check file permissions (755 for folders, 644 for files)
- Ensure images are in correct directory

**Mobile responsive issues:**
- Test on real devices
- Use Chrome DevTools mobile emulation
- Validate HTML/CSS

### Support

For technical assistance:
- Phone: 8167469118
- Check browser console for JavaScript errors
- Verify all file paths are relative
- Ensure CDN links are accessible

---

**Last Updated:** 2026-07-15
