document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);


        updateGreetingForTheme(newTheme);

        console.log(`Theme switched to: ${newTheme}`);
    }


    function updateGreetingForTheme(theme) {
        const greetingSub = document.getElementById('greetingSub');
        if (!greetingSub) return; 

        const hour = new Date().getHours();
        let message;

        if (theme === 'light') {
            if (hour >= 5 && hour < 12) message = "Bright start to your day! ☀️";
            else if (hour >= 12 && hour < 17) message = "Hope your day is sunny! 🌤️";
            else if (hour >= 17 && hour < 21) message = "Enjoying the evening light? 🌅";
            else message = "Even night owls need some light! 🌙";
        } else {
            if (hour >= 5 && hour < 12) message = "Hope you have a great start to your day!";
            else if (hour >= 12 && hour < 17) message = "Hope your day is going well.";
            else if (hour >= 17 && hour < 21) message = "Relax — you've made it this far.";
            else message = "It's late — take care and rest well.";
        }

        greetingSub.textContent = message;
    }


    setTimeout(() => {
        const existingThemeToggle = document.querySelector('.theme-toggle');
        if (existingThemeToggle) {
            existingThemeToggle.addEventListener('click', toggleTheme);
            console.log('Theme toggle event listener added to existing element');


            updateToggleVisuals();
        } else {
            console.log('Theme toggle not found in HTML');

            function createThemeToggle() {
                const themeToggle = document.createElement('div');
                themeToggle.className = 'theme-toggle';
                themeToggle.innerHTML = `
          <span class="theme-toggle-icon sun-icon">☀️</span>
          <span class="theme-toggle-icon moon-icon">🌙</span>
        `;
                themeToggle.addEventListener('click', toggleTheme);
                return themeToggle;
            }


            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.appendChild(createThemeToggle());
            }
        }
    }, 100);

    function updateToggleVisuals() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', currentTheme);
    }


    window.toggleTheme = toggleTheme;
});