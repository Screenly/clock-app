import { html } from 'hono/html'

const Footer = () => html`
  <section class="footer">
    <div class="date-time">
      <div class="date">
        <img src="/static/images/icons/calendar.svg" alt="calendar icon" />
        <span id="date"></span>
      </div>
      <div id="time">
      </div>
    </div>
  </section>
  `

export default Footer
