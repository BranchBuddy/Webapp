import React, { useState, useEffect } from "react";

import { Octokit } from "@octokit/rest";

import { ApiClient } from "../../api/ApiClient";
import api from "../../api";


interface GitHubLoaderProps {
  owner: string;
  repo: string;
  filePath: string;
}

export type RepositoryDataType = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
};
const apiClient = new ApiClient()

const extractAllCommits = async (owner:string, repo: string) => {
    try {
        const octokit = new Octokit({
          auth: "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",
        });

        const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
          owner: owner,
          repo: repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        
        const commit_url: string[] = (response.data[0].html_url as string).split('/')
        const commit_ref = commit_url[commit_url.length-1]
        const commit = await octokit.request(`GET /repos/${owner}/${repo}/commits/${commit_ref}`, {
            owner: 'OWNER',
            repo: 'REPO',
            ref: 'REF',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        const commit_author = commit.data.author.login
        const commit_files = commit.data.files
        const commit_info: {
            file_path: string,
            file_diff: string
        }[] = []
        for (const file of commit_files) {
            commit_info.push({
                file_path: file.filename,
                file_diff: file.patch
            })
        }
        return {'author': commit_author, 'info': commit_info}
      } catch (error) {
        console.error("Error fetching code from GitHub:", error);
      }
}
const GitHubLoader: React.FC<GitHubLoaderProps> = ({
  owner,
  repo,
  filePath,
}) => {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCode = async () => {
        const commits = await extractAllCommits(owner, repo)
        console.log(commits)
        const currentCommit = []
        if (commits) {
            setCode(commits.info[0].file_diff)
        }
        
    };
    const requestBody = {}
    const sendCompareRequest = async () => {
        // Example function to make a POST request
    try {
      const response = await api.post('/endpoint', requestBody);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    }

    const sendImproveRequest = async () => {
        const requestBody = JSON.stringify({
            code: 'def num(a,b):\nreturn a'
        })
        try {
            const response = await apiClient.post('/improve', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_token'
                },
                withCredentials: false,
            })
            console.log(response)
            
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    //fetchCode();
    sendImproveRequest();
  }, [owner, repo, filePath]);

  return (
    <div>
      {code !== null ? (
        <pre>
          <code>{code}</code>
        </pre>
      ) : (
        <p>Loading code...</p>
      )}
    </div>
  );
};

export default GitHubLoader;
