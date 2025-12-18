/**
 * Main Frontend Script (Self-Hosted Git Integration)
 * Fetches raw content from a self-hosted Git instance.
 */

// --- Configuration ---
// Replace with your self-hosted instance domain and repo details
const GIT_CONFIG = {
    baseUrl: 'https://git.your-domain.com', // Your self-hosted URL
    apiPath: '/api/v1/repos',               // Standard Gitea/Gogs API path
    owner: 'username',
    repo: 'project-name',
    file: 'README.md',
    // Optional: Add your Personal Access Token if the repo is private
    token: '' 
};

// Construct the full URL for raw file retrieval
// Gitea/Gogs Pattern: /api/v1/repos/{owner}/{repo}/raw/{filename}
const RAW_FILE_URL = `${GIT_CONFIG.baseUrl}${GIT_CONFIG.apiPath}/${GIT_CONFIG.owner}/${GIT_CONFIG.repo}/raw/${GIT_CONFIG.file}`;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('load-btn');
    const displayArea = document.getElementById('app');

    if (loadButton) {
        loadButton.addEventListener('click', () => fetchGitReadme(displayArea));
    }
});

/**
 * Fetches the README from the self-hosted Git API
 * @param {HTMLElement} container - The DOM element to render results
 */
async function fetchGitReadme(container) {
    container.innerHTML = '<p>Loading from Self-Hosted Git...</p>';

    try {
        const headers = {};
        if (GIT_CONFIG.token) {
            headers['Authorization'] = `token ${GIT_CONFIG.token}`;
        }

        const response = await fetch(RAW_FILE_URL, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Git API Error: ${response.status} ${response.statusText}`);
        }

        const textContent = await response.text();
        renderMarkdown(container, textContent);

    } catch (error) {
        console.error('Fetch failed:', error);
        container.innerHTML = `<div class="error">Failed to load: ${error.message}</div>`;
    }
}

/**
 * Renders raw text into the container.
 * Note: For real Markdown parsing, use a library like 'marked'.
 * This simple version preserves whitespace using CSS style.
 */
function renderMarkdown(container, text) {
    // Clear loading state
    container.innerHTML = '';
    
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap'; // Preserves formatting
    pre.style.backgroundColor = '#f4f4f4';
    pre.style.padding = '15px';
    pre.style.borderRadius = '5px';
    pre.textContent = text; // Safe text insertion (prevents XSS)
    
    container.appendChild(pre);
}