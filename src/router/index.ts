import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SettingsView from '../views/SettingsView.vue'
import UserView from '../views/AccountManage/UserView.vue'
import FunctionManage from '../views/ModuleFuntionManage/FunctionManage.vue'
import RoleView from '../views/AccountManage/RoleView.vue'
import ComPortTest from '../views/ComPortTest.vue'
import History from '../views/HistoryData.vue'
import OptionWord from '../views/OptionWord/Index.vue'
import DetailPage from '../views/OptionWord/DetailPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/accountManage/user',
      name: 'UserManage',
      component: UserView
    },
    {
      path: '/accountManage/role',
      name: 'RoleManage',
      component: RoleView
    },
    {
      path: '/accountManage/functionManage',
      name: 'functionManage',
      component: FunctionManage
    },
    {
      path: '/comPortTest',
      name: 'comPortTest',
      component: ComPortTest
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/optionWord',
      name: 'optionWord',
      component: OptionWord
    },
    {
      path: '/optionWordDetail/:id',
      component: DetailPage
    }
  ]
})

export default router
