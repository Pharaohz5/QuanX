const fs = require('fs')
const path = require('path')
const sharp = require('sharp');

const dirPath = path.join(__dirname, './IconSrc')
const files = fs.readdirSync(dirPath)

try {
  fs.rmSync(path.join(__dirname, 'IconOutput'), { recursive: true, force: true })
} catch (err) {
  fs.rmdirSync(path.join(__dirname, 'IconOutput'), { recursive: true, force: true })
}
fs.mkdirSync('./IconOutput')

const baseUrl = 'https://raw.githubusercontent.com/Pharaohz5/QuanX/main/IconOutput'
const baseConfig = {
  name: '圈x 图标',
  description: 'By ToZero',
  icons: []
}

const width = 108;
const height = 108;

const outputImg = async iconName => {
  return new Promise((resolve, reject) => {
    sharp(path.join(__dirname, 'IconSrc', iconName))
    .resize(width, height)
    .toFile(path.join(__dirname, 'IconOutput', iconName), (err, info) => {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    });
  })
}

const main = async () => {
  for (let i = 0; i < files.length; i++) {
    const iconName = files[i]
    const [name] = iconName.split('.')

    await outputImg(iconName)
    console.log('Image resized successfully:', i + 1, `/${files.length}`);

    baseConfig.icons.push({
      name,
      url: path.join(baseUrl, iconName)
    })
  }

  fs.writeFileSync('./icons.json', JSON.stringify(baseConfig, null, 2))
}

main()