$pages = @(
    '', 
    'index.html', 
    'programs.html', 
    'memberships.html', 
    'facility.html', 
    'contact.html', 
    'styles.css', 
    'app.js',
    'assets/hero-home.mp4',
    'assets/hero-home-poster.jpg',
    'assets/hero-programs.jpg',
    'assets/hero-memberships.jpg',
    'assets/hero-facility.jpg',
    'assets/hero-contact.jpg'
)
foreach ($p in $pages) {
    $url = "http://127.0.0.1:8080/$p"
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        Write-Host "$url -> Status: $($res.StatusCode), Size: $($res.RawContentLength) bytes"
    } catch {
        Write-Host "$url -> ERROR: $_"
    }
}
