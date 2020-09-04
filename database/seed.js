const fs = require('fs');
const faker = require('faker');
const makeClothes = fs.createWriteStream('clothing.csv');
makeClothes.write('item, gender, style, color, size, type, name, image\n', 'utf8');

const choiceBtwn = (opt1, opt2, chance) => {
  const rollDice = Math.floor(Math.random() * chance);
  if (rollDice === 1) {
    return opt2;
  } else {
    return opt1;
  }
}

const multChoice = (opt1, opt2, opt3) => {
  const rollDice = Math.floor(Math.random() * 3);
  if (rollDice === 1) {
    return opt2;
  } else if (rollDice === 2) {
    return opt1;
  } else {
    return opt3;
  }
}

const names = ['Speed Up', 'All The Right Places', 'Fast and Free', 'Align', 'Train Times', 'Wunder Under', 'Mist Over', 'Swiftly', 'Love', 'Define', 'Cool', 'Warpstreme', 'Nulux', 'Seamless'];
const colors = ['True Navy', 'Black', 'Rustic Coral', 'Chambray', 'White', 'Olive', 'Yellow', 'Perriwinkle', 'Red', 'Pink'];
const makeColor = () => {
  let color = faker.commerce.color();
  return color[0].toUpperCase() + color.slice(1);
}

const pantsImages = ['./images/pan1.png', './images/pan2.png', './images/pan3.png', './images/pan4.png', './images/pan5.png', './images/pan6.png'];
const shirtsImages = ['./images/shi1.png', './images/shi2.png', './images/shi3.png', './images/shi4.png', './images/shi5.png', './images/shi6.png'];
const yellowImages = ['./images/yel1.png', './images/yel2.png', './images/yel3.png', './images/yel4.png', './images/yel5.png', './images/yel6.png'];

const bottoms = {
  "Men's": { styles: ['Pants', 'Jogger', 'Shorts', 'Tights', 'Swim Trunks'] },
  "Women's": { styles: ['Leggings', 'Pants', 'Capris', 'Shorts', 'Skirts', 'Jogger'] }
}

const bottomType = (style) => {
  if (style === 'Leggings' || style === 'Tights') {
    return 'Tight';
  } else if (style === 'Capris') {
    return 'Crop';
  } else if (style === 'Jogger') {
    return 'Jogger';
  } else if (style === 'Pants') {
    return 'Pant';
  } else if (style === "Skirt") {
    return 'III';
  } else if (style === 'Shorts') {
    return 'Short';
  } else {
    return style;
  }
}

const tops = {
  "Men's": { styles: ['Short Sleeve Shirts', 'Polos', 'Long Sleeve Shirts', 'Button Down Shirts', 'Tank Tops', 'Hoodies + Sweatshirts', 'Jackets + Coats'] },
  "Women's": { styles: ['Tank Tops', 'Dresses', 'Short Sleeve Shirts', 'Long Sleeve Shirts', 'Sweaters', 'Hoodies + Sweatshirts', 'Jackets + Coats', 'Swimsuits'] },
}

const topType = (gender, style) => {
  if (style === 'Short Sleeve Shirts') {
    return 'Short Sleeve';
  } else if (style === 'Long Sleeve Shirts') {
    return 'Long Sleeve';
  } else if (style === 'Hoodies + Sweatshirts') {
    return choiceBtwn('Hoodie', 'Sweatshirt', 2);
  } else if (style === 'Jackets + Coats') {
    return 'Jacket';
  }
  if (gender === "Men's") {
    if (style === 'Polos') {
      return 'Polo'
    } else if (style.includes('Button')) {
      return `${choiceBtwn('Long Sleeve', 'Short Sleeve', 2)} Buttondown`
    } else if (style.includes("Tank")) {
      return 'Tank';
    }
  } else {
    if (style === 'Tank Tops') {
      return 'Racerback';
    } else if (style === 'Dresses') {
      return 'Dress';
    } else if (style === 'Sweaters') {
      return 'Sweater';
    } else if (style === 'Swimsuits') {
      return 'Bikini Top';
    }
  }
}

const accessories = {
  "Men's": { styles: ["underwear", "bags", "yoga mats", "socks", "water bottles", "hat", "gloves"] },
  "Women's": { styles: ["bags", "yoga mats", "hat", "scarves + wraps", "gloves", "water bottles", "socks", "underwear"] }
}

