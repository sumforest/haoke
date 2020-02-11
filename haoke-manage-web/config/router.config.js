export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [

      { path: '/', redirect: '/dashboard/analysis' },

      { //房源管理
        path: '/house',
        name: 'house',
        icon: 'home',
        routes: [
          {
            path: '/house/resource',
            name: 'resource',
            component: './haoke/House/Resource'
          },
          {
            path: '/house/addResource',
            name: 'addResource',
            component: './haoke/House/AddResource'
          },
          {
            path: '/house/kanfang',
            name: 'kanfang',
            component: './haoke/House/KanFang'
          },
          {
            path: '/house/zufang',
            name: 'zufang',
            component: './haoke/House/ZuFang'
          }
        ]
      },

      { //房东管理
        path: '/fangdong',
        name: 'fangdong',
        icon: 'key',
        routes: [
          {
            path: '/fangdong/list',
            name: 'list',
            component: './haoke/FangDong/List'
          }
        ]
      },

      { //用户管理
        path: '/users',
        name: 'users',
        icon: 'user',
        routes: [
          {
            path: '/users/list',
            name: 'list',
            component: './haoke/Users/List'
          }
        ]
      },

      { //合约管理
        path: '/heyue',
        name: 'heyue',
        icon: 'file-text',
        routes: [
          {
            path: '/heyue/list',
            name: 'list',
            component: './haoke/HeYue/List'
          }
        ]
      },

      { //资讯管理
        path: '/news',
        name: 'news',
        icon: 'message',
        routes: [
          {
            path: '/news/list',
            name: 'list',
            component: './haoke/News/List'
          }
        ]
      },

      { //问答管理
        path: '/qa',
        name: 'qa',
        icon: 'question-circle',
        routes: [
          {
            path: '/news/list',
            name: 'list',
            component: './haoke/News/List'
          }
        ]
      },

      { //财务管理
        path: '/finance',
        name: 'finance',
        icon: 'money-collect',
        routes: [
          {
            path: '/finance/bill',
            name: 'bill',
            component: './haoke/Finance/Bill'
          },
          {
            path: '/finance/tixian',
            name: 'tixian',
            component: './haoke/Finance/TiXian'
          }
        ]
      },

      { //系统管理
        path: '/system',
        name: 'system',
        icon: 'laptop',
        routes: [
          {
            path: '/system/interface',
            name: 'interface',
            component: './haoke/System/Interface'
          },
          {
            path: '/system/dict',
            name: 'dict',
            component: './haoke/System/Dict'
          },
          {
            path: '/system/contract',
            name: 'contract',
            component: './haoke/System/Contract'
          }
        ]
      },

      // dashboard
      { path: '/dashboard', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        hideChildrenInMenu: false,
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
