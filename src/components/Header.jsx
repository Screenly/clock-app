import { html } from 'hono/html'

const Header = ({ showCTA }) => html`
  <section class="header">
    <a href="https://screenly.io" target="_blank" class="upgrade-banner ${!showCTA ? 'hidden' : ''}">
      For a simple and secure display solution, visit Screenly.io
    </a>
  </section>
  `

export default Header
