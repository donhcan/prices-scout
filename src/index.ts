import fs from 'fs'
import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'

interface ProductType {
    name: string
    price: string
}

async function getContent(url: string): Promise<void> {

    // Open the browser and a new tab
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Navigate to the URL and write the content to file
    await page.goto(url)
    const pageContent = await page.content()
    fs.writeFileSync("products.html", pageContent)

    // Close the browser
    await browser.close()
    console.log("Got the HTML. Check the products .html file.")
}

async function main() {


    const targetURL = 'https://www.jumia.com.ng/sugars/'
    await getContent(targetURL)
    parseProducts()
}

function parseProducts(): void {

    // Load the HTML document
    const staticHTML = fs.readFileSync('products.html')
    const $ = cheerio.load(staticHTML)

    // Get the comments section
    const productsSection = $('.prd a.core')

    // Iterate each comment
    const products = []

    productsSection.each((index, prd) => {
        const product: ProductType = { name: '', price: '' }
        product.name = $(prd).find('h3').text()
        product.price = $(prd).find('.prc').text()
        products.push(product);
    })

    // Write the results to external file
    fs.writeFileSync("products.json", JSON.stringify({ products }))
}

main()
    .then(() => { console.log("All done!") })
    .catch(e => { console.log("Unexpected error occurred:", e.message) })