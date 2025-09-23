
function initializeGreetings() {
    console.log('🎉 Initializing greetings...');
    
    // Get current hour (0-23)
    const hour = new Date().getHours();
    
    // Determine greeting based on time
    let greeting, emoji, message;
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
        emoji = "🌅";
        message = "Hope you have a great start to your day!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
        emoji = "☀️";
        message = "Hope your day is going well.";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
        emoji = "🌇";
        message = "Relax — you've made it this far.";
    } else {
        greeting = "Good Evening";
        emoji = "🌙";
        message = "It's late — take care and rest well.";
    }
    
    setTimeout(() => {
        const greetingHeading = document.getElementById('greetingHeading');
        const avatar = document.getElementById('avatar');
        const greetingSub = document.getElementById('greetingSub');
        const localTimeEl = document.getElementById('localTime');
        const extra = document.getElementById('extra');
        
        if (greetingHeading) {
            greetingHeading.textContent = greeting + "!";
            console.log("✅ Updated greeting to:", greeting);
        }
        
        if (avatar) {
            avatar.textContent = emoji;
            console.log("✅ Updated emoji to:", emoji);
        }
        
        if (greetingSub) {
            greetingSub.textContent = message;
            console.log("✅ Updated message to:", message);
        }
        
        if (localTimeEl) {
            function updateClock() {
                const now = new Date();
                const timeString = new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(now);
                localTimeEl.textContent = `Local time: ${timeString}`;
            }
            updateClock();
            setInterval(updateClock, 1000);
        }
        
        if (extra) {
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                extra.textContent = `Detected timezone: ${tz}`;
            } catch(e) {
               
            }
        }
        
    }, 100); 
}

// Call this function after you load your home content
// For example, if you have a function that loads the home section:
// loadHomeContent().then(() => {
//     initializeGreetings();
// });

// Or if you're loading content immediately, add this to the end of your script.js:
document.addEventListener('DOMContentLoaded', () => {
    // Your existing code to load content...
    
    // Then call greetings after a short delay
    setTimeout(initializeGreetings, 500);
});