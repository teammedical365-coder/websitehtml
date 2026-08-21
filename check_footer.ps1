$files = Get-ChildItem -Filter *.html -Recurse
foreach ($file in $files) {
    if (-not (Select-String -Path $file.FullName -Pattern 'id="mega-footer"' -Quiet)) {
        Write-Host "Missing Mega Footer: $($file.Name)"
    }
}
