import { iconsService } from '../../../services/icons-service.js'

export default {
    template: `
    <section className="email-compose">
        <h1>email compose</h1>
        <img :src="setSvg('compose')" alt="compose-icon" />
    </section>
    `,
    methods: {
        setSvg(iconName) { 
        return iconsService.getSvg(iconName)
        }
    }

}