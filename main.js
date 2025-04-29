import './style.css'

// Ensure the loader is visible immediately by adding an inline script to the HTML
document.addEventListener('DOMContentLoaded', () => {
  // Keep the loader visible until everything is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      // First hide the loader
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.classList.add('hidden');
      }

      // Then show the main content
      const app = document.getElementById('app');
      if (app) {
        app.classList.add('visible');
      }
    }, 1500);
  });

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    // Close menu when clicking a menu item
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  // Update scroll progress indicator
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Animated tagline text
  const taglineText = "Digital solutions for modern brands. Coming soon.";
  const taglineElement = document.getElementById('tagline');

  if (taglineElement) {
    taglineElement.innerHTML = '';
    taglineElement.classList.add('animated-text');

    // Split the text into words and wrap each in a span
    const words = taglineText.split(' ');
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + (index < words.length - 1 ? ' ' : '');
      taglineElement.appendChild(span);
    });
  }

  // Add pulse effect to primary CTA button
  const ctaButton = document.querySelector('#signup-form button[type="submit"]');
  if (ctaButton) {
    ctaButton.classList.add('pulse-button');
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll('.bg-neutral-50');
  cards.forEach(card => {
    card.classList.add('hover-card');
  });

  // Add social media icon hover effects
  const socialIcons = document.querySelectorAll('footer svg, #contact svg');
  socialIcons.forEach(icon => {
    const parent = icon.closest('a');
    if (parent) {
      parent.classList.add('social-icon');
    }
  });

  // Improved countdown timer to a specific launch date
  const countdownElement = document.getElementById('countdown');

  if (countdownElement) {
    // Set the target launch date - May 15, 2025
    const targetDate = new Date('May 15, 2025 00:00:00').getTime();

    // Store the countdown in localStorage to maintain state between refreshes
    const savedCountdown = localStorage.getItem('launchCountdown');
    let countdownData;

    if (savedCountdown) {
      try {
        countdownData = JSON.parse(savedCountdown);
      } catch (e) {
        countdownData = { targetDate };
      }
    } else {
      countdownData = { targetDate };
      localStorage.setItem('launchCountdown', JSON.stringify(countdownData));
    }

    const updateCountdown = setInterval(() => {
      // Calculate the remaining time
      const now = new Date().getTime();
      const distance = countdownData.targetDate - now;

      // Calculate days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // Countdown has ended
        clearInterval(updateCountdown);
        countdownElement.innerHTML = "<div class='text-xl font-bold'>We've Launched!</div>";

        // Show the launch button if we've reached the launch date
        const launchButton = document.getElementById('launch-button');
        if (launchButton) {
          launchButton.classList.remove('hidden');
        }
        return;
      }

      // Update the displayed countdown with improved animations
      countdownElement.innerHTML = `
        <div class="flex justify-center space-x-4 md:space-x-6 text-white">
          <div class="flex flex-col items-center">
            <span class="text-3xl md:text-4xl font-bold countdown-number" data-value="${days}">${days}</span>
            <span class="text-xs uppercase text-white/70">Days</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl md:text-4xl font-bold countdown-number" data-value="${hours}">${hours}</span>
            <span class="text-xs uppercase text-white/70">Hours</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl md:text-4xl font-bold countdown-number" data-value="${minutes}">${minutes}</span>
            <span class="text-xs uppercase text-white/70">Minutes</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-3xl md:text-4xl font-bold countdown-number" data-value="${seconds}">${seconds}</span>
            <span class="text-xs uppercase text-white/70">Seconds</span>
          </div>
        </div>
      `;

      // Add a subtle animation when seconds change
      const numberElements = document.querySelectorAll('.countdown-number');
      numberElements.forEach(el => {
        el.classList.add('countdown-pulse');
        setTimeout(() => {
          el.classList.remove('countdown-pulse');
        }, 500);
      });

    }, 1000);
  }

  // Enhanced form submission with validation feedback and email storage
  const form = document.getElementById('signup-form');
  if (form) {
    const emailInput = document.getElementById('email');
    const emailError = document.createElement('p');
    emailError.classList.add('text-red-500', 'text-sm', 'mt-1', 'hidden');
    emailError.textContent = "Please enter a valid email address";

    if (emailInput) {
      emailInput.after(emailError);

      emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
          emailError.classList.add('hidden');
          emailInput.classList.remove('ring-red-500');
          emailInput.classList.add('ring-green-500');
        } else {
          emailInput.classList.add('ring-red-500');
          emailInput.classList.remove('ring-green-500');
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      if (email && emailInput.validity.valid) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        `;

        // Prepare email data
        const timestamp = new Date().toISOString();
        const emailData = {
          email,
          timestamp,
          referrer: document.referrer || 'direct',
          userAgent: navigator.userAgent
        };

        // Send to our server endpoint
        fetch('https://www.thepost.digital/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        })
        .then(response => {
          // Check if the response is ok, otherwise throw error
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to subscribe');
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);

          // Also save to localStorage as backup
          let storedEmails = [];
          try {
            const emailsJson = localStorage.getItem('subscribedEmails');
            if (emailsJson) {
              storedEmails = JSON.parse(emailsJson);
            }
          } catch (e) {
            console.error('Error parsing stored emails:', e);
            storedEmails = [];
          }

          storedEmails.push(emailData);
          localStorage.setItem('subscribedEmails', JSON.stringify(storedEmails));

          // Show success message
          document.getElementById('form-success').classList.remove('hidden');
          document.getElementById('form-success').classList.add('flex');
          form.classList.add('hidden');
        })
        .catch(error => {
          console.error('Error:', error);

          // Reset button
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;

          // Check if the error is about duplicate email
          if (error.message && error.message.includes('already subscribed')) {
            // Create or update the error message
            emailError.textContent = "This email is already subscribed.";
            emailError.classList.remove('hidden');
            emailInput.classList.add('ring-2', 'ring-yellow-500');
            emailInput.classList.remove('ring-red-500', 'ring-green-500');
          } else {
            // Generic error
            emailError.textContent = "There was an error. Please try again.";
            emailError.classList.remove('hidden');
            emailInput.classList.add('ring-2', 'ring-red-500');
          }
        });
      } else {
        emailError.classList.remove('hidden');
        emailInput.classList.add('ring-2', 'ring-red-500');
      }
    });
  }

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// Reveal animations on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      entry.target.classList.add('opacity-100');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.reveal');
  animatedElements.forEach(el => {
    el.classList.add('opacity-0');
    observer.observe(el);
  });

  // Add dark mode detection and adjustment
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelectorAll('.bg-white, .bg-neutral-50, .bg-neutral-100').forEach(el => {
      el.classList.add('dark-mode-text');
    });
  }

  // Add parallax effect to hero section
  const heroSection = document.querySelector('.gradient-bg');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const backgroundImage = heroSection.querySelector('.bg-cover');
      if (backgroundImage) {
        backgroundImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    });
  }
});