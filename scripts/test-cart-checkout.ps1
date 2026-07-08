$ErrorActionPreference = "Stop"
$BaseUrl = "http://localhost:8080"
$ts = Get-Date -Format "yyyyMMddHHmmss"
$loginId = "checkouttest$ts"
$email = "checkouttest$ts@test.com"
$password = "Abcdef1!"
$phone = "010" + $ts.Substring([Math]::Max(0, $ts.Length - 8))

function Invoke-Api {
    param(
        [string]$Method,
        [string]$Path,
        [object]$Body = $null,
        [string]$Token = $null
    )

    $headers = @{ "Content-Type" = "application/json" }
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }

    $params = @{
        Uri = "$BaseUrl$Path"
        Method = $Method
        Headers = $headers
    }

    if ($Body -ne $null) {
        $params.Body = ($Body | ConvertTo-Json -Compress)
    }

    return Invoke-RestMethod @params
}

function Assert-True {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) {
        throw "FAIL: $Message"
    }
    Write-Output "PASS: $Message"
}

Write-Output "=== Cart Checkout Integration Test ==="
Write-Output ""

try {
    Invoke-Api -Method POST -Path "/api/cart/checkout" -Body @{ cartItemIds = @(1) }
    throw "FAIL: unauthenticated checkout should not succeed"
}
catch {
    $status = $_.Exception.Response.StatusCode.value__
    Assert-True ($status -eq 403) "unauthenticated checkout returns 403 (got $status)"
}

$send = Invoke-Api -Method POST -Path "/api/member/auth/email/send" -Body @{ email = $email }
$code = $send.data.devCode
Assert-True ([bool]$code) "email verification code issued"

$verify = Invoke-Api -Method POST -Path "/api/member/auth/email/verify" -Body @{
    email = $email
    code = $code
}
$verificationToken = $verify.data.verificationToken
Assert-True ([bool]$verificationToken) "verification token issued"

Invoke-Api -Method POST -Path "/api/member/join/terms" -Body @{
    verificationToken = $verificationToken
    agreements = @(
        @{ termsId = 1; agreed = $true },
        @{ termsId = 2; agreed = $true },
        @{ termsId = 3; agreed = $true },
        @{ termsId = 4; agreed = $false }
    )
} | Out-Null

$joinBody = @{
    verificationToken = $verificationToken
    loginId = $loginId
    password = $password
    name = "Checkout Tester"
    birthDate = "1990-01-01"
    phone = $phone
    email = $email
}
Invoke-Api -Method POST -Path "/api/member/join" -Body $joinBody | Out-Null

$login = Invoke-Api -Method POST -Path "/api/member/login" -Body @{
    loginId = $loginId
    password = $password
}
$token = $login.data.accessToken
Assert-True ([bool]$token) "login succeeded"

try {
    Invoke-Api -Method POST -Path "/api/cart/checkout" -Body @{ cartItemIds = @() } -Token $token
    throw "FAIL: empty cartItemIds should not succeed"
}
catch {
    $status = $_.Exception.Response.StatusCode.value__
    Assert-True ($status -eq 400) "empty cartItemIds returns 400 (got $status)"
}

try {
    Invoke-Api -Method POST -Path "/api/cart/checkout" -Body @{ cartItemIds = @(99999) } -Token $token
    throw "FAIL: unknown cart item should not succeed"
}
catch {
    $status = $_.Exception.Response.StatusCode.value__
    Assert-True ($status -eq 404) "unknown cart item returns 404 (got $status)"
}

$productsPath = "/api/products?page=0" + "&" + "size=10"
$products = Invoke-Api -Method GET -Path $productsPath
Assert-True ($products.data.products.Count -ge 2) "at least 2 products available"

$product1 = $products.data.products[0].id
$product2 = $products.data.products[1].id

Invoke-Api -Method POST -Path "/api/cart" -Body @{ productId = $product1; quantity = 2 } -Token $token | Out-Null
Invoke-Api -Method POST -Path "/api/cart" -Body @{ productId = $product2; quantity = 1 } -Token $token | Out-Null

$cart = Invoke-Api -Method GET -Path "/api/cart" -Token $token
Assert-True ($cart.data.cartItems.Count -eq 2) "cart has 2 items"

$selectedIds = @($cart.data.cartItems | ForEach-Object { $_.cartItemId })
Assert-True ($selectedIds.Count -eq 2) "selected cart item ids collected"

$checkout = Invoke-Api -Method POST -Path "/api/cart/checkout" -Body @{
    cartItemIds = $selectedIds
} -Token $token

Assert-True ($checkout.data.cartItems.Count -eq 2) "checkout returns 2 items"
Assert-True ($checkout.data.productAmount -gt 0) "checkout productAmount > 0"
Assert-True ($checkout.data.totalAmount -eq $checkout.data.productAmount) "totalAmount equals productAmount"
Assert-True ($checkout.data.discountAmount -eq 0) "discountAmount is 0"
Assert-True ($checkout.data.shippingFee -eq 0) "shippingFee is 0"

$expectedAmount = ($checkout.data.cartItems | ForEach-Object { $_.price * $_.quantity } | Measure-Object -Sum).Sum
Assert-True ($checkout.data.productAmount -eq $expectedAmount) "productAmount matches line totals"

$partialId = @($selectedIds[0])
$partialCheckout = Invoke-Api -Method POST -Path "/api/cart/checkout" -Body @{
    cartItemIds = $partialId
} -Token $token
Assert-True ($partialCheckout.data.cartItems.Count -eq 1) "partial checkout returns 1 item"

$checkoutHref = "/checkout?cartItemIds=$($selectedIds -join ',')"
Assert-True ($checkoutHref -match '^/checkout\?cartItemIds=\d+,\d+$') "checkout href contains selected ids"

Write-Output ""
Write-Output "=== All tests passed ==="
Write-Output "Test user: $loginId"
Write-Output "Checkout URL example: $checkoutHref"
