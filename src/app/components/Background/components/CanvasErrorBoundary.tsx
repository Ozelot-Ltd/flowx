'use client';

import React from 'react';

// The 3D background is decorative: if WebGL is unavailable, the chunk fails to
// load or anything inside the Canvas throws, drop it instead of letting the
// error unmount the whole page.
export default class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('3D background failed, rendering without it:', error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
