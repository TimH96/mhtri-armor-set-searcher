const onMouseEnter = (ele: Element) => {
  if (!ele.classList.contains('navbar-selected')) {
    ele.classList.add('navbar-hover')
  }
}

const onMouseLeave = (ele: Element) => {
  ele.classList.remove('navbar-hover')
}

const onClick = (parent: Element, ele: Element) => {
  for (const li of Array.from(parent.children)) {
    li.classList.remove('navbar-selected')
    li.classList.remove('navbar-hover')
  }
  ele.classList.add('navbar-selected')

  const selection = ele.getAttribute('data-selection')
  const panels = document.getElementsByClassName('panel')

  for (const panel of Array.from(panels)) {
    const panelNumber = panel.getAttribute('data-panel-number')
    if (selection === panelNumber) {
      panel.classList.remove('panel-hide')
    } else {
      panel.classList.add('panel-hide')
    }
  }
}

/** initiate navbar state and attaches handlers */
export const initiateNavbar = () => {
  const ul = document.getElementById('navbar-container')!
    .children[0] as HTMLElement

  for (const li of Array.from(ul.children)) {
    li.addEventListener('mouseenter', () => onMouseEnter(li))
    li.addEventListener('mouseleave', () => onMouseLeave(li))
    li.addEventListener('click', () => onClick(ul, li))
  }

  onClick(ul, ul.children[0])
}
