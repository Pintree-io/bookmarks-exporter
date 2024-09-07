import { Finish, Icon } from "@/components/icons"
import { MainFooter } from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { AppContext } from "@/context/app-context"
import { getCurrentDateTimeFormatted, jsonToBase64 } from "@/utils"
import { Octokit } from "@octokit/rest"
import { message } from "antd"
import { useContext } from "react"

import { useStorage } from "@plasmohq/storage/hook"

const path = "json"
const fileName = "pintree.json"
const filePath = `${path}/${fileName}`

function FinishPopup() {
  const [gitToken] = useStorage("git-token", "")
  const [commitName] = useStorage("commit-name", "")
  const [commitEmail] = useStorage("commit-email", "")
  const [selectRepo] = useStorage("select-repo", null)
  const { treeData } = useContext(AppContext)

  const hasRepo = selectRepo !== null && gitToken && commitName && commitEmail

  const onDownload = () => {
    const data = JSON.stringify(treeData, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const commitToRepo = async () => {
    const octokit = new Octokit({
      auth: gitToken
    })
    const hide = message.loading("Commiting")
    try {
      const { owner, label: repo } = selectRepo
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path: filePath,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      )

      const commitData = {
        repo,
        owner,
        path: filePath,
        message: `Update ${fileName} in ${getCurrentDateTimeFormatted()}`,
        committer: { name: commitName, email: commitEmail },
        content: jsonToBase64(treeData),
        //@ts-ignore
        sha: data.sha as string,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }

      await octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        commitData
      )
      hide()
      message.success("Commit successful.")
    } catch (error) {
      hide()
      message.error("Something went wrong.")
    }
  }

  return (
    <div className="py-6 w-[300px] flex flex-col items-center justify-center">
      <Finish className="w-32 h-32" />
      <div className="w-full space-y-3 mt-4 mb-9 px-6">
        <h1 className="text-xl font-normal text-center">Export Successful !</h1>
        <p className="text-lg font-light text-zinc-600 text-center">
          Click the button to download the JSON file
        </p>
      </div>
      <div className="w-full space-y-5 px-10">
        <Button
          className="text-[16px] font-light w-full py-4 flex items-center justify-center"
          onClick={onDownload}>
          <Icon
            icon="material-symbols:download-sharp"
            className="w-6 h-6 mr-2"
          />
          Download
        </Button>
        {hasRepo && (
          <Button
            className="text-[16px] font-light w-full py-4 flex items-center justify-center"
            onClick={commitToRepo}>
            <Icon
              icon="material-symbols:download-sharp"
              className="w-6 h-6 mr-2"
            />
            Commit to Repo
          </Button>
        )}
        <MainFooter />
      </div>
    </div>
  )
}

export default FinishPopup
