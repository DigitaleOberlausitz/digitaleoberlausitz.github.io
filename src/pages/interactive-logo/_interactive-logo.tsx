import React from "react"

import { useMousePosition } from "../../utils/use-mouse-position"
import { useEffect, forwardRef, ForwardedRef, useRef } from "react"

import "./interactive-logo.css"

// distance in px. only distances lower than this are taken into account for scaling
const DISTANCE_THRESHOLD = 70

// the closer the mouse gets to the center of the object, the bigger the object will be.
// however, this results in strange looking behavior when the mouse moves around the center.
// therefore, when the mouse gets close "enough", we will not scale anymore but instead keep the scale factor.
// This value is the radius of a circle around the center. As soon as the mouse hits the outline of this circle,
// the max scale factor will already be applied and inside the circle, no change of scale will happen
const MIN_DISTANCE_THRESHOLD = 15

// value for transform scale(...). 1 is normal size, 2 is double...
const SCALE_MAX = 2

export function InteractiveLogo() {
  const logoRef = useRef<SVGSVGElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    const logoRoot = logoRef.current
    function transformPoint({ x, y }: { x: number; y: number }) {
      if (logoRoot && logoRoot.getScreenCTM()) {
        const pt = new DOMPoint(x, y)
        return pt.matrixTransform(logoRoot.getScreenCTM()!.inverse())
      } else {
        return { x: 0, y: 0 }
      }
    }

    if (logoRoot) {
      const cities = logoRoot.querySelectorAll("[data-city]")
      cities.forEach((cityElement) => {
        if (cityElement instanceof SVGGElement) {
          const boundingBox = cityElement.getBBox()

          const mousePt = transformPoint(mousePosition)

          const centerX = boundingBox.x + boundingBox.width / 2
          const centerY = boundingBox.y + boundingBox.height / 2

          const distance = Math.sqrt(Math.pow(mousePt.x - centerX, 2) + Math.pow(mousePt.y - centerY, 2))

          const isNear = distance < DISTANCE_THRESHOLD

          const cityText = cityElement.querySelector("text") as SVGTextElement
          if (isNear) {
            const normalisedScaleFactor = Math.max(
              1,
              SCALE_MAX - Math.max(distance, MIN_DISTANCE_THRESHOLD) / DISTANCE_THRESHOLD
            )

            cityElement.setAttribute("transform-origin", `${centerX} ${centerY}`)
            cityElement.setAttribute("transform", `scale(${normalisedScaleFactor})`)

            // distance at which the city text starts to become visible, starting with 0.1
            const distanceMin = 70
            // distance at which the city text has its full visibility, 1.0
            const distanceMax = 30

            const opacityFactor =
              Math.round(Math.min(1, Math.max(0.1, (distance - distanceMin) / (distanceMax - distanceMin))) * 10) / 10

            cityText.setAttribute("opacity", opacityFactor.toString())
          } else {
            cityElement.removeAttribute("transform-origin")
            cityElement.removeAttribute("transform")
            cityText.setAttribute("opacity", "0")
          }
        }
      })
    }
  }, [mousePosition, logoRef])

  return <Logo ref={logoRef} />
}

