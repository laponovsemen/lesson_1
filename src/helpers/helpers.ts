export const converStringIntoBase64 = (obj: any) => {
  return Buffer.from(obj, 'utf8').toString('base64')
}

export const converBase64IntoString = (text: string) => {
  return Buffer.from(text, 'utf8').toString('base64')
}
  // const decodedAuth = buff.toString('utf8')
  
  // const buff2 = Buffer.from(loginPassword, 'utf8')
  // const codedAuth = buff2.toString('base64')