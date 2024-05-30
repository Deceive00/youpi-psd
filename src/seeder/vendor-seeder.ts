import { Campus, Vendor } from "@lib/types/vendor-types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "src/firebase/firebase-config";

const DEFAULT_PASSWORD = "vendor123";
const DEFAULT_IMAGE = "https://firebasestorage.googleapis.com/v0/b/dg-travelohi.appspot.com/o/434228032_387590770791800_8682384244587217201_n.jpeg?alt=media&token=ec92f6c2-8871-4965-b1d3-346bd34fbf33"

const campus: Campus[] = [
  {
    name: "BINUS Alam Sutera",
    vendors: [
      {
        campusName: "BINUS Alam Sutera",
        email: "ramen.saia@gmail.com",
        name: "Ramen Saia",
        coverImage: DEFAULT_IMAGE,
        rating: 4.5,
        review: 200,
        id: 'vendor1',
        categories: [
          {
            name: "Rice Bowl",
            menus: [
              {
                name: "Karaage Don",
                description: "Rice Bowl with Tori Karaage",
                image: DEFAULT_IMAGE,
                price: 43000,
              },
              {
                name: "Gyudon",
                description: "Rice Bowl with Beef",
                image: DEFAULT_IMAGE,
                price: 45000,
              },
            ],
          },
          {
            name: "Ramen",
            menus: [
              {
                name: "Chicken Ramen",
                description: "Original Chicken Broth",
                image: DEFAULT_IMAGE,
                price: 45000,
              },
              {
                name: "Beef Ramen",
                description: "Rich Beef Broth",
                image: DEFAULT_IMAGE,
                price: 48000,
              },
            ],
          },
        ],
      },
      {
        campusName: "BINUS Alam Sutera",
        email: "boba.licious@gmail.com",
        name: "Boba Licious",
        coverImage: DEFAULT_IMAGE,
        rating: 4.2,
        review: 150,
        id: 'vendor2',
        categories: [
          {
            name: "Milk Tea",
            menus: [
              {
                name: "Classic Pearl Milk Tea",
                description: "Milk Tea with Pearls",
                image: DEFAULT_IMAGE,
                price: 25000,
              },
              {
                name: "Brown Sugar Milk Tea",
                description: "Milk Tea with Brown Sugar",
                image: DEFAULT_IMAGE,
                price: 28000,
              },
            ],
          },
          {
            name: "Fruit Tea",
            menus: [
              {
                name: "Passion Fruit Tea",
                description: "Tea with Passion Fruit Flavor",
                image: DEFAULT_IMAGE,
                price: 30000,
              },
              {
                name: "Mango Tea",
                description: "Tea with Mango Flavor",
                image: DEFAULT_IMAGE,
                price: 28000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "BINUS Anggrek",
    vendors: [
      {
        campusName: "BINUS Anggrek",
        email: "sushi.san@gmail.com",
        name: "Sushi San",
        coverImage: DEFAULT_IMAGE,
        rating: 4.7,
        review: 150,
        id: 'vendor3',
        categories: [
          {
            name: "Sushi Rolls",
            menus: [
              {
                name: "California Roll",
                description: "Classic California Roll",
                image: DEFAULT_IMAGE,
                price: 25000,
              },
              {
                name: "Spicy Tuna Roll",
                description: "Tuna Roll with Spicy Sauce",
                image: DEFAULT_IMAGE,
                price: 28000,
              },
            ],
          },
          {
            name: "Nigiri",
            menus: [
              {
                name: "Salmon Nigiri",
                description: "Fresh Salmon on Rice",
                image: DEFAULT_IMAGE,
                price: 30000,
              },
              {
                name: "Tuna Nigiri",
                description: "Fresh Tuna on Rice",
                image: DEFAULT_IMAGE,
                price: 28000,
              },
            ],
          },
          {
            name: "Tempura",
            menus: [
              {
                name: "Shrimp Tempura",
                description: "Crispy Fried Shrimp",
                image: DEFAULT_IMAGE,
                price: 35000,
              },
              {
                name: "Vegetable Tempura",
                description: "Assorted Vegetable Tempura",
                image: DEFAULT_IMAGE,
                price: 30000,
              },
            ],
          },
        ],
      },
      {
        campusName: "BINUS Anggrek",
        email: "pizza.mania@gmail.com",
        name: "Pizza Mania",
        coverImage: DEFAULT_IMAGE,
        rating: 4.3,
        review: 180,
        id: 'vendor4',
        categories: [
          {
            name: "Classic Pizzas",
            menus: [
              {
                name: "Margherita Pizza",
                description: "Classic Tomato and Mozzarella Pizza",
                image: DEFAULT_IMAGE,
                price: 35000,
              },
              {
                name: "Pepperoni Pizza",
                description: "Pizza with Pepperoni Slices",
                image: DEFAULT_IMAGE,
                price: 38000,
              },
            ],
          },
          {
            name: "Gourmet Pizzas",
            menus: [
              {
                name: "Truffle Pizza",
                description: "Pizza with Truffle Oil and Mushrooms",
                image: DEFAULT_IMAGE,
                price: 45000,
              },
              {
                name: "BBQ Chicken Pizza",
                description: "Pizza with BBQ Chicken Toppings",
                image: DEFAULT_IMAGE,
                price: 42000,
              },
            ],
          },
        ],
      },
    ],
  },
];


const SeedVendor = async () => {
  try {
    for (const c of campus) {
      let newVendor : Vendor[] = [];
      for (const vendor of c.vendors) {
        
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          vendor.email,
          DEFAULT_PASSWORD
        );
        const uid = userCredential.user.uid;

        const vendorData = {
          ...vendor,
          id: uid,
        } as Vendor;
        newVendor.push(vendorData);
      }
      const campusData = {
        name: c.name,
        vendors: newVendor,
      } as Campus;
      const docRef = doc(db, "campus", c.name);

      await setDoc(docRef, campusData);
      // const docRef = await addDoc(collection(db, "campus"), vendorData);
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Error registering vendor or seeding data: ", error);
  }
};

export {SeedVendor}