// Generated with https://react-svgr.com/
const Logo = forwardRef((_, ref: ForwardedRef<SVGSVGElement>) => (
  <svg
    ref={ref}
    width="100%"
    height="100%"
    viewBox="0 0 567 567"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeMiterlimit: 10,
    }}
  >
    <g id="landscape">
      <g id="shape">
        <path
          d="M121.656,352.2L314.76,352.2L369.931,452.692C369.931,452.692 430.523,466.486 432.001,466.978C433.478,467.471 487.18,349.708 487.18,349.708L488.947,206.897L470.378,125.062L425.378,109.562L334.464,76.83L260.636,109.36L192.136,108.86L148.749,188.16L91.607,188.653L68.947,290.131L121.656,352.2Z"
          style={{
            fill: "rgb(8,72,165)",
            fillRule: "nonzero",
          }}
        />
      </g>
    </g>
    <g id="text">
      <g>
        <text
          x="116px"
          y="402.5px"
          style={{
            fontFamily: "'SourceSans3-Roman', 'Source Sans 3', sans-serif",
            fontWeight: 200,
            fontSize: 31,
          }}
        >
          {"DIGITALE"}
        </text>
        <text
          x="116px"
          y="439.7px"
          style={{
            fontFamily: "'SourceSans3-Roman', 'Source Sans 3', sans-serif",
            fontWeight: 200,
            fontSize: 31,
          }}
        >
          {"OBERLAUSITZ"}
        </text>
      </g>
    </g>
    <g id="conducting-paths">
      <g>
        <path d="M450.969,276.85L451.202,230.011L437.722,230.052" />
      </g>
      <g>
        <path d="M470.092,276.678L470.015,198.648L456.968,182.986L447.259,171.272L220.196,171.135" />
      </g>
      <g>
        <path d="M423.815,211.336L423.891,185.092L221.943,184.549" />
      </g>
      <g>
        <path d="M167.007,233.934L167.301,185.286C167.301,185.286 181.415,170.97 181.306,171.281L194.856,171.191" />
      </g>
      <g>
        <path d="M167.522,275.357L167.63,289.616L181.51,304.963L234.784,304.812" />
      </g>
      <g>
        <path d="M469.481,317.058L469.481,347.995L437.161,418.507L426.204,418.507" />
      </g>
      <g>
        <path d="M181.301,244.197L342.473,245.391L359.488,262.766L360.027,326.903" />
      </g>
      <g>
        <path d="M400.034,412.225L399.876,347.994L386.663,347.994" />
      </g>
      <g>
        <path d="M414.055,410.608L414.376,239.718" />
      </g>
      <g>
        <path d="M372.162,321.247L372.484,229.407L410.103,229.839" />
      </g>
      <g>
        <path d="M451.113,316.414L450.791,334.137" />
      </g>
      <g>
        <path d="M346.705,332.848L314.158,332.848" />
      </g>
      <g>
        <path d="M274.954,305.034L322.859,304.812" />
      </g>
      <g>
        <path d="M274.954,289.37L300.945,289.344" />
      </g>
      <g>
        <path d="M208.138,157.546L208.138,140.144" />
      </g>
      <g>
        <path d="M387.365,424.417L375.651,424.417L375.509,397.775" />
      </g>
      <g>
        <path d="M153.403,244.552L110.301,244.73" />
      </g>
      <g>
        <path d="M153.403,260.342L128.221,260.342" />
      </g>
      <g>
        <path d="M459.094,340.762C459.094,336.004 455.231,332.141 450.473,332.141C445.715,332.141 441.852,336.004 441.852,340.762C441.852,345.52 445.715,349.383 450.473,349.383C455.231,349.383 459.094,345.52 459.094,340.762Z" />
      </g>
      <g>
        <path d="M384.094,390.762C384.094,386.004 380.231,382.141 375.473,382.141C370.715,382.141 366.852,386.004 366.852,390.762C366.852,395.52 370.715,399.383 375.473,399.383C380.231,399.383 384.094,395.52 384.094,390.762Z" />
      </g>
      <g>
        <path d="M314.79,332.609C314.79,327.851 310.927,323.988 306.169,323.988C301.411,323.988 297.548,327.851 297.548,332.609C297.548,337.367 301.411,341.23 306.169,341.23C310.927,341.23 314.79,337.367 314.79,332.609Z" />
      </g>
      <g>
        <path d="M340.094,304.762C340.094,300.004 336.231,296.141 331.473,296.141C326.715,296.141 322.852,300.004 322.852,304.762C322.852,309.52 326.715,313.383 331.473,313.383C336.231,313.383 340.094,309.52 340.094,304.762Z" />
      </g>
      <g>
        <path d="M317.658,289.581C317.658,284.823 313.795,280.96 309.037,280.96C304.279,280.96 300.416,284.823 300.416,289.581C300.416,294.339 304.279,298.202 309.037,298.202C313.795,298.202 317.658,294.339 317.658,289.581Z" />
      </g>
      <g>
        <path d="M128.886,260.547C128.886,255.789 125.023,251.926 120.265,251.926C115.507,251.926 111.644,255.789 111.644,260.547C111.644,265.305 115.507,269.168 120.265,269.168C125.023,269.168 128.886,265.305 128.886,260.547Z" />
      </g>
      <g>
        <path d="M110.301,244.73C110.301,239.972 106.438,236.109 101.68,236.109C96.922,236.109 93.059,239.972 93.059,244.73C93.059,249.488 96.922,253.351 101.68,253.351C106.438,253.351 110.301,249.488 110.301,244.73Z" />
      </g>
      <g>
        <path d="M216.759,133.192C216.759,128.434 212.896,124.571 208.138,124.571C203.38,124.571 199.517,128.434 199.517,133.192C199.517,137.95 203.38,141.813 208.138,141.813C212.896,141.813 216.759,137.95 216.759,133.192Z" />
      </g>
      <g>
        <path d="M409.12,215.742L359.723,215.47" />
      </g>
      <g>
        <path d="M359.714,215.518C359.714,210.76 355.851,206.897 351.093,206.897C346.335,206.897 342.472,210.76 342.472,215.518C342.472,220.276 346.335,224.139 351.093,224.139C355.851,224.139 359.714,220.276 359.714,215.518Z" />
      </g>
    </g>
    <g id="cities">
      <a href="https://de.wikipedia.org/wiki/Hoyerswerda" target="_blank">
        <g data-city="hoyerswerda">
          <rect x={194} y={157.5} width={31.995} height={35.617} />
          <text
            x={196}
            y={173}
            opacity="0"
            style={{
              fontSize: 7,
            }}
          >
            <tspan>Hoyers-</tspan>
            <tspan x="196" dy="1.3em">
              werda
            </tspan>
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/Bautzen" target="_blank">
        <g data-city="bautzen">
          <rect x={234.5} y={276} width={41} height={41.5} />
          <text
            x={238}
            y={300}
            style={{
              fontSize: 9,
            }}
          >
            {"Bautzen"}
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/Zittau" target="_blank">
        <g data-city="zittau">
          <rect x={386.5} y={410} width={41} height={29.835} />
          <text
            x={390}
            y={428}
            style={{
              fontSize: 10,
            }}
          >
            {"Zittau"}
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/G%C3%B6rlitz" target="_blank">
        <g data-city="goerlitz">
          <rect x={438} y={275.75} width={41} height={41.5} />
          <text
            x={442}
            y={300}
            style={{
              fontSize: 10,
            }}
          >
            {"G\xF6rlitz"}
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/L%C3%B6bau" target="_blank">
        <g data-city="loebau">
          <rect x={346} y={321.25} width={41} height={36.111} />
          <text
            x={350}
            y={342}
            style={{
              fontSize: 10,
            }}
          >
            {"L\xF6bau"}
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/Niesky" target="_blank">
        <g data-city="niesky">
          <path
            d="M438,240.732L406.999,240.564L407,210.421L438,210.59L438,240.732Z"
            style={{
              fillRule: "nonzero",
            }}
          />
          <text
            x={410}
            y={228}
            style={{
              fontSize: 8,
            }}
          >
            {"Niesky"}
          </text>
        </g>
      </a>
      <a href="https://de.wikipedia.org/wiki/Kamenz" target="_blank">
        <g data-city="kamenz">
          <path
            d="M185.125,275.443L152.714,275.443L152.803,233.943L185.214,233.943L185.125,275.443Z"
            style={{
              fillRule: "nonzero",
            }}
          />
          <text
            x={155}
            y={257}
            style={{
              fontSize: 7,
            }}
          >
            {"Kamenz"}
          </text>
        </g>
      </a>
    </g>
  </svg>
))
