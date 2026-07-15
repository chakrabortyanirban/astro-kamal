# Kamal Chandra Karmakar - Professional Astrologer Website

A modern, responsive website for professional astrological consultation services.

## Features

✨ **Modern Design**
- Deep cosmic theme with gold accents
- Smooth animations and transitions
- Fully responsive across all devices

📱 **Responsive Layout**
- Mobile-first design approach
- Optimized for Desktop, Tablet, and Mobile
- Hamburger menu for mobile navigation

🎯 **Key Sections**
- Hero section with compelling CTA
- About section with credentials
- Educational qualifications showcase
- Services grid with 6 key offerings
- Client testimonials slider
- Multi-step appointment booking form
- Contact form with validation

📝 **Advanced Appointment Form**
- 3-step multi-stage form
- Personal information collection
- Critical birth details (Date, Time, Place)
- Multi-file upload (max 3 files, 5MB each)
- Payment QR code integration
- Transaction ID tracking
- Real-time form validation

🎨 **Technologies Used**
- HTML5
- CSS3 (Modern Flexbox & Grid)
- JavaScript (ES6+)
- jQuery 3.6.0
- AOS (Animate On Scroll) Library
- Font Awesome Icons
- Google Fonts (Cinzel & Poppins)

## Installation

1. **Clone or Download** the repository
2. **Update Images**: Replace placeholder images with actual ones:
   - `Myself_photo.jpg` - Professional photo
   - `ASTROLOGY_PAD.jpg` - Credentials/Professional pad
   - `assets/images/qr-code.png` - Payment QR code

3. **Configure Email**: Update the form submission endpoints in `assets/js/main.js`:
   - Appointment form submission (line ~220)
   - Contact form submission (line ~250)

4. **Deploy**: Upload all files to your web server

## File Structure

```
astro-kamal/
│
├── index.html              # Main HTML file
├── README.md               # This file
│
├── assets/
│   ├── css/
│   │   └── style.css       # All styles
│   ├── js/
│   │   └── main.js         # All JavaScript functionality
│   └── images/
│       └── qr-code.png     # Payment QR code
│
├── prompts/
│   ├── create-sites.md     # Website creation prompt
│   └── site-details.md     # Design specifications
│
├── Myself_photo.jpg        # Astrologer photo
└── ASTROLOGY_PAD.jpg       # Professional credentials
```

## Customization

### Colors
Edit CSS variables in `assets/css/style.css` (lines 1-15):
```css
:root {
    --primary-color: #ffd700;    /* Gold */
    --secondary-color: #c9a227;  /* Dark Gold */
    --dark-bg: #0a0a23;          /* Dark Blue */
    /* ... */
}
```

### Content
- Update personal information in `index.html`
- Modify service offerings
- Add/edit testimonials
- Update contact details

### Form Submission
Connect forms to your backend by modifying the AJAX calls in `assets/js/main.js`:

```javascript
$.ajax({
    url: 'your-endpoint.php',
    type: 'POST',
    data: formData,
    // ... configuration
});
```

## Form Validation Rules

**Appointment Form:**
- Name: Required
- Email: Required, must be valid format
- Phone: Required, numbers only
- Date of Birth: Required, cannot be future date
- Time of Birth: Required
- Place of Birth: Required
- Files: Optional, max 3 files, 5MB each, JPG/PNG/PDF only
- Transaction ID: Optional

**Contact Form:**
- Name: Required
- Email: Required, must be valid format
- Subject: Optional
- Message: Required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images (use compressed JPG/PNG)
- Minified CSS and JS (for production)
- Lazy loading for images
- CDN for libraries

## Security Recommendations

1. **File Upload**: Implement server-side validation
2. **CAPTCHA**: Add reCAPTCHA to prevent spam
3. **HTTPS**: Always use SSL certificate
4. **Input Sanitization**: Sanitize all form inputs on server
5. **Rate Limiting**: Prevent form spam

## Future Enhancements

- [ ] Blog section for astrological articles
- [ ] Online payment gateway integration
- [ ] Client portal for booking history
- [ ] Live chat support
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] Dark/Light mode toggle

## Contact Information

**Kamal Chandra Karmakar**
- Phone: 8167469118
- Registration: ARP/PA/1053/2008AD(WB)
- Services: Online & Offline Consultation

## License

This website is created for Kamal Chandra Karmakar. All rights reserved.

## Credits

- Design & Development: Custom built
- Icons: Font Awesome
- Fonts: Google Fonts (Cinzel, Poppins)
- Animations: AOS Library

---

**Note**: Replace all placeholder content with actual information before deploying to production.
