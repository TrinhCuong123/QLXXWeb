/** ***'
 *
 *   Format number with numeraljs
 */

import numeral from 'numeral';

export function useNumeral() {
  if (!numeral.locales.vi) {
    numeral.register('locale', 'vi', {
      delimiters: {
        thousands: '.',
        decimal: ',',
      },
      abbreviations: {
        thousand: 'k',
        million: 'tr',
        billion: 'tỷ',
        trillion: 'nghìn tỷ',
      },
      currency: {
        symbol: '₫',
      },
    });
  }

  numeral.locale('vi');
  /***
   *
   *    PHân cách phần nghìn dùng dấu .
        PHân cách phần lẻ dùng dấu ,
        làm tròn 2 số cuối
   */
  function formatNumber(number: number): string {
    const formatted = numeral(number).format('0.0,');
    return formatted.replace(',00', '');
  }
  function formatNumber1(number?: number): string {
    if (number === undefined || number === null) {
      return '-';
    }
    return numeral(number).format('0,0.00');
  }

  return {
    formatNumber, formatNumber1,
  };
}
