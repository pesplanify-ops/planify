# 🎯 VS Code Guide - Running Planify

## 🚀 Quick Start in VS Code

### **Step 1: Open Project in VS Code**

```bash
# Open the entire project folder
code /Users/lucky/Downloads/building
```

Or:

1. Open VS Code
2. File → Open Folder
3. Navigate to `/Users/lucky/Downloads/building`
4. Click "Open"

---

### **Step 2: Open Integrated Terminal**

**Keyboard Shortcuts:**

- Mac: ` Ctrl + `` (backtick) or  `Cmd + J`
- Windows/Linux: `Ctrl + `` (backtick)

**Or use menu:**

- Terminal → New Terminal

---

### **Step 3: Run the Server**

In the terminal, type:

```bash
node start-with-email.js
```

You should see:

```
🏠 Planify - Starting with Email Notifications
==============================================
🚀 Starting in demo mode (email preview in console)...
🏠 Houseyog Clone Server running on port 3000
📱 Frontend: http://localhost:3000
🎯 Ready to use! Open http://localhost:3000 in your browser.
```

---

### **Step 4: Open in Browser**

**Option 1: Click the link**

- Hold `Cmd` (Mac) or `Ctrl` (Windows/Linux)
- Click on `http://localhost:3000` in the terminal

**Option 2: Manual**

- Open your browser
- Type: `http://localhost:3000`

---

## 🎨 Enhanced VS Code Setup

### **1. Install Recommended Extensions**

Open VS Code Extensions (⇧⌘X):

**Essential:**

- **Live Server** - Right-click HTML to open with live reload
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Thunder Client** - Test APIs (like Postman)
- **Material Icon Theme** - Better file icons

**Optional but helpful:**

- **REST Client** - Test APIs from VS Code
- **GitLens** - Git integration
- **JavaScript (ES6) code snippets**
- **Path Intellisense**
- **Auto Rename Tag**

---

### **2. Create VS Code Tasks** (One-Click Run!)

Create `.vscode/tasks.json`:

1. Create `.vscode` folder in your project root
2. Create `tasks.json` file inside it

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Planify Server",
      "type": "shell",
      "command": "node start-with-email.js",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "Stop Server (Kill Port 3000)",
      "type": "shell",
      "command": "lsof -ti:3000 | xargs kill -9 || echo 'No process on port 3000'",
      "problemMatcher": []
    },
    {
      "label": "Restart Server",
      "dependsOn": ["Stop Server (Kill Port 3000)", "Start Planify Server"],
      "dependsOrder": "sequence",
      "problemMatcher": []
    }
  ]
}
```

**How to use:**

- Press `Cmd+Shift+B` (Mac) or `Ctrl+Shift+B` (Windows/Linux)
- Or: Terminal → Run Task → Select task

---

### **3. Create Launch Configuration** (For Debugging)

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Planify Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/start-with-email.js",
      "console": "integratedTerminal"
    }
  ]
}
```

**How to use:**

- Press `F5` to start debugging
- Set breakpoints by clicking left of line numbers
- Use Debug console for inspection

---

### **4. Keyboard Shortcuts Cheat Sheet**

#### **Terminal Commands:**

- `Ctrl + `` - Toggle terminal
- `Cmd + K` - Clear terminal
- `Ctrl + C` - Stop server

#### **File Navigation:**

- `Cmd + P` - Quick file open
- `Cmd + Shift + F` - Search in all files
- `Cmd + B` - Toggle sidebar

#### **Code Editing:**

- `Alt + Up/Down` - Move line up/down
- `Shift + Alt + Up/Down` - Copy line up/down
- `Cmd + /` - Toggle comment
- `Cmd + D` - Select next occurrence

#### **Running:**

- `F5` - Start debugging
- `Cmd + Shift + B` - Run build task

---

## 🎯 Multiple Ways to Run

### **Option 1: Integrated Terminal** (Current Method)

```bash
node start-with-email.js
```

### **Option 2: Debug Mode** (With Breakpoints)

1. Press `F5`
2. Or click "Run and Debug" in sidebar
3. Select "Launch Planify Server"

### **Option 3: NPM Script**

```bash
npm start
```

### **Option 4: VS Code Task**

1. Press `Cmd+Shift+B`
2. Select "Start Planify Server"

---

## 🛠️ Useful VS Code Features

### **1. Split Terminal**

- Click the split icon in terminal
- Run server in one, test commands in another

### **2. Split Editor**

- View HTML, CSS, and JS side by side
- Drag file to right side or press `Cmd + \`

### **3. Live Preview**

While server is running:

1. Open `frontend/index.html`
2. Right-click → "Open with Live Server"
3. Edit code and see changes instantly

### **4. Integrated Source Control**

- Click Source Control icon (⌃⇧G)
- View changes, commit, push

### **5. Search & Replace**

- `Cmd + F` - Find in file
- `Cmd + Shift + F` - Find in all files
- `Cmd + H` - Replace in file

---

## 📊 Monitor Your Server

### **View Server Logs:**

All console output appears in the integrated terminal:

- Server start messages
- API requests
- Email notifications (demo mode)
- Errors (if any)

### **Test API Endpoints:**

**Using Thunder Client Extension:**

1. Install Thunder Client
2. Click Thunder Client icon
3. New Request
4. GET `http://localhost:3000/api/packages`
5. Send

