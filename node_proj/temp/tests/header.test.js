const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.Build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('check header text', async () => {
  const test = await page.getContentsOf('a.brand-logo');
  expect(test).toEqual('Blogster');
});

test('should start OAuth process', async () => {
  await page.click('.right a');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('should show signout when the user is logined', async () => {
  await page.Login();
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual('Logout');
});
