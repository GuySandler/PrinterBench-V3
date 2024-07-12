import requests
from bs4 import BeautifulSoup
import cloudscraper

crealityLinks = [
    "https://store.creality.com/products/ender-3-v3-plus-3d-printer",
    "https://store.creality.com/products/ender-3-v3-corexz-3d-printer",
    "https://store.creality.com/products/ender-3-v3-se-3d-printer",
    "https://store.creality.com/products/ender-3-v3-ke-3d-printer",
    # "https://store.creality.com/products/ender-3-s1-3d-printer-aa7d",
    # "https://store.creality.com/products/ender-3-s1-plus-3d-printer",
    # "https://store.creality.com/products/ender-3-s1-pro-3d-printer",
    "https://store.creality.com/products/ender-3-v2-neo-3d-printer",
    "https://store.creality.com/products/ender-3-max-neo-3d-printer",
    "https://store.creality.com/products/ender-3-v2-3d-printer",
    "https://store.creality.com/products/ender-3-neo-3d-printer",
    # "https://store.creality.com/products/cr-10-se-3d-printer",
    "https://store.creality.com/products/cr-m4-3d-printer",
    # "https://store.creality.com/products/cr-10-smart-pro-3d-printer",
    "https://store.creality.com/products/cr-30-3d-printer",
    "https://store.creality.com/products/cr-6-max-3d-printer",
    "https://store.creality.com/products/ender-5-s1-3d-printer",
    "https://store.creality.com/products/ender-5-plus-3d-printer",
    "https://store.creality.com/products/k1-max-3d-printer",
    "https://store.creality.com/products/k1c-3d-printer",
    # "https://store.creality.com/products/k1-3d-printer",
    "https://store.creality.com/products/sermoon-d3-3d-printer",
    "https://store.creality.com/products/sermoon-d3-pro-3d-printer"
]
bambuLinks = [
    "https://store.bambulab.com/products/x1-carbon?variant=42059894095987",
    "https://store.bambulab.com/products/p1s?variant=40877026541683",
    "https://store.bambulab.com/products/p1p",
    "https://store.bambulab.com/products/a1?variant=41157296881779",
    "https://store.bambulab.com/products/a1-mini?variant=40963298558067"
]
sovolLinks = [
    "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv08-3d-printer",
    "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv06-plus-fully-open-source-3d-printer-with-linear-rail-structure",
    "https://www.sovol3d.com/collections/3d-printer/products/comgrow-t500-direct-drive-auto-leveling-3d-printer-500-500-500",
    "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv06-best-budget-3d-printer-for-beginner",
    "https://www.sovol3d.com/collections/3d-printer/products/comgrow-t300-3d-printer",
    "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv07-plus-large-klipper-3d-printer",
    "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv07-klipper-direct-drive-3d-printer-print-speed-250mm-s",
    "https://www.sovol3d.com/collections/3d-printer/products/sv04"
]

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
def Creality(URL): #done
    # collapsable parameters (not done): K1,
    # image parameters (WHYYYY): cr 10 smart pro, cr 10 se, ender s1 pro, ender s1 plus, ender s1
    # why do they use ： (not :) for some of the parameters???!?!?
    # URL = "https://store.creality.com/products/ender-3-v3-plus-3d-printer?official-website-index-buy=&spm=..index.home_card_2_2024_1.1"
    scraper = cloudscraper.create_scraper()
    page = scraper.get(URL)
    soup = BeautifulSoup(page.text, "html.parser")
    # print(soup.prettify())
    results = soup.find("div", class_="product-detail")
    # print(results)
    price = results.find("span", class_="money").text
    name = results.find("h1", class_="product-info__header_title").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    specs = soup.find("div", class_="param_wrap")
    specsList = {}
    print("price: " + cleanPrice)
    print("name: " + name)
    if specs is None:
        specs = soup.find("div", class_="parameters")
        specs = specs.find_all("div", class_="parameter_item")
        for spec in specs:
            specCombined = spec.find("b", class_="title").text
            if "：" not in specCombined:
                specCombined = specCombined.split(":")
            else:
                specCombined = specCombined.split("：")
            # print(f"{specName}: {specData}")
            # print(len(specCombined))
            if (len(specCombined) == 1): print(specCombined)
            specsList.update({specCombined[0].strip():specCombined[1].strip()})
        print(specsList)
    else:
        specs = specs.find_all("div", class_="param_item")
        for spec in specs:
            # if spec.find("span", class_="name") is None:
            #     print("None error here")
            # else:
            #     print("fine")
            try:
                specName = spec.find("span", class_="name").text
                specData = spec.find("span", class_="value").text
                # print(f"{specName}: {specData}")
                specsList.update({specName:specData})
            except:
                print("error")
        print(specsList)
    print("-"*10)

def BambuLab(URL): #works
    # URL = "https://store.bambulab.com/collections/3d-printer/products/p1p"
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

    specs = soup.find("table", class_="tpl-table")
    print(type(specs))
    if specs is None:
        specs = soup.find("div", class_="TableWrapper")
        print(type(specs))
    print("price: " + cleanPrice)
    print("name: " + name)
    print("-" * 10)

def Sovol(URL): #works
    # URL = "https://www.sovol3d.com/collections/3d-printer/products/sovol-sv06-plus-fully-open-source-3d-printer-with-linear-rail-structure"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    # print(soup.prettify())
    results = soup.find("div", class_="product-grid-container")
    # print(results)
    price = results.find("span", class_="ht-money").text
    name = results.find("h1", class_="product-title").text
    cleanPrice = []
    for char in price:
        if char.isdigit() or char == ".": cleanPrice.append(char)
    cleanPrice = ''.join(cleanPrice)
    print("price: " + cleanPrice)
    print("name: " + name)
    print("-" * 10)

# for printer in crealityLinks:
#     Creality(printer)
for printer in bambuLinks:
    BambuLab(printer)
# for printer in sovolLinks:
#     Sovol(printer)