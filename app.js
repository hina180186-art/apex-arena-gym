/**
 * ============================================================================
 * APEX ARENA — STRENGTH & CONDITIONING CLUB (GUJRANWALA, PAKISTAN)
 * Master Client-Side JavaScript Application (ES6+)
 * ============================================================================
 * 
 * ZERO DEPENDENCY, VANILLA JS ARCHITECTURE
 * READY FOR INSTANT CLOUDFLARE PAGES STATIC DEPLOYMENT
 */

/* ============================================================================
   1. GLOBAL WHATSAPP CONFIGURATION
   Change this single constant to swap the gym owner / front desk WhatsApp number.
   Format: Country code without '+' or special characters (e.g. 923001234567 for Pakistan)
   ============================================================================ */
const WHATSAPP_NUMBER = "923006291617";

/**
 * Helper to generate WhatsApp URL with encoded message
 * @param {string} messageText 
 * @returns {string}
 */
function createWhatsAppUrl(messageText) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText.trim())}`;
}

/**
 * Open WhatsApp in a secure new tab
 * @param {string} messageText 
 */
function openWhatsApp(messageText) {
  const url = createWhatsAppUrl(messageText);
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ============================================================================
   2. DOM CONTENT LOADED INITIALIZER
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTopRibbon();
  initStickyHeader();
  initMobileNavigation();
  initImageFallbackHandler();
  initStatsCounter();
  initScrollReveal();
  initBmiCalculator();
  initScheduleFilter();
  initFaqAccordion();
  initTrialPassModal();
  initContactForm();
  initMembershipPlanButtons();
  initCoachBookingButtons();
  initFloatingWhatsApp();
  initCentralizedWhatsAppLinks();
  initMobileFooterAccordions();
  initHeroVideo();
});

/* ============================================================================
   3. GLOBAL TOP ROTATING RIBBON
   Rotates through announcements every 4 seconds
   ============================================================================ */
function initTopRibbon() {
  const ribbonItems = document.querySelectorAll(".ribbon-item");
  if (!ribbonItems || ribbonItems.length === 0) return;

  let currentIndex = 0;
  setInterval(() => {
    ribbonItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % ribbonItems.length;
    ribbonItems[currentIndex].classList.add("active");
  }, 4000);
}

/* ============================================================================
   4. STICKY GLASSMORPHIC HEADER SCROLL EFFECT
   ============================================================================ */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ============================================================================
   5. MOBILE SLIDE-OVER DRAWER NAVIGATION
   ============================================================================ */
function initMobileNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const mobileBackdrop = document.querySelector(".mobile-backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuToggle || !mobileDrawer || !mobileBackdrop) return;

  function openMenu() {
    menuToggle.classList.add("active");
    mobileDrawer.classList.add("open");
    mobileBackdrop.classList.add("visible");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    mobileDrawer.classList.remove("open");
    mobileBackdrop.classList.remove("visible");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileDrawer.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileBackdrop.addEventListener("click", closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      closeMenu();
    }
  });
}

/* ============================================================================
   6. ZERO BROKEN IMAGES: ARCHITECTURAL SVG FALLBACK HANDLER
   Generates a dark luxury SVG data-URI if any external image fails to load.
   ============================================================================ */
function initImageFallbackHandler() {
  const fallbackSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
      <rect width="800" height="600" fill="#141418"/>
      <line x1="0" y1="0" x2="800" y2="600" stroke="#26262E" stroke-width="1.5"/>
      <line x1="800" y1="0" x2="0" y2="600" stroke="#26262E" stroke-width="1.5"/>
      <circle cx="400" cy="300" r="90" fill="#0B0B0D" stroke="#D4AF37" stroke-width="2"/>
      <path d="M400 235L360 325H380L400 280L420 325H440L400 235Z" fill="#D4AF37"/>
      <path d="M368 310H432V318H368V310Z" fill="#D4AF37"/>
      <text x="400" y="420" font-family="'Oswald', sans-serif" font-size="20" font-weight="600" fill="#F5F5F7" text-anchor="middle" letter-spacing="4">APEX ARENA</text>
      <text x="400" y="445" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#9A9AA2" text-anchor="middle" letter-spacing="2">FLAGSHIP CLUB · GUJRANWALA</text>
    </svg>
  `);
  const fallbackUri = `data:image/svg+xml;utf8,${fallbackSvg}`;

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function () {
      this.src = fallbackUri;
      this.alt = "APEX ARENA Gujranwala";
    });
  });
}

/* ============================================================================
   6B. ANIMATED ROLL-UP NUMBER COUNTERS (STATS STRIP)
   Uses easeOutQuart curve over 1.6s when entering viewport
   ============================================================================ */
