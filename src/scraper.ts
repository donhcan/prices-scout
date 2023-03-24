import puppeteer from 'puppeteer';
// import { createConnection } from 'typeorm';
// import { Product } from './entities/Product';

const COUNTRIES = {
    'Uganda': 'https://www.jumia.ug',
    'Kenya': 'https://www.jumia.co.ke',
    'Nigeria': 'https://www.jumia.com.ng',
  };

  async function scrapeJumia(): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url ='https://www.jumia.ug/catalog/?q=sugar+1kg';
    await page.goto(url);
  
    const products = await page.$$eval(".prd a.core", (items) =>
      items.map((item) => {
        const name = item.querySelector("h3")?.textContent;
        const price = item.querySelector(".prc")?.textContent;
        return {
          name,
          price,
        };
      })
    );

    console.log(products);
  
    // const connection = await createConnection();
    // const repository = connection.getRepository(Product);
  
    // const today = new Date();
    // for (const product of products) {
    //   const dbProduct = new Product();
    //   dbProduct.name = product.name;
    //   dbProduct.price = product.price ? parseFloat(product.price.trim().replace(",", "")) : null;
    //   dbProduct.country = "Nigeria";
    //   dbProduct.date = today;
  
    //   await repository.save(dbProduct);
    // }
  
    await browser.close();
    console.log("Scraping done!");
  }
  

  async function runScraper() {
    try {
      await scrapeJumia();
    } catch (error) {
      console.error(error);
    }
  }
  
  runScraper();