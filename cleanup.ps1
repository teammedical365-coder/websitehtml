$files = Get-ChildItem -Filter *.html -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $changed = $false
    $newContent = @()
    foreach ($line in $content) {
        if ($line -match "Ezovion Free Webpage") {
            $changed = $true
            continue
        }
        if ($line -match '<li><a href="templates"><span>Templates') {
            $changed = $true
            continue
        }
        $newContent += $line
    }
    if ($changed) {
        $newContent | Set-Content $file.FullName
    }
}
Write-Host "Cleanup completed sitewide."
