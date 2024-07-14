export const handlePopup = () => {
  //ESC
  document.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        logseq.hideMainUI({ restoreEditingCursor: true })
      }
      e.stopPropagation()
    },
    false,
  )
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('body')) {
      logseq.hideMainUI({ restoreEditingCursor: true })
    }
    e.stopPropagation()
  })
}
