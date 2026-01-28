# Supporter Stats Popup Widget - Setup Guide

## 📋 Overview
This StreamElements widget displays rotating supporter statistics in a timed popup overlay. Perfect for showcasing recent supporters, top contributors, and engagement stats without cluttering your stream.

## 🚀 Installation

### Method 1: StreamElements Overlay Editor
1. Go to your StreamElements dashboard
2. Navigate to **Streaming Tools** → **My Overlays**
3. Select or create an overlay
4. Click **Add Widget** → **Custom** → **Custom Widget**
5. Copy the entire contents of `supporter-stats-widget.html`
6. Paste into the HTML/CSS/JS section
7. Click **SETTINGS** to configure fields using the `widget-fields.json` structure

### Method 2: Direct JSON Import
1. In the custom widget editor, click **FIELDS** tab
2. Switch to JSON mode
3. Paste the contents of `widget-fields.json`
4. Click **SAVE**

## ⚙️ Configuration Options

### Timing Controls
- **Popup Interval**: How often the popup appears (5-300 seconds)
- **Visible Duration**: How long the popup stays on screen (3-60 seconds)
- **Stat Rotation Speed**: How fast stats cycle within the popup (1-10 seconds)
- **Animation Speed**: Speed of slide/fade transitions (0.1-2 seconds)

### Positioning & Animation
- **Popup Position**: Choose corner or center placement
- **Slide Direction**: Choose which direction the popup slides from
  - From Left (slides right)
  - From Right (slides left)
  - From Bottom (slides up)
  - From Top (slides down)

### Visual Styling
- **Font Family**: Google Fonts selector
- **Base Font Size**: Adjusts all text proportionally
- **Text Color**: Main text color
- **Background Color**: Fallback color when no image is set
- **Border Radius**: Roundness of popup corners
- **Shadow/Glow Strength**: Depth of shadow effect
- **Icon Size**: Size of stat type icons
- **Background Image Opacity**: Transparency of background images

### Per-Stat Customization
Each stat type has two customization fields:
- **Icon URL**: Direct link to PNG/SVG icon for that stat type
- **Background Image**: Unique background for that stat type

Stat types included:
1. Recent Subscriber
2. Top Bits (session)
3. Recent Bits
4. Top Gift Sub Giver (session)
5. Recent Tip/Donation
6. Top Tipper (session)

## 🎨 Customization Tips

### Background Images
- Use 1920x1080 images for best quality
- Subtle patterns work better than busy images
- Opacity is adjustable via slider (default: 30%)
- Leave blank to use solid background color

### Icons
- Recommend 128x128px or larger SVG/PNG files
- White/light icons work best with default dark theme
- Icons auto-scale based on icon size setting
- Built-in fallback icons included for all stat types

### Color Schemes
Popular presets:

**Dark Modern** (default)
- Background: `rgba(20, 20, 30, 0.95)`
- Text: `#ffffff`
- Glow: 5-7

**Neon Glow**
- Background: `rgba(10, 10, 20, 0.9)`
- Text: `#00ffff`
- Glow: 10-15
- Add glow color to icons

**Clean Minimal**
- Background: `rgba(255, 255, 255, 0.95)`
- Text: `#1a1a1a`
- Border Radius: 10px
- Glow: 2

### Timing Recommendations

**Chill Stream**
- Popup Interval: 45-60 seconds
- Visible Duration: 12-15 seconds
- Rotation Speed: 4 seconds

**High Energy Stream**
- Popup Interval: 20-30 seconds
- Visible Duration: 8-10 seconds
- Rotation Speed: 2 seconds

**Intermission/BRB**
- Popup Interval: 15 seconds
- Visible Duration: 15 seconds
- Rotation Speed: 3 seconds

## 🔧 Advanced Customization

### Custom Fonts
1. Go to [Google Fonts](https://fonts.google.com)
2. Select a font
3. Use the font name in the Font Family field
4. Popular choices: Poppins, Montserrat, Oswald, Bebas Neue

### Custom Icons
Free icon sources:
- [Flaticon](https://www.flaticon.com)
- [Font Awesome CDN](https://fontawesome.com)
- [Lucide Icons](https://lucide.dev)

Upload to:
- Imgur
- Your own web hosting
- StreamElements assets

### CSS Modifications
The widget uses CSS custom properties. To modify:

1. In StreamElements widget editor, add to CSS section:
```css
#stats-popup {
    /* Custom border */
    border: 2px solid rgba(255, 255, 255, 0.2);
    
    /* Backdrop blur (modern effect) */
    backdrop-filter: blur(10px);
    
    /* Custom gradient background */
    background: linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(40, 20, 50, 0.95));
}

.stat-username {
    /* Custom text effect */
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

## 📊 Data Sources

The widget pulls from StreamElements session data:
- `subscriber-latest` - Most recent subscriber
- `cheer-session-top-donator` - Top bits in current session
- `cheer-latest` - Most recent bits
- `follower-session-top-gifter` - Top gift sub giver
- `tip-latest` - Most recent tip/donation
- `tip-session-top-donator` - Top tipper in session

**Note**: Session data resets when you go offline or manually reset stats in StreamElements.

## 🐛 Troubleshooting

### Popup not appearing
1. Check that you have recent data (subs, bits, tips)
2. Verify popup interval isn't too long
3. Check browser console for errors

### Stats not updating
1. Ensure widget is connected to StreamElements
2. Check that session data isn't empty
3. Try manually triggering a test event

### Animation stuttering
1. Reduce animation speed
2. Lower background image resolution
3. Disable backdrop blur if added

### Icons not showing
1. Verify icon URLs are publicly accessible
2. Check URLs are direct image links
3. Fallback icons will show if URLs fail

### Background images not visible
1. Increase background image opacity
2. Check image URLs are direct links
3. Verify images are loaded (check network tab)

## 💡 Best Practices

1. **Test Before Going Live**: Use StreamElements test events
2. **Match Your Brand**: Customize colors to your stream theme
3. **Don't Overwhelm**: Keep popup intervals reasonable
4. **Optimize Images**: Compress backgrounds to reduce load
5. **Regular Updates**: Check weekly for new features/updates

## 🎯 Scene Recommendations

### Gameplay Scene
- Position: Bottom corner (doesn't block action)
- Interval: 45+ seconds
- Keep compact with shorter visible duration

### Just Chatting
- Position: Top corner or center
- Interval: 30 seconds
- Can use longer visible duration

### Intermission/Starting Soon
- Position: Center
- Interval: 20 seconds
- Showcase supporters prominently

### End Screen
- Position: Center
- Interval: 15 seconds
- Thank top supporters

## 🔄 Update Log

**Version 1.0**
- Initial release
- 6 stat types
- Full customization
- Timed popup system
- Per-stat backgrounds/icons

---

## 📞 Support

For issues or feature requests, reference the PolyPop widget development notes and apply similar troubleshooting methods.

**Pro Tip**: Save your field configurations! Export your settings as JSON before making major changes.
