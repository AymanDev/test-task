import { useEffect } from 'react';

// eslint-disable-next-line
export const useMountEffect = (fn: () => any) => useEffect(fn, []);
