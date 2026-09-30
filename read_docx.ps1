Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("Website content - O&M Scope of Work.docx")
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$paragraphs = [regex]::Matches($xmlText, '<w:p[ >].*?</w:p>')
$lines = foreach ($p in $paragraphs) {
    $matches = [regex]::Matches($p.Value, '<w:t[^>]*>(.*?)</w:t>')
    $t = ($matches | ForEach-Object { $_.Groups[1].Value }) -join ''
    if ($t.Trim() -ne '') {
        $t
    }
}
$lines | Out-File -FilePath "extracted_docx_content.txt" -Encoding utf8
Write-Output "Successfully extracted $($lines.Count) lines."
