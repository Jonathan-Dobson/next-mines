// TODO FIX ALL ANY TYPES

export default function handleClicks(left: (e: any) => void, right: (e: any) => void) {
  return {
    onClick: (e: any) => {
      left(e)
    },
    onRightClick: (e: any) => {
      e.preventDefault()
      right(e)
    }
  }
}