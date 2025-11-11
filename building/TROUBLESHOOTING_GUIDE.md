# 🔧 Admin Panel Troubleshooting Guide

## 🚨 "Error uploading house plan" - How to Fix

### Step 1: Check Server Status

1. **Open Terminal/Command Prompt**
2. **Navigate to your project:**
   ```bash
   cd /Users/lucky/Downloads/building
   ```
3. **Start the server:**
   ```bash
   node demo-server.js
   ```
4. **Look for this message:**
   ```
   🚀 Server running on port 3000
   📧 Email notifications: ENABLED
   ```

### Step 2: Check Browser Console

1. **Open Admin Panel:** `http://localhost:3000/admin.html`
2. **Press F12** to open Developer Tools
3. **Click "Console" tab**
4. **Try uploading a house plan**
5. **Look for error messages** in the console

### Step 3: Check Server Console

In your terminal where the server is running, look for these messages:

**✅ Good messages:**

```
📤 Upload request received
📁 File: [file details]
📝 Body: [form data]
✅ House plan uploaded successfully: [title]
```

**❌ Error messages:**

```
❌ No file uploaded
❌ Missing required fields
❌ Error uploading house plan: [error details]
```

---

## 🛠️ Common Issues & Solutions

### Issue 1: "Please upload an image"

**Problem:** No image file selected
**Solution:**

1. Click the image upload area
2. Select an image file (JPG, PNG, GIF, WEBP)
3. Make sure file size is under 5MB

### Issue 2: "Please fill all required fields"

**Problem:** Missing required information
**Solution:**

1. Fill in **Title** (e.g., "Modern Villa")
2. Select **Plot Dimension** (e.g., 30x40)
3. Select **BHK** (e.g., 3)
4. Select **Floors** (e.g., 2)
5. Enter **Price** (e.g., 15000)

### Issue 3: "Only image files are allowed"

**Problem:** Wrong file type
**Solution:**

1. Use only these formats: JPG, JPEG, PNG, GIF, WEBP
2. Check file extension (e.g., .jpg, .png)

### Issue 4: "File too large"

**Problem:** Image is bigger than 5MB
**Solution:**

1. Compress the image
2. Use online tools like TinyPNG
3. Resize the image

### Issue 5: Server not responding

**Problem:** Server is not running
**Solution:**

1. Check if server is running in terminal
2. Restart server: `node demo-server.js`
3. Check if port 3000 is available

---

## 🔍 Debug Steps

### Step 1: Test with Simple Data

Try uploading with these exact values:

- **Title:** Test House
- **Plot Dimension:** 30x40
- **BHK:** 2
- **Floors:** 1
- **Price:** 10000
- **Image:** Any small JPG/PNG file

### Step 2: Check File Permissions

Make sure the uploads folder has write permissions:

```bash
chmod 755 uploads/
chmod 755 uploads/house-plans/
```

### Step 3: Check Network

1. Open browser console (F12)
2. Go to "Network" tab
3. Try uploading
4. Look for failed requests (red entries)
5. Click on failed request to see error details

---

## 📋 Quick Checklist

Before uploading, make sure:

- [ ] ✅ Server is running (`node demo-server.js`)
- [ ] ✅ Admin panel loads (`http://localhost:3000/admin.html`)
- [ ] ✅ Image file is selected (JPG/PNG/GIF/WEBP)
- [ ] ✅ Image size is under 5MB
- [ ] ✅ Title is filled
- [ ] ✅ Plot Dimension is selected
- [ ] ✅ BHK is selected
- [ ] ✅ Floors is selected
- [ ] ✅ Price is entered
- [ ] ✅ No browser console errors

---

## 🆘 Still Having Issues?

### Check These Files:

1. **Server running?** - Terminal should show "Server running on port 3000"
2. **Uploads folder exists?** - Check if `uploads/house-plans/` folder exists
3. **Browser console errors?** - Press F12 and check Console tab
4. **Network errors?** - Press F12 and check Network tab

### Get Help:

1. **Copy the exact error message** from browser console
2. **Copy the server console output** when you try to upload
3. **Check if all files are in the right place**

---

## 🎯 Test Upload

Try this exact test:

1. **Start server:** `node demo-server.js`
2. **Open:** `http://localhost:3000/admin.html`
3. **Upload any small image** (under 1MB)
4. **Fill form:**
   - Title: "Test House"
   - Plot Dimension: "30x40"
   - BHK: "2"
   - Floors: "1"
   - Price: "10000"
5. **Click Upload**
6. **Check console** for success/error messages

---

## ✅ Success Indicators

When everything works, you should see:

**In Browser Console:**

```
📤 Starting upload process...
📁 Image file: [File object]
📝 Form data: {title: "Test House", ...}
🚀 Sending request to: http://localhost:3000/api/house-plans
📡 Response status: 200
📄 Response data: {message: "House plan uploaded successfully!", ...}
```

**In Server Console:**

```
📤 Upload request received
📁 File: [file details]
📝 Body: [form data]
✅ House plan uploaded successfully: Test House
📊 Total plans in storage: 1
```

**In Admin Panel:**

- ✅ Green success notification
- ✅ Form resets
- ✅ New plan appears in the list on the right

---

## 🔄 Reset Everything

If nothing works, try this:

1. **Stop server** (Ctrl+C in terminal)
2. **Delete uploads folder:**
   ```bash
   rm -rf uploads/
   ```
3. **Recreate uploads folder:**
   ```bash
   mkdir -p uploads/house-plans
   ```
4. **Restart server:**
   ```bash
   node demo-server.js
   ```
5. **Try uploading again**

---

**Remember:** Check both browser console (F12) and server console for error messages! 🔍
