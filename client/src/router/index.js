import VueRouter from 'vue-router'
import RumahList from '@/components/RumahList'
import ShowRumah from '@/components/ShowRumah'
import AddRumah from '@/components/AddRumah'
import EditRumah from '@/components/EditRumah'

export default new VueRouter({
    routes: [
      {
        path: '/',
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
      }
    ]
  })