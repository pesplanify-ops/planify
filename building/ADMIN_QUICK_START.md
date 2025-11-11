# 🚀 Admin Panel - Quick Start

## ⚡ Super Quick Guide

### 1️⃣ Start Server

```bash
cd /Users/lucky/Downloads/building
node demo-server.js
```

### 2️⃣ Access Admin Panel

```
http://localhost:3000/admin.html
```

### 3️⃣ Upload House Plan

1. Click image area to upload
2. Fill in details (Title, BHK, Floors, Dimension, Price, etc.)
3. Click "Upload House Plan"
4. Done! ✅

### 4️⃣ Test on Main Website

1. Go to: `http://localhost:3000/`
2. Click "Readymade House Plan"
3. Fill search criteria
4. Click "Search Plans"
5. See your uploaded images! 🎉

---

## 📍 Important URLs

| What            | URL                                     |
| --------------- | --------------------------------------- |
| Main Website    | http://localhost:3000/                  |
| **Admin Panel** | **http://localhost:3000/admin.html** ⭐ |

---

## ✅ Required Fields When Uploading

- ✔️ **Image** (JPG, PNG, GIF, WEBP - Max 5MB)
- ✔️ **Title** (e.g., "Modern 3BHK Villa")
- ✔️ **Plot Dimension** (30x40, 30x50, 40x60, etc.)
- ✔️ **BHK** (1, 2, 3, 4, or 5)
- ✔️ **Floors** (1-5)
- ✔️ **Price** (in Rupees)

**Optional:**

- Description
- Facing (North/South/East/West)
- Area (sq ft)
- Style (Modern/Traditional/etc.)
- Features (comma separated)

---

## 🎯 Example Upload

```
Title: Modern 3BHK Villa
Description: Contemporary design with spacious rooms
Plot Dimension: 30x40
BHK: 3
Floors: 2
Facing: East
Price: 18500
Area: 1500
Style: Modern
Features: Open Kitchen, Balcony, Parking, Garden
```

---

## 🔄 How It Works

```
Admin uploads in admin panel
         ↓
Image saved to server
         ↓
User searches on website
         ↓
Real image appears! ✨
```

---

## 💡 Quick Tips

1. **Use high-quality images** - Clear house plan photos work best
2. **Fill all details** - More info = better user experience
3. **Be accurate** - Match dimensions, BHK, and floors correctly
4. **Add features** - Users love knowing what's included
5. **Set fair prices** - Competitive pricing attracts more customers

---

## ⚠️ Important Notes

1. **Demo Mode** - Uploaded plans are stored in memory
2. **Restart = Data Lost** - Plans disappear when server restarts
3. **Same Server** - Admin panel and website run on same server (port 3000)
4. **Multiple Admins** - All admins can access `localhost:3000/admin.html`

---

## 🆘 Common Issues

**Can't upload?**

- Check image size (< 5MB)
- Fill all required fields (\*)
- Check server is running

**Image not showing on website?**

- Match search criteria with uploaded plan details
- Refresh the page
- Check admin panel to confirm upload

**Admin panel not loading?**

- Make sure server is running: `node demo-server.js`
- Go to correct URL: `http://localhost:3000/admin.html`

---

## 📖 Full Documentation

For detailed guide, see: **ADMIN_PANEL_GUIDE.md**

---

**That's it! Start uploading house plans now!** 🏠🎉
