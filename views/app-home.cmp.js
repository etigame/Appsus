import { iconsService } from '../../../services/icons-service.js'

export default {
  template: `
        <section class="home-page">
        <header class="email-header flex justify-between">

        <router-link to="/">
            <img class="img-logo" src="assets/images/koogle.png" alt="logo" />
        </router-link>
            
            <section class="route-btns">
                <router-link to="/email/inbox">
                    <button class="email-btn">
                      <img :src="setSvg('gmailImg')" alt="email-icon" />
                    </button>
                </router-link>
                <router-link to="/keep">
                    <button class="keep-btn">
                      <img :src="setSvg('keepImg')" alt="keep-icon" />
                    </button>
                </router-link>
            </section>
        </header>

        <section className="mail-container">
            <img src="assets/images/mail.jpg" alt="" />
            <h1 class="mail-header">Meet your new Email inbox - Koogle Mail</h1>
            <p class="mail-content">The official Koogle Mail app brings the best to your Android phone or tablet with robust security, real-time notifications, multiple account support, and search that works across all your mail.
            Koogle Mail is part of Koogle Workspace, allowing you and your team to easily connect, create, and collaborate.</p>
            <router-link class="link" to="/email/inbox">
                <button>
                    Try Koogle Mail
                </button>
            </router-link>
        </section>

        <section className="keep-container">
            <h1 class="keep-header">Koogle Keep - Notes and Lists</h1>
            <img src="https://ramiy.github.io/appsPlace/img/notes.png" alt="" />
            <p class="keep-content">Quickly capture what's on your mind and get a reminder later at the right place or time. Speak a voice memo on the go and have it automatically transcribed. Grab a photo of a poster, receipt or document and easily organize or find it later in search. Koogle Keep makes it easy to capture a thought or list for yourself, and share it with friends and family.</p>
            <router-link class="link" to="/keep">
                <button>
                    Try Koogle Keep
                </button>
            </router-link>
        </section>
    </section>
    `,
      methods: {
        setSvg(iconName) {
          return iconsService.getSvg(iconName)
        },
      },
}
