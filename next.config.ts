import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(frag|vert|glsl)$/,
      type: 'asset/source',
      use: ['raw-loader', 'glslify-loader'],
    });

    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/models/[hash][ext]',
      },
    });
    return config;
  },
};

export default nextConfig;
