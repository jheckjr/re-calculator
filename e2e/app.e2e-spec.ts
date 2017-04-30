import { ReCalculatorPage } from './app.po';

describe('re-calculator App', () => {
  let page: ReCalculatorPage;

  beforeEach(() => {
    page = new ReCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