function initStatsCounter() {
  const statsStrip = document.querySelector(".stats-strip");
  const countElements = document.querySelectorAll("[data-count]");
  const highlightEl = document.querySelector(".stat-highlight");

  if (!statsStrip || countElements.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Immediate completion for reduced motion
  if (prefersReducedMotion) {
    countElements.forEach(el => {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = decimals > 0 
        ? target.toFixed(decimals) + suffix 
        : Math.round(target).toLocaleString() + suffix;
    });
    if (highlightEl) highlightEl.classList.add("active-glow");
    return;
  }

  // easeOutQuart: 1 - (1 - t)^4
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        startRollUp();
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  observer.observe(statsStrip);

  function startRollUp() {
    const duration = 1600; // 1.6 seconds as specified
    const startTime = performance.now();

    const targets = Array.from(countElements).map(el => ({
      el,
      target: parseFloat(el.getAttribute("data-count")),
      suffix: el.getAttribute("data-suffix") || "",
      decimals: parseInt(el.getAttribute("data-decimals") || "0", 10)
    }));

    function frame(now) {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easeOutQuart(rawProgress);

      targets.forEach(({ el, target, suffix, decimals }) => {
        const currentVal = target * progress;
        if (decimals > 0) {
          el.textContent = currentVal.toFixed(decimals) + suffix;
        } else {
          el.textContent = Math.round(currentVal).toLocaleString() + suffix;
        }
      });

      if (rawProgress < 1) {
        requestAnimationFrame(frame);
      } else {
        // Final values ensure exact target precision
        targets.forEach(({ el, target, suffix, decimals }) => {
          el.textContent = decimals > 0 
            ? target.toFixed(decimals) + suffix 
            : target.toLocaleString() + suffix;
        });
        if (highlightEl) {
          highlightEl.classList.add("active-glow");
        }
      }
    }

    requestAnimationFrame(frame);
  }
}

/* ============================================================================
   6C. GLOBAL SCROLL REVEAL & STAGGER ENGINE
   GPU-accelerated transform & opacity reveals across all 5 pages
   ============================================================================ */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Standalone targets (section headers, metrics containers, forms, maps)
  const standaloneSelectors = [
    ".section-header",
    ".calc-container",
    ".contact-info-card",
    ".trial-form-card",
    ".map-wrapper",
    ".stats-strip"
  ];

  const standaloneElements = document.querySelectorAll(standaloneSelectors.join(", "));

  // Grid / Staggered container targets
  const gridContainers = document.querySelectorAll(
    ".cards-grid-4, .cards-grid-3, .cards-grid-2, .pricing-grid, .faq-list, tbody"
  );

  const allRevealItems = [];

  // 1. Process grid containers and assign staggered transition delays (80ms - 120ms)
  gridContainers.forEach(container => {
    const items = container.querySelectorAll(
      ".luxury-card, .pricing-card, .review-card, .coach-card, .schedule-row, .faq-item"
    );
    items.forEach((item, index) => {
      item.classList.add("reveal-item");
      // 90ms staggered delay per sibling in row
      const staggerDelay = (index % 4) * 95;
      item.style.transitionDelay = `${staggerDelay}ms`;
      allRevealItems.push(item);
    });
  });

  // 2. Process standalone headers and cards
  standaloneElements.forEach(elem => {
    elem.classList.add("reveal-item");
    allRevealItems.push(elem);
  });

  // If reduced motion is requested, reveal everything immediately
  if (prefersReducedMotion) {
    allRevealItems.forEach(el => el.classList.add("revealed"));
    return;
  }

  // 3. Global IntersectionObserver with specified threshold and rootMargin
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px"
  });

  allRevealItems.forEach(el => revealObserver.observe(el));
}

/* ============================================================================
   7. INTERACTIVE BMI & CALORIE CALCULATOR
   Mifflin-St Jeor TDEE & Macro Energy Estimates
   ============================================================================ */
