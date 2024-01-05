import api from "./api"

class GithubApi {
  async getRepo(id: string) {
    const response = await api.get(`https://api.github.com/users/${id}/repos`);

    return response.data
  }
  
}

const GitHubService = new GithubApi()

export default GitHubService
