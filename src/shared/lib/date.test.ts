import { dateToMonthWordYear, dateToYearMonthDay } from './date';

describe('date.ts', () => {
  it('Date to yyyy-mm-dd', () => {
    expect(dateToYearMonthDay(new Date('2020-02-01'))).toBe('2020-02-01');
  });

  it('Date to yyyy-mm-dd', () => {
    expect(dateToMonthWordYear(new Date('2020-02-01'))).toBe('February 2020');
  });
});
