$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8080/")
$listener.Start()
Write-Host "Server running at http://127.0.0.1:8080/"

$mimeMap = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".mp4"  = "video/mp4"
  ".webp" = "image/webp"
  ".json" = "application/json"
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) {
      $path = "index.html"
    }

    $localFilePath = Join-Path -Path (Get-Location) -ChildPath $path

    if (Test-Path $localFilePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
      $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
      $response.ContentType = $contentType
      $bytes = [System.IO.File]::ReadAllBytes($localFilePath)
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
  }
} finally {
  $listener.Stop()
}
