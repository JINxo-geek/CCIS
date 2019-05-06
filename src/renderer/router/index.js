import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '化学品管理',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/putaway',
    component: Layout,
    children: [{
      path: 'index',
      name: 'putaway',
      component: () =>
        import('@/views/putaway/index'),
      meta: {
        title: '入库',
        icon: 'bigput'
      }
    }]
  }, {
    path: '/tiao',
    component: Layout,
    meta: {
      title: '调配',
      icon: 'tiao'
    },
    children: [{
      path: 'tiao',
      name: 'tiao2',
      component: () =>
          import('@/views/tiao/index'),
      meta: {
        title: '初次调配',
        icon: 'tiaochu'
      }
    },
    {
      path: 'tiaodif',
      name: 'tiaodif',
      component: () =>
          import('@/views/tiaodif/index'),
      meta: {
        title: '异库调配',
        icon: 'tiaochu'
      }
    }
    ]
  },
  {
    path: '/shenpi',
    component: Layout,
    meta: {
      title: '审批',
      icon: 'tiao'
    },
    children: [{
      path: 'tiao',
      name: 'tiao2',
      component: () =>
        import('@/views/tiao/index'),
      meta: {
        title: '初次审批',
        icon: 'tiaochu'
      }
    },
    {
      path: 'tiaodif',
      name: 'tiaodif',
      component: () =>
        import('@/views/tiaodif/index'),
      meta: {
        title: '异库审批',
        icon: 'tiaochu'
      }
    }
    ]
  },
  {
    path: '/dist',
    component: Layout,
    meta: {
      title: '查询',
      icon: 'search+'
    },
    children: [{
      path: 'totalsearch',
      name: 'totalsearch',
      component: () =>
        import('@/views/totalsearch/index'),
      meta: {
        title: '总数查询',
        icon: 'search'
      }
    },
    {
      path: 'disted3',
      name: 'disted3',
      component: () =>
        import('@/views/disted3/index'),
      meta: {
        title: '在库查询',
        icon: 'search'
      }
    },
    {
      path: 'logout',
      name: 'logout',
      component: () =>
          import('@/views/logout/index'),
      meta: {
        title: '已注销查询',
        icon: 'search'
      }
    },{
      path: 'disposition',
      name: 'disposition',
      component: () =>
        import('@/views/disposition/index'),
      meta: {
        title: '已处置查询',
        icon: 'search'
      }
    }
    ]
  },
  {
    path: '/dist',
    component: Layout,
    meta: {
      title: '分库管理',
      icon: 'component'
    },
    children: [{
      path: 'dist',
      name: 'dist',
      component: () =>
        import('@/views/dist/index'),
      meta: {
        title: '领用',
        icon: 'form'
      }
    }, {
        path: 'list',
        name: 'list',
        component: () =>
          import('@/views/list/index'),
        meta: {
          title: '收到的申请',
          icon: 'form'
        }
      },
    {
      path: 'disted2',
      name: 'disted2',
      component: () =>
          import('@/views/disted2/index'),
      meta: {
        title: '库存管理',
        icon: 'admin'
      }
    }
    ]
  },

  {
    path: '/weihu',
    component: Layout,
    meta: {
      title: '系统维护',
      icon: 'component'
    },
    children: [{
      path: 'admin',
      name: 'admin',
      component: () =>
            import('@/views/admin/index'),
      meta: {
        title: '用户管理',
        icon: 'user',
        roles: ['admin']
      }
    },

    {
      path: 'admin3',
      name: 'admin3',
      component: () =>
            import('@/views/admin3/index'),
      meta: {
        title: '库位管理',
        icon: 'canku'
      }
    }
    
    ]
  },
  {
    path: '/admin',
    component: Layout,
    meta: {
      title: '管理',
      icon: 'component'
    },
    children: [{
      path: 'upload',
      name: 'upload',
      component: () =>
        import('@/views/admin/index'),
      meta: {
        title: '批量上传',
        icon: 'user',
        roles: ['admin']
      }
    },

    {
      path: 'zhuxiao',
      name: 'zhuxiao',
      component: () =>
        import('@/views/admin3/index'),
      meta: {
        title: '注销管理',
        icon: 'canku'
      }
      }, {
      path: 'chuzhi',
        name: 'chuzhi',
        component: () =>
          import('@/views/admin3/index'),
        meta: {
          title: '处置管理',
          icon: 'canku'
        }
      }

    ]
  },
  /* {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/warehouse',
    component: Layout,
     meta: {
       title: '调配',
       icon: 'example',
       roles: ['admin']
     },
    children: [
      {
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/warehouse/index'),
        meta: {
          title: '总库',
          icon: 'form',
          roles: ['admin']
        }
      },
    {
      path: 'warehouse1',
      name: 'warehouse1',
      component: () =>
        import ('@/views/warehouse1/index'),
      meta: {
        title: '分库1',
        icon: 'form'
      }
    },
    {
      path: 'warehouse2',
      name: 'warehouse2',
      component: () =>
        import ('@/views/warehouse2/index'),
      meta: {
        title: '分库2',
        icon: 'form'
      }
    },
    {
      path: 'warehouse3',
      name: 'warehouse3',
      component: () =>
        import ('@/views/warehouse3/index'),
      meta: {
        title: '分库3',
        icon: 'form'
      }
    }
    ]
  },
  {
    path: '/search',
    component: Layout,
    meta: {
      title: '查询',
      icon: 'example'
    },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () =>
          import ('@/views/search/index'),
        meta: {
          title: '总库',
          icon: 'form'
        }
      },
      {
        path: 'search1',
        name: 'warehouse1',
        component: () =>
          import ('@/views/search1/index'),
        meta: {
          title: '分库1',
          icon: 'form'
        }
      },
      {
        path: 'search2',
        name: 'warehouse2',
        component: () =>
          import ('@/views/search2/index'),
        meta: {
          title: '分库2',
          icon: 'form'
        }
      },
      {
        path: 'search3',
        name: 'warehouse3',
        component: () =>
          import ('@/views/search3/index'),
        meta: {
          title: '分库3',
          icon: 'form'
        }
      }
    ]
  }, */

  /*   {
    path: '/test',
    component: Layout,
    children: [{
      path: 'index',
      name: 'test',
      component: () =>
        import ('@/views/test2/index'),
      meta: {
        title: 'test',
        icon: 'form'
      }
    }]
  }, */

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

