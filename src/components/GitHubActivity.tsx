
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from './LanguageProvider';

interface Repository {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  repository: {
    name: string;
  };
}

interface GithubUserData {
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubActivityProps {
  username: string;
}

const GitHubActivity: React.FC<GitHubActivityProps> = ({ username }) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiToken, setApiToken] = useState<string>("");

  // Get token from localStorage if available
  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
      setApiToken(savedToken);
    }
  }, []);

  // Function to set up GitHub API token
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const tokenInput = form.elements.namedItem('github_token') as HTMLInputElement;
    
    if (tokenInput && tokenInput.value) {
      localStorage.setItem('github_token', tokenInput.value);
      setApiToken(tokenInput.value);
      form.reset();
    }
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!apiToken) return;
      
      try {
        setLoading(true);
        
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        };
        
        if (apiToken) {
          headers['Authorization'] = `token ${apiToken}`;
        }
        
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userRes.ok) {
          throw new Error(`Failed to fetch user data: ${userRes.status}`);
        }
        const userData = await userRes.json();
        setUserData(userData);
        
        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, { headers });
        if (!reposRes.ok) {
          throw new Error(`Failed to fetch repositories: ${reposRes.status}`);
        }
        const reposData = await reposRes.json();
        setRepositories(reposData);
        
        // Fetch recent commits
        const commitsPromises = reposData.slice(0, 3).map(async (repo: Repository) => {
          const commitsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=3`, { headers });
          if (!commitsRes.ok) return [];
          const commitsData = await commitsRes.json();
          return commitsData.map((commit: any) => ({
            ...commit,
            repository: { name: repo.name }
          }));
        });
        
        const commitsArrays = await Promise.all(commitsPromises);
        const allCommits = commitsArrays.flat().slice(0, 5);
        setCommits(allCommits);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (apiToken) {
      fetchGitHubData();
    }
  }, [username, apiToken]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine language color
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Java: '#b07219',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
    };
    return colors[language] || '#8B5CF6'; // Default to portfolio accent color
  };

  // GitHub token setup UI
  if (!apiToken) {
    return (
      <Card className="bg-slate-900/80 border-slate-700/20">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <i className="bi bi-github"></i> GitHub Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-300">
              Pour voir votre activité GitHub, veuillez fournir un token d'accès personnel GitHub.
            </p>
            <ol className="list-decimal list-inside text-slate-300 space-y-2">
              <li>Visitez <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub Personal Access Tokens</a></li>
              <li>Cliquez sur "Generate new token" et sélectionnez "Generate new token (classic)"</li>
              <li>Donnez un nom à votre token (par exemple "Portfolio App")</li>
              <li>Sélectionnez les permissions suivantes : <code className="bg-slate-800 px-1 rounded">repo</code>, <code className="bg-slate-800 px-1 rounded">user</code></li>
              <li>Cliquez sur "Generate token" et copiez-le</li>
              <li>Collez le token dans le champ ci-dessous</li>
            </ol>
            
            <form onSubmit={handleTokenSubmit} className="mt-6">
              <div className="space-y-2">
                <label htmlFor="github_token" className="block text-sm font-medium text-slate-300">
                  Token d'accès GitHub
                </label>
                <input 
                  type="password" 
                  name="github_token" 
                  id="github_token" 
                  className="block w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                  placeholder="ghp_1234567890abcdef..."
                  required
                />
                <p className="text-xs text-slate-400">
                  Ce token sera stocké uniquement dans le stockage local de votre navigateur.
                </p>
              </div>
              <button 
                type="submit" 
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Connecter GitHub
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-portfolio-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-700/20">
        <CardContent className="flex flex-col items-center justify-center h-64 p-6">
          <div className="text-red-400 text-5xl mb-4">
            <i className="bi bi-exclamation-circle"></i>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">GitHub API Error</h3>
          <p className="text-slate-300 text-center">{error}</p>
          <button
            onClick={() => {
              localStorage.removeItem('github_token');
              setApiToken("");
            }}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
          >
            Réessayer avec un nouveau token
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-12 bg-slate-950">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-portfolio-accent text-sm tracking-wider uppercase font-semibold">
            GitHub
          </span>
          <h2 className="text-4xl font-bold mt-2 tracking-tight text-white">
            Mon Activité GitHub
          </h2>
          <div className="w-20 h-1 bg-portfolio-accent mx-auto mt-4"></div>
        </div>

        <div className="space-y-8">
          {userData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Profile */}
              <Card className="bg-slate-900/80 border-slate-700/20 col-span-1">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-portfolio-accent/30 mb-4">
                      <img 
                        src={userData.avatar_url} 
                        alt={userData.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{userData.name}</h3>
                    <a 
                      href={userData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-accent hover:underline mb-3"
                    >
                      @{username}
                    </a>
                    <p className="text-slate-300 text-sm mb-4">{userData.bio}</p>
                    
                    <div className="flex justify-between w-full text-center border-t border-slate-700/30 pt-4 mt-2">
                      <div>
                        <div className="text-lg font-bold text-white">{userData.public_repos}</div>
                        <div className="text-xs text-slate-400">Repositories</div>
                      </div>
                      <div className="border-l border-r border-slate-700/30 px-4">
                        <div className="text-lg font-bold text-white">{userData.followers}</div>
                        <div className="text-xs text-slate-400">Followers</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{userData.following}</div>
                        <div className="text-xs text-slate-400">Following</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        localStorage.removeItem('github_token');
                        setApiToken("");
                      }}
                      className="mt-6 px-3 py-1 bg-slate-800 text-xs text-slate-300 rounded hover:bg-slate-700"
                    >
                      Changer de token
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Repositories */}
              <Card className="bg-slate-900/80 border-slate-700/20 col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <i className="bi bi-folder2-open"></i> Repositories Récents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {repositories.length > 0 ? (
                    repositories.map((repo) => (
                      <a 
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-portfolio-accent group-hover:underline">{repo.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <div className="flex items-center gap-1">
                                <i className="bi bi-star-fill"></i> {repo.stargazers_count}
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="bi bi-diagram-2-fill"></i> {repo.forks_count}
                              </div>
                            </div>
                          </div>
                          {repo.description && (
                            <p className="text-sm text-slate-300 mb-3 line-clamp-2">{repo.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            {repo.language && (
                              <div className="flex items-center gap-2">
                                <span 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                                ></span>
                                <span className="text-xs text-slate-300">{repo.language}</span>
                              </div>
                            )}
                            <span className="text-xs text-slate-400">Mis à jour {formatDate(repo.updated_at)}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-4">Aucun repository trouvé.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Commits */}
          <Card className="bg-slate-900/80 border-slate-700/20">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <i className="bi bi-git"></i> Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {commits.length > 0 ? (
                <div className="space-y-4">
                  {commits.map((commit) => (
                    <a 
                      key={commit.sha}
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-portfolio-accent group-hover:underline">
                            {commit.repository.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatDate(commit.commit.author.date)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 line-clamp-2">
                          {commit.commit.message}
                        </p>
                        <div className="text-xs text-slate-400 mt-2">
                          Par {commit.commit.author.name}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">Aucun commit récent trouvé.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
