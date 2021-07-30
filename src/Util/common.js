/* eslint-disable import/no-anonymous-default-export */
export default {
  decodeJwt: (token) => {
    const base64Payload = token.split('.')[1] // token you get
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  },

  groupCategoriesByHierarchy (categories) {
    let groupedCategories = []
    categories.forEach(category => {
      if (!category.parentId) groupedCategories.push(category)
    })

    groupedCategories = groupedCategories.map(category => {
      category.categories = categories.filter(c => category.id === c.parentId)
      if (!category.categories.length) delete category.categories
      else {
        category.categories = category.categories.map(c2 => {
          c2.categories = categories.filter(c => c2.id === c.parentId)
          if (!c2.categories.length) delete c2.categories
          return c2
        })
      }
      return category
    })
    return groupedCategories
  },

  findMinColorPrice (source, configPrices) {
    const { pickedColors = [] } = source
    let minColorPrice
    configPrices.forEach(config => {
      if (config.type === 'color') {
        if (pickedColors.includes(config.name)) {
          if (minColorPrice === undefined) minColorPrice = config.price
          else if (minColorPrice > config.price) minColorPrice = config.price
        }
      }
    })
    minColorPrice = minColorPrice ?? 0
    return minColorPrice
  },

  findMaxColorPrice (source, configPrices) {
    const { pickedColors = [] } = source
    let maxColorPrice
    configPrices.forEach(config => {
      if (config.type === 'color') {
        if (pickedColors.includes(config.name)) {
          if (maxColorPrice === undefined) maxColorPrice = config.price
          else if (maxColorPrice < config.price) maxColorPrice = config.price
        }
      }
    })
    maxColorPrice = maxColorPrice ?? 0
    return maxColorPrice
  },

  findMinPrice (basePrice, source, configPrices) {
    const { pickedColors = [], pickedSizes = [] } = source
    let minColorPrice, minSizePrice
    configPrices.forEach(config => {
      if (config.type === 'color') {
        if (pickedColors.includes(config.name)) {
          if (minColorPrice === undefined) minColorPrice = config.price
          else if (minColorPrice > config.price) minColorPrice = config.price
        }
      }

      if (config.type === 'size') {
        if (pickedSizes.includes(config.name)) {
          if (minSizePrice === undefined) minSizePrice = config.price
          else if (minSizePrice > config.price) minSizePrice = config.price
        }
      }
    })
    minColorPrice = minColorPrice ?? 0
    minSizePrice = minSizePrice ?? 0
    return basePrice + minColorPrice + minSizePrice
  },

  findMaxPrice (basePrice, source, configPrices) {
    const { pickedColors = [], pickedSizes = [] } = source
    let maxColorPrice, maxSizePrice
    configPrices.forEach(config => {
      if (config.type === 'color') {
        if (pickedColors.includes(config.name)) {
          if (maxColorPrice === undefined) maxColorPrice = config.price
          else if (maxColorPrice < config.price) maxColorPrice = config.price
        }
      }

      if (config.type === 'size') {
        if (pickedSizes.includes(config.name)) {
          if (maxSizePrice === undefined) maxSizePrice = config.price
          else if (maxSizePrice < config.price) maxSizePrice = config.price
        }
      }
    })
    maxColorPrice = maxColorPrice ?? 0
    maxSizePrice = maxSizePrice ?? 0
    return basePrice + maxColorPrice + maxSizePrice
  },

  findPriceRange (basePrice, source, configPrices) {
    const minPrice = this.findMinPrice(basePrice, source, configPrices)
    const maxPrice = this.findMaxPrice(basePrice, source, configPrices)
    return minPrice === maxPrice ? minPrice : [minPrice, maxPrice]
  },

  groupPriceConfigsBySizes (basePrice, source, configPrices) {
    const { pickedColors = [], pickedSizes = [] } = source
    const minColorPrice = this.findMinColorPrice({ pickedColors }, configPrices)
    const maxColorPrice = this.findMaxColorPrice({ pickedColors }, configPrices)

    const sizePrices = {}
    configPrices.forEach(config => {
      if (config.type === 'size') sizePrices[config.name] = config.price
    })

    const result = pickedSizes.map(size => ({
      size,
      originPrice: [basePrice + sizePrices[size] + minColorPrice, basePrice + sizePrices[size] + maxColorPrice]
    }))
    return result
  }

}
