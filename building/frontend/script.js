// Global variables
let currentUser = null;
let authToken = null;
let floorCount = 1;

// API Base URL (relative so it works locally and on deployments)
const API_BASE = "/api";

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
  loadPackages();
  checkAuthStatus();
});

// Initialize app
function initializeApp() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Mobile menu toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Login form
  document.getElementById("loginForm").addEventListener("submit", handleLogin);

  // Register form
  document
    .getElementById("registerForm")
    .addEventListener("submit", handleRegister);

  // Consultation form
  document
    .getElementById("consultationForm")
    .addEventListener("submit", handleConsultation);

  // Contact form
  document
    .getElementById("contact-form")
    .addEventListener("submit", handleContact);

  // New project form
  document
    .getElementById("newProjectForm")
    .addEventListener("submit", handleNewProject);
}

// Check authentication status
function checkAuthStatus() {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("currentUser");

  if (token && user) {
    authToken = token;
    currentUser = JSON.parse(user);
    updateAuthUI();
  }
}

// Update authentication UI
function updateAuthUI() {
  const navAuth = document.querySelector(".nav-auth");
  if (currentUser) {
    navAuth.innerHTML = `
            <span class="nav-welcome">Welcome, ${currentUser.name}</span>
            <button class="btn-dashboard" onclick="showDashboard()">Dashboard</button>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
  } else {
    navAuth.innerHTML = `
            <button class="btn-login" onclick="showLoginModal()">Login</button>
            <button class="btn-register" onclick="showRegisterModal()">Register</button>
        `;
  }
}

// Show login modal
function showLoginModal() {
  closeAllModals();
  document.getElementById("loginModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

// Show register modal
function showRegisterModal() {
  closeAllModals();
  document.getElementById("registerModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

// Show consultation modal
function showConsultationModal() {
  closeAllModals();
  document.getElementById("consultationModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

// Show dashboard modal
function showDashboard() {
  closeAllModals();
  document.getElementById("dashboardModal").style.display = "block";
  loadUserProjects();
  loadUserConsultations();
}

// Show new project modal
function showNewProjectModal() {
  closeAllModals();
  document.getElementById("newProjectModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}

// Close all modals
function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email =
    formData.get("email") ||
    e.target.querySelector('input[type="email"]').value;
  const password =
    formData.get("password") ||
    e.target.querySelector('input[type="password"]').value;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    // Show loading state
    submitBtn.textContent = "Logging in...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      updateAuthUI();
      closeModal("loginModal");
      showNotification("Login successful! Welcome back!", "success");
      e.target.reset();
    } else {
      showNotification(
        data.message || "Login failed. Please check your credentials.",
        "error"
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Handle register
async function handleRegister(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name =
    formData.get("name") ||
    e.target.querySelector('input[placeholder="Full Name"]').value;
  const email =
    formData.get("email") ||
    e.target.querySelector('input[type="email"]').value;
  const phone =
    formData.get("phone") || e.target.querySelector('input[type="tel"]').value;
  const password =
    formData.get("password") ||
    e.target.querySelector('input[type="password"]').value;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    // Show loading state
    submitBtn.textContent = "Creating Account...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      updateAuthUI();
      closeModal("registerModal");
      showNotification(
        "Registration successful! Welcome to Planify!",
        "success"
      );
      e.target.reset();
    } else {
      showNotification(
        data.message || "Registration failed. Please try again.",
        "error"
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Handle consultation
async function handleConsultation(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const consultationData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    service: formData.get("service"),
    projectStage: formData.get("projectStage"),
    message: formData.get("message"),
    plotSize: formData.get("plotSize") || "",
    budget: formData.get("budget") || "",
    timeline: formData.get("timeline"),
    priority: formData.get("priority"),
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    // Show loading state
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultationData),
    });

    const data = await response.json();

    if (response.ok) {
      closeModal("consultationModal");
      showNotification(
        "Consultation request submitted successfully! We will contact you soon.",
        "success"
      );
      e.target.reset();
    } else {
      showNotification(
        data.message || "Failed to submit consultation",
        "error"
      );
    }
  } catch (error) {
    console.error("Consultation error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Handle contact form
async function handleContact(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const contactData = {
    name:
      formData.get("name") ||
      e.target.querySelector('input[placeholder="Your Name"]').value,
    email:
      formData.get("email") ||
      e.target.querySelector('input[type="email"]').value,
    phone:
      formData.get("phone") ||
      e.target.querySelector('input[type="tel"]').value,
    service: formData.get("service") || e.target.querySelector("select").value,
    message:
      formData.get("message") || e.target.querySelector("textarea").value,
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification(
        data.message ||
          "Message sent successfully! We will get back to you soon!",
        "success"
      );
      e.target.reset();
    } else {
      showNotification(data.message || "Failed to send message", "error");
    }
  } catch (error) {
    console.error("Contact error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Handle new project
async function handleNewProject(e) {
  e.preventDefault();

  if (!currentUser) {
    showNotification("Please login to create a project", "error");
    showLoginModal();
    return;
  }

  const formData = new FormData(e.target);
  const projectData = {
    title:
      formData.get("title") ||
      e.target.querySelector('input[placeholder="Project Title"]').value,
    description:
      formData.get("description") ||
      e.target.querySelector('textarea[placeholder="Project Description"]')
        .value,
    type: formData.get("type") || e.target.querySelector("select").value,
    budget:
      formData.get("budget") ||
      e.target.querySelector('input[type="number"]').value,
    plotSize:
      formData.get("plotSize") ||
      e.target.querySelector('input[placeholder*="Plot Size"]')?.value ||
      "",
    requirements:
      formData.get("requirements") ||
      e.target.querySelector('textarea[placeholder*="Requirements"]')?.value ||
      "",
    userId: currentUser.id,
    userEmail: currentUser.email,
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    // Show loading state
    submitBtn.textContent = "Creating Project...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (response.ok) {
      closeModal("newProjectModal");
      showNotification(
        "Project created successfully! Your project is under review.",
        "success"
      );
      loadUserProjects();
      e.target.reset();
      // Show dashboard
      setTimeout(() => showDashboard(), 1000);
    } else {
      showNotification(data.message || "Failed to create project", "error");
    }
  } catch (error) {
    console.error("Project creation error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Load packages
async function loadPackages() {
  try {
    const response = await fetch(`${API_BASE}/packages`);
    const packages = await response.json();

    const packagesGrid = document.getElementById("packages-grid");
    if (!packagesGrid) {
      console.log("❌ packages-grid element not found");
      return;
    }
    packagesGrid.innerHTML = packages
      .map(
        (pkg) => `
            <div class="package-card ${pkg.isPopular ? "popular" : ""}">
                <div class="package-price">₹${pkg.price}</div>
                <h3 class="package-name">${pkg.name}</h3>
                <ul class="package-features">
                    ${pkg.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
                <p><strong>Duration:</strong> ${pkg.duration}</p>
                <p><strong>Revisions:</strong> ${pkg.revisions}</p>
                <button class="btn-primary" onclick="showConsultationModal()">Get Started</button>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading packages:", error);
    // Fallback to sample packages
    const packagesGrid = document.getElementById("packages-grid");
    if (packagesGrid) {
      packagesGrid.innerHTML = samplePackages
        .map(
          (pkg) => `
            <div class="package-card ${pkg.isPopular ? "popular" : ""}">
                <div class="package-price">₹${pkg.price}</div>
                <h3 class="package-name">${pkg.name}</h3>
                <ul class="package-features">
                    ${pkg.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
                <p><strong>Duration:</strong> ${pkg.duration}</p>
                <p><strong>Revisions:</strong> ${pkg.revisions}</p>
                <button class="btn-primary" onclick="showConsultationModal()">Get Started</button>
            </div>
        `
        )
        .join("");
    }
  }
}

// Load user projects
async function loadUserProjects() {
  if (!currentUser) return;

  try {
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const projects = await response.json();

    const projectsList = document.getElementById("projects-list");
    if (projects.length === 0) {
      projectsList.innerHTML =
        "<p>No projects found. Create your first project!</p>";
    } else {
      projectsList.innerHTML = projects
        .map(
          (project) => `
                <div class="project-card">
                    <h4 class="project-title">${project.title}</h4>
                    <span class="project-status ${
                      project.status
                    }">${project.status.replace("_", " ")}</span>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <span><strong>Type:</strong> ${project.type.replace(
                          "_",
                          " "
                        )}</span>
                        <span><strong>Budget:</strong> ₹${project.budget}</span>
                        <span><strong>Created:</strong> ${new Date(
                          project.createdAt
                        ).toLocaleDateString()}</span>
                    </div>
                </div>
            `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

// Load user consultations
async function loadUserConsultations() {
  if (!currentUser) return;

  try {
    const response = await fetch(`${API_BASE}/consultations`);
    const consultations = await response.json();

    // Filter consultations for current user
    const userConsultations = consultations.filter(
      (consultation) => consultation.email === currentUser.email
    );

    const consultationsList = document.getElementById("consultations-list");
    if (userConsultations.length === 0) {
      consultationsList.innerHTML = "<p>No consultations found.</p>";
    } else {
      consultationsList.innerHTML = userConsultations
        .map(
          (consultation) => `
                <div class="project-card">
                    <h4 class="project-title">${consultation.service}</h4>
                    <span class="project-status ${consultation.status}">${
            consultation.status
          }</span>
                    <p class="project-description">${consultation.message}</p>
                    <div class="project-meta">
                        <span><strong>Submitted:</strong> ${new Date(
                          consultation.createdAt
                        ).toLocaleDateString()}</span>
                        ${
                          consultation.plotSize
                            ? `<span><strong>Plot Size:</strong> ${consultation.plotSize}</span>`
                            : ""
                        }
                        ${
                          consultation.budget
                            ? `<span><strong>Budget:</strong> ${consultation.budget}</span>`
                            : ""
                        }
                    </div>
                </div>
            `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error loading consultations:", error);
  }
}

// Show tab
function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab content
  document.getElementById(`${tabName}-tab`).classList.add("active");

  // Add active class to clicked tab button
  event.target.classList.add("active");
}

// Logout
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  authToken = null;
  currentUser = null;
  updateAuthUI();
  closeAllModals();
  showNotification("Logged out successfully", "success");
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#4CAF50";
      break;
    case "error":
      notification.style.backgroundColor = "#f44336";
      break;
    case "warning":
      notification.style.backgroundColor = "#ff9800";
      break;
    default:
      notification.style.backgroundColor = "#2196F3";
  }

  // Add to page
  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Add CSS for notification animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

// Sample packages data (fallback if API fails)
const samplePackages = [
  {
    name: "Basic House Plan",
    price: 4499,
    features: ["2D Floor Plan", "Basic Elevation", "Site Plan", "2 Revisions"],
    duration: "7-10 days",
    revisions: 2,
    isPopular: false,
  },
  {
    name: "Premium House Design",
    price: 8999,
    features: [
      "2D Floor Plan",
      "3D Elevation",
      "Site Plan",
      "Structural Plan",
      "5 Revisions",
    ],
    duration: "10-15 days",
    revisions: 5,
    isPopular: true,
  },
  {
    name: "Complete Interior Design",
    price: 12999,
    features: [
      "3D Interior Views",
      "Furniture Layout",
      "Material Selection",
      "Lighting Plan",
      "Unlimited Revisions",
    ],
    duration: "15-20 days",
    revisions: -1,
    isPopular: false,
  },
];

// Initialize sample packages if API fails
document.addEventListener("DOMContentLoaded", function () {
  const packagesGrid = document.getElementById("packages-grid");
  if (packagesGrid && packagesGrid.innerHTML === "") {
    loadPackages();
  }
});

// Plan Finder Functions
function showPlanFinder() {
  console.log("🔍 Opening plan finder modal");

  document.getElementById("planFinderModal").style.display = "block";
  document.body.style.overflow = "hidden";

  // Reset form and set defaults
  const form = document.getElementById("planFinderForm");
  if (form) {
    form.reset();
  }

  // Set default selections
  console.log("🔄 Setting default selections");

  // Remove all active classes
  document
    .querySelectorAll(".dimension-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".facing-btn")
    .forEach((btn) => btn.classList.remove("active"));

  // Set default dimension
  const defaultDimension = document.querySelector(
    ".dimension-btn[data-value='30x40']"
  );
  if (defaultDimension) {
    defaultDimension.classList.add("active");
    console.log("✅ Default dimension set: 30x40");
  } else {
    console.log("❌ Could not find 30x40 dimension button");
  }

  // Set default facing
  const defaultFacing = document.querySelector(
    ".facing-btn[data-value='north']"
  );
  if (defaultFacing) {
    defaultFacing.classList.add("active");
    console.log("✅ Default facing set: north");
  } else {
    console.log("❌ Could not find north facing button");
  }

  // Reset floor count
  floorCount = 1;
  document.getElementById("floorCount").textContent = floorCount;

  console.log("✅ Plan finder modal opened with defaults");

  // Test if buttons are clickable after modal opens
  setTimeout(() => {
    console.log("🧪 Testing button clickability...");
    const testBtn = document.querySelector(
      ".dimension-btn[data-value='30x50']"
    );
    if (testBtn) {
      console.log("✅ Found test button:", testBtn);
      console.log("✅ Button classes:", testBtn.className);
      console.log("✅ Button dataset:", testBtn.dataset);
    } else {
      console.log("❌ Could not find test button");
    }
  }, 100);
}

function closePlanFinder() {
  document.getElementById("planFinderModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function closeSearchResults() {
  document.getElementById("searchResultsModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function increaseFloors() {
  if (floorCount < 5) {
    floorCount++;
    document.getElementById("floorCount").textContent = floorCount;
  }
}

function decreaseFloors() {
  if (floorCount > 1) {
    floorCount--;
    document.getElementById("floorCount").textContent = floorCount;
  }
}

// Setup plan finder event listeners using event delegation
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Setting up plan finder event listeners");

  // Use event delegation for better reliability
  document.addEventListener("click", function (e) {
    console.log(
      "🖱️ Click detected on:",
      e.target.tagName,
      "with classes:",
      e.target.className
    );

    // Handle dimension button clicks
    if (e.target.classList.contains("dimension-btn")) {
      e.preventDefault();
      e.stopPropagation();
      console.log("✅ Dimension button clicked:", e.target.dataset.value);

      // Remove active class from all dimension buttons
      document
        .querySelectorAll(".dimension-btn")
        .forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      e.target.classList.add("active");

      console.log("✅ Dimension selection updated");
    }

    // Handle facing button clicks
    if (e.target.classList.contains("facing-btn")) {
      e.preventDefault();
      e.stopPropagation();
      console.log("✅ Facing button clicked:", e.target.dataset.value);

      // Remove active class from all facing buttons
      document
        .querySelectorAll(".facing-btn")
        .forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      e.target.classList.add("active");

      console.log("✅ Facing selection updated");
    }
  });

  // Plan finder form submission
  const planFinderForm = document.getElementById("planFinderForm");
  if (planFinderForm) {
    planFinderForm.addEventListener("submit", handlePlanSearch);
  }

  console.log("✅ Plan finder event listeners setup complete");
});

async function handlePlanSearch(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const selectedDimension = document.querySelector(".dimension-btn.active")
    ?.dataset.value;
  const selectedFacing =
    document.querySelector(".facing-btn.active")?.dataset.value || "north";
  const bhk = formData.get("bhk");

  console.log("🔍 Search criteria:", {
    dimension: selectedDimension,
    facing: selectedFacing,
    floors: floorCount,
    bhk: bhk,
  });

  const searchCriteria = {
    dimension: selectedDimension,
    facing: selectedFacing,
    floors: floorCount,
    bhk: bhk,
  };

  try {
    // Show loading state
    const submitBtn = e.target.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Searching...";
    submitBtn.disabled = true;
    submitBtn.classList.add("searching");

    // Show loading notification
    showNotification("Searching for plans...", "info");

    // Search plans via API
    const response = await fetch(`${API_BASE}/plans/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchCriteria),
    });

    const data = await response.json();
    console.log("📊 Search results:", data);

    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.classList.remove("searching");

    // Close plan finder modal
    closePlanFinder();

    if (data.plans && data.plans.length > 0) {
      showSearchResults(data.plans, searchCriteria);
      showNotification(
        `Found ${data.plans.length} plans matching your criteria!`,
        "success"
      );
    } else {
      showNotification(
        "No plans found matching your criteria. Try different options.",
        "warning"
      );
    }
  } catch (error) {
    console.error("Error searching plans:", error);

    // Reset button state
    const submitBtn = e.target.querySelector(".btn-primary");
    submitBtn.textContent = "Search Plans";
    submitBtn.disabled = false;
    submitBtn.classList.remove("searching");

    showNotification("Error searching plans. Please try again.", "error");
    // Fallback to sample data
    closePlanFinder();
    showSearchResults(generateSamplePlans(searchCriteria), searchCriteria);
  }
}

function showSearchResults(plans, criteria) {
  const resultsContainer = document.getElementById("searchResults");

  resultsContainer.innerHTML = plans
    .map((plan) => {
      console.log("🖼️ Rendering plan:", plan.title, "Image:", plan.image);
      console.log(
        "🖼️ Image starts with /uploads:",
        plan.image && plan.image.startsWith("/uploads")
      );

      return `
        <div class="plan-card">
          <div class="plan-card-inner">
            <div class="plan-image">
              ${getPlanImageMarkup(plan)}
            </div>
            <div class="plan-details">
              <div class="plan-title">${plan.title}</div>
              <div class="plan-specs">
                <span>${plan.plotDimension || plan.dimension || "N/A"}</span>
                <span>${formatBhk(plan.bhk)}</span>
                <span>${formatFloorCount(plan.floors)}</span>
                ${
                  plan.facing && plan.facing !== "any"
                    ? `<span>${plan.facing} Facing</span>`
                    : ""
                }
              </div>
              <div class="plan-price">₹${
                typeof plan.price === "number"
                  ? plan.price.toLocaleString()
                  : plan.price
              }</div>
              ${
                plan.description
                  ? `<p style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${plan.description}</p>`
                  : ""
              }
              ${
                plan.features && plan.features.length > 0
                  ? `<div style="margin: 0.5rem 0;">
                      <strong style="font-size: 0.85rem;">Features:</strong>
                      <p style="font-size: 0.85rem; color: #666;">${plan.features.join(", ")}</p>
                    </div>`
                  : ""
              }
              <div class="plan-actions">
                <button class="btn-view" onclick="viewPlan('${plan.id}')">View Details</button>
                <button class="btn-download" onclick="downloadPlan('${plan.id}')">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("searchResultsModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function getPlanImageMarkup(plan) {
  const image = plan.image || "";
  const isCloudUrl =
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("//");
  const isLocalUpload = image.startsWith("/uploads");

  if (isCloudUrl || isLocalUpload) {
    return `<img src="${image}" alt="${plan.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.closest('.plan-image').innerHTML='<div class="plan-image-fallback">🏠</div>'" />`;
  }

  if (image && image.length <= 6) {
    return `<div class="plan-image-fallback">${image}</div>`;
  }

  return `<div class="plan-image-fallback">🏠</div>`;
}

function formatBhk(bhk) {
  if (!bhk) return "N/A";
  const value = String(bhk).replace(/[^0-9]/g, "");
  return value ? `${value} BHK` : `${bhk}`;
}

function formatFloorCount(floors) {
  if (floors === undefined || floors === null) return "N/A";
  const numFloors = Number(floors);
  if (Number.isFinite(numFloors)) {
    return `${numFloors} Floor${numFloors > 1 ? "s" : ""}`;
  }
  return `${floors}`;
}

function generateSamplePlans(criteria) {
  const plans = [
    {
      id: "plan1",
      title: "Modern Family Home",
      dimension: criteria.dimension,
      bhk: `${criteria.bhk} BHK`,
      floors: criteria.floors,
      price: "15,000",
      image: "🏠 Modern Design",
    },
    {
      id: "plan2",
      title: "Contemporary Villa",
      dimension: criteria.dimension,
      bhk: `${criteria.bhk} BHK`,
      floors: criteria.floors,
      price: "18,500",
      image: "🏡 Villa Design",
    },
    {
      id: "plan3",
      title: "Traditional House",
      dimension: criteria.dimension,
      bhk: `${criteria.bhk} BHK`,
      floors: criteria.floors,
      price: "12,000",
      image: "🏘️ Traditional Style",
    },
    {
      id: "plan4",
      title: "Minimalist Home",
      dimension: criteria.dimension,
      bhk: `${criteria.bhk} BHK`,
      floors: criteria.floors,
      price: "16,000",
      image: "🏠 Minimalist Design",
    },
  ];

  return plans;
}

function viewPlan(planId) {
  showNotification(`Viewing plan: ${planId}`, "success");
  // Here you would typically open a detailed view or redirect to a plan details page
}

function downloadPlan(planId) {
  console.log("📄 Downloading PDF for plan:", planId);

  // Show loading notification
  showNotification("Generating PDF...", "info");

  // Create download link
  const downloadUrl = `${API_BASE}/house-plans/${planId}/download`;

  // Create a temporary link element and trigger download
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `house_plan_${planId}.pdf`;
  link.style.display = "none";

  // Add to DOM, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show success notification after a short delay
  setTimeout(() => {
    showNotification("PDF download started!", "success");
  }, 1000);
}

// 3D Elevations Functions
function show3DElevations() {
  closeAllModals();
  document.getElementById("elevationsMainModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function show3DViewer(designType) {
  const titles = {
    modern: "Contemporary Modern Villa - 3D View",
    traditional: "Classic Traditional Home - 3D View",
    luxury: "Premium Luxury Villa - 3D View",
    minimalist: "Sleek Minimalist Home - 3D View",
  };

  const icons = {
    modern: '<i class="fas fa-building"></i>',
    traditional: '<i class="fas fa-home"></i>',
    luxury: '<i class="fas fa-crown"></i>',
    minimalist: '<i class="fas fa-square"></i>',
  };

  document.getElementById("viewer3DTitle").textContent =
    titles[designType] || "3D Elevation View";
  document.getElementById("viewerContent").innerHTML =
    icons[designType] || '<i class="fas fa-cube"></i>';
  document.getElementById("viewer3DModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function close3DViewer() {
  document.getElementById("viewer3DModal").style.display = "none";
  document.body.style.overflow = "auto";
}

let currentRotation = 0;
function rotateModel(direction) {
  const viewer = document.getElementById("viewerContent");
  if (direction === "left") {
    currentRotation -= 45;
  } else {
    currentRotation += 45;
  }
  viewer.style.transform = `rotateY(${currentRotation}deg)`;
  viewer.style.transition = "transform 0.5s ease";
}

function resetView() {
  currentRotation = 0;
  const viewer = document.getElementById("viewerContent");
  viewer.style.transform = "rotateY(0deg)";
  viewer.style.transition = "transform 0.5s ease";
  showNotification("View reset to default position", "info");
}

// Elevation Request Functions
function showElevationRequest() {
  close3DViewer(); // Close 3D viewer if open
  closeAllModals();
  document.getElementById("elevationRequestModal").style.display = "block";
}

async function handleElevationRequest(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  // Collect all form data including checkboxes
  const materials = Array.from(formData.getAll("materials")).join(", ");
  const colors = Array.from(formData.getAll("colors")).join(", ");
  const features = Array.from(formData.getAll("features")).join(", ");

  const requestData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    designType: formData.get("designType"),
    plotSize: formData.get("plotSize") || "",
    floors: formData.get("floors") || "",
    style: formData.get("style") || "",
    urgency: formData.get("urgency") || "",
    budget: formData.get("budget") || "",
    requirements: formData.get("requirements"),
    materials: materials || "Not specified",
    colors: colors || "Not specified",
    features: features || "Not specified",
    hasPlans: formData.get("hasPlans") ? "Yes" : "No",
    hasPhotos: formData.get("hasPhotos") ? "Yes" : "No",
    service: "3D Elevation Design",
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (response.ok) {
      closeModal("elevationRequestModal");
      showNotification(
        "3D Elevation request submitted successfully! We will contact you within 24 hours.",
        "success"
      );
      e.target.reset();
    } else {
      showNotification(data.message || "Failed to submit request", "error");
    }
  } catch (error) {
    console.error("Elevation request error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Vastu Functions
function showVastuConsultancy() {
  closeAllModals();
  document.getElementById("vastuMainModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function showVastuBooking() {
  closeAllModals();
  document.getElementById("vastuBookingModal").style.display = "block";
}

async function handleVastuBooking(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  // Collect checkbox data
  const concerns = Array.from(formData.getAll("concerns")).join(", ");
  const focusAreas = Array.from(formData.getAll("focus_areas")).join(", ");

  const bookingData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    consultationType: formData.get("consultationType"),
    propertyType: formData.get("propertyType") || "",
    consultationMode: formData.get("consultationMode") || "",
    consultantLevel: formData.get("consultantLevel") || "",
    plotSize: formData.get("plotSize") || "",
    urgency: formData.get("urgency") || "",
    concerns: formData.get("concerns"),
    concernAreas: concerns || "Not specified",
    focusAreas: focusAreas || "Not specified",
    hasFloorPlan: formData.get("hasFloorPlan") ? "Yes" : "No",
    hasPhotos: formData.get("hasPhotos") ? "Yes" : "No",
    hasProblems: formData.get("hasProblems") ? "Yes" : "No",
    service: "Vastu Consultation",
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.textContent = "Booking...";
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE}/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (response.ok) {
      closeModal("vastuBookingModal");
      showNotification(
        "Vastu consultation booked successfully! Our expert will contact you soon.",
        "success"
      );
      e.target.reset();
    } else {
      showNotification(data.message || "Failed to book consultation", "error");
    }
  } catch (error) {
    console.error("Vastu booking error:", error);
    showNotification("Network error. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Add event listeners for new forms
document.addEventListener("DOMContentLoaded", function () {
  const elevationRequestForm = document.getElementById("elevationRequestForm");
  if (elevationRequestForm) {
    elevationRequestForm.addEventListener("submit", handleElevationRequest);
  }

  const vastuBookingForm = document.getElementById("vastuBookingForm");
  if (vastuBookingForm) {
    vastuBookingForm.addEventListener("submit", handleVastuBooking);
  }
});
