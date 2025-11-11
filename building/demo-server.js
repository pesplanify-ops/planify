const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const emailConfig = require("./email-config");
const { demoConsultations, demoProjects } = require("./init-demo-data");
const PDFDocument = require("pdfkit");

const app = express();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads", "house-plans");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size is 5MB." });
    }
  }
  if (error.message === "Only image files are allowed!") {
    return res.status(400).json({ message: "Only image files are allowed!" });
  }
  next(error);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));
// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Email configuration (Demo Mode)
const transporter = nodemailer.createTransport(emailConfig.gmail);

// Check if email is properly configured
const isEmailConfigured =
  emailConfig.gmail.auth.user !== "your_email@gmail.com" &&
  emailConfig.gmail.auth.pass !== "your_app_password";

// Email notification function for consultations
async function sendConsultationNotification(consultationData) {
  const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">New Consultation Request</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Client Information</h3>
                <p><strong>Name:</strong> ${consultationData.name}</p>
                <p><strong>Email:</strong> ${consultationData.email}</p>
                <p><strong>Phone:</strong> ${consultationData.phone}</p>
                <p><strong>Service:</strong> ${consultationData.service}</p>
            </div>
            
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Project Details</h3>
                <p><strong>Plot Size:</strong> ${
                  consultationData.plotSize || "Not specified"
                }</p>
                <p><strong>Budget Range:</strong> ${
                  consultationData.budget || "Not specified"
                }</p>
                <p><strong>Timeline:</strong> ${
                  consultationData.timeline || "Not specified"
                }</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Requirements</h3>
                <p>${consultationData.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666; font-size: 14px;">
                    This consultation was submitted on ${new Date().toLocaleString()}
                </p>
                <a href="mailto:${consultationData.email}" 
                   style="background-color: #2c5aa0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reply to Client
                </a>
            </div>
        </div>
    `;

  if (isEmailConfigured) {
    try {
      // Send to all admin emails
      const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
      const mailOptions = {
        from: emailConfig.templates.consultation.from,
        to: adminEmails.join(", "), // Send to all admins
        subject: emailConfig.templates.consultation.subject,
        html: emailHtml,
      };

      await transporter.sendMail(mailOptions);
      console.log(
        `📧 Email notification sent to ${
          adminEmails.length
        } admin(s): ${adminEmails.join(", ")}`
      );
    } catch (error) {
      console.error("❌ Error sending email notification:", error);
    }
  } else {
    // Demo mode - show what the email would look like
    const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
    console.log("\n📧 EMAIL NOTIFICATION (Demo Mode)");
    console.log("=====================================");
    console.log(`To: ${adminEmails.join(", ")}`);
    console.log(`Subject: ${emailConfig.templates.consultation.subject}`);
    console.log("-------------------------------------");
    console.log(`Client: ${consultationData.name} (${consultationData.email})`);
    console.log(`Phone: ${consultationData.phone}`);
    console.log(`Service: ${consultationData.service}`);
    console.log(`Plot Size: ${consultationData.plotSize || "Not specified"}`);
    console.log(`Budget: ${consultationData.budget || "Not specified"}`);
    console.log(`Timeline: ${consultationData.timeline || "Not specified"}`);
    console.log(`Requirements: ${consultationData.message}`);
    console.log("=====================================\n");
    console.log("💡 To enable real email notifications:");
    console.log("   1. Update email-config.js with your Gmail credentials");
    console.log("   2. Enable 2FA and generate an App Password");
    console.log("   3. Restart the server\n");
  }
}

// Email notification function for contact form
async function sendContactNotification(contactData) {
  const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">New Contact Message</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Phone:</strong> ${contactData.phone}</p>
                <p><strong>Service:</strong> ${contactData.service}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Message</h3>
                <p>${contactData.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666; font-size: 14px;">
                    This message was sent on ${new Date().toLocaleString()}
                </p>
                <a href="mailto:${contactData.email}" 
                   style="background-color: #2c5aa0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Reply to Client
                </a>
            </div>
        </div>
    `;

  if (isEmailConfigured) {
    try {
      // Send to all admin emails
      const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
      const mailOptions = {
        from: emailConfig.templates.consultation.from,
        to: adminEmails.join(", "), // Send to all admins
        subject: "New Contact Message - Planify",
        html: emailHtml,
      };
      await transporter.sendMail(mailOptions);
      console.log(
        `📧 Contact email notification sent to ${
          adminEmails.length
        } admin(s): ${adminEmails.join(", ")}`
      );
    } catch (error) {
      console.error("❌ Error sending contact email notification:", error);
    }
  } else {
    const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
    console.log("\n📧 CONTACT EMAIL NOTIFICATION (Demo Mode)");
    console.log("==========================================");
    console.log(`To: ${adminEmails.join(", ")}`);
    console.log(`Subject: New Contact Message - Planify`);
    console.log("------------------------------------------");
    console.log(`Name: ${contactData.name}`);
    console.log(`Email: ${contactData.email}`);
    console.log(`Phone: ${contactData.phone}`);
    console.log(`Service: ${contactData.service}`);
    console.log(`Message: ${contactData.message}`);
    console.log("==========================================\n");
  }
}

// Email notification function for new projects
async function sendProjectNotification(projectData) {
  const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5aa0;">New Project Created</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Project Information</h3>
                <p><strong>Title:</strong> ${projectData.title}</p>
                <p><strong>Type:</strong> ${projectData.type}</p>
                <p><strong>Budget:</strong> ₹${projectData.budget}</p>
                <p><strong>Plot Size:</strong> ${
                  projectData.plotSize || "Not specified"
                }</p>
            </div>
            
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Description</h3>
                <p>${projectData.description}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Requirements</h3>
                <p>${
                  projectData.requirements ||
                  "No specific requirements mentioned"
                }</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666; font-size: 14px;">
                    This project was created on ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    `;

  if (isEmailConfigured) {
    try {
      // Send to all admin emails
      const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
      const mailOptions = {
        from: emailConfig.templates.consultation.from,
        to: adminEmails.join(", "), // Send to all admins
        subject: "New Project Created - Planify",
        html: emailHtml,
      };
      await transporter.sendMail(mailOptions);
      console.log(
        `📧 Project email notification sent to ${
          adminEmails.length
        } admin(s): ${adminEmails.join(", ")}`
      );
    } catch (error) {
      console.error("❌ Error sending project email notification:", error);
    }
  } else {
    const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
    console.log("\n📧 PROJECT EMAIL NOTIFICATION (Demo Mode)");
    console.log("==========================================");
    console.log(`To: ${adminEmails.join(", ")}`);
    console.log(`Subject: New Project Created - Planify`);
    console.log("------------------------------------------");
    console.log(`Title: ${projectData.title}`);
    console.log(`Type: ${projectData.type}`);
    console.log(`Budget: ₹${projectData.budget}`);
    console.log(`Plot Size: ${projectData.plotSize || "Not specified"}`);
    console.log(`Description: ${projectData.description}`);
    console.log(`Requirements: ${projectData.requirements || "Not specified"}`);
    console.log("==========================================\n");
  }
}

// Sample data for demonstration - In-memory storage
const samplePackages = [
  {
    name: "Basic House Plan",
    description: "Perfect for small homes and budget-conscious clients",
    price: 4499,
    features: [
      "2D Floor Plan",
      "Basic Elevation Design",
      "Site Plan",
      "2 Revisions",
      "PDF Delivery",
    ],
    category: "house_plan",
    duration: "7-10 days",
    revisions: 2,
    isPopular: false,
  },
  {
    name: "Premium House Design",
    description: "Complete house design with 3D visualization",
    price: 8999,
    features: [
      "2D Floor Plan",
      "3D Elevation Design",
      "Site Plan",
      "Structural Plan",
      "5 Revisions",
      "3D Views",
      "Material Suggestions",
    ],
    category: "house_plan",
    duration: "10-15 days",
    revisions: 5,
    isPopular: true,
  },
  {
    name: "Complete Interior Design",
    description: "Full interior design with 3D visualization",
    price: 12999,
    features: [
      "3D Interior Views",
      "Furniture Layout",
      "Material Selection",
      "Lighting Plan",
      "Unlimited Revisions",
      "Color Schemes",
      "Shopping List",
    ],
    category: "interior",
    duration: "15-20 days",
    revisions: -1,
    isPopular: false,
  },
];

// In-memory storage for demo mode - Initialize with demo data
const demoStorage = {
  consultations: [...demoConsultations],
  projects: [...demoProjects],
  users: [],
  contacts: [],
  housePlans: [], // Store uploaded house plans
};

// Persistent storage file
const STORAGE_FILE = path.join(__dirname, "demo-storage.json");

// Load data from file on startup
function loadStorage() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf8");
      const parsed = JSON.parse(data);
      // Only load housePlans from file, keep other demo data
      if (parsed.housePlans) {
        demoStorage.housePlans = parsed.housePlans;
      }
      console.log("📁 Loaded persistent storage:", {
        housePlans: demoStorage.housePlans.length,
      });
    } else {
      console.log("📁 No existing storage file, starting fresh");
    }
  } catch (error) {
    console.error("❌ Error loading storage:", error);
  }
}

// Save data to file
function saveStorage() {
  try {
    const dataToSave = {
      housePlans: demoStorage.housePlans,
    };
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(dataToSave, null, 2));
    console.log("💾 Saved storage to file");
  } catch (error) {
    console.error("❌ Error saving storage:", error);
  }
}

// Load storage on startup
loadStorage();

// Mock API routes
app.get("/api/packages", (req, res) => {
  res.json(samplePackages);
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const userData = {
      id: "demo-user",
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: "client",
      createdAt: new Date(),
    };

    // Send email notification to admin
    await sendContactNotification({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: "User Registration",
      message: `New user registered: ${req.body.name} (${req.body.email})`,
    });

    res.json({
      message: "Registration completed successfully! Welcome to Planify!",
      token: "demo-token",
      user: userData,
    });
  } catch (error) {
    console.error("Error processing registration:", error);
    res.status(500).json({
      message: "Error processing registration",
      error: error.message,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const userData = {
      id: "demo-user",
      name: "Demo User",
      email: req.body.email,
      role: "client",
      lastLogin: new Date(),
    };

    // Send email notification to admin
    await sendContactNotification({
      name: "Demo User",
      email: req.body.email,
      phone: "Not provided",
      service: "User Login",
      message: `User logged in: ${req.body.email}`,
    });

    res.json({
      message: "Login successful! Welcome back to Planify!",
      token: "demo-token",
      user: userData,
    });
  } catch (error) {
    console.error("Error processing login:", error);
    res.status(500).json({
      message: "Error processing login",
      error: error.message,
    });
  }
});

app.get("/api/consultations", (req, res) => {
  try {
    res.json(demoStorage.consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({
      message: "Error fetching consultations",
      error: error.message,
    });
  }
});

app.post("/api/consultations", async (req, res) => {
  try {
    const consultationData = {
      id: `consultation-${Date.now()}`,
      ...req.body,
      status: "pending",
      createdAt: new Date(),
    };

    // Store in demo storage
    demoStorage.consultations.push(consultationData);

    // Send email notification to admin
    await sendConsultationNotification(consultationData);

    res.json({
      message:
        "Consultation request submitted successfully! We will contact you soon!",
      consultation: consultationData,
    });
  } catch (error) {
    console.error("Error processing consultation:", error);
    res.status(500).json({
      message: "Error processing consultation request",
      error: error.message,
    });
  }
});

app.get("/api/projects", (req, res) => {
  try {
    res.json(demoStorage.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const projectData = {
      id: `project-${Date.now()}`,
      ...req.body,
      status: "pending",
      createdAt: new Date(),
    };

    // Store in demo storage
    demoStorage.projects.push(projectData);

    // Send email notification to admin
    await sendProjectNotification(projectData);

    res.json({
      message:
        "Project created successfully! Your project is now under review!",
      project: projectData,
    });
  } catch (error) {
    console.error("Error processing project:", error);
    res.status(500).json({
      message: "Error processing project creation",
      error: error.message,
    });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const contactData = {
      id: "demo-contact",
      ...req.body,
      status: "new",
      createdAt: new Date(),
    };

    // Send email notification to admin
    await sendContactNotification(contactData);

    res.json({
      message: "Message sent successfully! We will get back to you soon!",
      contact: contactData,
    });
  } catch (error) {
    console.error("Error processing contact:", error);
    res.status(500).json({
      message: "Error processing contact message",
      error: error.message,
    });
  }
});

// =============================================
// HOUSE PLANS APIs
// =============================================

// Upload House Plan (Admin only)
app.post("/api/house-plans", upload.single("image"), async (req, res) => {
  try {
    console.log("📤 Upload request received");
    console.log("📁 File:", req.file);
    console.log("📝 Body:", req.body);

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Validate required fields
    if (
      !req.body.title ||
      !req.body.plotDimension ||
      !req.body.bhk ||
      !req.body.floors ||
      !req.body.price
    ) {
      console.log("❌ Missing required fields");
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const housePlanData = {
      id: `plan-${Date.now()}`,
      title: req.body.title,
      description: req.body.description || "",
      plotDimension: req.body.plotDimension,
      bhk: req.body.bhk,
      floors: parseInt(req.body.floors),
      facing: req.body.facing || "any",
      price: parseFloat(req.body.price),
      image: `/uploads/house-plans/${req.file.filename}`,
      features: req.body.features ? JSON.parse(req.body.features) : [],
      area: req.body.area ? parseFloat(req.body.area) : null,
      style: req.body.style || "modern",
      isAvailable: true,
      uploadedBy: req.body.uploadedBy || "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store in demo storage
    demoStorage.housePlans.push(housePlanData);

    // Save to persistent storage
    saveStorage();

    console.log("✅ House plan uploaded successfully:", housePlanData.title);
    console.log("📊 Total plans in storage:", demoStorage.housePlans.length);

    res.json({
      message: "House plan uploaded successfully!",
      housePlan: housePlanData,
    });
  } catch (error) {
    console.error("❌ Error uploading house plan:", error);
    res.status(500).json({
      message: "Error uploading house plan",
      error: error.message,
    });
  }
});

// Get All House Plans
app.get("/api/house-plans", (req, res) => {
  try {
    const availablePlans = demoStorage.housePlans.filter(
      (plan) => plan.isAvailable
    );
    console.log("📋 All house plans:", availablePlans);
    res.json({
      message: "House plans retrieved successfully",
      plans: availablePlans,
      total: availablePlans.length,
    });
  } catch (error) {
    console.error("Error fetching house plans:", error);
    res.status(500).json({
      message: "Error fetching house plans",
      error: error.message,
    });
  }
});

// Debug endpoint to see all stored data
app.get("/api/debug", (req, res) => {
  res.json({
    housePlans: demoStorage.housePlans,
    totalPlans: demoStorage.housePlans.length,
    consultations: demoStorage.consultations.length,
    projects: demoStorage.projects.length,
  });
});

// Serve the button test page
app.get("/QUICK_BUTTON_TEST.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "QUICK_BUTTON_TEST.html"));
});

// Download house plan as PDF
app.get("/api/house-plans/:id/download", (req, res) => {
  try {
    const { id } = req.params;
    const plan = demoStorage.housePlans.find((p) => p.id === id);

    if (!plan) {
      return res.status(404).json({ message: "House plan not found" });
    }

    console.log("📄 Generating PDF for plan:", plan.title);

    // Read the image file
    let imageBuffer = null;
    try {
      const imagePath = path.join(__dirname, plan.image);
      imageBuffer = fs.readFileSync(imagePath);
      console.log("✅ Image loaded successfully");
    } catch (error) {
      console.log("⚠️ Could not load image, using placeholder:", error.message);
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${plan.title.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}_House_Plan.pdf"`
    );

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add title
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .fillColor("#333")
      .text(plan.title, { align: "center" });

    doc.moveDown(1);

    // Add subtitle
    doc
      .fontSize(16)
      .font("Helvetica")
      .fillColor("#666")
      .text("Professional House Plan Design", { align: "center" });

    doc.moveDown(2);

    // Add house plan image
    if (imageBuffer) {
      try {
        // Use a simpler approach - just add the image with width constraint
        // PDFKit will automatically calculate the height to maintain aspect ratio
        const xPos = 50; // Left margin
        const yPos = doc.y;
        const imageWidth = 500;

        // Add the image - PDFKit will handle aspect ratio automatically
        doc.image(imageBuffer, xPos, yPos, { width: imageWidth });

        // Move down by a reasonable amount (we'll estimate based on typical aspect ratios)
        doc.y = yPos + 300; // Use a fixed height for now
        console.log("✅ Full image added to PDF successfully");
      } catch (error) {
        console.log("⚠️ Error adding image to PDF:", error.message);
        console.log("⚠️ Error details:", error);
        // Fallback to placeholder
        doc
          .rect(50, doc.y, 500, 300)
          .fillColor("#f5f5f5")
          .fill()
          .stroke("#ccc");
        doc
          .fontSize(20)
          .fillColor("#666")
          .text("🏠 House Plan Image", 50, doc.y - 150, {
            align: "center",
            width: 500,
          });
        doc
          .fontSize(14)
          .text(plan.title, 50, doc.y - 120, { align: "center", width: 500 });
        doc.y += 320; // Move down after placeholder
      }
    } else {
      // Add placeholder if no image
      doc.rect(50, doc.y, 500, 300).fillColor("#f5f5f5").fill().stroke("#ccc");
      doc
        .fontSize(20)
        .fillColor("#666")
        .text("🏠 House Plan Image", 50, doc.y - 150, {
          align: "center",
          width: 500,
        });
      doc
        .fontSize(14)
        .text(plan.title, 50, doc.y - 120, { align: "center", width: 500 });
      doc.y += 320; // Move down after placeholder
    }

    doc.moveDown(4);

    // Add plan details table
    const tableTop = doc.y;
    const tableLeft = 50;
    const tableWidth = 500;
    const rowHeight = 30;
    const labelWidth = 160; // Further reduced label width
    const valueWidth = 340; // Further increased value width

    // Table headers
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("#333")
      .text("Property Details", tableLeft, tableTop);

    doc.moveDown(0.5);

    // Table rows
    const details = [
      ["Plot Dimension", plan.plotDimension],
      ["BHK", plan.bhk],
      ["Floors", plan.floors],
      ["Facing", plan.facing],
      ["Style", plan.style],
    ];

    if (plan.area) {
      details.push(["Area", `${plan.area} sq ft`]);
    }

    details.forEach(([label, value], index) => {
      const y = tableTop + 40 + index * rowHeight;

      // Background for label
      doc
        .rect(tableLeft, y, labelWidth, rowHeight)
        .fillColor("#f9f9f9")
        .fill()
        .stroke("#ddd");

      // Background for value
      doc
        .rect(tableLeft + labelWidth, y, valueWidth, rowHeight)
        .fillColor("#fff")
        .fill()
        .stroke("#ddd");

      // Label text
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#333")
        .text(label, tableLeft + 10, y + 8, { width: labelWidth - 20 });

      // Value text with proper width constraint
      doc
        .font("Helvetica")
        .fillColor("#000")
        .text(value, tableLeft + labelWidth + 10, y + 8, {
          width: valueWidth - 20,
        });
    });

    doc.moveDown(2);

    // Add footer
    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666")
      .text(
        `Generated on ${new Date().toLocaleDateString()} | Planify House Plans`,
        50,
        doc.y,
        { align: "center", width: 500 }
      );

    // Finalize the PDF
    doc.end();

    console.log("✅ PDF generated successfully for:", plan.title);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).json({
      message: "Error generating PDF",
      error: error.message,
    });
  }
});

