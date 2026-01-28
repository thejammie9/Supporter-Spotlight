/* ============================================
   SUPPORTER STATS POPUP WIDGET - JAVASCRIPT
   ============================================ */

/* ============================================
   WIDGET CONFIGURATION & STATE
   ============================================ */
let fieldData = {};
let statsData = {
    recentSub: null,
    topBits: null,
    recentBits: null,
    topGiftSub: null,
    recentTip: null,
    topTip: null
};

let currentStatIndex = 0;
let popupInterval = null;
let statRotationInterval = null;
let hideTimeout = null;

// Stat configurations with labels and default icons
const statTypes = [
    {
        key: 'recentSub',
        label: 'Recent Subscriber',
        dataKey: 'subscriber-latest',
        iconField: 'iconUrlRecentSub',
        bgField: 'bgImageRecentSub',
        format: (data) => data ? { username: data.name, value: '' } : null
    },
    {
        key: 'topBits',
        label: 'Top Bits',
        dataKey: 'cheer-session-top-donator',
        iconField: 'iconUrlTopBits',
        bgField: 'bgImageTopBits',
        format: (data) => data ? { username: data.name, value: `${data.amount || 0} bits` } : null
    },
    {
        key: 'recentBits',
        label: 'Recent Bits',
        dataKey: 'cheer-latest',
        iconField: 'iconUrlRecentBits',
        bgField: 'bgImageRecentBits',
        format: (data) => data ? { username: data.name, value: `${data.amount || 0} bits` } : null
    },
    {
        key: 'topGiftSub',
        label: 'Top Gift Sub Giver',
        dataKey: 'follower-session-top-gifter',
        iconField: 'iconUrlTopGift',
        bgField: 'bgImageTopGift',
        format: (data) => data ? { username: data.name, value: `${data.amount || 0} gifts` } : null
    },
    {
        key: 'recentTip',
        label: 'Recent Tip',
        dataKey: 'tip-latest',
        iconField: 'iconUrlRecentTip',
        bgField: 'bgImageRecentTip',
        format: (data) => data ? { username: data.name, value: `$${data.amount || 0}` } : null
    },
    {
        key: 'topTip',
        label: 'Top Tipper',
        dataKey: 'tip-session-top-donator',
        iconField: 'iconUrlTopTip',
        bgField: 'bgImageTopTip',
        format: (data) => data ? { username: data.name, value: `$${data.amount || 0}` } : null
    }
];

/* ============================================
   STREAMELEMENTS EVENT HANDLERS
   ============================================ */
window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    
    // Apply global styles from field data
    applyGlobalStyles();
    
    // Position the popup
    positionPopup();
    
    // Load initial stats from session data
    loadSessionStats(obj.detail.session.data);
    
    // Start the popup cycle
    startPopupCycle();
});

window.addEventListener('onEventReceived', function (obj) {
    // Update stats when new events come in
    const event = obj.detail.event;
    
    // We could react to events here if needed, but we're primarily
    // using session data for this widget
});

window.addEventListener('onSessionUpdate', function (obj) {
    // Update stats when session data changes
    loadSessionStats(obj.detail.session);
});

/* ============================================
   STATS DATA LOADING
   ============================================ */
function loadSessionStats(sessionData) {
    if (!sessionData) return;

    statTypes.forEach(stat => {
        if (sessionData[stat.dataKey]) {
            statsData[stat.key] = sessionData[stat.dataKey];
        }
    });
}

/* ============================================
   POPUP CYCLE MANAGEMENT
   ============================================ */
function startPopupCycle() {
    const popupIntervalMs = (parseInt(fieldData.popupInterval) || 30) * 1000;
    const visibleDurationMs = (parseInt(fieldData.visibleDuration) || 10) * 1000;

    // Clear any existing intervals
    if (popupInterval) clearInterval(popupInterval);
    if (statRotationInterval) clearInterval(statRotationInterval);
    if (hideTimeout) clearTimeout(hideTimeout);

    // Start the cycle
    showPopup(visibleDurationMs);

    // Set interval to show popup repeatedly
    popupInterval = setInterval(() => {
        showPopup(visibleDurationMs);
    }, popupIntervalMs);
}

function showPopup(duration) {
    const popup = document.getElementById('stats-popup');
    
    // Reset stat index
    currentStatIndex = 0;
    
    // Show the popup
    popup.classList.add('visible');
    
    // Start rotating through stats
    displayCurrentStat();
    startStatRotation();
    
    // Hide after duration
    hideTimeout = setTimeout(() => {
        hidePopup();
    }, duration);
}

function hidePopup() {
    const popup = document.getElementById('stats-popup');
    popup.classList.remove('visible');
    
    // Stop stat rotation
    if (statRotationInterval) {
        clearInterval(statRotationInterval);
        statRotationInterval = null;
    }
}

/* ============================================
   STAT ROTATION
   ============================================ */
function startStatRotation() {
    const rotationSpeed = (parseInt(fieldData.rotationSpeed) || 3) * 1000;
    
    // Clear existing rotation
    if (statRotationInterval) clearInterval(statRotationInterval);
    
    // Rotate stats
    statRotationInterval = setInterval(() => {
        currentStatIndex = (currentStatIndex + 1) % statTypes.length;
        displayCurrentStat();
    }, rotationSpeed);
}

