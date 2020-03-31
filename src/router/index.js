import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/homepage/Index'
import Departments from '@/components/management/Departments'
import NewDepartment from '@/components/action/NewDepartment'
import EditDepartment from '@/components/action/EditDepartment'

import Positions from '@/components/management/Positions'
import NewPosition from '@/components/action/NewPosition'
import EditPosition from '@/components/action/EditPosition'

import Employees from '@/components/management/Employees'
import NewEmployee from '@/components/action/NewEmployee'
import EditEmployee from '@/components/action/EditEmployee'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/department',
      name: 'Department',
      component: Departments
    },
    {
      path: '/new-department',
      name: 'NewDepartment',
      component: NewDepartment
    },
    {
      path: '/edit-dept/:department_id',
      name: 'EditDepartment',
      component: EditDepartment
    },
    {
      path: '/employee',
      name: 'Employee',
      component: Employees
    },
    {
      path: '/new-employee',
      name: 'NewEmployee',
      component: NewEmployee
    },
    {
      path: '/edit-employee/:employee_id',
      name: 'EditEmployee',
      component: EditEmployee
    },
    {
      path: '/position',
      name: 'Position',
      component: Positions
    },
    {
      path: '/new-position',
      name: 'NewPosition',
      component: NewPosition
    },
    {
      path: '/edit-position/:position_id',
      name: 'EditPosition',
      component: EditPosition
    }
  ]
})
