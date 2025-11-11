# 🚀 How to Run Planify in Visual Studio Code

## ✅ **Quick Start (Easiest Method)**

### **Step 1: Open VS Code**
1. Open Visual Studio Code
2. Open the folder: `/Users/lucky/Downloads/building`
   - `File` → `Open Folder` → Select the `building` folder

### **Step 2: Open Terminal**
Press `` Ctrl + ` `` (backtick key) to open the integrated terminal

### **Step 3: Start the Server**
In the terminal, type:
```bash
node demo-server.js
```

### **Step 4: Open the Website**
Open your browser and go to:
```
http://localhost:3000
```

**That's it! Your website is now running!** 🎉

---

## 🔧 **Alternative Methods in VS Code**

### **Method 1: Using VS Code Tasks**
1. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)
2. Type "Run Task"
3. Select "Start Planify Server"
4. Website will open on port 3000

**To stop the server:**
1. Press `Cmd + Shift + P`
2. Type "Run Task"
3. Select "Stop Planify Server"

### **Method 2: Using Debug Mode**
1. Click the **Debug icon** (▷) in VS Code sidebar
2. Select **"Launch Planify Server"** from dropdown
3. Press **F5** or click the green play button
4. Server will start in debug mode with breakpoints support

---

## 📋 **What You Can Do:**

Once the server is running, you can:

✅ **Login/Register** - Test user authentication  
✅ **Search House Plans** - Click "Readymade House Plan" to search  
✅ **Submit Consultation** - Get free consultation requests  
✅ **View Packages** - Browse design packages  
✅ **Contact Form** - Send messages  
✅ **Email Notifications** - Admin gets emails at ritheesh21505@gmail.com  

---

## 🛑 **How to Stop the Server:**

**In Terminal:**
- Press `Ctrl + C` in the terminal where the server is running

**Or use this command:**
```bash
pkill -f "node demo-server.js"
```

---

## 🔍 **Troubleshooting:**

### **Port Already in Use:**
```bash
pkill -f "node demo-server.js"
node demo-server.js
```

### **Server Won't Start:**
1. Make sure you're in the correct folder: `/Users/lucky/Downloads/building`
2. Check if Node.js is installed: `node --version`
3. Kill any running servers: `pkill -f "node demo-server.js"`

### **Email Notifications Not Working:**
- Currently in Demo Mode (emails shown in console)
- To enable real emails: Run `node enable-real-emails.js`

---

## 🎯 **Quick Commands:**

```bash
# Start server
node demo-server.js

# Start with email setup
node enable-real-emails.js

# Stop server
pkill -f "node demo-server.js"

# Check if server is running
lsof -i :3000
```

---

## 🌐 **Access Points:**

- **Website**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Packages**: http://localhost:3000/api/packages
- **Plan Search**: http://localhost:3000/api/plans/search

---

**Enjoy your Planify website!** 🏠✨


