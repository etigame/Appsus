import { emailService } from '../services/email-service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailDetails from './email-details.cmp.js'
import emailCompose from './email-compose.cmp.js'

export default {
  template: `
    <section class="email-app">
        <email-filter @filter="setFilter"/>
        <router-link to="/email/compose">
            <email-compose />
        </router-link>
        <email-folder-list />
        <email-list 
            @selected="selectEmail" 
            @remove="removeEmail" 
            :emails="emails"/>
        <email-details 
            :email="selectedEmail"
            @close="selectedEmail = null" 
            v-if="selectedEmail" />
    </section>
    `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
    //   filterBy: {
    //     vendor: '',
    //     minSpeed: 0,
    //   },
    }
  },
  created() {
    emailService.query().then((emails) => {
      this.emails = emails
    })
  },
  methods: {
    selectEmail(emailId) {
        emailService.get(emailId).then((email) => (this.selectedEmail = email))
      },
  //     removeCar(carId){
  //         emailService.remove(carId)
  //             .then(() => {
  //                 const idx = this.cars.findIndex(car => car.id === carId)
  //                 this.cars.splice(idx, 1)
  //                 showSuccessMsg(`Car ${carId} deleted`)
  //             })
  //             .catch(err =>{
  //                 console.log('OOPS', err)
  //                 showErrorMsg('Cannot remove car')
  //             })

  //     },
  //     setFilter(filterBy){
  //         this.filterBy = filterBy
  //     }
  },
  // computed: {
  //     carsToShow(){
  //         const regex = new RegExp(this.filterBy.vendor, 'i')
  //         var cars = this.cars.filter(car => regex.test(car.vendor))
  //         cars = cars.filter(car => car.maxSpeed > this.filterBy.minSpeed)
  //         return cars

  //     }
  // },
  components: {
      emailFilter,
      emailList,
      emailFolderList,
      emailDetails,
      emailCompose
  }
}
