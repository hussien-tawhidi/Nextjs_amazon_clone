import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Hussien",
      email: "hussien@gmail.com",
      password: bcrypt.hashSync("12345"),
      isAdmin: true,
    },
    {
      name: "Ali",
      email: "ali@gmail.com",
      password: bcrypt.hashSync("12345"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Free Shirt",
      slug: "free-shirt",
      category: "Shirts",
      image: "/images/t1.webp",
      price: 70,
      brand: "Nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular shirt",
      isFeatured: true,
      banner: "/images/banner1.jpg",
    },
    {
      name: "Fit Shirt",
      slug: "fit-shirt",
      category: "Shirts",
      image: "/images/t2.webp",
      price: 80,
      brand: "Adidas",
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: "A popular shirt",
      isFeatured: true,
      banner: "/images/banner2.jpg",
    },
    {
      name: "Slim Shirt",
      slug: "slim-shirt",
      category: "Shirts",
      image: "/images/t3.webp",
      price: 90,
      brand: "Raymond",
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Golf Pants",
      slug: "golf-pants",
      category: "Pants",
      image: "/images/p1.webp",
      price: 90,
      brand: "Oliver",
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description: "Smart looking pants",
    },
    {
      name: "Fit Pants",
      slug: "fit-pants",
      category: "Pants",
      image: "/images/p2.webp",
      price: 95,
      brand: "Zara",
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description: "A popular pants",
    },
    {
      name: "Classic Pants",
      slug: "classic-pants",
      category: "Pants",
      image: "/images/p3.webp",
      price: 75,
      brand: "Casely",
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description: "A popular pants",
    },
  ],
};

export default data;
