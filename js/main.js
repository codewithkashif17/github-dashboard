
document.addEventListener("DOMContentLoaded", () => {
  setupLinks();
  setupTheme();
  setupTypingAnimation();
  setupEmailCopy();
  setupSnakeAnimation();

  // GitHub aur LeetCode ka live data load karo
  loadGitHubData();
  loadLeetCodeData();
});


// ========================================
// WEBSITE LINKS
// ========================================

function setupLinks() {
  const links = {
    "github-link": `https://github.com/${CONFIG.github.username}`,
    "github-contact": `https://github.com/${CONFIG.github.username}`,
    "linkedin-link": CONFIG.linkedin.url,
    "linkedin-contact": CONFIG.linkedin.url,
    "email-link": `mailto:${CONFIG.email}`,
    "email-contact": `mailto:${CONFIG.email}`,
    "leetcode-link": CONFIG.leetcode.url,
    "leetcode-contact": CONFIG.leetcode.url,
    "leetcode-profile": CONFIG.leetcode.url,
    "portfolio-link": CONFIG.portfolio.url,
    "all-repos": `https://github.com/${CONFIG.github.username}?tab=repositories`
  };

  Object.entries(links).forEach(([id, url]) => {
    const element = document.getElementById(id);

    if (element) {
      element.href = url;
    }
  });

  const textElements = {
    "github-text": `@${CONFIG.github.username}`,
    "linkedin-text": CONFIG.linkedin.username,
    "leetcode-text": `@${CONFIG.leetcode.username}`,
    "email-text": CONFIG.email,
    "portfolio-text": CONFIG.portfolio.url
  };

  Object.entries(textElements).forEach(([id, value]) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
    }
  });
}


// ========================================
// DARK / LIGHT THEME
// ========================================

function setupTheme() {
  const root = document.documentElement;
  const button = document.getElementById("theme");

  if (!button) return;

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }

  button.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");

    const isDark = currentTheme
      ? currentTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    const nextTheme = isDark ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });
}


// ========================================
// TYPING ANIMATION
// ========================================

function setupTypingAnimation() {
  const element = document.getElementById("type");

  if (!element) return;

  const lines = [
    "$ whoami",
    "kashif-mehmood — software engineer",
    "$ cat status.txt",
    "compiling ideas into code since 2022",
    "$ ./run.sh --mode=production",
    "system ready ✓"
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = lines[lines.length - 1];
    return;
  }

  let lineIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function type() {
    const currentLine = lines[lineIndex];
    let delay = 90;

    if (!deleting) {
      characterIndex++;

      element.textContent = currentLine.slice(0, characterIndex);

      if (characterIndex === currentLine.length) {
        deleting = true;
        delay = 1100;
      }
    } else {
      characterIndex--;

      element.textContent = currentLine.slice(0, characterIndex);
      delay = 28;

      if (characterIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        delay = 250;
      }
    }

    setTimeout(type, delay);
  }

  type();
}


// ========================================
// EMAIL COPY
// ========================================

function setupEmailCopy() {
  const button = document.getElementById("copy");

  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      button.textContent = "Copied ✓";
    } catch {
      button.textContent = CONFIG.email;
    }

    setTimeout(() => {
      button.textContent = "Copy email address";
    }, 1800);
  });
}


// ========================================
// SNAKE ANIMATION
// ========================================

function setupSnakeAnimation() {
  const svg = document.getElementById("snake");

  if (!svg) return;

  // Prevent duplicate animation cells
  if (svg.dataset.initialized === "true") return;

  svg.dataset.initialized = "true";

  const namespace = "http://www.w3.org/2000/svg";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  for (let column = 0; column < 26; column++) {
    for (let row = 0; row < 5; row++) {
      const cell = document.createElementNS(namespace, "rect");

      cell.setAttribute(
        "class",
        (column * 7 + row * 3) % 5 === 0 ? "cell g" : "cell"
      );

      cell.setAttribute("x", column * 20 + 4);
      cell.setAttribute("y", row * 20 + 14);
      cell.setAttribute("width", 13);
      cell.setAttribute("height", 13);
      cell.setAttribute("rx", 3);

      svg.appendChild(cell);
    }
  }

  const motionPath =
    "M10 20.5H510V40.5H10V60.5H510V80.5H10V100.5H510";

  for (let index = 0; index < 8; index++) {
    const circle = document.createElementNS(namespace, "circle");

    circle.setAttribute("class", "sn");
    circle.setAttribute("r", 7 - index * 0.4);
    circle.setAttribute("cx", 0);
    circle.setAttribute("cy", 0);

    if (!reducedMotion) {
      const animation = document.createElementNS(
        namespace,
        "animateMotion"
      );

      animation.setAttribute("dur", "16s");
      animation.setAttribute("repeatCount", "indefinite");
      animation.setAttribute("begin", `-${index * 0.28}s`);
      animation.setAttribute("path", motionPath);

      circle.appendChild(animation);
    }

    svg.appendChild(circle);
  }
}


// ========================================
// LOAD GITHUB DATA
// ========================================

async function loadGitHubData() {
  const status = document.getElementById("github-status");

  try {
    if (status) {
      status.textContent = "GitHub se live data load ho raha hai...";
    }

    const data = await GitHubAPI.getDashboardData();

    Render.renderDashboard(data);
  } catch (error) {
    console.error("GitHub data error:", error);

    Render.renderError(
      error.message || "GitHub data load nahi ho saka."
    );
  }
}


// ========================================
// LOAD LEETCODE DATA
// ========================================

async function loadLeetCodeData() {
  const status = document.getElementById("leetcode-status");

  try {
    if (status) {
      status.textContent = "LeetCode se live data load ho raha hai...";
    }

    // Fetch actual statistics from the LeetCode API
    const data = await LeetCodeAPI.getStats();

    // Display statistics and progress bars
    Render.renderLeetCode(data);
  } catch (error) {
    console.error("LeetCode data error:", error);

    Render.renderLeetCodeError(
      "LeetCode data load nahi hua. API ya network check karein."
    );
  }
}
