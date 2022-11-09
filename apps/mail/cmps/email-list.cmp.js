import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
        <section class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails" :key="email.id">
                    <email-preview :email="email"/>
                    <!-- <section class="actions">
                        <router-link :to="'/car/' + car.id">Details</router-link> |
                        <router-link :to="'/car/edit/' + car.id">Edit</router-link> |
                        <button @click="remove(car.id)">x</button>
                    </section> -->
                </li>
            </ul>
        </section>
    `,
    methods: {
        // remove(carId){
        //     this.$emit('remove', carId)
        // },
    },
    components: {
        emailPreview,
    }
}