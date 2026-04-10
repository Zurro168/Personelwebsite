$vaultPath = 'D:\iCloudDrive\iCloud~md~obsidian\Obsidian Vault\SiliconCommand';
$queuePath = Join-Path $vaultPath '02_Queue';
$draftsPath = Join-Path $vaultPath '04_Drafts';

if (-not (Test-Path $draftsPath)) { 
    New-Item -ItemType Directory -Path $draftsPath | Out-Null 
    Write-Host "📂 Created Drafts folder."
}

$files = Get-ChildItem -Path $queuePath -Filter *.md -Recurse;
$count = 0;

foreach ($file in $files) {
    if ($file.FullName -like '*node_modules*' -or $file.FullName -like '*temp*') { continue }
    
    $content = Get-Content -Path $file.FullName -TotalCount 20;
    $hasSlug = $false;
    foreach ($line in $content) {
        if ($line -match "^slug\s*:\s*\S+") {
            $hasSlug = $true;
            break;
        }
    }
    
    if (-not $hasSlug) {
        Move-Item -Path $file.FullName -Destination $draftsPath -Force;
        Write-Host "📦 Moved: $($file.Name)"
        $count++;
    }
}
Write-Host "🏆 Cleaned up $count drafts."
