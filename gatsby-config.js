const path = require("path");

const config = {
  siteMetadata: {
    title: "Digitale Oberlausitz e. V.",
    description: "Website des Vereins Digitale Oberlausitz e. V.",
    siteUrl: "https://digitale-oberlausitz.eu",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "news",
        path: path.resolve("content/news"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "events",
        path: path.resolve("content/events"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: path.resolve("content/pages"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.resolve("content/images"),
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              showCaptions: true,
            },
          },
          {
            resolve: "gatsby-remark-autolink-headers"
          }
        ],
      },
    },
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-source-atom",
      options: {
        source: "https://www.jug-gr.de/atom.xml",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["webp", "auto"],
          quality: 90,
        },
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.ts",
        omitGoogleFont: true
      },
    },
  ],
}

module.exports = config;
