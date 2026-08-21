$files = Get-ChildItem -Filter *.html -Recurse
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $hasHeader = $content -like '*class="mega-menu"*'
    $hasFooter = $content -like '*id="mega-footer"*'
    
    if (-not $hasHeader -or -not $hasFooter) {
        Write-Host "Inconsistent Page: $($file.Name) (Header: $hasHeader, Footer: $hasFooter)"
    }
}
