function createHeader() {
  const container = document.getElementsByClassName('swagger-container')[0]
  const topbar = document.getElementsByClassName('topbar')[0]

  const navbar = document.createElement('div')
  navbar.innerHTML = `
    <nav class="navbar bg-body-tertiary p-3">
    <div class="container">
      <div class="div d-flex flex-row align-items-center">
        <a class="navbar-brand" href="https://github.com/danny1998cuba" target="_blank">
          <img src="/images/logo.svg" alt="logo" width="100">
        </a>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link text-dark" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="/about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="/contact">Contact</a>
          </li>
        </ul>

      </div>

      <a class="btn btn-outline-success me-2 px-4 py-2 disabled" type="button" href="/docs">API Docs</a>
    </div>
  </nav>`

  container.replaceChild(navbar, topbar)
}

function container() {
  const container = document.getElementsByClassName('swagger-ui')[1]
  container.classList.add('container')

}

function createFooter() {
  const container = document.getElementsByClassName('swagger-container')[0]

  const footer = document.createElement('div')
  footer.classList.add('container')
  footer.innerHTML = `
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-muted">
      <img src="/images/favicon.ico" alt="" width="30">
      ©
      <script>document.write(new Date().getFullYear())</script> - <span
        style="font-family: 'Gugi', cursive;">d98c_sw</span>
    </p>

    <a href="/"
      class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">

    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="/docs" class="nav-link px-2 text-muted pe-none">Docs</a></li>
      <li class="nav-item"><a href="/about" class="nav-link px-2 text-muted">About</a></li>
      <li class="nav-item"><a href="/contact" class="nav-link px-2 text-muted">Contact</a></li>
    </ul>
  </footer>`

  container.appendChild(footer)
}

window.addEventListener('load', () => {
  const bootstrap = document.createElement('link')
  bootstrap.href = `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css`
  bootstrap.rel = 'stylesheet'
  bootstrap.integrity = 'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD'
  bootstrap.crossOrigin = 'anonymous'
  document.head.appendChild(bootstrap)

  const bootstrap_script = document.createElement('script')
  bootstrap_script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js'
  bootstrap_script.integrity = 'sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN'
  bootstrap_script.crossOrigin = 'anonymous'
  document.body.appendChild(bootstrap_script)

  createHeader()
  container()
  createFooter()
})