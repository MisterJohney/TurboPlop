class utils {
  generateLink(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = characters.length;
    let output = "";
    for (let i = 0; i < length; i++) {
      output += characters[Math.floor(Math.random() * charLen)];
    }
    return output
  }
}

module.exports = utils;
