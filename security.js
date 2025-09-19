// Security and Input Validation Functions
// Use these functions when adding forms or user inputs in the future

/**
 * HTML sanitization to prevent XSS attacks
 */
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Email validation
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Phone number validation (Thai format)
 */
function validatePhone(phone) {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Thai phone number patterns
  const patterns = [
    /^0[0-9]{8,9}$/, // 09xxxxxxxx or 02xxxxxxxx
    /^\+66[0-9]{8,9}$/, // +66xxxxxxxxx
    /^66[0-9]{8,9}$/ // 66xxxxxxxxx
  ];
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Generic text input sanitization
 */
function sanitizeText(input, maxLength = 500) {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * URL validation and sanitization
 */
function validateURL(url) {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * CSRF Token generation (for future form use)
 */
function generateCSRFToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  constructor(maxAttempts = 5, timeWindow = 60000) { // 5 attempts per minute
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow;
  }

  isAllowed(identifier = 'default') {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside time window
    const recentAttempts = attempts.filter(time => now - time < this.timeWindow);

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }
}

/**
 * Form validation helper
 */
function validateForm(formData) {
  const errors = [];

  // Example validation for contact form
  if (formData.name) {
    if (formData.name.length < 2 || formData.name.length > 100) {
      errors.push('ชื่อต้องมีความยาว 2-100 ตัวอักษร');
    }
    formData.name = sanitizeText(formData.name, 100);
  }

  if (formData.email) {
    if (!validateEmail(formData.email)) {
      errors.push('รูปแบบอีเมลไม่ถูกต้อง');
    }
  }

  if (formData.phone) {
    if (!validatePhone(formData.phone)) {
      errors.push('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง');
    }
  }

  if (formData.message) {
    if (formData.message.length < 10 || formData.message.length > 1000) {
      errors.push('ข้อความต้องมีความยาว 10-1000 ตัวอักษร');
    }
    formData.message = sanitizeText(formData.message, 1000);
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    sanitizedData: formData
  };
}

/**
 * Secure localStorage wrapper
 */
const SecureStorage = {
  setItem(key, value, encrypt = false) {
    try {
      const data = encrypt ? btoa(JSON.stringify(value)) : JSON.stringify(value);
      localStorage.setItem(key, data);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  getItem(key, encrypted = false) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;

      return encrypted ? JSON.parse(atob(data)) : JSON.parse(data);
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  },

  removeItem(key) {
    localStorage.removeItem(key);
  }
};

// Initialize rate limiter
const formRateLimiter = new RateLimiter(3, 300000); // 3 submissions per 5 minutes

// Example usage for future contact form:
/*
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check rate limiting
      if (!formRateLimiter.isAllowed('contact-form')) {
        alert('กรุณารอสักครู่ก่อนส่งข้อความอีกครั้ง');
        return;
      }

      // Get form data
      const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
      };

      // Validate
      const validation = validateForm(formData);

      if (!validation.isValid) {
        alert('ข้อผิดพลาด:\n' + validation.errors.join('\n'));
        return;
      }

      // Process form with sanitized data
      console.log('Validated data:', validation.sanitizedData);

      // Here you would send to server
      // fetch('/submit-contact', { method: 'POST', body: JSON.stringify(validation.sanitizedData) })
    });
  }
});
*/

console.log('Security functions loaded');