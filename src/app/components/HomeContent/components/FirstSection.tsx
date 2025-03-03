import React from 'react';
import SectionContainer from './SectionContainer';
import { HomeDocument } from '../../../../../prismicio-types';

export default function FirstSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  return <SectionContainer id={id}>FirstSection</SectionContainer>;
}