function displayCurrentStat() {
    const statType = statTypes[currentStatIndex];
    const data = statsData[statType.key];
    const formatted = statType.format(data);
    
    if (!formatted) {
        // Skip to next stat if no data
        currentStatIndex = (currentStatIndex + 1) % statTypes.length;
        displayCurrentStat();
        return;
    }

    const container = document.getElementById('stat-display');
    const popup = document.getElementById('stats-popup');
    
    // Fade out current content
    container.classList.remove('active');
    
    setTimeout(() => {
        // Update background image
        const bgImage = fieldData[statType.bgField];
        if (bgImage) {
            popup.style.setProperty('--bg-image', `url(${bgImage})`);
            popup.querySelector('::before')?.style.setProperty('opacity', fieldData.bgImageOpacity || '0.3');
        } else {
            popup.style.setProperty('--bg-image', 'none');
        }
        
        // Build new content
        const iconUrl = fieldData[statType.iconField] || getDefaultIcon(statType.key);
        
        container.innerHTML = `
            <div class="stat-icon ${fieldData.glowStrength > 0 ? 'glow' : ''}">
                <img src="${iconUrl}" alt="${statType.label}" style="width: ${fieldData.iconSize || 60}px; height: ${fieldData.iconSize || 60}px;">
            </div>
            <div class="stat-content">
                <div class="stat-label">${statType.label}</div>
                <div class="stat-username">${formatted.username}</div>
                ${formatted.value ? `<div class="stat-value">${formatted.value}</div>` : ''}
            </div>
        `;
        
        // Fade in new content
        setTimeout(() => {
            container.classList.add('active');
        }, 50);
    }, 200);
}

/* ============================================
   STYLING FUNCTIONS
   ============================================ */
function applyGlobalStyles() {
    const popup = document.getElementById('stats-popup');
    const container = document.getElementById('stat-display');
    
    // Popup styles
    popup.style.fontFamily = fieldData.fontFamily || 'Poppins, sans-serif';
    popup.style.fontSize = (fieldData.fontSize || 16) + 'px';
    popup.style.color = fieldData.textColor || '#ffffff';
    popup.style.backgroundColor = fieldData.bgColor || 'rgba(20, 20, 30, 0.95)';
    popup.style.borderRadius = (fieldData.borderRadius || 20) + 'px';
    popup.style.transition = `all ${(fieldData.animationSpeed || 0.6)}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    
    // Shadow/glow
    const glowStrength = parseInt(fieldData.glowStrength) || 5;
    popup.style.boxShadow = `0 ${glowStrength * 2}px ${glowStrength * 8}px rgba(0, 0, 0, ${glowStrength / 10})`;
    
    // Slide direction
    const slideDirection = fieldData.slideDirection || 'right';
    popup.className = 'slide-' + slideDirection;
}

function positionPopup() {
    const popup = document.getElementById('stats-popup');
    const position = fieldData.position || 'bottom-left';
    
    // Reset all positions
    popup.style.top = 'auto';
    popup.style.bottom = 'auto';
    popup.style.left = 'auto';
    popup.style.right = 'auto';
    
    // Apply position
    switch(position) {
        case 'top-left':
            popup.style.top = '20px';
            popup.style.left = '20px';
            break;
        case 'top-right':
            popup.style.top = '20px';
            popup.style.right = '20px';
            break;
        case 'bottom-left':
            popup.style.bottom = '20px';
            popup.style.left = '20px';
            break;
        case 'bottom-right':
            popup.style.bottom = '20px';
            popup.style.right = '20px';
            break;
        case 'center':
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            break;
    }
}

/* ============================================
   DEFAULT ICONS (Base64 SVG fallbacks)
   ============================================ */
function getDefaultIcon(statKey) {
    const icons = {
        recentSub: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjguNSIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjxsaW5lIHgxPSIyMCIgeTE9IjgiIHgyPSIyMCIgeTI9IjE0Ij48L2xpbmU+PGxpbmUgeDE9IjIzIiB5MT0iMTEiIHgyPSIxNyIgeTI9IjExIj48L2xpbmU+PC9zdmc+',
        topBits: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWdvbiBwb2ludHM9IjEyIDIgMTUuMDkgOC4yNiAyMiA5LjI3IDE3IDEzLjE0IDE4LjE4IDIxLjAyIDEyIDE3LjI3IDUuODIgMjEuMDIgNyAxMy4xNCAyIDkuMjcgOC45MSA4LjI2IDEyIDIiPjwvcG9seWdvbj48L3N2Zz4=',
        recentBits: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMiI+PC9wb2x5bGluZT48L3N2Zz4=',
        topGiftSub: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCA0Ij48L3BvbHlsaW5lPjxyZWN0IHg9IjMiIHk9IjExIiB3aWR0aD0iMTgiIGhlaWdodD0iMTEiIHJ4PSIyIiByeT0iMiI+PC9yZWN0Pjwvc3ZnPg==',
        recentTip: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iMTIiIHkxPSIxIiB4Mj0iMTIiIHkyPSIyMyI+PC9saW5lPjxwYXRoIGQ9Ik0xNyA1SDkuNWE0LjUgNC41IDAgMCAwIDAgOWg1YTQuNSA0LjUgMCAwIDEgMCA5SDYiPjwvcGF0aD48L3N2Zz4=',
        topTip: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGxpbmUgeDE9IjEyIiB5MT0iOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48bGluZSB4MT0iMTIiIHkxPSIxNiIgeDI9IjEyLjAxIiB5Mj0iMTYiPjwvbGluZT48L3N2Zz4='
    };
    return icons[statKey] || icons.recentSub;
}
