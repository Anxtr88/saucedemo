# Sauce Demo Test Plan

## Application Overview

Test plan for the Sauce Demo web application covering login, inventory, cart, checkout, and menu actions.

## Test Scenarios

### 1. Sauce Demo Functional Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Standard user login and purchase flow

**File:** `tests/sauce-demo-standard-user-flow.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed with Username, Password, and Login button.
  2. Enter username standard_user and password secret_sauce
    - expect: Valid credentials are entered successfully.
  3. Click Login
    - expect: Inventory page loads and product list is visible.
  4. Add one product to the cart
    - expect: Add to cart button changes to Remove and cart badge updates.
  5. Open the shopping cart
    - expect: Cart page displays selected item with quantity, description, price, and Checkout button.
  6. Click Checkout
    - expect: Checkout information page loads with First Name, Last Name, and Zip/Postal Code fields.
  7. Enter valid checkout details and continue
    - expect: Checkout overview page loads showing item total and Finish button.
  8. Finish checkout
    - expect: Checkout complete confirmation appears and Back Home option is visible.

#### 1.2. Login validation and error handling

**File:** `tests/sauce-demo-login-validation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed.
  2. Click Login with empty Username and Password
    - expect: A login error message is displayed for missing credentials.
  3. Enter invalid username or password and login
    - expect: A login error message is displayed for invalid credentials.
  4. Login with locked_out_user and secret_sauce
    - expect: A locked-out user error message appears and access is denied.

#### 1.3. Cart management and checkout cancellation

**File:** `tests/sauce-demo-cart-management.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce
    - expect: Inventory page loads.
  2. Add two different products to the cart
    - expect: Both selected products update to Remove and cart badge increments correctly.
  3. Open the shopping cart
    - expect: Cart page displays both products with correct quantities and prices.
  4. Remove one product from the cart
    - expect: Product is removed and cart badge decrements.
  5. Click Checkout and then click Cancel
    - expect: User returns to the cart page with selected item still present.

#### 1.4. Menu actions and application reset

**File:** `tests/sauce-demo-menu-actions.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce
    - expect: Inventory page loads.
  2. Open the side menu and select All Items
    - expect: The inventory page remains visible and the All Items menu item is active.
  3. Open the side menu and click Reset App State
    - expect: Any cart contents are removed and item buttons revert to Add to cart.
  4. Open the side menu and click Logout
    - expect: User is returned to the login page and cannot access inventory without re-login.

#### 1.5. Inventory sorting and item details navigation

**File:** `tests/sauce-demo-inventory-controls.spec.ts`

**Steps:**
  1. Log in with standard_user and secret_sauce
    - expect: Inventory page loads.
  2. Change product sort order to Name (Z to A)
    - expect: Products reorder correctly in descending name order.
  3. Change sort order to Price (low to high)
    - expect: Products reorder by ascending price.
  4. Click a product name to view its detail page
    - expect: Product detail page opens with full description, price, and Add to cart button.
  5. Navigate back to inventory and verify cart state persists
    - expect: Cart badge still reflects items added before viewing details.
