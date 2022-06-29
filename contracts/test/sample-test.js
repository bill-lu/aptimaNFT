const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sale", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const AptimaNFT = await ethers.getContractFactory("AptimaNFT");
    const aptimaNFT = await AptimaNFT.deploy(marketAddress);
    await aptimaNFT.deployed();
    const aptimaNFTAddress = aptimaNFT.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('100', 'ether');

    await aptimaNFT.createToken("https://www.mytokenlocation.com");
    await aptimaNFT.createToken("https://www.mytokenlocation2.com");

    await market.createMarketItem(aptimaNFTAddress, 1, auctionPrice, {value: listingPrice});
    await market.createMarketItem(aptimaNFTAddress, 2, auctionPrice, {value: listingPrice});

    const [_, buyerAddress] = await ethers.getSigners();

    await market.connect(buyerAddress).createMarketSale(aptimaNFTAddress, 1, {value: auctionPrice});

    let items = await market.fetchMarketItems();

    items = await Promise.all(items.map(async i => {
      const tokenUri = await aptimaNFT.tokenURI(i.tokenId);

      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item;
    }));

    console.log('Items: ', items);    

  });
});
