import React from "react"

import { Link } from "gatsby"

const PageFooter = () => (
  <footer className="footer">
    <p>
      &copy; Digitale Oberlausitz e.V. 2018 | <Link to="/impressum">Impressum</Link> |{" "}
      <Link to="/datenschutz">Datenschutz</Link>
    </p>
  </footer>
)

export default PageFooter
