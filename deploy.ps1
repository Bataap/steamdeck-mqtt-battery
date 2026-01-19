# deploy.ps1
# PowerShell script om een Decky plugin volledig te deployen naar de Steam Deck

# --- Configuratie ---
$RemoteUser = "deck"
$RemoteHost = "steamdeck"   # jouw SSH config alias
$RemotePath = "/home/deck/homebrew/plugins/mijn_plugin"

# --- Stap 1: Build de plugin ---
Write-Host "🔨 Building plugin..."
pnpm i
pnpm run build

# --- Stap 2: Maak de plugin map op de Steam Deck aan ---
Write-Host "📂 Zorg dat de map op de Steam Deck bestaat..."
ssh $RemoteHost "mkdir -p $RemotePath"

# --- Stap 3: Zorg dat deck eigenaar is (voorkomt permission errors) ---
Write-Host "🔑 Zet juiste permissies..."
ssh $RemoteHost "sudo chown -R $RemoteUser:$RemoteUser $RemotePath"

# --- Stap 4: Kopieer de volledige projectmap ---
Write-Host "📤 Kopieer de volledige projectmap..."
scp -r ./* $RemoteHost:$RemotePath/

# --- Stap 5: Herstart de plugin loader ---
Write-Host "🔄 Herstart Decky plugin loader..."
ssh $RemoteHost "sudo systemctl restart plugin_loader"

Write-Host "✅ Deploy voltooid! Plugin is geüpdatet en loader herstart."