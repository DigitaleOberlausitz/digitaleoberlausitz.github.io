import React, { FC, PropsWithChildren } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

import "bootstrap/dist/css/bootstrap.min.css"

import PageHeader from "./page-header"
import PageFooter from "./page-footer"

import "../style/style.css"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={(data) => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: "description", content: data.site.siteMetadata.description },
              {
                name: "keywords",
                content: "digital, oberlausitz, lausitz, verein, informatik, technik",
              },
            ]}
          />

          <PageHeader />

          <div className="container main-content">{children}</div>

          <div className="container">
            <PageFooter />
          </div>
        </>
      )}
    />
  )
}

export default Layout
