export const AuthFactory = {
  createVendor: (rating : number, review : number, id: string, categories: any[], data : any) => {
    return {
      rating: 0,
      review: 0,
      id: id,
      categories: [],
      ...data
    }
  },
  createUser: (nim: string, email:string, firstName: string, lastName: string, isSender: Boolean, phoneNumber: string) => {
    return {
      nim: nim,
      email: email,
      firstName: firstName,
      lastName: lastName,
      isSender: isSender,
      phoneNumber: phoneNumber,
    }
  },
  
}