function initBmiCalculator() {
  const calcForm = document.getElementById("bmiCalcForm");
  if (!calcForm) return;

  const heightInput = document.getElementById("calcHeight");
  const weightInput = document.getElementById("calcWeight");
  const ageInput = document.getElementById("calcAge");
  const genderInput = document.getElementById("calcGender");
  const activityInput = document.getElementById("calcActivity");

  const bmiValEl = document.getElementById("bmiValue");
  const bmiBadgeEl = document.getElementById("bmiBadge");
  const tdeeValEl = document.getElementById("tdeeValue");
  const fatLossValEl = document.getElementById("fatLossValue");
  const muscleGainValEl = document.getElementById("muscleGainValue");
  const dietPlanBtn = document.getElementById("getDietPlanBtn");

  function calculate() {
    const h = parseFloat(heightInput.value); // cm
    const w = parseFloat(weightInput.value); // kg
    const a = parseFloat(ageInput.value);    // years
    const gender = genderInput.value;
    const activity = parseFloat(activityInput.value);

    if (isNaN(h) || isNaN(w) || isNaN(a) || h <= 50 || w <= 20 || a <= 10) {
      return;
    }

    // BMI Calculation
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(1);

    bmiValEl.textContent = roundedBmi;

    let category = "Normal";
    let badgeColor = "#34D399";
    let badgeBg = "rgba(16, 185, 129, 0.2)";
    let badgeBorder = "rgba(16, 185, 129, 0.4)";

    if (bmi < 18.5) {
      category = "Underweight";
      badgeColor = "#60A5FA";
      badgeBg = "rgba(59, 130, 246, 0.2)";
      badgeBorder = "rgba(59, 130, 246, 0.4)";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Optimal Fitness";
      badgeColor = "#34D399";
      badgeBg = "rgba(16, 185, 129, 0.2)";
      badgeBorder = "rgba(16, 185, 129, 0.4)";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      badgeColor = "#FBBF24";
      badgeBg = "rgba(245, 158, 11, 0.2)";
      badgeBorder = "rgba(245, 158, 11, 0.4)";
    } else {
      category = "High BMI / Obese";
      badgeColor = "#F87171";
      badgeBg = "rgba(239, 68, 68, 0.2)";
      badgeBorder = "rgba(239, 68, 68, 0.4)";
    }

    bmiBadgeEl.textContent = category;
    bmiBadgeEl.style.color = badgeColor;
    bmiBadgeEl.style.backgroundColor = badgeBg;
    bmiBadgeEl.style.borderColor = badgeBorder;

    // BMR (Mifflin-St Jeor formula)
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // TDEE
    const tdee = Math.round(bmr * activity);
    const fatLoss = Math.round(tdee - 500);
    const muscleGain = Math.round(tdee + 350);

    tdeeValEl.textContent = `${tdee.toLocaleString()} kcal`;
    fatLossValEl.textContent = `${fatLoss.toLocaleString()} kcal`;
    muscleGainValEl.textContent = `${muscleGain.toLocaleString()} kcal`;

    // Setup WhatsApp Button pre-fill
    if (dietPlanBtn) {
      dietPlanBtn.onclick = (e) => {
        e.preventDefault();
        const msg = `Salam APEX ARENA! I used your BMI & Calorie Calculator.\n\nMy Stats:\n- Height: ${h} cm\n- Weight: ${w} kg\n- Age: ${a}\n- Gender: ${gender === "male" ? "Male" : "Female"}\n- Calculated BMI: ${roundedBmi} (${category})\n- Maintenance Calories: ${tdee} kcal/day\n- Fat Loss Target: ${fatLoss} kcal/day\n- Muscle Gain Target: ${muscleGain} kcal/day\n\nI want to consult an APEX certified coach for a personalized Pakistani nutrition & workout plan in Gujranwala.`;
        openWhatsApp(msg);
      };
    }
  }

  // Trigger on input
  [heightInput, weightInput, ageInput, genderInput, activityInput].forEach(elem => {
    if (elem) {
      elem.addEventListener("input", calculate);
      elem.addEventListener("change", calculate);
    }
  });

  // Run initial calculation
  calculate();
}

/* ============================================================================
   8. INTERACTIVE SHIFT FILTER & SCHEDULE TABLE
   ============================================================================ */
