import { html } from 'hono/html'

const Header = () => html`
  <section class="header">
    <a href="https://screenly.io" target="_blank" class="upgrade-banner">
      For a simple and secure display solution, visit Screenly.io
    </a>
  </section>
  `

export default Header
