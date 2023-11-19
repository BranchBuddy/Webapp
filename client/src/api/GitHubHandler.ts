import {Octokit} from '@octokit/rest';
import {Buffer} from 'buffer';


const octokit = new Octokit({auth: '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'});

interface TreeEntry {
    path?: string;
    sha?: string;
    mode?: string;
    type?: string;
}

export async function getFileContentAfterCommit(
    owner: string,
    repo: string,
    commitHash: string,
    filePath: string
): Promise<string> {
    try {
        const commitResponse = await octokit.git.getCommit({
            owner,
            repo,
            commit_sha: commitHash,
        });


        let treeResponse = await octokit.git.getTree({
            owner,
            repo,
            tree_sha: commitResponse.data.tree.sha,
        });

        let file = treeResponse.data.tree.find((entry: TreeEntry) => entry.path === filePath);
        const parts = filePath.split('/');


        if (!file) {
            for (let part of parts) {
                treeResponse = await octokit.git.getTree({
                    owner,
                    repo,
                    tree_sha: treeResponse.data.tree.find((entry: TreeEntry) => entry.path === part)?.sha!,
                });
                file = treeResponse.data.tree.find((entry: TreeEntry) => entry.path === parts[parts.length - 1]);
                if (file) {
                    break;
                }
            }
        }

        if (!file || !file.sha) {
            throw new Error(`File "${filePath}" not found in the commit tree.`);
        }

        const blobResponse = await octokit.git.getBlob({
            owner,
            repo,
            file_sha: file.sha,
        });

        console.log(blobResponse.data);

        return Buffer.from(blobResponse.data.content, 'base64').toString('utf-8');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching file content:', error.message);
        } else {
            console.error('An error occurred while fetching file content.');
        }
        throw error;
    }
}