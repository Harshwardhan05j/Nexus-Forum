# ============================================================
# Nexus Forum - Deployment Package Builder
# Run this from: C:\nexus-forum-main\
# ============================================================

$ROOT     = "C:\nexus-forum-main\frontend"
$STANDALONE = "$ROOT\.next\standalone"
$DEPLOY   = "C:\nexus-forum-main\DEPLOY"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Nexus Forum - Building Deploy Package" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean old deploy folder
if (Test-Path $DEPLOY) {
    Write-Host "[1/6] Cleaning old DEPLOY folder..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $DEPLOY
}
New-Item -ItemType Directory -Path $DEPLOY | Out-Null
Write-Host "[1/6] DEPLOY folder ready." -ForegroundColor Green

# Step 2: Copy root files from standalone
Write-Host "[2/6] Copying server.js, web.config, package.json, .env..." -ForegroundColor Yellow
Copy-Item "$STANDALONE\server.js"    "$DEPLOY\server.js"
Copy-Item "$STANDALONE\web.config"   "$DEPLOY\web.config"
Copy-Item "$STANDALONE\package.json" "$DEPLOY\package.json"
Copy-Item "$STANDALONE\.env"         "$DEPLOY\.env"

# Overwrite server.js with the iisnode-compatible fixed version
# (The auto-generated one uses parseInt(PORT) which breaks iisnode named pipes)
$fixedServer = "C:\nexus-forum-main\DEPLOY\server.js"
if (Test-Path $fixedServer) {
    Copy-Item $fixedServer "$DEPLOY\server.js" -Force
    Write-Host "[2/6] Root files copied (iisnode-compatible server.js applied)." -ForegroundColor Green
} else {
    Write-Host "[2/6] Root files copied." -ForegroundColor Green
}


# Step 3: Copy .next folder from standalone
Write-Host "[3/6] Copying .next folder (this may take a moment)..." -ForegroundColor Yellow
Copy-Item -Recurse "$STANDALONE\.next" "$DEPLOY\.next"
Write-Host "[3/6] .next folder copied." -ForegroundColor Green

# Step 4: Copy node_modules from standalone
Write-Host "[4/6] Copying node_modules (this may take a while)..." -ForegroundColor Yellow
Copy-Item -Recurse "$STANDALONE\node_modules" "$DEPLOY\node_modules"
Write-Host "[4/6] node_modules copied." -ForegroundColor Green

# Step 5: Copy static assets into .next\static
Write-Host "[5/6] Copying static assets (.next\static)..." -ForegroundColor Yellow
if (Test-Path "$ROOT\.next\static") {
    Copy-Item -Recurse "$ROOT\.next\static" "$DEPLOY\.next\static"
    Write-Host "[5/6] Static assets copied." -ForegroundColor Green
} else {
    Write-Host "[5/6] WARNING: No static folder found - skipping." -ForegroundColor Red
}

# Step 6: Copy public folder
Write-Host "[6/6] Copying public folder..." -ForegroundColor Yellow
if (Test-Path "$ROOT\public") {
    Copy-Item -Recurse "$ROOT\public" "$DEPLOY\public"
    Write-Host "[6/6] Public folder copied." -ForegroundColor Green
} else {
    Write-Host "[6/6] WARNING: No public folder found - skipping." -ForegroundColor Red
}

# Done!
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUCCESS! Deploy package is ready." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your deployment folder is at:" -ForegroundColor White
Write-Host "  C:\nexus-forum-main\DEPLOY\" -ForegroundColor Yellow
Write-Host ""
Write-Host "In FileZilla:" -ForegroundColor White
Write-Host "  1. DELETE everything on the remote server" -ForegroundColor White
Write-Host "  2. Set LOCAL path to: C:\nexus-forum-main\DEPLOY\" -ForegroundColor White
Write-Host "  3. Select ALL files/folders in DEPLOY and upload to remote /" -ForegroundColor White
Write-Host ""
