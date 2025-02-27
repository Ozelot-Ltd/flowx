'use client';

import React from 'react';

import { HomeDocument } from '../../../../prismicio-types';

export default function HomeContent({ page }: { page: HomeDocument }) {
  console.log(page);
  return <div>HomeContent</div>;
}
