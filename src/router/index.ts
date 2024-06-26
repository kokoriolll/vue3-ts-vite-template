import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';
import menuLayout from '../layouts/menuLayout/index.vue';

interface routers {
  path: string;
  name: string;
  component: any;
  meta: meta;
  redirect?: string;
  children?: routers[];
}

interface meta {
  title: string;
  icon?: string;
}

export const basicRoutes: any[] = [
  {
    path: '/',
    redirect: '/myFiles',
    component: menuLayout,
    children: [
      {
        path: '/myFiles',
        redirect: '/myFiles/all',
        name: 'myFiles',
        meta: {
          title: '我的文档',
          icon: 'Folder'
        },
        children: [
          {
            path: '/myFiles/all',
            name: 'myAllFiles',
            meta: {
              title: '所有文档',
              icon: 'Files',
              parent: 'myFiles',
              name: 'all'
            },
            component: () => import('../views/myFiles/myFilesList.vue')
          },
          {
            path: '/myFiles/pic',
            name: 'myPicFiles',
            meta: {
              title: '图片',
              icon: 'Picture',
              parent: 'myFiles',
              name: 'pic'
            },
            component: () => import('../views/myFiles/myFilesList.vue')
          },
          {
            path: '/myFiles/videos',
            name: 'myVideosFiles',
            meta: {
              title: '视频',
              icon: 'Film',
              parent: 'myFiles',
              name: 'videos'
            },
            component: () => import('../views/myFiles/myFilesList.vue')
          },
          {
            path: '/myFiles/doc',
            name: 'myDocFiles',
            meta: {
              title: '文档',
              icon: 'Document',
              parent: 'myFiles',
              name: 'doc'
            },
            component: () => import('../views/myFiles/myFilesList.vue')
          },
          {
            path: '/myFiles/other',
            name: 'myOtherFiles',
            meta: {
              title: '其它',
              icon: 'MoreFilled',
              parent: 'myFiles',
              name: 'other'
            },
            component: () => import('../views/myFiles/myFilesList.vue')
          }
        ]
      },
      {
        path: '/recycle',
        name: 'recycle',
        meta: {
          title: '回收站',
          icon: 'Delete'
        },
        component: () => import('../views/recycle/recycle.vue')
      },
      {
        path: '/share',
        name: 'Share',
        meta: {
          title: '我的分享',
          icon: 'Share'
        },
        component: () => import('../views/myShare/myShareList.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        meta: {
          title: '通讯录',
          icon: 'Notebook'
        }
      }
    ]
  }
];

const defaultRoutes: any[] = [];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...basicRoutes, ...defaultRoutes]
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
