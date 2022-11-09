import DataInput from '../../searcher/models/DataInput'

const searchLogic = (data: DataInput) => {
  // TODO
}

const resetLogic = () => {
  // TODO
}

export const attachControlListeners = (data: DataInput) => {
  const searchBtn = document.getElementById('search-btn') as HTMLButtonElement
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement

  searchBtn.addEventListener('click', () => {
    searchLogic(data)
  })
  resetBtn.addEventListener('click', () => {
    resetLogic()
  })
}
