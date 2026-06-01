$baseDir = 'D:\iCloudDrive\iCloud~md~obsidian\Study\English'
$sourceFile = [System.IO.Path]::Combine($baseDir, "未命名.md")
$folderName = "牛津高阶9_例句"
$outDir = [System.IO.Path]::Combine($baseDir, $folderName)

# Create output folder
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
    Write-Host "Created folder: $outDir"
}

# Check file exists
if (-not (Test-Path $sourceFile)) {
    Write-Host "ERROR: File not found: $sourceFile"
    exit 1
}

# Read all lines using .NET (better encoding handling)
$lines = [System.IO.File]::ReadAllLines($sourceFile, [System.Text.Encoding]::UTF8)
Write-Host "Total lines: $($lines.Count)"

# Find the table header
$tableStartIndex = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '\|序号\|英文\|中文\|') {
        $tableStartIndex = $i
        break
    }
}

if ($tableStartIndex -eq -1) {
    Write-Host "ERROR: Could not find table header row"
    exit 1
}

Write-Host "Table starts at line index: $tableStartIndex"

# Collect all data rows
$dataRows = New-Object System.Collections.ArrayList
for ($i = ($tableStartIndex + 1); $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    if ($line -match '^\|\d+\|') {
        [void]$dataRows.Add($line)
    }
}

Write-Host "Total data rows: $($dataRows.Count)"

# Split into chunks of 1000
$chunkSize = 1000
$chunkIndex = 0

for ($start = 0; $start -lt $dataRows.Count; $start += $chunkSize) {
    $end = [Math]::Min($start + $chunkSize, $dataRows.Count) - 1
    $chunk = $dataRows[$start..$end]

    $fileNum = $chunkIndex + 1
    $fileName = "part_{0:D3}.md" -f $fileNum
    $filePath = [System.IO.Path]::Combine($outDir, $fileName)

    $firstRow = $chunk[0]
    $seqNum = ($firstRow -split '\|')[1]

    $header = "# 牛津高阶9中英文对照例句 - 第$fileNum部分（序号 $seqNum 起）`n`n|序号|英文|中文|`n|---|---|---|`n"
    $body = $chunk -join "`n"
    $content = "$header`n$body`n"

    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)

    Write-Host "  Created $fileName ($($chunk.Count) rows, starts at #$seqNum)"
    $chunkIndex++
}

Write-Host "`nDone! Created $chunkIndex files in $folderName"