// Plan Search API - Now uses uploaded house plans
app.post("/api/plans/search", async (req, res) => {
  try {
    const { dimension, facing, floors, bhk } = req.body;

    console.log("🔍 Search request received:", {
      dimension,
      facing,
      floors,
      bhk,
    });
    console.log(
      "📋 Available plans in storage:",
      demoStorage.housePlans.length
    );
    console.log(
      "📋 Stored plans:",
      demoStorage.housePlans.map((p) => ({
        id: p.id,
        title: p.title,
        plotDimension: p.plotDimension,
        bhk: p.bhk,
        floors: p.floors,
        facing: p.facing,
      }))
    );

    // Search in uploaded house plans
    let filteredPlans = demoStorage.housePlans.filter((plan) => {
      let matches = true;
      const reasons = [];

      // Match BHK
      if (bhk && plan.bhk !== bhk) {
        matches = false;
        reasons.push(`BHK mismatch: search="${bhk}" vs plan="${plan.bhk}"`);
      }

      // Match floors
      if (floors && plan.floors !== parseInt(floors)) {
        matches = false;
        reasons.push(
          `Floors mismatch: search="${floors}" vs plan="${plan.floors}"`
        );
      }

      // Match plot dimension
      if (
        dimension &&
        dimension !== "custom" &&
        plan.plotDimension !== dimension
      ) {
        matches = false;
        reasons.push(
          `Dimension mismatch: search="${dimension}" vs plan="${plan.plotDimension}"`
        );
      }

      // Match facing (or if plan accepts any facing)
      if (facing && plan.facing !== "any" && plan.facing !== facing) {
        matches = false;
        reasons.push(
          `Facing mismatch: search="${facing}" vs plan="${plan.facing}"`
        );
      }

      // Only show available plans
      if (!plan.isAvailable) {
        matches = false;
        reasons.push("Plan not available");
      }

      console.log(
        `🔍 Plan "${plan.title}": ${matches ? "✅ MATCH" : "❌ NO MATCH"} ${
          reasons.length ? `(${reasons.join(", ")})` : ""
        }`
      );

      return matches;
    });

    // If no uploaded plans found, generate sample plans for demo
    if (filteredPlans.length === 0) {
      console.log("No uploaded plans found, using sample data");
      const samplePlans = [
        {
          id: "sample-plan1",
          title: "Modern Family Home",
          dimension: dimension,
          bhk: bhk,
          floors: floors,
          price: 15000,
          image: "🏠",
          description: "A contemporary home design perfect for modern families",
          features: [
            "Open Floor Plan",
            "Modern Kitchen",
            "Master Suite",
            "Balcony",
          ],
          isSample: true,
        },
        {
          id: "sample-plan2",
          title: "Contemporary Villa",
          dimension: dimension,
          bhk: bhk,
          floors: floors,
          price: 18500,
          image: "🏡",
          description: "Luxurious villa design with premium finishes",
          features: [
            "Grand Entrance",
            "Premium Materials",
            "Landscaped Garden",
            "Garage",
          ],
          isSample: true,
        },
      ];
      filteredPlans = samplePlans;
    }

    res.json({
      message: "Plans found successfully",
      plans: filteredPlans,
      total: filteredPlans.length,
      criteria: { dimension, facing, floors, bhk },
    });
  } catch (error) {
    console.error("Error searching plans:", error);
    res.status(500).json({
      message: "Error searching plans",
      error: error.message,
    });
  }
});

