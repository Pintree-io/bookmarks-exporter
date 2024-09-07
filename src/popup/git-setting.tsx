import { Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Octokit } from "@octokit/rest"
import { Input, message, Select } from "antd"
import { useNavigate } from "react-router-dom"

import { useStorage } from "@plasmohq/storage/hook"

let octokit = null
const GitSetting = () => {
  const navigate = useNavigate()
  const [gitToken, setGitToken] = useStorage("git-token", "")
  const [commitName, setCommitName] = useStorage("commit-name", "")
  const [commitEmail, setCommitEmail] = useStorage("commit-email", "")
  const [repoList, setRepoList] = useStorage("repo-list", [])
  const [selectRepo, setSelectRepo] = useStorage("select-repo", null)

  const getProjectList = () => {
    octokit = new Octokit({
      auth: gitToken
    })
    return octokit
      .request("GET /user/repos", {
        sort: "updated",
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28"
        }
      })
      .then((res) => {
        const list =
          res?.data.map(({ name, id, owner }) => ({
            owner: owner.login,
            value: id,
            label: name
          })) || []
        message.success("Fetch successful.")
        setRepoList(list)
      })
      .catch((e) => {
        message.error(e.message.split("-")[0])
      })
  }

  const checkJsonExist = async (repo, owner) => {
    octokit = new Octokit({
      auth: gitToken
    })
    try {
      return await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path: "json",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      )
    } catch (error) {
      throw new Error("This repo is no 'json' folder in the root directory.")
    }
  }

  const onRepoChange = async (_, option) => {
    const hide = message.loading("Checking")
    console.log("[ option ] >", option)
    try {
      const { owner, label } = option
      await checkJsonExist(label, owner)
      setSelectRepo(option)
      hide()
      message.success("Selection successful.")
    } catch (error) {
      hide()
      message.error(error.message)
    }
  }

  return (
    <div className="px-10 py-6 w-[300px] flex flex-col items-center justify-center min-h-fit">
      <Logo className="w-20 h-20" />
      <label className="my-2 text-lg font-semibold">Git Token</label>
      <Input
        value={gitToken}
        onChange={(e) => setGitToken(e.target.value)}
        placeholder="Input your Git token"
      />
      <label htmlFor="repoList" className="my-2 text-lg font-semibold">
        Select Repository
      </label>
      <Select
        showSearch
        className="w-full"
        placement="bottomLeft"
        placeholder="Select your repository"
        listHeight={150}
        options={repoList}
        onChange={onRepoChange}
        value={selectRepo && selectRepo.value}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
      />
      <label className="my-2 text-lg font-semibold">Commit Name</label>
      <Input
        value={commitName}
        onChange={(e) => setCommitName(e.target.value)}
        placeholder="Input your commit name"
      />
      <label className="my-2 text-lg font-semibold">Commit Email</label>
      <Input
        value={commitEmail}
        onChange={(e) => setCommitEmail(e.target.value)}
        placeholder="Input your commit email"
      />
      <Button
        className="text-[16px] font-light w-full py-2 mt-4"
        onClick={getProjectList}
        disabled={!gitToken.length}>
        Get Repository List
      </Button>
      <Button
        className="text-[16px] font-light w-full py-2 mt-4"
        onClick={() => navigate("/")}>
        Return Homepage
      </Button>
    </div>
  )
}

export default GitSetting
