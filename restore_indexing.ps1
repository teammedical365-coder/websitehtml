
$files = Get-ChildItem -Filter *.html
Write-Host "Scanning $($files.Count) files for 'noindex' tags..."

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        if ($content -match "noindex") {
            # Target common variations of the noindex tag
            $newContent = $content -replace '<meta name="robots" content="noindex, nofollow">', ''
            $newContent = $newContent -replace '<meta name="robots" content="noindex">', ''
            
            if ($newContent -ne $content) {
                [System.IO.File]::WriteAllText($file.FullName, $newContent)
                Write-Host "Restored indexability for: $($file.Name)"
            }
        }
    } catch {
        Write-Host "Error in $($file.Name)"
    }
}

Write-Host "Sitewide indexing restoration complete."
