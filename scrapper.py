import requests
from bs4 import BeautifulSoup

def elegoo(): #this is a test, might use later when I add resin printers
    # URL = "https://us.elegoo.com/products/mars-5-ultra-9k-7inch-monochrome-lcd-resin-3d-printer"
    URL = "https://us.elegoo.com/products/saturn-4-12k-10inch-monochrome-lcd-resin-3d-printer"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(class_="product-information--inner")
    # print(results)
    price = results.find("span", class_="amount").text
    name = results.find("h1", class_="product-title").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: "+cleanPrice)
    print("name: "+name)

def prusa(): #Not scrappable (for now) due to random classes and id for each product
    URL = "https://www.prusa3d.com/product/original-prusa-mk4-kit-2/"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(class_="sc-c539935c-1")
    # print(results)
    price = results.find("span", class_="sc-5911b2fb-0").text
    name = results.find("h1", class_="sc-61769cc7-0").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: " + cleanPrice)
    print("name: " + name)

def Creality(): #Not scrappable but I think workarounds exist
    # after researching I found out this might be a cloudflare thing
    URL = "https://store.creality.com/products/ender-3-v3-plus-3d-printer"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    print(soup.prettify())
    results = soup.find("div", class_="product-detail")
    print(results)
    price = results.find("span", class_="money").text
    name = results.find("h1", class_="product-info__header_title").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: " + cleanPrice)
    print("name: " + name)

def BambuLab(): #works
    URL = "https://store.bambulab.com/collections/3d-printer/products/p1p"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    # print(soup.prettify())
    results = soup.find("section", class_="Product")
    # print(results)
    price = results.find("span", class_="Price").text
    name = results.find("h1", class_="Heading").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: " + cleanPrice)
    print("name: " + name)
