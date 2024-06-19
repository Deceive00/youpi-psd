export const AuthFactory = {
  createVendor: (id: string, data : any) => {
    return {
      rating: 0,
      review: 0,
      id: id,
      categories: [],
      ...data
    }
  },
  createUser: (nim: string, email:string, firstName: string, 
    lastName: string, isSender: Boolean, phoneNumber: string) => {
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

