module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/neolaia-usr/create',
            handler: 'custom-neolaia-user.create',
            config: {
                auth: false,
            }
        },
        {
            method: 'POST',
            path: '/neolaia-usr/active',
            handler: 'custom-neolaia-user.active',
            config: {
                auth: false,
            }
        },
         {
            method: 'GET',
            path: '/neolaia-usr/',
            handler: 'custom-neolaia-user.find',
            config: {
                auth: false,
            }
        } 

    ]
}