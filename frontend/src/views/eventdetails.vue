<!-- This component allows a user to update a specific event's information. -->
<template>
  <Dialog :state="state" :msg1="msg1" @Dialog-buttons="closeBox($event)"></Dialog>
  <main>
    <div>
      <!--Header-->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Event Details
      </h1>
    </div>
    <div class="px-10 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Event Details</h2>
        <!-- Event Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Event Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="event.name" />
            <span v-if="v$.event.name.$error" class="text-red-500">
              Event Name is required
            </span>
          </label>
        </div>

        <!-- Date input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Date</span>
            <span style="color: #ff0000">*</span>
            <input type="date"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="event.date" />
            <span v-if="v$.event.date.$error" class="text-red-500">
              <span v-if="v$.event.date.required.$invalid">
                Event Date is required
              </span>
              <span v-else-if="!v$.event.date.required.$invalid && v$.event.date.validDate.$invalid">
                Event Date must be a valid date
              </span>
            </span>
          </label>
        </div>

        <div></div>
        <div></div>
        <!-- Description input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Description</span>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="2" v-model="event.description"></textarea>
          </label>
        </div>
      </div>

      <!-- Services Offered at Event checkboxes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-10">
        <h2 class="text-2xl font-bold">Services Offered at Event</h2>
        <div class="flex flex-col grid-cols-3">
          <div>
            <ul v-if="services.length" class="space-y-2">
              <li v-for="service in services" :key="service._id" :data-service-id="service._id"
                class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative">
                <label class="block w-full h-full">
                  <input type="checkbox" :id="service._id" :value="service._id"
                    :checked="event.services.includes(service._id)" v-model="event.services"
                    :disabled="service.status === 'Inactive'"
                    class="rounded border-gray-300 disabled:opacity-50 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2">
                  <span class="font-medium">{{ service.name }}</span>
                </label>
              </li>
            </ul>
            <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
            <p v-else class="text-gray-600">No Active Services Available</p>
          </div>
        </div>
      </div>

      <!-- grid container -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Address</h2>
        <!-- Address 1 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.line1" />
          </label>
        </div>
        <!-- Address 2 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.line2" />
          </label>
        </div>
        <!-- City input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.city" />
          </label>
        </div>
        <div></div>
        <!-- County input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.county" />
          </label>
        </div>
        <!-- Zip Code input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="event.address.zip" />
          </label>
        </div>
      </div>

      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <!--Update Event button-->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitEventUpdate" type="submit" class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Update Event
          </button>
        </div>
        <!--Delete Event button-->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitDeleteEvent" type="submit" class="bg-red-700  disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Delete Event
          </button>
          <!--Go back button-->
        </div>
        <div class="flex justify-between mt-10 mr-20">
          <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click=this.$router.back()>
            Go back
          </button>
        </div>
      </div>

      <hr class="mt-10 mb-10" />

      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div>
          <h2 class="text-2xl font-bold">List of Attendees</h2>
          <h3 class="italic">Click table row to view client details</h3>
        </div>
        <!--Table showing the list of attendees for the selected event-->
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">City</th>
                <th class="p-4 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr @click="$router.push({name: 'clientdetails', params: { id: client._id } })" 
              v-for="client in clients" :key="client._id" class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === client._id }" @mouseenter="hoverId = client._id"
                @mouseleave="hoverId = null">
                <td class="p-2 text-left">
                  {{ client.firstName + ' ' + client.lastName }}
                </td>
                <td class="p-2 text-left">{{ client.address.city }}</td>
                <td class="p-2 text-left">
                  {{ client.phoneNumber.primary }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
//import vuelidate functionalities
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoggedInUserStore } from "../store/loggedInUser";
import {getEventById, getEventAttendees, getServices, updateEvent, deleteEvent, deleteClientbyId} from '../api/api'
import { useToast } from 'vue-toastification'
import Dialog from '@/components/Dialog.vue'

//Notifications
const toast = useToast()

export default {
  components: {Dialog},
  data() {
    return {
      //variable to hold clients for selected event
      clients: [],
      //variable to hold services for selected event
      services: [],
      //variable to hold event information
      event: {
        name: null,
        description: null,
        date: null,
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null
        },
        attendees: [],
        services: []
      },
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
      state:false,
      msg1: 'Are you sure you want to delete this event',
      dialog_decision: null
    }
  },
  setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore();
    return { v$, user };
  },
  validations() {
    // validations
    const validDate = (value) => {
      const date = new Date(value)
      return !isNaN(date)
    }

    return {
      event: {
        name: { required },
        date: {
          required,
          validDate
        },
      }
    }
  },
  async mounted() {
    // when component is mounted, data is loaded
    try {
      const [eventResponse, clientsResponse, servicesResponse] = await Promise.all([
        getEventById(this.$route.params.id),
        getEventAttendees(this.$route.params.id),
        getServices(),
        // Sprint 2 To improve the data loading for these calls we will combine the first two calls into one call.
        //This new call will make a request to our new singular api route in the api.js file that will send a request to the backend
        //routes js files. We will add a route so that it will return all the same code that getEventById and getEventsAttendees
        //would normally but package it into an array with objects inside corresponding to getEventById and getEventsAttendees
        //For now we will leave getServices as its own call since it is a get request that takes no parms and we are unsure
        //of the complexity of combining it with api calls that do take parms
        //An example would look like this
        //try{
        //const [response] = await Promise.all([newCall(this.$route.parms.id)])
        //getServices()])
      ]);

      eventResponse.date = new Date(eventResponse.date).toISOString().substring(0, 10);

      this.event = eventResponse;
      this.clients = clientsResponse;
      this.services = servicesResponse;
      // this.event = response[0];
      // this.clients = response[1];
      // this.services = servicesResponse;

     // this.inactiveServices = servicesResponse.filter(item => item.status === "Inactive")

    } catch (error) {
      toast.error('error loading data', error)
    }
  },
  methods: {
    // method called when user attempts to update the event -> asks for confirmation
    async submitEventUpdate() {
      // Trigger validation
      this.v$.$validate();

      if (this.v$.$error) {
        // Form is invalid, do not proceed
        return;
      }

      try {
        const response = await updateEvent(this.$route.params.id, this.event);
        toast.success(response)
        this.$router.push('/findevents')
      } catch (error) {
        toast.error('error updating event', error)
      }
    },

    // method to make the API call to delete the event - can only be deleted if no attendees are in event
    async submitDeleteEvent() {
      this.flipState()
    },
    flipState(){
      this.state = true
    },
    closeBox(data){
      this.state = data.close
      this.dialog_decision = data.choice
    },
  },
  watch: {
    dialog_decision: async function (value) {
      if (value) {
        try {
          if (this.event.attendees != 0) {
            toast.info('Event can not be deleted since it has attendees.')
            return
          }
          const response = await deleteEvent(this.$route.params.id);
          toast.success(response)
          this.$router.push('/findevents')
        } catch (error) {
          toast.error(error)
        }
      }
    }
  }
}
</script>
