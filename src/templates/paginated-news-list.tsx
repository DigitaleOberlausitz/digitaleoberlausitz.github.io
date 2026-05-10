import React, { FC } from "react"
import { Link, PageProps } from "gatsby"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import Layout from "../components/layout"

import { CaretLeftIcon, CaretRightIcon} from "@phosphor-icons/react"

import * as R from "ramda"

import extractExcerpt from "../utils/extract-excerpt"

type Edge = {
  node: {
    id: string
    frontmatter: {
      title: string
      date: string
    }
    fields: {
      slug: string
    }
    html: string
  }
}

type PageContext = {
  group: Array<Edge>
  index: number
  pageCount: number
}

const PaginatedNewsList: FC<PageProps<object, PageContext>> = ({ data, pageContext }) => {
  const { group, index, pageCount } = pageContext

  return (
    <Layout>
      <div>
        {group.map(({ node }) => {
          const {
            id,
            html,
            frontmatter: { title, date },
            fields: { slug },
          } = node
          return (
            <article className="news-article" key={id}>
              <header>
                <h1>
                  <Link to={slug}>{title}</Link>
                </h1>
                <strong>
                  <time dateTime={date}>{date}</time>
                </strong>
              </header>
              <div
                dangerouslySetInnerHTML={{
                  __html: extractExcerpt(html),
                }}
              />

              <Link to={slug}>mehr anzeigen...</Link>
            </article>
          )
        })}

        <div>
          <Pagination aria-label="Page navigation">{generatePaginationItems({ pageCount, index })}</Pagination>
        </div>
      </div>
    </Layout>
  )
}

const generatePaginationItems = ({ pageCount, index }) => {
  const last = index === pageCount
  const first = index === 1

  // when on page 1 there is no previous
  // when on page 2 the previous is "/"
  // else it's "page" + the index of previous page
  const previousUrl = first ? undefined : index === 2 ? "/" : "/page/" + (index - 1)
  // when on last page there is no next
  const nextUrl = last ? undefined : "/page/" + (index + 1)

  const tagFunction = (props) => {
    if (props.to) {
      return <Link {...props} />
    } else {
      return <span {...props} />
    }
  }

  const paginationItems = R.range(1, pageCount + 1).map((i) => {
    return (
      <PaginationItem key={i} disabled={i === index}>
        <PaginationLink aria-label={`navigate to page ${i}`} tag={tagFunction} to={i === 1 ? "/" : "/page/" + i}>
          {i}
        </PaginationLink>
      </PaginationItem>
    )
  })

  return [
    <PaginationItem key="prev" disabled={first}>
      <PaginationLink aria-label="navigate to previous page" tag={tagFunction} to={previousUrl}>
        <CaretLeftIcon weight="bold" />
      </PaginationLink>
    </PaginationItem>,

    ...paginationItems,

    <PaginationItem key="next" disabled={last}>
      <PaginationLink aria-label="navigate to next page" tag={tagFunction} to={nextUrl}>
        <CaretRightIcon weight="bold"/>
      </PaginationLink>
    </PaginationItem>,
  ]
}

export default PaginatedNewsList
