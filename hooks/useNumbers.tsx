import React from 'react';

function useNumbers() {
  function formatFiat(value: number | string) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(typeof value === 'string' ? parseFloat(value) : value);
  }
  return { formatFiat };
}

export { useNumbers };
