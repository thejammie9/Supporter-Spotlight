# Supporter Stats Widget - File Structure

## 📁 Files Included

### **For StreamElements (All-in-One)**
- `widget-combined.html` - **USE THIS for StreamElements** - Contains HTML, CSS, and JS all in one file
- Just copy and paste the entire file into the StreamElements custom widget editor

### **For Local Development/Editing (Separated)**
- `widget.html` - Clean HTML structure
- `widget.css` - All styles separated for easy editing
- `widget.js` - All JavaScript functionality

### **Configuration & Documentation**
- `widget-fields.json` - Field configuration for StreamElements settings panel
- `SETUP_GUIDE.md` - Complete installation and customization guide
- `QUICK_REFERENCE.md` - Fast tweaks and common modifications

---

## 🚀 Quick Start

### StreamElements Installation
1. Open `widget-combined.html`
2. Copy **ALL** contents (Ctrl+A, Ctrl+C)
3. Go to StreamElements → My Overlays → Add Widget → Custom
4. Paste into the HTML/CSS/JS section
5. Click SETTINGS to configure
6. Done! 🎉

### Local Development
If you want to edit the files separately:
1. Edit `widget.css` for styling changes
2. Edit `widget.js` for functionality changes
3. `widget.html` stays mostly unchanged
4. When ready, combine them back into one file for StreamElements

---

## 📝 Which File Should I Edit?

### **Want to change colors/fonts/sizes?**
→ Edit `widget.css` or use StreamElements field settings

### **Want to change timing/behavior?**
→ Edit `widget.js` or use StreamElements field settings

### **Want to add new stat types?**
→ Edit `widget.js` (statTypes array)

### **Want to use in StreamElements?**
→ Use `widget-combined.html` (already has everything combined)

---

## 🔄 Combining Files After Editing

If you edit the separated files and need to recombine for StreamElements:

1. Open `widget.html`
2. Replace `<link rel="stylesheet" href="widget.css">` with `<style>` tag containing contents of `widget.css`
3. Replace `<script src="widget.js"></script>` with `<script>` tag containing contents of `widget.js`
4. Save as new combined file
5. Upload to StreamElements

---

## 💡 Pro Tips

- **Editing in StreamElements directly**: Works fine for quick tweaks
- **Editing locally**: Better for major customizations, easier to track changes
- **Backup your settings**: Always export your field configuration as JSON before major changes
- **Version control**: Keep copies of working versions before experimenting

---

## 🎨 File Structure Benefits

### Separated Files
✅ Easier to read and edit
✅ Clear organization (HTML/CSS/JS separate)
✅ Better for version control
✅ Easier to share specific parts

### Combined File
✅ Required for StreamElements
✅ Single file to copy/paste
✅ Everything in one place
✅ No file linking issues

---

## 📞 Need Help?

- Check `SETUP_GUIDE.md` for detailed instructions
- Check `QUICK_REFERENCE.md` for common tweaks
- Reference field settings in `widget-fields.json`

**Remember**: The separated files are for YOUR convenience when editing. StreamElements ONLY accepts the combined version!