// Delete House Plan (Admin only)
app.delete("/api/house-plans/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = demoStorage.housePlans.findIndex((plan) => plan.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "House plan not found" });
    }

    // Get the plan to delete the image file
    const plan = demoStorage.housePlans[index];

    // Delete the image file
    if (plan.image && !plan.image.startsWith("🏠")) {
      const imagePath = path.join(__dirname, plan.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Remove from storage
    demoStorage.housePlans.splice(index, 1);

    // Save to persistent storage
    saveStorage();

    res.json({ message: "House plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting house plan:", error);
    res.status(500).json({
      message: "Error deleting house plan",
      error: error.message,
    });
  }
});

// Serve frontend files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Handle all other routes (SPA routing)
app.get("*", (req, res) => {
  // If it's a file request (has extension), serve the actual file
  if (req.path.includes(".")) {
    const filePath = path.join(__dirname, "frontend", req.path);
    if (require("fs").existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  } else {
    // For routes without extensions, serve index.html (SPA routing)
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏠 Houseyog Clone Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`\n✨ Demo Mode - No database required!`);
  console.log(`📋 Features available:`);
  console.log(`   • View services and packages`);
  console.log(`   • Submit consultation requests`);
  console.log(`   • Register/Login (demo mode)`);
  console.log(`   • Create projects (demo mode)`);
  console.log(`   • Email notifications (demo mode)`);

  if (isEmailConfigured) {
    console.log(`\n📧 Email notifications: ENABLED`);
    console.log(`   Admin email: ${emailConfig.admin.email}`);
  } else {
    console.log(`\n📧 Email notifications: DEMO MODE`);
    console.log(
      `   • Consultation submissions will show email preview in console`
    );
    console.log(`   • To enable real emails: update email-config.js`);
  }

  console.log(
    `\n🎯 Ready to use! Open http://localhost:${PORT} in your browser.`
  );
});
