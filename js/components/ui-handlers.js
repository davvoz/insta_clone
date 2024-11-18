import { handleLogin, showLoginModal } from '../auth/login-manager.js';
import { loadStories, updateSidebar } from '../services/posts-manager.js';

export function setupUIEventListeners() {
    // Setup navigation event listeners
    document.querySelectorAll('.nav-icons i').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const route = e.target.dataset.route;
            if (route) {
                window.location.hash = route;
            }
        });
    });

    // Login form handlers
    const loginForm = document.querySelector('.login-form');
    const loginButton = document.getElementById('loginButton');
    
    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const username = document.getElementById('steemUsername').value;
            const key = document.getElementById('steemKey').value;
            const success = await handleLogin(username, key);
            
            if (success) {
                updateSidebar(); // Aggiorna la sidebar dopo il login
                await loadStories();
            }
        });
    }

    // Connect to Steem button
    const connectButton = document.getElementById('connect-steem');
    if (connectButton) {
        connectButton.addEventListener('click', () => {
            showLoginModal();
        });
    }

    // Add other UI event listeners as needed
    console.log('UI event listeners setup complete');
}