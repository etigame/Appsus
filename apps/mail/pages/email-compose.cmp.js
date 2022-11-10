import { emailService } from '../services/email-service.js'
import { iconsService } from '../../../services/icons-service.js'
import { eventBus, showErrorMsg, showSuccessMsg, } from '../../../services/event-bus.service.js'

export default {
  template: `
    <section className="email-compose flex flex-column">
        <div class="header flex justify-between">
            <p>New Message</p>
            <button>
                <img :src="setSvg('close')" />
            </button>
        </div>
        <div class="content-container">
            <form @submit.prevent="save" class="flex flex-column">
                <input 
                    ref="recipients" 
                    type="text" 
                    v-model="emailToEdit.to" 
                    placeholder="Recipients">
                <input 
                    v-model="emailToEdit.subject"
                    placeholder="Subject">
                <textarea v-model="emailToEdit.body" cols="30" rows="10"></textarea> 
                <div class="footer flex justify-between">
                    <button>Send</button>
                    <button>
                        <img :src="setSvg('trash')" alt="trash-icon" />
                    </button>
                </div>
            </form>
        </div>
    </section>
    `,
  data() {
    return {
        emailToEdit: emailService.getEmptyEmail()
    }
  },
  mounted() {
    this.$refs.recipients.focus()
  },
  methods: {
    setSvg(iconName) {
      return iconsService.getSvg(iconName)
    },
    save(){
        emailService.save(this.emailToEdit)
            .then(email => {
                showSuccessMsg(`Message to ${email.to} sent`)
                this.$router.push('/email')
                this.$emit('addEmail', email)
            })
            .catch(err => {
                console.log('OOps:', err)
                showErrorMsg(`Message failed`)
            })
    }
  },
}
