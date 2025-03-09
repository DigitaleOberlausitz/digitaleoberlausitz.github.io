// node.js
import * as fs from "fs"
import * as path from "path"
import { mkdirp } from "mkdirp"

import ical from "ical-generator"

import { DateTime } from "luxon"

type FrontmatterDate = `${number}-${number}-${number}`
type FrontmatterTime = `${number}:${number}`

type Frontmatter = {
  title: string
  date: FrontmatterDate
  ical: string
  location: string
  startTime: FrontmatterTime
  endTime: FrontmatterTime
}

type EventNode = {
  frontmatter: Frontmatter
  html: string
  excerpt: string
}

export const createIcal = async ({
  graphql,
  icalFrontmatterName,
  icalTargetPath,
  icalUrl,
  icalName,
}: {
  graphql: any
  icalFrontmatterName: string
  icalTargetPath: string
  icalUrl: string
  icalName: string
}) => {
  return graphql(`{
  events: allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {sourceName: {eq: "events"}}, frontmatter: {ical: {eq: "${icalFrontmatterName}"}}}
  ) {
    edges {
      node {
        frontmatter {
          title
          ical
          location
          startTime
          endTime
          date
        }
        html
        excerpt
      }
    }
  }
}`).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const events: Array<EventNode> = result.data.events.edges.map((edge) => edge.node)

    const cal = ical({
      url: icalUrl,
      name: icalName,
    })

    events.forEach((event) => {
      const { title, date, startTime, endTime, location } = event.frontmatter
      const html: string = event.html
      const excerpt: string = event.excerpt

      const start = createDate(date, startTime)
      const end = createDate(date, endTime)

      cal.createEvent({
        start,
        end,
        summary: title,
        description: {
          plain: excerpt,
          html,
        },
        location,
      })
    })

    return writeIcalFile(cal.toString(), icalTargetPath)
  })
}

function writeIcalFile(content: string, icalTargetPath: string): Promise<void> {
  const outputDir = path.dirname(icalTargetPath)

  if (!fs.existsSync(outputDir)) {
    mkdirp.sync(outputDir)
  }

  return fs.promises.writeFile(icalTargetPath, content)
}

export const createDate = (date: FrontmatterDate, time: FrontmatterTime): DateTime => {
  const iso = `${date}T${time}`
  return (
    DateTime.fromISO(iso)
      // make sure that the time is defined in german time
      .setZone("Europe/Berlin", { keepLocalTime: true })
      // then transform to UTC to be compliant with ical standard
      .toUTC()
  )
}
