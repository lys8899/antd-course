export default {
    singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [{
        path: '/',
        component: 'Main',
        routes: [
            {
                path: '/',
                component: 'Helloworld',
            },
            {
                path: 'helloworld',
                component: 'Helloworld'
            },
            {
                path: 'dashboard',
                routes: [
                    {path: 'analysis', component: 'Dashboard/Analysis'},
                    {path: 'monitor', component: 'Dashboard/Monitor'},
                    {path: 'workplace', component: 'Dashboard/Workplace'}
                ]
            },
            {
                path: 'user',
                routes: [
                    {path: 'userList', component: 'user/UserList'},
                    {path: 'monitor', component: 'Dashboard/Monitor'},
                    {path: 'workplace', component: 'Dashboard/Workplace'}
                ]
            },
            {path: 'puzzlecards', component: 'Puzzlecards'},
        ]
    }, {
        path: 'Mypage1',
        component: 'Mypage1',
    }],
    proxy: {
        '/dev': {
            target: 'http://127.0.0.1:8080/',
            changeOrigin: true,
            pathRewrite: { '^/dev': '' },
        },
    }
};
