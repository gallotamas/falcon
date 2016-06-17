import { FalconPage } from './app.po';

describe('falcon App', function() {
  let page: FalconPage;

  beforeEach(() => {
    page = new FalconPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
