import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

def scrape_amazon(query: str, max_results: int = 5) -> list[dict]:
    """
    Scrape Amazon India using Playwright.
    Returns a list of products with image and link.
    """
    print(f"\n[Scraper] Searching Amazon for: {query}\n")
    url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # mimic real user
        page.set_extra_http_headers({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/122.0.0.0 Safari/537.36"
        })

        try:
            page.goto(url, timeout=30000)
            # wait for products to load
            page.wait_for_selector("div.s-main-slot div[data-asin]", timeout=15000)
            
            cards = page.query_selector_all("div.s-main-slot div[data-asin]")

            for card in cards[:max_results]:
                try:
                    image = card.query_selector("img.s-image")
                    link  = card.query_selector("a.a-link-normal")

                    image_url  = image.get_attribute("src") if image else "N/A"
                    link_url   = link.get_attribute("href") if link else ""

                    if link_url and not link_url.startswith("http"):
                        link_url = "https://www.amazon.in" + link_url

                    if image_url != "N/A" and link_url:
                        results.append({
                            "image": image_url,
                            "link": link_url
                        })
                except Exception:
                    continue
        except Exception as e:
            print(f"[ERROR] Error during scraping '{query}': {e}")
        finally:
            browser.close()

    return results

def scrape_multiple(queries: list[str], max_results: int = 5, delay: float = 1.5) -> dict:
    """
    Scrape Amazon for multiple queries.
    Returns a dict mapping each query to its product results.
    """
    results = {}
    for query in queries:
        results[query] = scrape_amazon(query, max_results=max_results)
        time.sleep(delay)
    return results

if __name__ == "__main__":
    query = input("Enter clothing product to search: ")

    products = scrape_amazon(query, max_results=10)

    if not products:
        print("No results found")
    else:
        print("\n--- Results ---\n")
        for i, p in enumerate(products, 1):
            print(f"{i}.")
            print(f"   Image: {p['image']}")
            print(f"   Link:  {p['link']}")
            print("-" * 60)
