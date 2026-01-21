# deploy.ps1
# PowerShell script om een Decky plugin volledig te deployen naar de Steam Deck

# --- Config ---
$RemoteHost = "steamdeck"  
$RemotePath = "/home/deck/homebrew/plugins/my_plugin"

# --- Stap 1: Build  ---
Write-Host "Building plugin..."
pnpm install
pnpm run build

# --- Stap 2: Copy to deck ---
Write-Host "Copy all files to deck..."
scp -r ./* "$($RemoteHost):$($RemotePath)/"

# --- Stap 3:  ---
Write-Host "Restart Decky plugin loader..."
ssh -t $RemoteHost "sudo systemctl restart plugin_loader"


Write-Host "Deploy succesfull! Plugin is transfered and decky loader restarted."