// ========================================
// Initialize AOS (Animate On Scroll)
// ========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========================================
// Navigation & Hamburger Menu
// ========================================
$(document).ready(function () {
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');

    // Toggle mobile menu
    hamburger.on('click', function () {
        hamburger.toggleClass('active');
        navMenu.toggleClass('active');
    });

    // Close menu when clicking on a link
    $('.nav-link').on('click', function () {
        hamburger.removeClass('active');
        navMenu.removeClass('active');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Header scroll effect
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('.header').css('background', 'rgba(10, 10, 35, 0.98)');
        } else {
            $('.header').css('background', 'rgba(10, 10, 35, 0.95)');
        }
    });

    // ========================================
    // Multi-Step Appointment Form
    // ========================================
    let currentStep = 1;
    const totalSteps = 3;

    function showStep(step) {
        $('.form-section').removeClass('active');
        $(`.form-section[data-step="${step}"]`).addClass('active');

        // Update progress indicators
        $('.progress-step').removeClass('active');
        for (let i = 1; i <= step; i++) {
            $(`.progress-step:nth-child(${i * 2 - 1})`).addClass('active');
        }

        // Update button visibility
        if (step === 1) {
            $('#prevBtn').hide();
        } else {
            $('#prevBtn').show();
        }

        if (step === totalSteps) {
            $('#nextBtn').hide();
            $('#submitBtn').show();
        } else {
            $('#nextBtn').show();
            $('#submitBtn').hide();
        }
    }

    // Next button
    $('#nextBtn').on('click', function () {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    // Previous button
    $('#prevBtn').on('click', function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Validate current step
    function validateCurrentStep() {
        const currentSection = $(`.form-section[data-step="${currentStep}"]`);
        const requiredInputs = currentSection.find('input[required], textarea[required]');
        let isValid = true;

        requiredInputs.each(function () {
            if (!$(this).val()) {
                isValid = false;
                $(this).css('border-color', '#ff4444');

                // Show error message
                if (!$(this).next('.error-message').length) {
                    $(this).after('<small class="error-message" style="color: #ff4444; display: block; margin-top: 0.3rem;">This field is required</small>');
                }
            } else {
                $(this).css('border-color', 'rgba(255, 255, 255, 0.1)');
                $(this).next('.error-message').remove();
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
        }

        return isValid;
    }

    // Remove error styling on input
    $('input, textarea').on('input', function () {
        $(this).css('border-color', 'rgba(255, 255, 255, 0.1)');
        $(this).next('.error-message').remove();
    });

    // ========================================
    // File Upload Handling
    // ========================================
    let selectedFiles = [];
    const maxFiles = 3;
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    $('#documents').on('change', function (e) {
        const files = Array.from(e.target.files);

        if (selectedFiles.length + files.length > maxFiles) {
            showNotification(`Maximum ${maxFiles} files allowed`, 'error');
            return;
        }

        files.forEach(file => {
            // Validate file size
            if (file.size > maxFileSize) {
                showNotification(`${file.name} exceeds 5MB limit`, 'error');
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                showNotification(`${file.name} is not a valid file type`, 'error');
                return;
            }

            selectedFiles.push(file);
        });

        displayFileList();
    });

    function displayFileList() {
        const fileList = $('#file-list');
        fileList.empty();

        if (selectedFiles.length === 0) return;

        selectedFiles.forEach((file, index) => {
            const fileItem = $(`
                <div class="file-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; background: rgba(255, 255, 255, 0.05); border-radius: 5px; margin-bottom: 0.5rem;">
                    <span style="color: var(--text-light);">
                        <i class="fas ${getFileIcon(file.type)}"></i> ${file.name}
                        <small style="color: var(--text-gray); margin-left: 10px;">(${formatFileSize(file.size)})</small>
                    </span>
                    <button type="button" class="remove-file" data-index="${index}" style="background: #ff4444; border: none; color: white; padding: 0.3rem 0.8rem; border-radius: 3px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `);
            fileList.append(fileItem);
        });

        // Remove file handler
        $('.remove-file').on('click', function () {
            const index = $(this).data('index');
            selectedFiles.splice(index, 1);
            displayFileList();
        });
    }

    function getFileIcon(type) {
        if (type.includes('pdf')) return 'fa-file-pdf';
        if (type.includes('image')) return 'fa-file-image';
        return 'fa-file';
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    // ========================================
    // Form Submission
    // ========================================
    $('#appointment-form').on('submit', function (e) {
        e.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        // Collect form data
        const formData = new FormData(this);

        // Add files
        selectedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        // Show loading state
        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Submitting...');

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            showNotification('Consultation request submitted successfully! We will contact you soon.', 'success');

            // Reset form
            $('#appointment-form')[0].reset();
            selectedFiles = [];
            displayFileList();
            currentStep = 1;
            showStep(1);

            submitBtn.prop('disabled', false).html(originalText);
        }, 2000);

        // Actual implementation would look like:
        /*
        $.ajax({
            url: 'submit-appointment.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                showNotification('Consultation request submitted successfully!', 'success');
                $('#appointment-form')[0].reset();
            },
            error: function() {
                showNotification('Error submitting form. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).html(originalText);
            }
        });
        */
    });

    // ========================================
    // Contact Form Submission
    // ========================================
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        const btn = $(this).find('button[type="submit"]');
        const originalText = btn.html();
        btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');

        // Simulate submission
        setTimeout(() => {
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            $('#contact-form')[0].reset();
            btn.prop('disabled', false).html(originalText);
        }, 1500);
    });

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();

        const colors = {
            success: '#38ef7d',
            error: '#ff4444',
            info: '#ffd700'
        };

        const notification = $(`
            <div class="notification" style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${colors[type]};
                color: #0a0a23;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                font-weight: 600;
                animation: slideIn 0.3s ease-out;
            ">
                ${message}
            </div>
        `);

        $('body').append(notification);

        setTimeout(() => {
            notification.fadeOut(300, function () {
                $(this).remove();
            });
        }, 4000);
    }

    // Add slide-in animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `)
        .appendTo('head');

    // ========================================
    // Testimonials Slider
    // ========================================
    let testimonialIndex = 0;
    const testimonials = $('.testimonial-card');

    function showTestimonial(index) {
        testimonials.removeClass('active');
        testimonials.eq(index).addClass('active');
    }

    function nextTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }

    // Auto-rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(nextTestimonial, 5000);
    }

    // ========================================
    // Scroll Reveal Effects
    // ========================================
    function reveal() {
        const reveals = document.querySelectorAll('[data-aos]');

        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }

    $(window).on('scroll', reveal);

    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    $(window).on('scroll', function () {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', `translateY(${scrolled * 0.3}px)`);
        $('.stars').css('transform', `translateY(${scrolled * 0.5}px)`);
    });

    // ========================================
    // Form Field Character Counter (Optional)
    // ========================================
    $('textarea').each(function () {
        const maxLength = $(this).attr('maxlength');
        if (maxLength) {
            const counter = $(`<small class="char-counter" style="color: var(--text-gray); float: right;">0 / ${maxLength}</small>`);
            $(this).after(counter);

            $(this).on('input', function () {
                counter.text(`${$(this).val().length} / ${maxLength}`);
            });
        }
    });

    // ========================================
    // Email Validation
    // ========================================
    $('input[type="email"]').on('blur', function () {
        const email = $(this).val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            $(this).css('border-color', '#ff4444');
            if (!$(this).next('.error-message').length) {
                $(this).after('<small class="error-message" style="color: #ff4444; display: block; margin-top: 0.3rem;">Please enter a valid email address</small>');
            }
        }
    });

    // ========================================
    // Phone Number Validation
    // ========================================
    $('input[type="tel"]').on('input', function () {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
    });

    // ========================================
    // Date Validation (No Future Dates for Birth)
    // ========================================
    $('#dob').attr('max', new Date().toISOString().split('T')[0]);

    // ========================================
    // Loading Screen (Optional)
    // ========================================
    $(window).on('load', function () {
        if ($('.loader').length) {
            $('.loader').fadeOut('slow');
        }
    });

    // ========================================
    // Back to Top Button (Optional)
    // ========================================
    const backToTop = $('<button class="back-to-top" style="position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; border-radius: 50%; background: var(--gradient-gold); border: none; color: var(--dark-bg); font-size: 1.5rem; cursor: pointer; display: none; z-index: 999; box-shadow: 0 5px 20px rgba(0,0,0,0.3); transition: all 0.3s;"><i class="fas fa-arrow-up"></i></button>');

    $('body').append(backToTop);

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ========================================
    // WhatsApp Click Tracking (Optional)
    // ========================================
    $('.social-link[href*="whatsapp"]').on('click', function () {
        console.log('WhatsApp link clicked');
        // Add analytics tracking here if needed
    });

    // ========================================
    // Initialize on Document Ready
    // ========================================
    showStep(1); // Show first step of appointment form

    console.log('Website initialized successfully!');
});
