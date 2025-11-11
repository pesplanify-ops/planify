# ⌨️ Visual Studio Code Shortcuts for Planify

## 🚀 **Essential VS Code Shortcuts**

### **Running Your Server:**

1. **Open Terminal:**
   - Mac: `` Cmd + ` `` (backtick)
   - Windows/Linux: `` Ctrl + ` ``

2. **Split Terminal:**
   - Mac: `Cmd + \`
   - Windows/Linux: `Ctrl + Shift + 5`

3. **Clear Terminal:**
   - Type: `clear` and press Enter
   - Or: `Cmd + K` (Mac) / `Ctrl + K` (Windows/Linux)

### **File Navigation:**

- **Quick Open File:** `Cmd + P` (Mac) / `Ctrl + P` (Windows/Linux)
- **Search in Files:** `Cmd + Shift + F` (Mac) / `Ctrl + Shift + F` (Windows/Linux)
- **Go to Line:** `Cmd + G` (Mac) / `Ctrl + G` (Windows/Linux)
- **Open File Explorer:** `Cmd + Shift + E` (Mac) / `Ctrl + Shift + E` (Windows/Linux)

### **Editing:**

- **Format Document:** `Shift + Option + F` (Mac) / `Shift + Alt + F` (Windows/Linux)
- **Comment/Uncomment:** `Cmd + /` (Mac) / `Ctrl + /` (Windows/Linux)
- **Duplicate Line:** `Shift + Option + Down` (Mac) / `Shift + Alt + Down` (Windows/Linux)
- **Delete Line:** `Cmd + Shift + K` (Mac) / `Ctrl + Shift + K` (Windows/Linux)

### **Multiple Cursors:**

- **Add Cursor Below:** `Cmd + Option + Down` (Mac) / `Ctrl + Alt + Down` (Windows/Linux)
- **Select All Occurrences:** `Cmd + Shift + L` (Mac) / `Ctrl + Shift + L` (Windows/Linux)

---

## 🎯 **Quick Commands for Planify**

### **In VS Code Terminal:**

**Start Server:**
```bash
node demo-server.js
```

**Stop Server:**
- Press `Ctrl + C` in the terminal

**Check Server Status:**
```bash
lsof -i :3000
```

**Kill Server (if stuck):**
```bash
pkill -f "node demo-server.js"
```

**Restart Server:**
```bash
pkill -f "node demo-server.js" && sleep 2 && node demo-server.js
```

---

## 📝 **Useful VS Code Extensions:**

Recommended extensions for web development:

1. **Live Server** - Auto-reload on file changes
2. **Prettier** - Code formatting
3. **ESLint** - JavaScript linting
4. **Auto Rename Tag** - Rename HTML tags automatically
5. **Path Intellisense** - Autocomplete file paths

---

## 🔥 **Pro Tips:**

### **1. Multi-Terminal Setup:**
- Open 2 terminals in VS Code
- Terminal 1: Run server (`node demo-server.js`)
- Terminal 2: Run other commands (testing, file operations)

### **2. Live Editing:**
- Edit HTML/CSS/JS files in VS Code
- Save the file (`Cmd + S`)
- Refresh browser to see changes

### **3. Quick Server Restart:**
- Press `Ctrl + C` in terminal to stop
- Press `Up Arrow` to get previous command
- Press `Enter` to restart server

### **4. Open Browser from VS Code:**
```bash
open http://localhost:3000
```

---

## 🎨 **Your Planify Website Features:**

✅ **Raycast-style animated background**  
✅ **Working login and registration**  
✅ **Plan finder with search functionality**  
✅ **Email notifications to ritheesh21505@gmail.com**  
✅ **Consultation and contact forms**  
✅ **Responsive design**  

**Server is currently running at:** http://localhost:3000

**Enjoy coding!** 🚀


