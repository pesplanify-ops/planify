// Admin Panel JavaScript
const API_BASE = "/api";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  loadHousePlans();
});

// Setup event listeners
function setupEventListeners() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // Form submit
  document
    .getElementById("uploadForm")
    .addEventListener("submit", handleUpload);

  // Image preview
  document
    .getElementById("imageInput")
    .addEventListener("change", previewImage);
}

async function handleLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.disabled = true;
  const originalText = logoutBtn.innerHTML;
  logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out';

  try {
    await fetch("/admin/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    window.location.href = "/admin-login.html";
    logoutBtn.innerHTML = originalText;
    logoutBtn.disabled = false;
  }
}

// Preview image before upload
function previewImage(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("imagePreview");
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

// Handle upload form submission
async function handleUpload(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");
  const formData = new FormData();

  // Get form values
  const imageFile = document.getElementById("imageInput").files[0];
  if (!imageFile) {
    showNotification("Please select an image", "error");
    return;
  }

  // Validate required fields
  const title = document.getElementById("title").value;
  const plotDimension = document.getElementById("plotDimension").value;
  const bhk = document.getElementById("bhk").value;
  const floors = document.getElementById("floors").value;
  const price = document.getElementById("price").value;

  if (!title || !plotDimension || !bhk || !floors || !price) {
    showNotification("Please fill all required fields (*)", "error");
    return;
  }

  console.log("📤 Starting upload process...");
  console.log("📁 Image file:", imageFile);
  console.log("📝 Form data:", {
    title,
    plotDimension,
    bhk,
    floors,
    price,
  });

  // Add form data
  formData.append("image", imageFile);
  formData.append("title", title);
  formData.append("description", document.getElementById("description").value);
  formData.append("plotDimension", plotDimension);
  formData.append("bhk", bhk);
  formData.append("floors", floors);
  formData.append("facing", document.getElementById("facing").value);
  formData.append("price", price);
  formData.append("area", document.getElementById("area").value || "");
  formData.append("style", document.getElementById("style").value);

  // Parse features
  const featuresInput = document.getElementById("features").value;
  const features = featuresInput
    ? featuresInput.split(",").map((f) => f.trim())
    : [];
  formData.append("features", JSON.stringify(features));
  formData.append("uploadedBy", "admin");

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

  try {
    console.log("🚀 Sending request to:", `${API_BASE}/house-plans`);

    const response = await fetch(`${API_BASE}/house-plans`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    console.log("📡 Response status:", response.status);
    const data = await response.json();
    console.log("📄 Response data:", data);

    if (response.ok) {
      showNotification("✅ House plan uploaded successfully!", "success");
      form.reset();
      document.getElementById("imagePreview").style.display = "none";
      loadHousePlans(); // Reload the plans list
    } else {
      showNotification(
        "❌ Error: " + (data.message || "Upload failed"),
        "error"
      );
    }
  } catch (error) {
    console.error("❌ Upload error:", error);
    showNotification(
      "❌ Error uploading house plan: " + error.message,
      "error"
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload House Plan';
  }
}

// Load all house plans
async function loadHousePlans() {
  const plansList = document.getElementById("plansList");

  try {
    const response = await fetch(`${API_BASE}/house-plans`, {
      credentials: "include",
    });
    const data = await response.json();

    if (data.plans && data.plans.length > 0) {
      plansList.innerHTML = data.plans
        .map(
          (plan) => `
                <div class="plan-card">
                    <div>
                        ${renderPlanImage(plan)}
                    </div>
                    <div class="plan-details">
                        <div class="plan-title">${plan.title}</div>
                        ${
                          plan.description
                            ? `<p style="color: #666; margin: 0.5rem 0; font-size: 0.9rem;">${plan.description}</p>`
                            : ""
                        }
                        <div class="plan-specs">
                            <span class="spec-badge">${
                              plan.plotDimension
                            }</span>
                            <span class="spec-badge">${plan.bhk} BHK</span>
                            <span class="spec-badge">${plan.floors} Floor${
            Number(plan.floors) > 1 ? "s" : ""
          }</span>
                            <span class="spec-badge">${
                              plan.facing || "Any"
                            } Facing</span>
                            ${
                              plan.area
                                ? `<span class="spec-badge">${plan.area} sq ft</span>`
                                : ""
                            }
                        </div>
                        <div class="plan-price">₹${plan.price.toLocaleString()}</div>
                        ${
                          plan.features && plan.features.length > 0
                            ? `<p style="font-size: 0.85rem; color: #666; margin: 0.5rem 0;">
                                <strong>Features:</strong> ${plan.features.join(
                                  ", "
                                )}
                            </p>`
                            : ""
                        }
                        <div style="margin-top: 1rem;">
                            <button class="btn-delete" onclick="deletePlan('${
                              plan.id
                            }')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    } else {
      plansList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <p>No house plans uploaded yet</p>
                </div>
            `;
    }
  } catch (error) {
    console.error("Error loading plans:", error);
    plansList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading house plans</p>
            </div>
        `;
  }
}

function renderPlanImage(plan) {
  const image = plan.image || "";
  const isCloudUrl =
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("//");
  const isLocalUpload = image.startsWith("/uploads");

  if (isCloudUrl || isLocalUpload) {
    return `<img src="${image}" class="plan-image-thumb" alt="${plan.title}">`;
  }

  if (image && image.length <= 4) {
    return `<div class="plan-emoji">${image}</div>`;
  }

  return `<div class="plan-emoji">🏠</div>`;
}

// Delete a house plan
async function deletePlan(planId) {
  if (!confirm("Are you sure you want to delete this house plan?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/house-plans/${planId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      showNotification("✅ House plan deleted successfully!", "success");
      loadHousePlans(); // Reload the list
    } else {
      showNotification(
        "❌ Error: " + (data.message || "Delete failed"),
        "error"
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    showNotification("❌ Error deleting house plan", "error");
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Add CSS for slide out animation
const style = document.createElement("style");
style.textContent = `
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
