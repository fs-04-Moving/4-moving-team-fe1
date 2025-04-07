import dotenv from 'dotenv-webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5050',
        pathname: '/static/**',
        search: '',
      },
    ],
  },
  webpack: (config) => {
    // 작성 2
    // 기존의 웹팩 플러그인에 새로운 Dotenv플러그인을 연결시켜준다.
    // silent는 옵션은 .env파일을 찾지 못했을 때 에러를 일으키지 않도록 설정해주는 옵션이다.
    config.plugins.push(new dotenv({ silent: true }));
    return config;
  },
};

export default nextConfig;
