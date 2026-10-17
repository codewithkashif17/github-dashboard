
const Render = {
  element(id) {
    return document.getElementById(id);
  },

  text(id, value) {
    const element = this.element(id);

    if (element) {
      element.textContent = value;
    }
  },

  // ========================================
  // GITHUB
  // ========================================

  renderStats(data) {
    this.text("repo-count", data.profile.public_repos);
    this.text("follower-count", data.profile.followers);
    this.text("following-count", data.profile.following);
    this.text("star-count", data.totalStars);
  },

  renderLanguages(languages) {
    const container = this.element("language-stats");

    if (!container) return;

    container.replaceChildren();

    if (!languages.length) {
      container.textContent =
        "Abhi language data available nahi hai.";
      return;
    }

    languages.forEach(language => {
      const row = document.createElement("div");
      row.className = "language-row";

      const name = document.createElement("span");
      name.textContent = language.name;

      const track = document.createElement("div");
      track.className = "track";

      const fill = document.createElement("div");
      fill.className = "fill";
      fill.style.setProperty("--w", `${language.percentage}%`);

      track.appendChild(fill);

      const count = document.createElement("em");
      count.textContent = `${language.count} repos`;

      row.append(name, track, count);
      container.appendChild(row);
    });
  },

  renderRepositories(repositories) {
    const container = this.element("repos");

    if (!container) return;

    container.replaceChildren();

    const selectedRepositories = repositories.slice(
      0,
      CONFIG.githubSettings.repositoryLimit
    );

    if (!selectedRepositories.length) {
      container.textContent =
        "Koi public repository nahi mili.";
      return;
    }

    selectedRepositories.forEach(repo => {
      const card = document.createElement("a");

      card.className = "repo";
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const title = document.createElement("strong");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent =
        repo.description ||
        "Is repository ki description available nahi hai.";

      const info = document.createElement("span");
      info.className = "tag";
      info.textContent =
        `${repo.language || "Other"} · ★ ${repo.stargazers_count}`;

      card.append(title, description, info);
      container.appendChild(card);
    });
  },

  renderError(message) {
    this.text("github-status", message);
    this.text("repo-count", "--");
    this.text("follower-count", "--");
    this.text("following-count", "--");
    this.text("star-count", "--");

    const languageContainer = this.element("language-stats");
    const repoContainer = this.element("repos");

    if (languageContainer) {
      languageContainer.textContent =
        "GitHub language data load nahi hua.";
    }

    if (repoContainer) {
      repoContainer.textContent =
        "Repositories load nahi ho sakin.";
    }
  },

  renderDashboard(data) {
    this.renderStats(data);
    this.renderLanguages(data.languages);
    this.renderRepositories(data.repositories);

    this.text(
      "github-status",
      `Live data loaded for @${data.profile.login}`
    );
  },

  // ========================================
  // LEETCODE
  // ========================================

  setProgressBar(id, solved, total) {
    const bar = this.element(id);

    if (!bar) return;

    const percentage = total > 0
      ? Math.min(100, (solved / total) * 100)
      : 0;

    bar.style.setProperty("--w", `${percentage}%`);
    bar.style.width = `${percentage}%`;
  },

  renderLeetCode(data) {
    const goal = Number(CONFIG.leetcode.goal) || 50;

    // Total solved problems
    this.text("leetcode-solved", data.solved);

    // Personal goal
    this.text("leetcode-goal", goal);
    this.text(
      "leetcode-goal-label",
      `${data.solved} / ${goal}`
    );

    this.setProgressBar(
      "leetcode-goal-fill",
      data.solved,
      goal
    );

    // Easy problems
    this.text("easy-solved", data.easy);

    this.setProgressBar(
      "easy-fill",
      data.easy,
      data.totalEasy
    );

    // Medium problems
    this.text("medium-solved", data.medium);

    this.setProgressBar(
      "medium-fill",
      data.medium,
      data.totalMedium
    );

    // Hard problems
    this.text("hard-solved", data.hard);

    this.setProgressBar(
      "hard-fill",
      data.hard,
      data.totalHard
    );

    this.text(
      "leetcode-status",
      "LeetCode statistics successfully loaded."
    );
  },

  renderLeetCodeError(message) {
    this.text("leetcode-status", message);
  }
};
