const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'global-scripts.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// ── CUSTOM DOM MOCKS ──
const listeners = {};
const mockElements = {};

function createMockElement(id, classes = '', attrs = {}) {
    const el = {
        id,
        className: classes,
        classList: {
            classes: classes.split(' ').filter(Boolean),
            add: function(c) {
                if (!this.contains(c)) {
                    this.classes.push(c);
                    el.className = this.classes.join(' ');
                }
            },
            remove: function(c) {
                this.classes = this.classes.filter(x => x !== c);
                el.className = this.classes.join(' ');
            },
            contains: function(c) {
                return this.classes.includes(c);
            },
            toggle: function(c) {
                if (this.contains(c)) {
                    this.remove(c);
                    return false;
                } else {
                    this.add(c);
                    return true;
                }
            }
        },
        attributes: attrs,
        getAttribute: function(name) {
            return this.attributes[name] || null;
        },
        setAttribute: function(name, val) {
            this.attributes[name] = val.toString();
        },
        style: {},
        eventListeners: {},
        addEventListener: function(event, callback) {
            if (!this.eventListeners[event]) this.eventListeners[event] = [];
            this.eventListeners[event].push(callback);
        },
        dispatchEvent: function(event) {
            const handlers = this.eventListeners[event] || [];
            handlers.forEach(fn => fn.call(this, { preventDefault: () => {}, stopPropagation: () => {} }));
        },
        querySelector: function() { return null; },
        querySelectorAll: function() { return []; },
        insertAdjacentElement: function() {}
    };
    mockElements[id] = el;
    return el;
}

// Create critical layout elements
const toggleBtn = createMockElement('mobile-toggle');
const nav = createMockElement('main-nav');
const overlay = createMockElement('mobile-overlay');
const megaMenu = createMockElement('mega-menu-content');

// Define global scope variables
const globalScope = {
    document: {
        readyState: 'loading',
        addEventListener: function(event, callback) {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(callback);
        },
        dispatchEvent: function(event) {
            const handlers = listeners[event] || [];
            handlers.forEach(fn => fn());
        },
        getElementById: function(id) {
            return mockElements[id] || null;
        },
        querySelectorAll: function(selector) {
            if (selector === '.tab-btn') return [];
            if (selector === '.tab-pane') return [];
            if (selector === '.tab-btn-redesign') return [];
            if (selector === '.audience-info') return [];
            if (selector === '.audience-img') return [];
            if (selector === '.faq-item') return [];
            return [];
        },
        querySelector: function(selector) {
            if (selector === '.solutions-toggle') return createMockElement('sol-btn');
            return null;
        },
        documentElement: {
            classList: { add: function() {} }
        },
        body: {
            style: {},
            insertAdjacentHTML: function() {},
            appendChild: function() {}
        }
    },
    window: {
        innerWidth: 375, // mobile viewport
        scrollY: 0,
        addEventListener: function() {},
        setTimeout: setTimeout,
        clearTimeout: clearTimeout
    },
    setTimeout: setTimeout,
    console: console,
    localStorage: {
        getItem: function() { return null; },
        setItem: function() {}
    }
};

// Execute script inside custom global scope sandboxed function
try {
    const sandboxFn = new Function(...Object.keys(globalScope), jsContent);
    sandboxFn(...Object.values(globalScope));

    console.log("Mock Environment: Script executed successfully.");

    // Simulate DOMContentLoaded
    globalScope.document.readyState = 'interactive';
    globalScope.document.dispatchEvent('DOMContentLoaded');
    console.log("Mock Environment: DOMContentLoaded event fired.");

    // Check if toggleBtn click listener got registered
    if (toggleBtn.eventListeners['click'] && toggleBtn.eventListeners['click'].length > 0) {
        console.log("SUCCESS: click listener registered on #mobile-toggle!");
        
        console.log("Initial state of main-nav classes:", nav.className);
        console.log("Simulating click on #mobile-toggle...");
        toggleBtn.dispatchEvent('click');
        console.log("After click state of main-nav classes:", nav.className);
        
        if (nav.classList.contains('active')) {
            console.log("SUCCESS: mobile menu toggled to active!");
        } else {
            console.error("FAIL: mobile menu active class missing!");
        }
    } else {
        console.error("FAIL: NO click listener was registered on #mobile-toggle!");
    }

} catch (err) {
    console.error("Exception during execution:", err);
}
