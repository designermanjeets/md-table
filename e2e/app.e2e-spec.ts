import { MdtablePage } from './app.po';

describe('mdtable App', () => {
  let page: MdtablePage;

  beforeEach(() => {
    page = new MdtablePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