function initScheduleFilter() {
  const tabButtons = document.querySelectorAll(".filter-tab");
  const scheduleRows = document.querySelectorAll(".schedule-row");

  if (!tabButtons || tabButtons.length === 0 || !scheduleRows) return;

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Set active button
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      scheduleRows.forEach(row => {
        const rowShift = row.getAttribute("data-shift");
        if (filter === "all" || rowShift === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

/* ============================================================================
   9. ACCORDION / FAQ COMPONENT
   ============================================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems || faqItems.length === 0) return;

  faqItems.forEach(item => {
    const toggle = item.querySelector(".faq-toggle");
    const content = item.querySelector(".faq-content");

    if (!toggle || !content) return;

    toggle.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".faq-content");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + 30 + "px";
      }
    });
  });
}

/* ============================================================================
   10. UNIVERSAL 1-DAY FREE TRIAL PASS MODAL
   Accessible from buttons with [data-open-trial] across all pages
   ============================================================================ */
function initTrialPassModal() {
  const modalOverlay = document.getElementById("trialModalOverlay");
  const closeBtn = document.getElementById("modalCloseBtn");
  const openButtons = document.querySelectorAll("[data-open-trial]");
  const modalForm = document.getElementById("modalTrialForm");

  if (!modalOverlay) return;

  function openModal(defaultGoal = "") {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    if (modalForm && defaultGoal) {
      const goalSelect = modalForm.querySelector("select[name='goal']");
      if (goalSelect) goalSelect.value = defaultGoal;
    }
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const goal = btn.getAttribute("data-goal") || "";
      openModal(goal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // Modal Form Submission Handler
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = modalForm.querySelector("input[name='name']").value.trim();
      const phone = modalForm.querySelector("input[name='phone']").value.trim();
      const goal = modalForm.querySelector("select[name='goal']").value;
      const shift = modalForm.querySelector("select[name='shift']").value;

      if (!name || !phone) {
        alert("Please provide both your name and WhatsApp number.");
        return;
      }

      const msg = `Salam APEX ARENA! I want to claim my 1-Day Complimentary Trial Pass.\n\n- Name: ${name}\n- WhatsApp: ${phone}\n- Primary Goal: ${goal}\n- Preferred Shift: ${shift}\n\nPlease confirm my slot for this week at your Canal View / Satellite Town arena. Thank you!`;

      openWhatsApp(msg);
      modalForm.reset();
      closeModal();
    });
  }
}

/* ============================================================================
   11. CONTACT PAGE FREE TRIAL PASS GENERATOR FORM
   ============================================================================ */
function initContactForm() {
  const contactForm = document.getElementById("contactTrialForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("#contactName").value.trim();
    const phone = contactForm.querySelector("#contactPhone").value.trim();
    const goal = contactForm.querySelector("#contactGoal").value;
    const shift = contactForm.querySelector("#contactShift").value;
    const notes = contactForm.querySelector("#contactNotes") ? contactForm.querySelector("#contactNotes").value.trim() : "";

    if (!name || !phone) {
      alert("Please provide your full name and contact number.");
      return;
    }

    let msg = `Salam APEX ARENA! I am applying for the 1-Day Free VIP Trial Pass in Gujranwala.\n\n- Full Name: ${name}\n- WhatsApp: ${phone}\n- Fitness Goal: ${goal}\n- Preferred Shift: ${shift}`;
    if (notes) {
      msg += `\n- Additional Notes: ${notes}`;
    }
    msg += `\n\nLooking forward to training at APEX ARENA.`;

    openWhatsApp(msg);

    // Show temporary confirmation
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>✓ Pass Generated — Opening WhatsApp...</span>`;
    submitBtn.style.background = "#25D366";
    submitBtn.style.color = "#0B0B0D";

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = "";
      submitBtn.style.color = "";
      contactForm.reset();
    }, 4000);
  });
}

/* ============================================================================
   12. MEMBERSHIP PLAN BUTTONS (DYNAMIC WHATSAPP ENROLLMENT)
   ============================================================================ */
function initMembershipPlanButtons() {
  const planButtons = document.querySelectorAll("[data-plan-name]");
  if (!planButtons || planButtons.length === 0) return;

  planButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const planName = btn.getAttribute("data-plan-name");
      const planPrice = btn.getAttribute("data-plan-price");

      const msg = `Salam APEX ARENA! I would like to enroll in the ${planName} (${planPrice}) at your Gujranwala club.\n\nPlease share the registration procedure, locker allotment details, and accepted payment methods (Cash/Bank Transfer).`;
      openWhatsApp(msg);
    });
  });
}

/* ============================================================================
   13. COACH PERSONAL TRAINING BOOKING BUTTONS
   ============================================================================ */
function initCoachBookingButtons() {
  const coachButtons = document.querySelectorAll("[data-coach-name]");
  if (!coachButtons || coachButtons.length === 0) return;

  coachButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const coachName = btn.getAttribute("data-coach-name");
      const coachSpec = btn.getAttribute("data-coach-spec") || "Personal Training";

      const msg = `Salam APEX ARENA! I would like to book a 1-on-1 personal training consultation with ${coachName} (${coachSpec}) at APEX ARENA Gujranwala.\n\nPlease let me know available slots and monthly coaching package details.`;
      openWhatsApp(msg);
    });
  });
}

/* ============================================================================
   14. FLOATING QUICK-CHAT WHATSAPP BUTTON
   ============================================================================ */
function initFloatingWhatsApp() {
  const floatingBtn = document.querySelector(".floating-whatsapp");
  if (!floatingBtn) return;

  floatingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = `Hi APEX ARENA! I'd like to inquire about memberships and a 1-day free trial at your Gujranwala club.`;
    openWhatsApp(msg);
  });
}

/* ============================================================================
   15. CENTRALIZE ALL WHATSAPP LINKS & NUMBERS DYNAMICALLY
   Ensures every WhatsApp touchpoint on the site uses WHATSAPP_NUMBER
   ============================================================================ */
function initCentralizedWhatsAppLinks() {
  const defaultInquiryMsg = "Hi APEX ARENA! I'd like to inquire about memberships and a 1-day free trial.";
  const defaultFooterMsg = "Hi APEX ARENA! I'd like to inquire about memberships and club timings.";

  // 1. Mobile navigation drawer WhatsApp button
  const drawerWaBtns = document.querySelectorAll(".mobile-drawer-footer a[href*='wa.me'], [data-wa-drawer]");
  drawerWaBtns.forEach(btn => {
    btn.setAttribute("href", createWhatsAppUrl(defaultInquiryMsg));
    btn.onclick = (e) => {
      e.preventDefault();
      openWhatsApp(defaultInquiryMsg);
    };
  });

  // 2. Floating WhatsApp button
  const floatingBtns = document.querySelectorAll(".floating-whatsapp, [data-wa-floating]");
  floatingBtns.forEach(btn => {
    btn.setAttribute("href", createWhatsAppUrl(defaultInquiryMsg));
  });

  // 3. Footer WhatsApp social icon
  const footerWaBtns = document.querySelectorAll(".social-btn[aria-label='WhatsApp'], [data-wa-footer]");
  footerWaBtns.forEach(btn => {
    btn.setAttribute("href", createWhatsAppUrl(defaultFooterMsg));
    btn.onclick = (e) => {
      e.preventDefault();
      openWhatsApp(defaultFooterMsg);
    };
  });

  // 4. Any other wa.me links that may exist in markup
  const anyWaLinks = document.querySelectorAll("a[href*='wa.me']");
  anyWaLinks.forEach(link => {
    const currentHref = link.getAttribute("href") || "";
    // If the link still contains old number or generic wa.me without query
    if (currentHref.includes("923001234567") || currentHref === "https://wa.me" || currentHref === "https://wa.me/") {
      link.setAttribute("href", createWhatsAppUrl(defaultInquiryMsg));
    }
  });

  // 5. Contact page direct phone display updates
  const contactPhoneLinks = document.querySelectorAll("a[href^='tel:']");
  contactPhoneLinks.forEach(link => {
    link.setAttribute("href", `tel:+${WHATSAPP_NUMBER}`);
    link.textContent = `+92 300 6291617`;
  });
}

/* ============================================================================
   17. MOBILE COLLAPSIBLE FOOTER ACCORDIONS (<= 768px)
   ============================================================================ */
function initMobileFooterAccordions() {
  const accordions = document.querySelectorAll(".footer-accordion");
  if (!accordions || accordions.length === 0) return;

  accordions.forEach(acc => {
    const btn = acc.querySelector(".footer-accordion-btn");
    const panel = acc.querySelector(".footer-accordion-panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      // Only active on screens <= 768px
      if (window.innerWidth > 768) return;

      const isOpen = acc.classList.contains("open");

      // Close all other footer accordions for single-drawer accordion behavior
      accordions.forEach(other => {
        if (other !== acc) {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".footer-accordion-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          const otherPanel = other.querySelector(".footer-accordion-panel");
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isOpen) {
        acc.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        acc.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = (panel.scrollHeight + 30) + "px";
      }
    });
  });

  // Reset styles on window resize when expanding past 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      accordions.forEach(acc => {
        acc.classList.remove("open");
        const btn = acc.querySelector(".footer-accordion-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
        const panel = acc.querySelector(".footer-accordion-panel");
        if (panel) panel.style.maxHeight = null;
      });
    }
  }, { passive: true });
}

/* ============================================================================
   18. HERO BACKGROUND VIDEO AUTOPLAY
   ============================================================================ */
function initHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const playOnUserGesture = () => {
        video.play().catch(() => {});
        window.removeEventListener("touchstart", playOnUserGesture);
        window.removeEventListener("click", playOnUserGesture);
        window.removeEventListener("scroll", playOnUserGesture);
      };
      window.addEventListener("touchstart", playOnUserGesture, { once: true, passive: true });
      window.addEventListener("click", playOnUserGesture, { once: true, passive: true });
      window.addEventListener("scroll", playOnUserGesture, { once: true, passive: true });
    });
  }
}
