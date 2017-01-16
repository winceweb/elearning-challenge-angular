import { ElearningChallengeAngularPage } from './app.po';

describe('elearning-challenge-angular App', function() {
  let page: ElearningChallengeAngularPage;

  beforeEach(() => {
    page = new ElearningChallengeAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
