
const GitHubAPI = {
  // Common function for GitHub API requests
  async request(endpoint) {
    const url = `${CONFIG.github.apiBase}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error(
          "GitHub API rate limit reached. Thori dair baad try karein."
        );
      }

      if (response.status === 404) {
        throw new Error("GitHub profile ya resource nahi mila.");
      }

      throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
  },

  // Fetch GitHub profile
  async getProfile() {
    return this.request(`/users/${CONFIG.github.username}`);
  },

  // Fetch user's repositories
  async getRepositories() {
    const repositories = await this.request(
      `/users/${CONFIG.github.username}/repos?type=owner&sort=updated&per_page=100`
    );

    return repositories
      .filter(repo => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.updated_at) - new Date(a.updated_at)
      );
  },

  // Fetch all GitHub dashboard data
  async getDashboardData() {
    const [profile, repositories] = await Promise.all([
      this.getProfile(),
      this.getRepositories()
    ]);

    const totalStars = repositories.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    const languageCounts = {};

    repositories.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const repositoriesWithLanguage = repositories.filter(
      repo => repo.language
    ).length;

    const languages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, CONFIG.githubSettings.languageLimit)
      .map(([name, count]) => ({
        name,
        count,
        percentage: repositoriesWithLanguage
          ? Math.round(
              (count / repositoriesWithLanguage) * 100
            )
          : 0
      }));

    return {
      profile,
      repositories,
      totalStars,
      languages
    };
  }
};


// ========================================
// LEETCODE API
// ========================================

const LeetCodeAPI = {
  // Fetch live LeetCode statistics
  async getStats() {
    const username = CONFIG.leetcode.username;

    const url =
      `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/solved`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(
        `LeetCode API error: ${response.status}`
      );
    }

    const data = await response.json();

    // Read the available solved-count fields.
    const solvedValue =
      data.solvedProblem ??
      data.totalSolved ??
      data.totalSolvedQuestions;

    const solved = Number(solvedValue);

    if (solvedValue == null || !Number.isFinite(solved)) {
      console.error("Unexpected LeetCode API response:", data);

      throw new Error(
        "API response mein solved problems ka count nahi mila."
      );
    }

    return {
      solved,
      easy: Number(data.easySolved ?? 0),
      medium: Number(data.mediumSolved ?? 0),
      hard: Number(data.hardSolved ?? 0),
      totalEasy: Number(data.totalEasy ?? 0),
      totalMedium: Number(data.totalMedium ?? 0),
      totalHard: Number(data.totalHard ?? 0)
    };
  }
};
