# 🚀 Quick Start: Run in VS Code

## ✅ **3 Simple Steps**

### **Step 1: Open Project**

```bash
code /Users/lucky/Downloads/building
```

Or:

- Open VS Code
- File → Open Folder
- Select `building` folder

---

### **Step 2: Open Terminal**

Press: **`Ctrl + `` ** (Control + Backtick)

Or: Menu → Terminal → New Terminal

---

### **Step 3: Run Server**

Type in terminal:

```bash
node start-with-email.js
```

✅ **Done!** Open browser to: **http://localhost:3000**

---

## 🎯 **Even Easier: One-Click Run!**

I've set up VS Code tasks for you. Now you can:

### **Method 1: Build Task (Fastest)**

Press: **`Cmd + Shift + B`** (Mac) or **`Ctrl + Shift + B`** (Windows)

Select: **"🚀 Start Planify Server"**

### **Method 2: Task Menu**

1. Press `Cmd + Shift + P` (or `Ctrl + Shift + P`)
2. Type "Run Task"
3. Select: **"🚀 Start Planify Server"**

### **Method 3: Debug Mode**

Press: **`F5`**

This starts the server with debugging capability!

---

## 🛠️ **Available VS Code Tasks**

I've configured these one-click tasks for you:

| Task                        | Description            | Shortcut      |
| --------------------------- | ---------------------- | ------------- |
| 🚀 Start Planify Server     | Start the server       | `Cmd+Shift+B` |
| 🛑 Stop Server              | Kill port 3000         | Run Task menu |
| 🔄 Restart Server           | Stop & Start           | Run Task menu |
| 🧪 Test API - Packages      | Test packages endpoint | Run Task menu |
| 🧪 Test API - Consultations | Test consultations     | Run Task menu |
| 🧪 Test API - Projects      | Test projects          | Run Task menu |
| 🌐 Open in Browser          | Open localhost:3000    | Run Task menu |

**To use any task:**

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Run Task"
3. Select the task you want

---

## 📺 **Your VS Code Layout for Demo**

```
┌─────────────────────────────────────────────────┐
│  VS Code                                        │
├─────────────────────────────────────────────────┤
│  ┌───────────┬─────────────────────────────┐   │
│  │ Explorer  │  Code Editor                │   │
│  │           │                              │   │
│  │ Files:    │  frontend/index.html        │   │
│  │ ├─frontend│                              │   │
│  │ ├─routes  │                              │   │
│  │ ├─models  │                              │   │
│  │ └─*.js    │                              │   │
│  └───────────┴─────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │ TERMINAL                                │   │
│  │                                          │   │
│  │ $ node start-with-email.js             │   │
│  │ 🏠 Planify Server running on port 3000 │   │
│  │ 📱 Frontend: http://localhost:3000     │   │
│  │ 🎯 Ready to use!                        │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## ⌨️ **Essential Keyboard Shortcuts**

### **Running:**

- **`Cmd/Ctrl + Shift + B`** - Run server (Build task)
- **`F5`** - Start with debugging
- **`Ctrl + C`** - Stop server (in terminal)

### **Terminal:**

- **`Ctrl + `` ** - Open/close terminal
- **`Cmd/Ctrl + K`** - Clear terminal

### **Navigation:**

- **`Cmd/Ctrl + P`** - Quick file open
- **`Cmd/Ctrl + B`** - Toggle sidebar
- **`Cmd/Ctrl + Shift + F`** - Search all files

### **Editing:**

- **`Cmd/Ctrl + /`** - Toggle comment
- **`Alt + Up/Down`** - Move line
- **`Cmd/Ctrl + D`** - Select next match

---

## 🎬 **For Tomorrow's Demo**

### **Perfect Setup:**

1. **Open VS Code**

   ```bash
   code /Users/lucky/Downloads/building
   ```

2. **Split Your Screen:**

   - Terminal visible at bottom
   - Code editor on top

3. **Start Server:**

   - Press `Cmd+Shift+B`
   - Or type: `node start-with-email.js`

4. **Arrange Windows:**

   - VS Code on left (showing code + terminal)
   - Browser on right (http://localhost:3000)

5. **During Demo:**
   - Switch files with `Cmd+P`
   - Show terminal for email notifications
   - Show code structure in Explorer

---

## 🆘 **Troubleshooting**

### **Port Already in Use?**

**Option 1: Use VS Code Task**

- `Cmd+Shift+P` → "Run Task"
- Select: "🛑 Stop Server"
- Then start again

**Option 2: Terminal Command**

```bash
lsof -ti:3000 | xargs kill -9
node start-with-email.js
```

### **Changes Not Showing?**

1. Stop server: `Ctrl+C`
2. Restart: `node start-with-email.js`
3. Hard refresh browser: `Cmd+Shift+R`

### **Can't Find Terminal?**

- Press `Ctrl + `` (backtick)
- Or: View → Terminal

---

## 📁 **What I've Set Up For You**

Created in `.vscode/` folder:

1. **`tasks.json`** - One-click server commands
2. **`launch.json`** - Debug configuration
3. **`settings.json`** - Workspace preferences

These files make running and debugging super easy!

---

## 🎯 **Quick Reference**

### **To Run Server:**

```bash
# Method 1: Manual
node start-with-email.js

# Method 2: Quick (one-click)
# Press: Cmd+Shift+B

# Method 3: Debug mode
# Press: F5
```

### **Server URL:**

```
http://localhost:3000
```

### **To Stop Server:**

```bash
# In terminal, press: Ctrl+C
# Or use VS Code task: "🛑 Stop Server"
```

---

## ✨ **Pro Tips**

1. **Keep Terminal Visible** - Show email notifications during demo
2. **Use Quick Open** - `Cmd+P` to switch files fast
3. **Split Editor** - `Cmd+\` to view multiple files
4. **Zen Mode** - `Cmd+K Z` for distraction-free demo
5. **Task Runner** - `Cmd+Shift+B` impresses audience!

---

## 🎉 **You're Ready!**

Your VS Code is now configured with:

- ✅ One-click server start
- ✅ Easy debugging
- ✅ Helpful tasks
- ✅ Professional setup

**Just press `Cmd+Shift+B` and you're running! 🚀**

---

## 📞 **Quick Help**

**Open Project:**

```bash
code /Users/lucky/Downloads/building
```

**Run Server:**

```bash
node start-with-email.js
```

**Open Browser:**

```
http://localhost:3000
```

**That's it!** Simple as that! 💪

---

_Happy Coding! Your VS Code is ready for the demo! 🎊_
