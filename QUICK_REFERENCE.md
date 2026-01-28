# Quick Reference Card - Supporter Stats Widget

## ⚡ Common Tweaks

### Change Popup Size
```css
/* Add to CSS section */
#stats-popup {
    min-width: 500px;  /* Default: 400px */
    padding: 40px 50px; /* Default: 30px 40px */
}
```

### Add Border
```css
#stats-popup {
    border: 3px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}
```

### Gradient Background
```css
#stats-popup {
    background: linear-gradient(135deg, 
        rgba(138, 43, 226, 0.9), 
        rgba(75, 0, 130, 0.9)
    ) !important;
}
```

### Animated Border Glow
```css
@keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.8); }
    50% { box-shadow: 0 0 40px rgba(255, 0, 255, 1); }
}

#stats-popup.visible {
    animation: glow 2s infinite;
}
```

### Username Color Effect
```css
.stat-username {
    background: linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient 3s linear infinite;
}

@keyframes gradient {
    to { background-position: 200% center; }
}
```

### Frosted Glass Effect
```css
#stats-popup {
    background: rgba(20, 20, 30, 0.3) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Larger Icons with Glow
```javascript
/* In field settings */
iconSize: 80

/* In CSS */
.stat-icon {
    filter: drop-shadow(0 0 20px currentColor);
    background: radial-gradient(circle, rgba(255,255,255,0.2), transparent);
}
```

### Bounce Animation
```css
#stats-popup.visible {
    animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
}
```

### Stat Value Emphasis
```css
.stat-value {
    font-size: 24px !important;
    font-weight: 700;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00;
}
```

### Compact Mobile-Friendly Version
```css
#stats-popup {
    min-width: 280px;
    padding: 20px 25px;
}

.stat-username {
    font-size: 20px !important;
}

.stat-icon {
    width: 40px !important;
    height: 40px !important;
}
```

---

## 🎨 Preset Color Schemes

### Cyberpunk
```
Background: rgba(0, 0, 0, 0.85)
Text: #00ffff
Border: 2px solid #ff00ff
Glow: 15
```

### Gaming Green
```
Background: rgba(10, 20, 10, 0.9)
Text: #00ff00
Glow: 10
Add green glow to icons
```

### Royal Purple
```
Background: rgba(75, 0, 130, 0.9)
Text: #ffffff
Border: 2px solid gold
Glow: 8
```

### Clean White
```
Background: rgba(255, 255, 255, 0.95)
Text: #1a1a1a
Border Radius: 8px
Glow: 2
```

### Twitch Purple
```
Background: rgba(100, 65, 165, 0.9)
Text: #ffffff
Glow: 7
```

---

## 📏 Recommended Sizes by Scene

### Full Screen Gameplay
- Width: 350px
- Position: Bottom-left
- Font Size: 14px

### Webcam + Gameplay
- Width: 400px  
- Position: Top-right
- Font Size: 16px

### Just Chatting
- Width: 450px
- Position: Bottom-center
- Font Size: 18px

### Intermission
- Width: 600px
- Position: Center
- Font Size: 20px

---

## 🎯 Field Value Quick Copy

### Fast Rotation
```
popupInterval: 20
visibleDuration: 8
rotationSpeed: 2
animationSpeed: 0.4
```

### Slow Showcase
```
popupInterval: 60
visibleDuration: 15
rotationSpeed: 5
animationSpeed: 0.8
```

### Balanced Default
```
popupInterval: 30
visibleDuration: 10
rotationSpeed: 3
animationSpeed: 0.6
```

---

## 🔗 Asset Links

### Icon Resources
- Flaticon: https://www.flaticon.com
- IconScout: https://iconscout.com
- Font Awesome: https://fontawesome.com

### Background Patterns
- Subtle Patterns: https://www.toptal.com/designers/subtlepatterns
- Hero Patterns: https://heropatterns.com
- Cool Backgrounds: https://coolbackgrounds.io

### Free Image Hosting
- Imgur: https://imgur.com
- ImgBB: https://imgbb.com

---

## 🐛 Common Fixes

**Popup stuck on screen**
→ Reduce `visibleDuration` or check for JS errors

**Stats showing "null"**
→ No data for that stat type, test with dummy events

**Animation jerky**
→ Lower `animationSpeed` to 0.8-1.0

**Text cut off**
→ Increase popup `min-width` in CSS

**Icons too small**
→ Increase `iconSize` field value

**Background image not showing**
→ Use direct image URL, increase opacity

---

## 💾 Backup Your Settings

1. Click **SETTINGS** in widget editor
2. Switch to **JSON** view
3. Copy all JSON
4. Save to text file
5. Can restore anytime by pasting back

---

**Pro Tip**: Make ONE change at a time when customizing. Test after each change to identify what works best for your stream aesthetic!
