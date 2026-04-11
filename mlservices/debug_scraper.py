from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--window-size=1920,1080")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
)

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

driver.get("https://www.amazon.in/s?k=blue+shirt+for+men")

import time
time.sleep(5)

print("Page title:", driver.title)

soup = BeautifulSoup(driver.page_source, "html.parser")
cards = soup.select('div[data-component-type="s-search-result"]')
print("Cards found:", len(cards))

# Also try alternate selectors
alt = soup.select('div[data-asin]:not([data-asin=""])')
print("Alt cards (data-asin):", len(alt))

print("First 1000 chars of page source:")
print(driver.page_source[:1000])

driver.quit()