const accessoryType = (gender, style) => {
  if (style === 'bags') {
    return multChoice('Belt Bag', 'Festival Bag', 'Bag');
  } else if (style === 'yoga mats') {
    return 'Mat';
  } else if (style === 'hat') {
    return multChoice('Run Hat', 'Bucket Hat', 'Hat');
  } else if (style === 'water bottles') {
    return multChoice('Sport Bottle', 'Cold Bottle', 'Water Bottle');
  } else if (style === 'socks') {
    return choiceBtwn('Sock', 'Crew Sock', 2)
  } else if (style === 'gloves') {
    return multChoice('Gloves', 'Training Glove', 'Mitten');
  }
  if (gender === "Men's") {
    if (style === 'underwear') {
      return 'Boxer';
    }
  } else {
    if (style === 'scarves + wraps') {
      return choiceBtwn('Scarf', 'Wrap', 2);
    } else if (style === 'underwear') {
      return multChoice('Boyshort', 'Thong', 'Hipster')
    }
  }
}

const addImages = (product) => {
  if (product.color === 'Yellow') {
    let index = Math.floor(Math.random() * Math.floor(yellowImages.length));
    product.image = yellowImages[index];
  } else if (product.name.includes('Shirt')) {
    let index = Math.floor(Math.random() * Math.floor(shirtsImages.length));
    product.image = shirtsImages[index];
  } else if (product.name.includes('Racerback')) {
    let index = Math.floor(Math.random() * Math.floor(shirtsImages.length));
    product.image = shirtsImages[index];
  } else {
    let index = Math.floor(Math.random() * Math.floor(pantsImages.length));
    product.image = pantsImages[index];
  }
  return product;
};

const createProductPants = () => {
  let product = {};
  product.gender = choiceBtwn("Men's", "Women's", 2);
  product.style = bottoms[product.gender].styles[Math.floor(Math.random() * Math.floor(bottoms[product.gender].styles.length))]
  product.color = `${choiceBtwn(makeColor(), colors[Math.floor(Math.random() * Math.floor(colors.length))])}`
  product.type = bottomType(product.style);
  if (product.type === 'Short') {
    product.size = `${Math.floor(Math.random() * (5 - 2 + 1) + 2)}`
  } else {
    product.size = `${Math.floor(Math.random() * (31 - 21 + 1) + 21)}`
  }
  product.name = `${choiceBtwn(faker.commerce.productAdjective(), names[Math.floor(Math.random() * Math.floor(names.length))], 3)} ${product.type} ${product.size}`;
  addImages(product);
  return product;
}

const createProductTops = () => {
  let product = {};
  product.gender = choiceBtwn("Men's", "Women's", 2);
  product.style = tops[product.gender].styles[Math.floor(Math.random() * Math.floor(tops[product.gender].styles.length))]
  product.color = `${choiceBtwn(makeColor(), colors[Math.floor(Math.random() * Math.floor(colors.length))], 2)}`
  product.type = topType(product.gender, product.style);
  product.name = `${choiceBtwn(faker.commerce.productAdjective(), names[Math.floor(Math.random() * Math.floor(names.length))], 3)} ${product.type}`;
  product.size = 'clothes clothing';
  addImages(product);
  return product;
}

const createAccessories = () => {
  let product = {};
  product.gender = choiceBtwn("Men's", "Women's", 2);
  product.style = accessories[product.gender].styles[Math.floor(Math.random() * Math.floor(accessories[product.gender].styles.length))]
  product.color = `${choiceBtwn(makeColor(), colors[Math.floor(Math.random() * Math.floor(colors.length))], 2)}`
  product.type = accessoryType(product.gender, product.style);
  product.name = `${choiceBtwn(faker.commerce.productAdjective(), names[Math.floor(Math.random() * Math.floor(names.length))], 3)} ${product.type}`;
  product.size = 'clothes clothing';
  addImages(product);
  return product;
}

const whichOne = () => {
  const rollDice = Math.floor(Math.random() * 3);
  if (rollDice === 1) {
    return createProductPants();
  } else if (rollDice === 2) {
    return createProductTops();
  } else {
    return createAccessories();
  }
}

function clothingFactory(writer, encoding, callback) {
  let i = 10000000;
  let item = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      item += 1;
      const article = whichOne();
      const { gender, style, name, color, type, image, size } = article;
      const data = `${item},${gender},${style},${color},${size},${type},${name},${image}\n`
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

// clothingFactory(makeClothes, 'utf-8', () => makeClothes.end())