export const AuthFactory = {
  createVendor: (rating : number, review : number, id: string, categories: any[], data : any) => {
    return {
      rating: 0,
      review: 0,
      id: id,
      categories: [],
      ...data
    }
  }
}