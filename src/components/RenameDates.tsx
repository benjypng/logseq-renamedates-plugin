import './rename-pages.css'

import { format, parse } from 'date-fns'
import { useCallback } from 'react'

interface RenameDatesProps {
  preferredDateFormat: string
  oldDateFormat: string
  pagesToRename: string[]
}

const RenameDates = ({
  preferredDateFormat,
  oldDateFormat,
  pagesToRename,
}: RenameDatesProps) => {
  const convertDateFormat = useCallback(
    async (date: string, preferredDateFormat: string) => {
      const parsedDate = parse(date, oldDateFormat, new Date())
      return format(parsedDate, preferredDateFormat)
    },
    [oldDateFormat],
  )

  const renamePages = () => {
    pagesToRename.forEach(async (page) => {
      const newName = await convertDateFormat(page, preferredDateFormat)
      await logseq.Editor.renamePage(page, newName)
    })
    logseq.hideMainUI()
  }

  return (
    <div id="renamepages-menu">
      <div className="info-section">
        <h1>Rename Dates</h1>
        <p>Current preferred date format: {preferredDateFormat} </p>
        <p>Old date format: {oldDateFormat}</p>
        <p>Total number of pages to rename: {pagesToRename.length}</p>
        <button
          onClick={renamePages}
          className="rename-pages"
          disabled={pagesToRename.length == 0}
        >
          Rename (pages will be merged)
        </button>
      </div>

      {pagesToRename.length > 0 && (
        <div className="pages-to-rename-list">
          <ul>
            {pagesToRename.map((page, index) => (
              <li key={index}>
                <span>{page}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RenameDates
