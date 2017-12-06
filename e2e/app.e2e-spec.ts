import { AnnexAppPage } from './app.po';

describe('annex-app App', function() {
  let page: AnnexAppPage;

  beforeEach(() => {
    page = new AnnexAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
