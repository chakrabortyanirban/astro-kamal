# Prompt: Create a Professional Astrologer Website for Kamal Chandra Karmakar

## Role & Goal
You are an expert Frontend Web Developer specializing in creating high-converting, aesthetically pleasing, and responsive websites. Your task is to build a modern, professional, and mystical website for **Kamal Chandra Karmakar**, a highly qualified astrologer.

The goal is to establish online credibility, showcase expertise, and facilitate client bookings through an intuitive user interface.

## Technical Requirements
- **Core Technologies**: HTML5, CSS3, JavaScript (ES6+).
- **Libraries**: jQuery (latest CDN).
- **Responsiveness**: Mobile-first design, fully responsive across all devices (Desktop, Tablet, Mobile).
- **Icons**: Use FontAwesome or similar for UI icons.
- **Animations**: Include subtle AOS (Animate On Scroll) or CSS transitions for a premium feel.

## Visual Design & Aesthetics
- **Theme**: Deep Cosmic. Use a palette of deep blues, dark purples, and midnight blacks.
- **Accents**: Gold or celestial silver for buttons, borders, and highlights.
- **Imagery**:
  - Main Portrait: `../Myself_photo.jpg` (Used in Hero/About sections).
  - Backgrounds: High-quality cosmic images (stars, nebulae, zodiac constellations).
  - Credentials: `../ASTROLOGY_PAD.jpg` (Reference for detailed qualifications).
- **Typography**: Elegant serif fonts for headings (to imply wisdom/tradition) and clean sans-serif for body text (for readability).

## Website Structure

### 1. Global Navigation (Header)
- Sticky menu with links: Home, About, Services, Appointment, Contact.
- Mobile toggle menu (hamburger).

### 2. Home Page Sections
- **Hero Section**:
    - High-impact headline: "Unlock Your Destiny with Expert Guidance" or similar.
    - Professional photo of Kamal Chandra Karmakar.
    - CTA: "Book a Consultation" (links to Appointment section).
- **About Me**:
    - Detailed Bio: Based on provided particulars.
    - Highlight: "Life Member of ARP", "Regt. No. ARP/PA/1053/2008AD(WB)".
- **Educational Qualifications**:
    - **Jyotish Acharjya** (Post Graduate, 2010).
    - **Krishnamurthy Bachaspati** (PG in KP Astrology, Nov 2016).
    - **Jyotish Bharati** (Palmistry Diploma, 1997).
- **Services Offered**: Grid layout for Marriage, Job/Career, Litigation, Health/Disease, and Prediction.
- **Fee Structure**: Clear, transparent pricing table.
- **Customer Feedback**: A slider or grid showing client testimonials.

### 3. Consultation & Appointment Page (Functional)
- **Booking Steps**:
    1. **Personal Information**: Name, Email, Phone.
    2. **Birth Details (Critical)**:
        - Date of Birth (Calendar picker).
        - Exact Time of Birth (HH:MM AM/PM).
        - Place of Birth (City, State, Country).
    3. **Document Upload**: Multi-file upload for palm photos, old Kundali, or birth certificates (.jpg, .png, .pdf).
    4. **Transaction Details**: Field for "Transaction ID" (Optional) for cross-referencing payments.
- **Payment Integration Display**:
    - Show a WhatsApp link or QR Code for advance payment.
    - Instructions for "Quick Advance Payment".

### 4. Contact Me Page
- Integrated Google Map (placeholder).
- Simplified contact form for general inquiries.
- Direct links to WhatsApp and Social Media.

### 5. Global Footer
- Professional summary.
- Quick links and contact details (Phone: +91-8167469118).
- Copyright notice.

## Data Handling Logic (JavaScript)
- **Form Submission**: On submit, collect all form data (including files) and simulate an email trigger or API call.
- **Validation**: Ensure birth time and date are mandatory. Limit file uploads to 3 files, max 5MB each.

---

### Reference Inspiration
- [Rajat Nayar](https://www.rajatnayarastrologer.com/)
- [Astro Arun Pandit](https://astroarunpandit.org/)