**Using Terminal (curl):**

```bash
# Open new terminal (click + icon)
curl http://localhost:3000/api/packages
```

---

## 🐛 Troubleshooting in VS Code

### **Problem: Port Already in Use**

**Solution 1: From Terminal**

```bash
# Stop the process
lsof -ti:3000 | xargs kill -9

# Restart
node start-with-email.js
```

**Solution 2: Use VS Code Task**

- Terminal → Run Task
- Select "Restart Server"

### **Problem: Changes Not Reflecting**

**Solutions:**

1. Stop server (`Ctrl+C`) and restart
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Clear browser cache

### **Problem: Can't Find File**

**Solution:**

- Press `Cmd+P`
- Type filename
- VS Code will find it

---

## 🎨 Recommended VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.detectIndentation": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.minimap.enabled": true,
  "editor.wordWrap": "on",
  "terminal.integrated.fontSize": 14,
  "workbench.colorTheme": "Default Dark+",
  "javascript.suggest.autoImports": true,
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 🚀 Pro Tips for Demo Day

### **1. Multi-Terminal Setup**

Split your terminal:

- **Terminal 1**: Server running
- **Terminal 2**: For testing API endpoints
- **Terminal 3**: For git commands

### **2. Zen Mode for Presentation**

- Press `Cmd+K Z` to enter Zen Mode
- Distraction-free, full screen
- Press `Esc Esc` to exit

### **3. Show Console Output**

Keep terminal visible to show:

- Server starting
- Email notifications in real-time
- API requests

### **4. Quick File Switching**

- Press `Cmd+P`
- Type file name
- Switch instantly during demo

### **5. Collapse All Folders**

- Right-click on Explorer
- "Collapse Folders in Explorer"
- Clean view for demo

---

## 📁 Recommended Folder Structure View

```
building/
├── .vscode/              # VS Code configuration
│   ├── tasks.json        # Tasks for running/stopping
│   ├── launch.json       # Debug configuration
│   └── settings.json     # Workspace settings
├── frontend/             # Frontend files
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── routes/               # API routes
├── models/               # Data models
├── demo-server.js        # Main server
├── start-with-email.js   # Startup script
├── package.json          # Dependencies
└── DEMO_GUIDE.md         # Your demo guide
```

---

## 🎯 Quick Command Reference

### **Start Server:**

```bash
node start-with-email.js
```

### **Stop Server:**

```bash
# Press Ctrl+C in terminal
# Or:
lsof -ti:3000 | xargs kill -9
```

### **Restart Server:**

```bash
# Stop (Ctrl+C) then run again
node start-with-email.js
```

### **Test Server:**

```bash
curl http://localhost:3000/api/packages
```

### **View Server on Browser:**

```
http://localhost:3000
```

---

## 🎓 VS Code Extensions for This Project

### **Install in One Command:**

Open terminal in VS Code and run:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension rangav.vscode-thunder-client
code --install-extension ritwickdey.liveserver
```

---

## 🎬 Final Setup for Tomorrow's Demo

### **Morning Checklist:**

1. **Open VS Code**

   ```bash
   code /Users/lucky/Downloads/building
   ```

2. **Open Terminal** (`Ctrl + \``)

3. **Start Server**

   ```bash
   node start-with-email.js
   ```

4. **Verify It's Running**

   - Look for "🎯 Ready to use!" message
   - Check http://localhost:3000

5. **Arrange Windows**

   - VS Code on left (with terminal showing)
   - Browser on right

6. **You're Ready!** 🚀

---

## 💡 During the Demo

### **Show Professional Workflow:**

1. **Code in VS Code**: "Here's the clean code structure..."
2. **Terminal Output**: "Watch the server respond in real-time..."
3. **Browser Result**: "And here's the working application..."

### **Impressive VS Code Features to Mention:**

- "I'm using VS Code's integrated terminal for development"
- "Quick file navigation with Command+P"
- "Real-time console output shows email notifications"
- "I can debug with breakpoints if needed"

---

## 🆘 Emergency Commands (If Something Goes Wrong)

### **Server Won't Start:**

```bash
# Kill everything on port 3000
lsof -ti:3000 | xargs kill -9

# Clear node cache (rarely needed)
rm -rf node_modules
npm install

# Start fresh
node start-with-email.js
```

### **VS Code Acting Weird:**

- `Cmd+Shift+P` → "Reload Window"
- Or restart VS Code

### **Terminal Not Responding:**

- Click trash icon to kill terminal
- Open new terminal
- Run server again

---

## 🎉 You're All Set!

Your VS Code is now configured for:

- ✅ Easy one-command startup
- ✅ Professional development workflow
- ✅ Real-time console monitoring
- ✅ Quick debugging if needed
- ✅ Impressive demo presentation

**Just open VS Code, run the server, and you're ready to impress! 🚀**

---

_Happy Coding & Good Luck Tomorrow! 💪_
