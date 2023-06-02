import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', 
      component: '@/layout/index',
      routes: [
        { path: '/', component: '@/pages/index'},
        { path: '/subA', component: '@/pages/subA/index'},
        { path: '/subB', component: '@/pages/subB/index'},
      ]
    },
  ],
  fastRefresh: {},
  qiankun: {
    master: {
      apps: [
        {
          name: 'subA',
          entry: 'http://localhost:8008'
        },
        {
          name: 'subB',
          entry: 'http://localhost:8009'
        },
      ]
    }
  },
  devServer: {
    port: 8007
  }
});
