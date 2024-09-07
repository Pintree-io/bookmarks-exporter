import { fetchWrapper } from "@/utils/wrapper"

export const getCopyYear = () => {
  const currentYear = new Date().getFullYear()
  const year = currentYear === 2024 ? "2024" : `2024 - ${currentYear}`
  return year
}

// Clearbit API 获取 logo URL
export const getClearbitLogoUrl = async (url: string) => {
  const parsedUrl = new URL(url)
  const domain = parsedUrl.hostname
  return `https://logo.clearbit.com/${domain}`
}

// Google S2 Converter 获取 favicon URL
export const getGoogleLogoUrl = async (url: string) => {
  const parsedUrl = new URL(url)
  return `https://www.google.com/s2/favicons?sz=64&domain_url=${parsedUrl}`
}

// 获取网站的 logo 或 favicon，并进行容错处理
export const getLogoUrl = async (url: string) => {
  try {
    // 尝试使用 Clearbit 获取 logo
    const clearbitLogoUrl = await getClearbitLogoUrl(url)
    await fetchWrapper(clearbitLogoUrl) // 检查是否能成功获取
    return clearbitLogoUrl
  } catch (error) {
    console.warn(`Clearbit logo not found for ${url}, trying Google Favicon.`)

    try {
      // 尝试使用 Google S2 Converter 获取 favicon
      const googleFaviconUrl = await getGoogleLogoUrl(url)
      await fetchWrapper(googleFaviconUrl) // 检查是否能成功获取
      return googleFaviconUrl
    } catch (error) {
      console.warn(
        `Google favicon not found for ${url}, using default favicon.`
      )

      // 返回默认的 favicon
      return undefined
    }
  }
}

// 将 Logo 图标转换为 base64 编码
export const logoToBase64 = async (logoUrl: string) => {
  try {
    const response = await fetchWrapper(logoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const mimeType = response.headers.get("content-type")!
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    throw new Error(`Failed to convert logo to base64: ${error}`)
  }
}

/**
 * @description: Delayed execution
 * @param {number} time delay
 * @return Promise
 */
export const delay = (time: number = 500): Promise<TimerHandler> =>
  new Promise((resolve) => setTimeout(resolve, time))

export function getCurrentDateTimeFormatted() {
  const now = new Date()

  const year = now.getFullYear()
  const month = ("0" + (now.getMonth() + 1)).slice(-2)
  const day = ("0" + now.getDate()).slice(-2)

  const hours = ("0" + now.getHours()).slice(-2)
  const minutes = ("0" + now.getMinutes()).slice(-2)
  const seconds = ("0" + now.getSeconds()).slice(-2)

  const formattedDateTime =
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  return formattedDateTime
}

export function jsonToBase64(json) {
  const jsonString = JSON.stringify(json, null, 2)
  const base64String = Buffer.from(jsonString).toString("base64")
  return base64String
}
