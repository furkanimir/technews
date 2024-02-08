/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        // domains:[
        //     'images.pexels.com'
        // ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname:'images.pexels.com',
              pathname: '**',
            },
            {
                protocol: 'https',
                hostname:'avatars.githubusercontent.com',
                pathname: '**',
              },
        ],
    },
}


module.exports = nextConfig
