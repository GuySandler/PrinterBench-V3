import requests
from bs4 import BeautifulSoup

def elegoo():
    URL = "https://us.elegoo.com/products/mars-5-ultra-9k-7inch-monochrome-lcd-resin-3d-printer"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id="price-template--16955431747765__main-product")
    price = results.find_all("span", class_="amount")[0].text
    name = results.find_all("h1", class_="product-title")
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: "+cleanPrice)
    print("name: "+name)

elegoo()