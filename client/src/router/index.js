import VueRouter from 'vue-router'
import RumahList from '@/components/RumahList'
import ShowRumah from '@/components/ShowRumah'
import AddRumah from '@/components/AddRumah'
import EditRumah from '@/components/EditRumah'
import Map from '@/components/Map'
import Form from '@/components/RumahForm'
import FrontPage from '@/components/FrontPage'

export default new VueRouter({
    routes: [
      {
        path: '/',
        name: 'Front',
        component: FrontPage
      },
      {
        path: '/list',
        name: 'RumahList',
        component: RumahList
      },
      {
        path: '/show-rumah/:id',
        name: 'ShowRumah',
        component: ShowRumah
      },
      {
        path: '/add-rumah',
        name: 'AddRumah',
        component: AddRumah
      },
      {
        path: '/edit-rumah/:id',
        name: 'EditRumah',
        component: EditRumah
      },
      {
        path: '/form',
        name: 'Form',
        component: Form
      },
      {
        path: '/map',
        name: 'Map',
        component: Map
      }
    ]
  })