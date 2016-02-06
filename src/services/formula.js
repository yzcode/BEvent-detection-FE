module.exports = {
  getHotRate: (cnt, scnt) => {
    return Math.round(cnt / scnt * 10000)
  },
  getRandom: (lower, upper) => {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower
  }
}
