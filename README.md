# GitHub Developer Dashboard

A responsive developer dashboard that displays GitHub profile information, repository statistics, programming language distribution, and LeetCode problem-solving progress.

## Features

- **GitHub Profile:** Fetches public profile information using the GitHub API.
- **Repository Statistics:** Displays public repositories, followers, following, and total stars.
- **Programming Languages:** Shows language distribution for repositories.
- **Repository Cards:** Displays repository names, descriptions, and related information.
- **LeetCode Progress:** Retrieves problem-solving statistics through a third-party API when available.
- **Dark and Light Themes:** Supports theme switching.
- **Responsive Design:** Adapts to desktop and mobile screens.
- **Developer Links:** Provides links to GitHub, LinkedIn, LeetCode, email, and portfolio.
- **Modular JavaScript:** Separates configuration, API requests, rendering, and application logic.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- GitHub REST API
- Third-party LeetCode API

## Project Structure

```text
github-dashboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── github-api.js
│   ├── render.js
│   └── main.js
└── public/
    └── myProfile.png
```

### Folder and File Responsibilities

- `index.html` — Dashboard page structure.
- `css/style.css` — Layout, responsive styling, animations, and themes.
- `js/config.js` — GitHub username, profile links, API settings, and dashboard configuration.
- `js/github-api.js` — Fetches GitHub and LeetCode statistics.
- `js/render.js` — Updates dashboard elements with fetched data.
- `js/main.js` — Initializes the dashboard and connects application functions.
- `public/myProfile.png` — Profile image asset.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/codewithkashif17/github-dashboard
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Open the Project

```bash
cd github-dashboard
```

### 3. Run the Dashboard

Open `index.html` using a local development server, such as the VS Code Live Server extension.

A local server is recommended for reliable JavaScript execution and API requests.

## Configuration

Update `js/config.js` to configure your GitHub username, LeetCode username, portfolio URL, and other profile links.

The GitHub API supports public profile and repository requests without authentication, subject to API rate limits.

LeetCode statistics depend on the availability and response format of the configured third-party API.

## Notes

- An internet connection is required to fetch live statistics.
- API availability, rate limits, and CORS restrictions may affect live data.
- Only public GitHub information is fetched by the default configuration.
- Keep private credentials and tokens out of public repositories.

## Author

**Kashif Mehmood**

- GitHub: https://github.com/codewithkashif17
- LinkedIn: https://linkedin.com/in/kashif-mehmood-a47594397
- Portfolio: https://my-portfolio-gv7k.vercel.app/

---

Built to present developer activity and coding progress in one dashboard.
