import { createDate } from "./create-ical"
import { DateTime } from "luxon"

describe("Create ICAL", () => {
  describe("createDate", () => {
    it("creates correct date", () => {
      const dateString = "2019-03-01"
      const timeString = "19:23"

      const date = createDate(dateString, timeString)

      expect(date.toFormat("yyyy-MM-dd HH:mm:ss")).toBe("2019-03-01 18:23:00") // notice difference due to timezones
    })
  })
})
