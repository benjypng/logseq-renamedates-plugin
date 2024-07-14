import '@logseq/libs'

import { isValid, parse } from 'date-fns'
import { createRoot } from 'react-dom/client'

import RenameDates from './components/RenameDates'
import { handlePopup } from './handle-popup'
import { settings } from './settings'

const main = async () => {
  console.log('logseq-renamedates-plugin loaded')

  handlePopup()

  // Check if newly installed
  if (logseq.settings!.oldDateFormat == '') {
    await logseq.UI.showMsg(
      'Set the old date format in the plugin settings',
      'error',
    )
  }
  const root = createRoot(document.querySelector('#app')!)

  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-renamedates-plugin',
    template: `<a class="button" data-on-click="renamePages"><i class="ti ti-tournament"></i></a>`,
  })
  logseq.provideModel({
    async renamePages() {
      if (logseq.settings!.oldDateFormat == '') {
        await logseq.UI.showMsg(
          'Set the old date format in the plugin settings',
          'error',
        )
        return
      }

      // Check how many pages need to be renamed
      const isDateFormat = (date: string) => {
        const parsedDate = parse(
          date,
          logseq.settings!.oldDateFormat,
          new Date(),
        )
        return isValid(parsedDate)
      }
      const query = `[:find ?name
         :where
         [?p :block/name ?name]]`
      let allPages = await logseq.DB.datascriptQuery(query)
      allPages = allPages.map((r: string[]) => r[0])
      const pagesToRename: string[] = allPages.filter((result: string) => {
        if (isDateFormat(result)) return result
      })

      // Render dialog box
      const { preferredDateFormat } = await logseq.App.getUserConfigs()
      root.render(
        <RenameDates
          preferredDateFormat={preferredDateFormat}
          oldDateFormat={logseq.settings!.oldDateFormat}
          pagesToRename={pagesToRename}
        />,
      )

      logseq.showMainUI({ autoFocus: true })
    },
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
