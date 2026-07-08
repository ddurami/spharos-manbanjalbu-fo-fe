import { chromium } from "playwright";

const BASE_URL = "http://localhost:3000";
const API_URL = "http://localhost:8080";

async function prepareCart(request) {
  const loginResponse = await request.post(`${API_URL}/api/member/login`, {
    data: { loginId: "payment-test", password: "Payment1!" },
  });
  const loginJson = await loginResponse.json();
  if (!loginJson.success) {
    throw new Error(`Login failed: ${JSON.stringify(loginJson)}`);
  }

  const token = loginJson.data.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  await request.delete(`${API_URL}/api/cart/all`, { headers }).catch(() => {});
  await request.post(`${API_URL}/api/cart`, {
    headers,
    data: { productId: 1, quantity: 1 },
  });

  const cartResponse = await request.get(`${API_URL}/api/cart`, { headers });
  const cartJson = await cartResponse.json();
  const cartItemId = cartJson.data.cartItems[0].cartItemId;
  const reservationAvailable = cartJson.data.cartItems[0].reservationAvailable;

  return { cartItemId, reservationAvailable };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  const page = await context.newPage();
  const results = [];

  const { cartItemId, reservationAvailable } = await prepareCart(page.request);
  results.push(`api_reservationAvailable=${reservationAvailable}`);

  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("아이디").fill("payment-test");
  await page.getByPlaceholder("비밀번호").fill("Payment1!");
  await page.getByRole("button", { name: "로그인하기" }).click();
  await page.waitForURL("**/mypage", { timeout: 15000 });
  results.push("logged_in");

  await page.getByRole("link", { name: "Cart" }).click();
  await page.waitForURL("**/cart", { timeout: 15000 });
  await page.getByRole("heading", { name: "장바구니" }).waitFor({ timeout: 15000 });
  results.push("cart_page_loaded");

  await page.getByRole("link", { name: "구매하기" }).click();
  await page.waitForURL("**/checkout**", { timeout: 15000 });
  await page.getByRole("heading", { name: "결제하기" }).waitFor({ timeout: 30000 });
  results.push("checkout_page_loaded");

  await page.getByText("예약배송", { exact: true }).waitFor({ timeout: 10000 });
  results.push("reservation_section_visible");

  await page.screenshot({
    path: "scripts/output/checkout-before-reservation.png",
    fullPage: true,
  });

  const reservationCheckbox = page
    .locator("section")
    .filter({ hasText: "예약배송" })
    .getByRole("checkbox");
  await reservationCheckbox.check();
  await page.getByText("배송일을 선택해 주세요.").waitFor({ timeout: 5000 });
  results.push("reservation_checked_date_prompt_visible");

  await page.screenshot({
    path: "scripts/output/checkout-reservation-checked.png",
    fullPage: true,
  });

  await page.getByText("배송일을 선택해 주세요.").click();
  await page.getByRole("dialog").waitFor({ timeout: 5000 });
  results.push("date_picker_opened");

  await page
    .getByRole("dialog")
    .locator("button:not([disabled])")
    .filter({ hasText: /^\d+$/ })
    .first()
    .click();
  results.push("date_selected");

  await page.screenshot({
    path: "scripts/output/checkout-date-selected.png",
    fullPage: true,
  });

  await page.getByRole("button", { name: "구매하기" }).click();

  await page.waitForURL("**/checkout/complete**", { timeout: 45000 }).catch(async () => {
    await page.screenshot({
      path: "scripts/output/checkout-after-purchase-click.png",
      fullPage: true,
    });
    throw new Error(`Unexpected URL after purchase: ${page.url()}`);
  });

  await page.getByRole("heading", { name: "주문이 완료되었습니다" }).waitFor({
    timeout: 15000,
  });
  results.push("order_complete_page");

  const bodyText = await page.locator("body").innerText();
  if (!bodyText.includes("승인번호")) {
    throw new Error("Complete page missing approval number");
  }
  if (!bodyText.includes("결제 완료")) {
    throw new Error("Complete page missing payment status");
  }
  results.push("payment_details_visible");

  await page.screenshot({
    path: "scripts/output/checkout-complete.png",
    fullPage: true,
  });

  console.log(JSON.stringify({ ok: true, cartItemId, results }, null, 2));
  await browser.close();
}

main().catch(async (error) => {
  console.error(JSON.stringify({ ok: false, error: String(error) }, null, 2));
  process.exit(1);
});
