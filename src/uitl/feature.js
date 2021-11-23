import than from '@/main'

export default {
  // 弹出提示
  danwindow(value, type) {
    const a = document.createElement('div')
    const b = document.createElement('span')
    a.className = ' dohuan huanda'
    b.className = `font ${type ? 'red' : ''}`
    b.innerText = `${type ? '' : ''}`
    a.innerText = value
    a.appendChild(b)
    document.body.appendChild(a)
    let d = setTimeout(() => {
      document.body.removeChild(a)
      clearTimeout(d)
      d = null
    }, 2000)
  },
  reques(type) {
    switch (type) {
      case 0:
        than.hotp(than, than.$route.query.id, 'music')
        break
      case 2:
        than.hotp(than, than.$route.query.id, 'playlist')
        break
    }
  }
}
