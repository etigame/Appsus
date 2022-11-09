import { emailService } from '../services/email-service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'

export default {
    template: `
    <section class="email-app">
        <car-filter @filter="setFilter"/>
        <router-link to="/car/edit">Add a car</router-link>
        <car-list 
            @remove="removeCar" 
            :cars="carsToShow"/>
    </section>
    `,
    // data(){
    //     return { 
    //         emails: [],
    //         filterBy: {
    //             vendor : '',
    //             minSpeed: 0
    //         },
    //     }
    // },
    // created(){
    //     emailService.query()
    //         .then(emails => {
    //             this.emails = emails
    //             console.log(123);
    //         })
    // },
    // methods: {
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
    // },
    // computed: {
    //     carsToShow(){
    //         const regex = new RegExp(this.filterBy.vendor, 'i')
    //         var cars = this.cars.filter(car => regex.test(car.vendor))
    //         cars = cars.filter(car => car.maxSpeed > this.filterBy.minSpeed)
    //         return cars
            
    //     }
    // },
    // components: {
    //     carFilter,
    //     carList,
    // }
}