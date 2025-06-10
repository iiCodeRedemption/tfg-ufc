import { match } from "path-to-regexp"

export function createRouteMatcher(routes: string[]) {
  const matchers = routes.map((route) => ({
    route,
    matcher: match(route, { decode: decodeURIComponent }),
  }))

  return (pathname: string) => {
    for (const { route, matcher } of matchers) {
      const result = matcher(pathname)
      if (result) {
        return { route, params: result.params }
      }
    }

    return null
  }
}
